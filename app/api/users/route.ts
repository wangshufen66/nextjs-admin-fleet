// import { prisma } from '@/libs/db';
import { NextRequest, NextResponse } from 'next/server';
import {
  getParamsData,
  requestData,
  responseData
} from '@/app/api/base.interface';
import { encryption } from '@/app/api/encrypt';
import { getUsers, createUser, updateUser, deleteUserById } from '@/lib/db';

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
    let phone = getParamsData(searchParams, 'phone');
    let roleId = getParamsData(searchParams, 'roleId');
    let departId = getParamsData(searchParams, 'departId');
    let where: any = {};
    if (name) {
      where.name = name;
    }
    if (phone) {
      where.phone = phone;
    }
    if (roleId) {
      where.roleId = roleId;
    }
    if (departId) {
      where.departId = departId;
    }
    let query = requestData(page, size, where);
    const { count, users } = await getUsers(name);

    return NextResponse.json(
      responseData(200, '操作成功', {
        list: users,
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
 * 添加数据
 * @param data
 */
export const POST = async (req: NextRequest) => {
  try {
    let data = await req.json();
    console.log('POST data: ', data);
    let {
      username = '',
      name = '',
      phone = '',
      email = '',
      password = '123456'
    } = data;
    if (!username) {
      return NextResponse.json(responseData(0, '用户名不能为空'));
    }
    if (!name) {
      return NextResponse.json(responseData(0, '姓名不能为空'));
    }
    if (!email) {
      return NextResponse.json(responseData(0, '邮箱不能为空'));
    }
    if (!phone) {
      return NextResponse.json(responseData(0, '手机号不能为空'));
    }
    let encryptPassword = encryption(password);
    data.password = encryptPassword;
    await createUser(name, username, email, phone, password);
    return NextResponse.json(responseData(200, '操作成功'));
  } catch (err: any) {
    console.log('createUser err: ', err);
    let message = '操作失败';
    let target = err.meta?.target || '';
    if (target) {
      let labelBox = target.split('_');
      let label = labelBox[1];
      message = `${label} 已存在`;
    }
    return NextResponse.json(responseData(0, message));
  }
};
/**
 * 删除信息
 * @param req
 */
export const DELETE = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    let ids = searchParams.getAll('ids[]');
    console.log('DELETE ids: ', ids);
    if (!ids || ids.length == 0) {
      return NextResponse.json(responseData(0, '缺少删除信息Id'));
    }
    await deleteUserById(Number(ids[0]));
    // await prisma.user.deleteMany({
    //   where: {
    //     id: {
    //       in: ids
    //     }
    //   }
    // });
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
    let { id, ...data } = await req.json();
    console.log('更新信息 PUT data: ', id, data);
    if (!id) {
      return NextResponse.json(responseData(0, '缺少更新信息Id'));
    }
    delete data.password;
    delete data.role;
    const res = await updateUser(
      id,
      data.name,
      data.username,
      data.email,
      data.phone
    );
    console.log('res: ', res);
    // const res = await prisma.user.update({
    //   where: {
    //     id
    //   },
    //   data
    // });
    return NextResponse.json(responseData(200, '操作成功', res));
  } catch (error: any) {
    return NextResponse.json(responseData(0, '操作失败'));
  }
};
