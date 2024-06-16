// import { prisma } from '@/libs/db';
import { NextRequest, NextResponse } from 'next/server';
import {
  getParamsData,
  requestData,
  responseData
} from 'app/api/base.interface';
import { getOrders } from 'lib/models/order';

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
    let name = getParamsData(searchParams, 'name');
    let method = getParamsData(searchParams, 'method');
    let where: any = {};
    if (name) {
      where.name = name;
    }
    if (method) {
      where.method = method;
    }
    let query = requestData(page, size, where);
    const { count, orders } = await getOrders(name, method);

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
