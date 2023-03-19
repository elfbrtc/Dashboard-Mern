import React, { FC, useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { Styled } from './CompanyModal.styled';
import { Form, Input, Select } from 'antd';
import {company} from '../../services/endpoints/company'
import { CompanyModalProps } from './types';
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const CompanyModal:FC<CompanyModalProps> = (props) => {
  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();

  const [formValues, setFormValues] = React.useState({
    companyName: '',
    companyLegalNumber: '',
    companyCountry: '',
    companyWebsite: ''
  })

  useEffect(() => {
  }, [
    
  ])

  const onGenderChange = (value: string) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' });
        break;
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' });
        break;
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' });
        break;
      default:
    }
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({ note: 'Hello world!', gender: 'male' });
  };

  return (
    <Styled>
      <Button type="primary" onClick={() => setOpen(true)}>
        Create Company
      </Button>
      <Modal
        title="Create Company"
        centered
        open={open}
        onOk={() => {
          form.validateFields().then(values => {
            company.createCompany(values).then((res) => {
              console.log('success'+res)
              
            }).catch((err) => {
              console.log('err'+err)
            })
            onReset()
            setOpen(false)          
          }).catch(info => {
            return
          });           
        }}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="companyName" label="Company Name" rules={[{ required: true }]}>
        <Input 
         placeholder="Company Name" 
         onChange={(e) => {
           setFormValues({
             ...formValues,
             companyName: e.target.value
           })}}
           value={formValues.companyName}/>
      </Form.Item>
      <Form.Item name="companyLegalNumber" label="Legal Number" rules={[{ required: true }]}>
        <Input 
         placeholder="Legal Number" 
         onChange={(e) => {
           setFormValues({
             ...formValues,
             companyLegalNumber: e.target.value
           })}}
           value={formValues.companyLegalNumber}/>
      </Form.Item>
      <Form.Item name="companyCountry" label="Country" rules={[{ required: true }]}>
        
        <Input 
         placeholder="Country" 
         onChange={(e) => {
           setFormValues({
             ...formValues,
             companyCountry: e.target.value
           })}}
           value={formValues.companyCountry}/>
      </Form.Item>
      <Form.Item name="companyWebsite" label="Website" rules={[{ required: true }]}>
        
        <Input 
         placeholder="Website" 
         onChange={(e) => {
           setFormValues({
             ...formValues,
             companyWebsite: e.target.value
           })}}
           value={formValues.companyWebsite}/>
      </Form.Item>

      {/* <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item> */}
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
      >
        {({ getFieldValue }) =>
          getFieldValue('gender') === 'other' ? (
            <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
    </Form>
      </Modal>
    </Styled>
  );
};

export default CompanyModal;