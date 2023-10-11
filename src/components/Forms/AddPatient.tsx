import React, { useState } from 'react';
import { Form, Input, Select } from 'antd';
import { AddButton, CancelButton } from "../Buttons";

type SizeType = Parameters<typeof Form>[0]['size'];

const AddForm: React.FC = () => {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const inventoryOptions = [
    { value: 'item1', label: 'Item 1' },
    { value: 'item2', label: 'Item 2' },
    { value: 'item3', label: 'Item 3' },
  ];

  const priorityOptions = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  const onFinish = (values: any) => {
    console.log('Form values:', values);
  };

  return (
    <div className="form-container">
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item label="Patient Name" name="patientName">
          <Input />
        </Form.Item>
        <Form.Item label="Quantity" name="quantity">
          <Input />
        </Form.Item>
        <Form.Item label="Inventory Item" name="inventoryItem">
          <Select>
            {inventoryOptions.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Priority" name="priority">
          <Select>
            {priorityOptions.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <div className="w-full flex gap-4">
            <AddButton />
            <CancelButton />
          </div>
      </Form>
    </div>
  );
};

export default AddForm;
