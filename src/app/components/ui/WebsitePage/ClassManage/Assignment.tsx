'use client';

import React, { useState } from 'react';
import { Card, Button, List, Typography, Space, Tag, Modal, Form, Input, DatePicker, Select } from 'antd';

const { Title, Text } = Typography;
const { TextArea } = Input;

// SVG icons for various file types and actions
const ClipboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);

const mockAssignments = [
  {
    id: 1,
    title: 'Programming Assignment 3',
    dueDate: 'Oct 25, 2024',
    dueTime: '11:59 PM',
    description: 'Implement a binary search tree with insertion, deletion, and traversal methods',
    status: 'Pending',
  },
  {
    id: 2,
    title: 'Midterm Exam Preparation',
    dueDate: 'Oct 30, 2024',
    description: 'Review chapters 1-8 and complete practice problems',
    status: 'Completed',
  },
];

const AssignmentsAndDeadlines = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Function to show the modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle form submission
  const handleOk = () => {
    form.validateFields()
      .then(values => {
        // Here you would typically send the data to an API or update state
        console.log('Received values of form: ', values);
        setIsModalOpen(false);
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  // Function to handle modal cancellation
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full mx-auto my-8 p-4">
      {/* Header section with title and add assignment button */}
      <div className="flex justify-between items-center mb-6">
        <Space>
          <ClipboardIcon />
          <Title level={2} className="!my-0 !text-3xl">Assignments & Deadlines</Title>
        </Space>
        <Button
          type="primary"
          size='large'
          icon={<PlusIcon />}
          className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2"
          onClick={showModal}
        >
          Add Assignment
        </Button>
      </div>

      {/* List of assignments */}
      <List
        itemLayout="vertical"
        dataSource={mockAssignments}
        renderItem={assignment => (
          <List.Item className="!p-0 !border-none !mb-4">
            <Card bordered={false} className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-start">
                {/* Assignment details */}
                <div className="flex-1 pr-4">
                  <Title level={4} className="!mt-0 !mb-1 text-lg">{assignment.title}</Title>
                  <Text type="secondary" className="text-sm">
                    Due: {assignment.dueDate} {assignment.dueTime ? `at ${assignment.dueTime}` : ''}
                  </Text>
                  <p className="mt-2 text-base line-clamp-2">
                    {assignment.description}
                  </p>
                </div>
                {/* Status tag */}
                <Tag
                  className="rounded-full px-3 py-1 text-sm font-semibold"
                  color={assignment.status === 'Pending' ? 'orange' : 'green'}
                >
                  {assignment.status}
                </Tag>
              </div>
            </Card>
          </List.Item>
        )}
      />

      {/* Modal for adding a new assignment */}
      <Modal
        title="Add New Assignment"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Add Assignment"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          name="add_assignment_form"
          className="mt-4"
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the assignment title!' }]}
          >
            <Input placeholder="Assignment Title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input a description!' }]}
          >
            <TextArea rows={4} placeholder="Assignment description..." />
          </Form.Item>
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: 'Please select a due date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            initialValue="Pending"
            rules={[{ required: true, message: 'Please select a status!' }]}
          >
            <Select placeholder="Select a status">
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="Completed">Completed</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

// Main App component to demonstrate the usage
const Assignment = () => {
  return (
    <div className="bg-gray-50 ">
      <AssignmentsAndDeadlines />
    </div>
  );
};

export default Assignment;
