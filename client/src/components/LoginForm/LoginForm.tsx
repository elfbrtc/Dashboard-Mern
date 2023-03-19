import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Styled } from './LoginForm.styled';
import '../../App.css'
import { LoginFormProps } from './types';
import { Link } from 'react-router-dom';

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const [formValues, setFormValues] = React.useState({
    username: '',
    password: ''
  })

  const handleSubmit = () => {
    props.onLogin(formValues)
  }

  return (
    <Styled>
      <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} 
        placeholder="Username" 
        onChange={(e) => {
          setFormValues({
            ...formValues,
            username: e.target.value
          })}}
          value={formValues.username}
        />
        
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setFormValues({
              ...formValues,
              password: e.target.value
            })
          }
          }
          value={formValues.password}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button onClick={handleSubmit} type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link to="/register">register now!</Link> 
      </Form.Item>
    </Form>
    </Styled>
    
  );
};

export default LoginForm;