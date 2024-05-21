'use client';

import { Table } from 'antd';
import { usercolumns } from '@/app/const/usercoloum';

export default function UsersTable({ dataSource }: { dataSource: any[] }) {
  console.log('516666  dataSource: ', dataSource);
  //   const router = useRouter();

  return (
    <>
      <Table
        columns={usercolumns}
        dataSource={dataSource}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
}
