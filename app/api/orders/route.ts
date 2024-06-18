// import { prisma } from '@/libs/db';
import { NextRequest, NextResponse } from 'next/server';
import {
  getParamsData,
  requestData,
  responseData
} from 'app/api/base.interface';
import { getOrders, deleteUserById } from 'lib/models/order';

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
