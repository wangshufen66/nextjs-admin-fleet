/*
 * @Author: benchenchuang benchenchuang
 * @Date: 2023-12-01 19:15:44
 * @LastEditors: benchenchuang benchenchuang
 * @LastEditTime: 2023-12-23 17:32:05
 * @FilePath: /next-app/src/app/api/login/route.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NextRequest, NextResponse } from 'next/server';
import { responseData } from '@/app/api/base.interface';
import { signOut } from '@/lib/auth';

/**
 * 登录
 * @param req
 * @returns
 */
export const POST = async (req: NextRequest) => {
  console.log('req: ', req);
};

/**
 * 退出
 */
export const PUT = async () => {
  await signOut();
};
