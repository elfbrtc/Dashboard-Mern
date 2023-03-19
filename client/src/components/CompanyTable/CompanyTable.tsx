import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { CompanyTableProps } from './types';
import { CompanyResponsePayload } from '../../services/endpoints/company/types';
import { company } from '../../services/endpoints/company';
import CompanyModal from '../CompanyModal/CompanyModal';
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
  dataIndex: keyof CompanyResponsePayload;
  record: CompanyResponsePayload;
  handleSave: (record:CompanyResponsePayload ) => void;
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
      console.log(values)
      toggleEdit();
      
      // company.updateCompany({})
      console.log(dataIndex)
      const changedData = {...record}
      changedData[dataIndex] = values[dataIndex]
      company.updateCompany(changedData).then((res) => {
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

const CompanyTable: React.FC<CompanyTableProps> = (props) => {
    
  const [dataSource, setDataSource] = useState<CompanyResponsePayload[]>([]);

  const [count, setCount] = useState(0);

  useEffect(() => {
    setDataSource(props.data)
    }, [props.data])

  const handleDelete = (key: string) => {
    company.deleteCompany(key).then((res) => {
      if (res.status === 200) {
        const dataSource = [...props.data];
        setDataSource(dataSource.filter((item) => item._id !== key));
      }
    });
  };

  const defaultColumns = [
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      width: '30%',
      editable: true,
      key: 'companyName',
    },
    {
      title: 'Company Legal Number',
      dataIndex: 'companyLegalNumber',
        key: 'companyLegalNumber',
    },
    {
      title: 'Company Country',
      dataIndex: 'companyCountry',
        key: 'companyCountry',
    },
    {
        title: 'Company Website',
        dataIndex: 'companyWebsite',
        key: 'companyWebsite',
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
      render: (_:any, record:CompanyResponsePayload ) =>
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
      <CompanyModal />
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

export default CompanyTable;