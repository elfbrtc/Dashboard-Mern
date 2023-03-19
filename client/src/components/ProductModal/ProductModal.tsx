import React, { FC, useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { Styled } from './ProductModal.styled';
import { Form, Input, Select } from 'antd';
import {product} from '../../services/endpoints/product'
import { ProductModalProps } from './types';
import { CompanyResponsePayload } from '../../services/endpoints/company/types';
import { company } from '../../services/endpoints/company'

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ProductModal:FC<ProductModalProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [companyState, setCompanyState] = useState<CompanyResponsePayload[]>()

  const [form] = Form.useForm();

  const [formValues, setFormValues] = React.useState({
    productName: '',
    productCategory: '',
    productAmount: '',
    productAmountUnit: '',
    productCompany: ''
  })

  useEffect(() => {
    company.getAllCompany().then(({data}) => {
      setCompanyState(data)
    }).catch((err) => {
      console.log(err)
    })
  }, [
   
  ])

  const onCompanyChange = (value: string) => {
    console.log(value)
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
        Create Product
      </Button>
      <Modal
        title="Create Product"
        centered
        open={open}
        onOk={() => {
          form.validateFields().then(values => {            
            product.createProduct(values).then((res) => {
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
      <Form.Item name="productName" label="Product Name" rules={[{ required: true }]}>
        <Input 
         placeholder="Product Name" 
         onChange={(e) => {
           setFormValues({
             ...formValues,
             productName: e.target.value
           })}}
           value={formValues.productName}/>
      </Form.Item>
      <Form.Item name="productCategory" label="Category" rules={[{ required: true }]}>
        <Input 
         placeholder="Category" 
         onChange={(e) => {
           setFormValues({
             ...formValues,
             productCategory: e.target.value
           })}}
           value={formValues.productCategory}/>
      </Form.Item>
      <Form.Item name="productAmount" label="Amount" rules={[{ required: true }]}>
        
        <Input 
         placeholder="Amount" 
         onChange={(e) => {
           setFormValues({
             ...formValues,
             productAmount: e.target.value
           })}}
           value={formValues.productAmount}/>
      </Form.Item>
      <Form.Item name="productAmountUnit" label="Amount Unit" rules={[{ required: true }]}>
        
        <Input 
         placeholder="Amount Unit" 
         onChange={(e) => {
           setFormValues({
             ...formValues,
             productAmountUnit: e.target.value
           })}}
           value={formValues.productAmountUnit}/>
      </Form.Item>
    
      <Form.Item name="productCompany" label="Company" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          onChange={onCompanyChange}
          allowClear
        > {
          companyState?.map((item) => {
            return (
              <Option value={item._id}>{item.companyName}</Option>
            )
           })
         }
          
        </Select>
      </Form.Item> 
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

export default ProductModal;