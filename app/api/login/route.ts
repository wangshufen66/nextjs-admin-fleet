import { NextRequest, NextResponse } from 'next/server';
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
