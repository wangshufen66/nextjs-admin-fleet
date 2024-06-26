'use client';
import { Button, Card, Flex, Form, Input, Modal, Table, message } from 'antd';
import { columns } from './columns';
import { getOrderList, deleteInfo } from '@/interface/orders';
import { useAntdTable, useDebounceFn, useRequest } from 'ahooks';
import { ExclamationCircleFilled, PlusCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import UserInfo from './_components/info';

const { confirm } = Modal;

const Orders = (props: any) => {
  const { isShowSearch = true } = props;
  const [form] = Form.useForm();
  const [showData, setShowData] = useState<Boolean>(false);
  const [dataInfo, setDataInfo] = useState<any | object>();
  //查询信息列表
  const searchList = (params: any, formData: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        let { pageSize: size, current: page } = params;
        let form = {
          page,
          size,
          ...formData
        };
        let res = await getOrderList(form);
        let { list, total } = res.data;
        // console.log('0618 order list: ', list);
        let result: any = {
          list,
          total
        };
        resolve(result);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  };
  //删除
  const deleteItemByInfo = (item: any) => {
    let { orderId, customerName } = item;
    confirm({
      title: '操作提示',
      icon: <ExclamationCircleFilled />,
      content: `确定要删除 ${customerName} 字典?`,
      cancelText: '取消',
      okText: '确定',
      onOk: async () => {
        try {
          await deleteInfo({ id: orderId });
          message.success('操作成功');
          search.submit();
        } catch (err) {
          message.error('操作失败');
        }
      }
    });
  };
  //编辑
  const updateItemByInfo = (item?: any) => {
    console.log('编辑 item: ', item);
    setShowData(true);
    setDataInfo(item);
  };
  const { tableProps, search } = useAntdTable(searchList, {
    defaultPageSize: 10,
    form
  });
  const { run: autoSearch } = useDebounceFn(search.submit, { wait: 500 });
  const { run: deleteItem } = useRequest(
    async (item: any) => deleteItemByInfo(item),
    {
      manual: true
    }
  );
  const { run: updateItem } = useRequest(
    async (item: any) => updateItemByInfo(item),
    {
      manual: true
    }
  );

  return (
    <>
      {isShowSearch ? (
        <Card style={{ margin: '10px 0' }}>
          {
            <Form form={form} onValuesChange={autoSearch} layout="inline">
              <Form.Item label="" name="customerName">
                <Input placeholder="请输入用户名" />
              </Form.Item>
              <Form.Item label="" name="orderStatus">
                <Input placeholder="请选择订单状态" />
              </Form.Item>
              <Form.Item label="" name="paymentMethod">
                <Input placeholder="请输入付款方式" />
              </Form.Item>
              <Flex wrap="wrap" gap="small">
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={search.submit}
                >
                  查询
                </Button>
                <Button onClick={search.reset}>重置</Button>
                <Button
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  onClick={() => updateItemByInfo()}
                >
                  添加
                </Button>
              </Flex>
            </Form>
          }
          <Table
            style={{ marginTop: '20px' }}
            rowKey="orderId"
            bordered
            columns={columns(updateItem, deleteItem)}
            {...tableProps}
          />
        </Card>
      ) : (
        <>
          <Form form={form}></Form>
          <Table
            rowKey="orderId"
            bordered
            columns={columns(updateItem, deleteItem)}
            {...tableProps}
          />
        </>
      )}

      {showData && (
        <UserInfo
          info={dataInfo}
          submit={() => {
            setShowData(false);
            search.submit();
          }}
          close={() => setShowData(false)}
        />
      )}
    </>
  );
};

export default Orders;
