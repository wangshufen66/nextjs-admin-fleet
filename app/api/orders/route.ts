// import { prisma } from '@/libs/db';
import { NextRequest, NextResponse } from 'next/server';
import {
  getParamsData,
  requestData,
  responseData
} from 'app/api/base.interface';
import {
  getOrders,
  deleteUserById,
  updateOrder,
  addOrder
} from 'lib/models/order';

/**
 * 查询列表
 * @param req
 * @param params
 * @returns
 */
export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    let page = Number(getParamsData(searchParams, 'page')) || 1;
    let size = Number(getParamsData(searchParams, 'size')) || 10;
    let name = getParamsData(searchParams, 'customerName');
    let method = getParamsData(searchParams, 'paymentMethod');
    let status = getParamsData(searchParams, 'orderStatus');
    const { count, orders } = await getOrders(name, method, status);

    return NextResponse.json(
      responseData(200, '操作成功', {
        list: orders,
        total: count,
        page: 1,
        size: 10
      })
    );
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(responseData(0, '操作失败'));
  }
};

/**
 * 删除信息
 * @param req
 */
export const DELETE = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(responseData(0, '缺少删除信息Id'));
    }
    await deleteUserById(Number(id));
    return NextResponse.json(responseData(200, '操作成功'));
  } catch (error: any) {
    return NextResponse.json(responseData(0, '操作失败'));
  }
};

/**
 * 更新信息
 * @param req
 */
export const PUT = async (req: NextRequest) => {
  try {
    let { orderId, ...data } = await req.json();
    if (!orderId) {
      return NextResponse.json(responseData(0, '缺少更新信息Id'));
    }
    const res = await updateOrder(
      orderId,
      data.customerName,
      data.orderAmount,
      data.paymentMethod,
      data.orderStatus
    );
    return NextResponse.json(responseData(200, '操作成功', res));
  } catch (error: any) {
    return NextResponse.json(responseData(0, '操作失败'));
  }
};

/**
 * 添加信息
 * @param req
 */
export const POST = async (req: NextRequest) => {
  try {
    let data = await req.json();
    console.log('POST data: ', data);
    let {
      customerName = '',
      orderAmount = '',
      paymentMethod = '',
      orderStatus = ''
    } = data;

    if (!customerName) {
      return NextResponse.json(responseData(0, '名称不能为空'));
    }
    if (!orderAmount) {
      return NextResponse.json(responseData(0, '金额不能为空'));
    }
    if (!paymentMethod) {
      return NextResponse.json(responseData(0, '支付方式不能为空'));
    }
    if (!orderStatus) {
      return NextResponse.json(responseData(0, '订单状态不能为空'));
    }
    // addOrder
    await addOrder(customerName, orderAmount, paymentMethod, orderStatus);
    return NextResponse.json(responseData(200, '操作成功'));
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(responseData(0, '操作失败'));
  }
};
