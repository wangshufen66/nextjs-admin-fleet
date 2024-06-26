import ShowDrawer from 'app/components/ShowDrawer';
import { Form, Input, Select, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { rules } from './rules';
import { addInfo, updateInfo } from '@/interface/orders';

const UserInfo = (props: any) => {
  let { info } = props;
  //初始化表单
  let initForm = {
    customerName: '',
    orderAmount: '',
    paymentMethod: '',
    orderStatus: '',
    creator: ''
  };
  const [form] = Form.useForm<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [infoForm, setInfoForm] = useState<any>({ ...initForm, ...info });

  //完成 提交
  const onFinish = () => {
    form.validateFields().then(async (values) => {
      try {
        let sendForm = { ...infoForm, ...values };
        console.log('00-- sendForm: ', sendForm);
        if (sendForm.orderId) {
          await updateInfo(sendForm);
        } else {
          await addInfo(sendForm);
        }
        form.resetFields();
        message.success('操作成功');
        props.submit();
      } finally {
      }
    });
  };

  //选择部门
  // const changeDepart = async (e: string) => {
  //   setInfoForm({ ...infoForm, departId: e });
  // };

  return (
    <ShowDrawer close={() => props.close()} submit={() => onFinish()}>
      <Spin spinning={loading}>
        <Form
          form={form}
          name="info"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<any>
            label="名称"
            name="customerName"
            rules={rules.customerName}
            initialValue={infoForm.customerName}
          >
            <Input
              disabled={infoForm.orderId ? true : false}
              placeholder="请输入登录账号"
            />
          </Form.Item>
          <Form.Item<any>
            label="金额"
            name="orderAmount"
            rules={rules.orderAmount}
            initialValue={infoForm.orderAmount}
          >
            <Input placeholder="请输入金额" />
          </Form.Item>
          <Form.Item<any>
            label="支付方式"
            name="paymentMethod"
            rules={rules.paymentMethod}
            initialValue={infoForm.paymentMethod}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item<any>
            label="状态"
            name="orderStatus"
            rules={rules.orderStatus}
            initialValue={infoForm.orderStatus}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
        </Form>
      </Spin>
    </ShowDrawer>
  );
};

export default UserInfo;
