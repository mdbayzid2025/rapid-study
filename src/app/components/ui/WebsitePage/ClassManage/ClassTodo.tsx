'use client';

import React, { useState } from 'react';
import { Card, List, Typography, Space, Tag, Button, Modal, Form, Input, Select, Divider } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

// SVG icons
const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);

const CheckboxIcon = ({ checked }:any) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 cursor-pointer ${checked ? 'text-blue-500' : 'text-gray-400'}`} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth={2}>
    {checked ? (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m-5 2h4a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2z" />
    )}
  </svg>
);

const mockTodos = [
  {
    id: 1,
    task: 'Study for midterm exam',
    priority: 'High',
    isCompleted: false,
  },
  {
    id: 2,
    task: 'Submit Assignment 2',
    priority: 'Done',
    isCompleted: true,
  },
  {
    id: 3,
    task: 'Read Chapter 9',
    priority: 'Medium',
    isCompleted: false,
  },
];

const ToDoList = () => {
  const [todos, setTodos] = useState(mockTodos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const getPriorityTag = (priority :any) => {
    switch (priority) {
      case 'High':
        return <Tag color="red" className="rounded-full px-3 py-1 font-semibold border-none">High</Tag>;
      case 'Medium':
        return <Tag color="gold" className="rounded-full px-3 py-1 font-semibold border-none">Medium</Tag>;
      case 'Done':
        return <Tag color="green" className="rounded-full px-3 py-1 font-semibold border-none">Done</Tag>;
      default:
        return <Tag className="rounded-full px-3 py-1 font-semibold border-none">Low</Tag>;
    }
  };

  const handleCheckboxClick = (id:any) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        // Here you would add the new todo item to your state or a database
        console.log('Received values of form: ', values);
        setIsModalOpen(false);
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div className="w-full mx-auto my-8">
      <Card bordered={false} className="rounded-lg shadow-xl">
        {/* Header with title and add button */}
        <div className="flex justify-between items-center mb-6">
          <Space>
            <CheckCircleIcon />
            <Title level={2} className="!my-0 !text-3xl">To-Do List</Title>
          </Space>
          <Button
            type="primary"
            icon={<PlusIcon />}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4 py-2"
            onClick={showModal}
          >
            Add
          </Button>
        </div>
        <Divider />

        {/* List of to-do items */}
        <List
          itemLayout="horizontal"
          dataSource={todos}
          renderItem={item => (
            <List.Item className="!p-0 !border-none !my-2">
              <div className="flex items-center w-full">
                <Space>
                  <div onClick={() => handleCheckboxClick(item.id)}>
                    <CheckboxIcon checked={item.isCompleted} />
                  </div>
                  <Text className="text-lg flex-1 mr-4">
                    {item.task}
                  </Text>
                </Space>
                {getPriorityTag(item.priority)}
              </div>
            </List.Item>
          )}
        />
      </Card>

      {/* Modal for adding a new to-do item */}
      <Modal
        title="Add New To-Do"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Add"
        cancelText="Cancel"
        centered
      >
        <Form
          form={form}
          layout="vertical"
          name="add_todo_form"
          className="mt-4"
        >
          <Form.Item
            name="task"
            label="Task"
            rules={[{ required: true, message: 'Please input the to-do task!' }]}
          >
            <Input placeholder="Enter a new task" />
          </Form.Item>
          <Form.Item
            name="priority"
            label="Priority"
            initialValue="Medium"
            rules={[{ required: true, message: 'Please select a priority!' }]}
          >
            <Select placeholder="Select priority">
              <Option value="High">High</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Low">Low</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

// Main App component to demonstrate the usage
const ClassTodo = () => {
  return (
    <div className="bg-gray-50 ">
      <ToDoList />
    </div>
  );
};

export default ClassTodo;
