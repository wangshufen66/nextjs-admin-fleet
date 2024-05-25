// import { prisma } from '@/libs/db';
import { NextRequest, NextResponse } from 'next/server';
import {
  getParamsData,
  requestData,
  responseData
} from '@/app/api/base.interface';
import { encryption } from '@/app/api/encrypt';
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
    // let data = await prisma.user.findMany({
    //   ...query,
    //   select: {
    //     id: true,
    //     name: true,
    //     username: true,
    //     roleId: true,
    //     post: true,
    //     avatar: true,
    //     departId: true,
    //     email: true,
    //     createTime: true,
    //     phone: true,
    //     depart: {
    //       select: {
    //         name: true
    //       }
    //     },
    //     role: {
    //       select: {
    //         name: true
    //       }
    //     }
    //   }
    // });
    // let total = await prisma.user.count({ where });
    const data = {
      list: [
        {
          id: '65815d4c663d1b3f55bfe711',
          name: 'Jimmy',
          username: 'admin',
          roleId: '65828b837518bba0d635c120',
          post: '开发',
          avatar: null,
          departId: '658132ad13e2f8cd868a9e14',
          email: 'chenchuangtx@sina.com',
          createTime: '2023-12-13T06:33:50.000Z',
          phone: '13245677654',
          depart: {
            name: '开发'
          },
          role: {
            name: '超级管理员'
          }
        },
        {
          id: '6582b69ce099dae32ab0c58a',
          name: 'chenchuang',
          username: 'chen',
          roleId: '65828ceb24778efe860f7242',
          post: '测试',
          avatar: null,
          departId: '6581327c13e2f8cd868a9e11',
          email: '123@qq.com',
          createTime: '2023-12-20T09:40:44.248Z',
          phone: '13223452345',
          depart: {
            name: '技术部'
          },
          role: {
            name: '一般管理员'
          }
        }
      ],
      page: 1,
      size: 10,
      total: 2
    };
    return NextResponse.json(responseData(200, '操作成功', data));
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
    let { username = '', name = '', phone = '', password = '123456' } = data;
    if (!username) {
      return NextResponse.json(responseData(0, '用户名不能为空'));
    }
    if (!name) {
      return NextResponse.json(responseData(0, '姓名不能为空'));
    }
    if (!phone) {
      return NextResponse.json(responseData(0, '手机号不能为空'));
    }
    let encryptPassword = encryption(password);
    data.password = encryptPassword;
    // await prisma.user.create({ data });
    return NextResponse.json(responseData(200, '操作成功'));
  } catch (err: any) {
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
    if (!ids || ids.length == 0) {
      return NextResponse.json(responseData(0, '缺少删除信息Id'));
    }
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
    if (!id) {
      return NextResponse.json(responseData(0, '缺少更新信息Id'));
    }
    delete data.password;
    delete data.role;
    delete data.depart;
    // const res = await prisma.user.update({
    //   where: {
    //     id
    //   },
    //   data
    // });
    // return NextResponse.json(responseData(200, '操作成功', res));
  } catch (error: any) {
    return NextResponse.json(responseData(0, '操作失败'));
  }
};