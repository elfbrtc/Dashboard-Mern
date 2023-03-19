import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { ProductTableProps } from './types';
import { product } from '../../services/endpoints/product';
import { ProductResponseType } from '../../services/endpoints/product/types';
import ProductModal from '../ProductModal/ProductModal';
const EditableContext = React.createContext<FormInstance<any> | null>(null);


interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof ProductResponseType;
  record: ProductResponseType;
  handleSave: (record:ProductResponseType ) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    console.log(record)
    try {
      const values = await form.validateFields();
      toggleEdit();
      const changedData : ProductResponseType = {...record}
      //changedData[dataIndex] = values[dataIndex]
      product.updateProduct(changedData).then((res) => {
        if (res.status === 200) {
          console.log("Updated")
          handleSave({ ...record, ...values });          
        }
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  name: string;
  age: string;
  address: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const ProductTable: React.FC<ProductTableProps> = (props) => {
    
  const [dataSource, setDataSource] = useState<ProductResponseType[]>([]);

  const [count, setCount] = useState(0);

  useEffect(() => {
    setDataSource(props.data)
    }, [props.data, count])

  const handleUpdateState = () => {
    setCount(count + 1);
  }

  const handleDelete = (key: string) => {
    product.deleteProduct(key).then((res) => {
      if (res.status === 200) {
        const dataSource = [...props.data];
        setDataSource(dataSource.filter((item) => item._id !== key));
      }
    });
  };

  const defaultColumns = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
      width: '30%',
      editable: true,
      key: 'productName',
    },
    {
      title: 'Product Category',
      dataIndex: 'productCategory',
        key: 'productCategory',
    },
    {
      title: 'Product Amount',
      dataIndex: 'productAmount',
        key: 'productAmount',
    },
    {
        title: 'Product Amount Unit',
        dataIndex: 'productAmountUnit',
        key: 'productAmountUnit',
    },
    {
      title: 'Product Company',
      dataIndex: 'productCompany',
      key: 'productCompany',
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: 'Updated At',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
    },

    {
      title: 'operation',
      dataIndex: 'operation',
      key: 'operation',
      render: (_:any, record:ProductResponseType ) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item._id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <ProductModal />
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        key={"key"}
      />
    </div>
  );
};

export default ProductTable;