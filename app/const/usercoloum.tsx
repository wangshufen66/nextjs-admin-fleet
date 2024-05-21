import { Space, Tag, type TableProps } from 'antd';

interface UserDataType {
  name: string;
  username: string;
  email: number;
}
const usercolumns: TableProps<UserDataType>['columns'] = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <a>{text}</a>,
    fixed: 'left',
    width: 100
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>编辑</a>
        <a>删除</a>
      </Space>
    )
  }
];

export { usercolumns };
