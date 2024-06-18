import { Button, Flex, Image, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';

export const columns = (
  updateItem: Function,
  deleteItem: Function
): ColumnsType<any> => {
  return [
    {
      title: 'ID',
      dataIndex: 'orderId',
      key: 'orderId'
    },
    {
      title: '用户名',
      dataIndex: 'customerName',
      key: 'customerName'
    },
    {
      title: '金额',
      dataIndex: 'orderAmount',
      key: 'orderAmount'
    },
    {
      title: '支付方式',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod'
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      key: 'orderStatus'
    },
    {
      title: '下单时间',
      dataIndex: 'orderTime',
      key: 'orderTime'
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime'
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 150,
      render: (value, record: any, index) => (
        <Flex wrap="wrap" gap="small">
          <Button
            size="small"
            type="primary"
            onClick={() => updateItem(record)}
          >
            编辑
          </Button>
          {record.username != 'admin' && (
            <Button size="small" danger onClick={() => deleteItem(record)}>
              删除
            </Button>
          )}
        </Flex>
      )
    }
  ];
};
