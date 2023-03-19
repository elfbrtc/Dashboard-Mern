import type { CascaderProps } from 'antd';
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from 'antd';
import React, { useState } from 'react';
import { Styled } from '../RegisterForm/RegisterForm.styled';
import { RegisterFormProps } from './types';


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegisterForm: React.FC<RegisterFormProps> = (props) => {

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const [formValues, setFormValues] = React.useState({
    username: '',
    password: ''
  })

  const handleSubmit = () => {
    props.onRegister(formValues)
  }

  return (
    <Styled>
        <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
      style={{ maxWidth: 600, display:'flex', flexDirection:'column',justifyContent:'center',position:'absolute', width:'100%', height:'100%' }}
      scrollToFirstError
    >
      <Form.Item
        name="Username"
        label="Username"
        tooltip="What do you want others to call you?"
        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
      >
        <Input onChange={
          (e) => {
            setFormValues({
              ...formValues,
              username: e.target.value
            })
        }}
        value={formValues.username}
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password onChange={
          (e) => {
            setFormValues({
              ...formValues,
              password: e.target.value
            })
        }}
        value={formValues.password}
        />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button onClick={handleSubmit} type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>

    </Styled>
    
  );
};

export default RegisterForm