'use client';

import React, { useState } from 'react';
import { Card, Input, Button, List, Typography, Space, Tooltip, Modal, Form } from 'antd';

const { Title, Text } = Typography;

// SVG icons for various file types and actions
const FileTextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m-5 2h4a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
);

const PdfIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h2a2 2 0 012 2v1h4a2 2 0 012 2v10a2 2 0 01-2 2h-4a2 2 0 01-2-2V8a2 2 0 01-2-2H4a2 2 0 01-2-2z" />
  </svg>
);

const ImageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);


const mockNotes = [
  {
    id: 1,
    title: 'Algorithm Analysis & Big O Notation',
    date: 'Oct 15, 2024',
    instructor: 'Dr. Sarah Johnson',
    description: 'Comprehensive overview of algorithm complexity analysis including time and space complexity...',
    files: [{ type: 'pdf' }],
  },
  {
    id: 2,
    title: 'Data Structures: Trees & Graphs',
    date: 'Oct 12, 2024',
    instructor: 'Dr. Sarah Johnson',
    description: 'Detailed explanation of binary trees, AVL trees, and graph traversal algorithms...',
    files: [{ type: 'image' }, { type: 'pdf' }],
  },
  {
    id: 3,
    title: 'Introduction to Databases',
    date: 'Oct 10, 2024',
    instructor: 'Dr. Jane Smith',
    description: 'Covers the fundamentals of relational databases, SQL, and database design principles...',
    files: [],
  },
];

const ClassNotes = () => {
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
      {/* Header section with title and add note button */}
      <div className="flex justify-between items-center mb-6">
        <Space>
          <FileTextIcon />
          <Title level={2} className="!my-0 !text-3xl">Class Notes</Title>
        </Space>
        <Button
          type="primary"
          size='large'
          icon={<PlusIcon />}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
          onClick={showModal}
        >
          Add Note
        </Button>
      </div>

      {/* Search input field */}
      <div className="mb-6">
        <Input
          placeholder="Search notes..."
          prefix={<SearchIcon />}
          className="rounded-lg p-3"
        />
      </div>

      {/* List of notes */}
      <List
        itemLayout="vertical"
        dataSource={mockNotes}
        renderItem={note => (
          <List.Item className="!p-0 !border-none !mb-4">
            <Card bordered={false} className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-start">
                {/* Note details */}
                <div className="flex-1 pr-4">
                  <Title level={4} className="!mt-0 !mb-1 text-lg">{note.title}</Title>
                  <Text type="secondary" className="text-sm">
                    {note.date} &bull; {note.instructor}
                  </Text>
                  <p className="mt-2 text-base line-clamp-2">
                    {note.description}
                  </p>
                </div>
                {/* File icons */}
                <Space size="middle">
                  {note.files.map((file, index) => (
                    <Tooltip key={index} title={file.type === 'pdf' ? "PDF File" : "Image File"}>
                      <span className="text-2xl">
                        {file.type === 'pdf' && <PdfIcon />}
                      </span>
                      <span className="text-2xl">
                        {file.type === 'image' && <ImageIcon />}
                      </span>
                    </Tooltip>
                  ))}
                </Space>
              </div>
            </Card>
          </List.Item>
        )}
      />

      {/* Modal for adding a new note */}
      <Modal
        title="Add New Note"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        okText="Add Note"
        cancelText="Cancel"
        centered
      >
        <Form
          form={form}
          layout="vertical"
          name="add_note_form"
          className="mt-4"
        >
            <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the note title!' }]}
            >
            <Input placeholder="Note Title" style={{ height: 48 }} />
            </Form.Item>
          <Form.Item
            name="instructor"
            label="Instructor"
            rules={[{ required: true, message: 'Please input the instructor name!' }]}
          >
            <Input placeholder="Dr. Sarah Johnson" style={{ height: 48 }}  />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input a description!' }]}
          >
            <Input.TextArea rows={4} placeholder="Detailed note description..." />
          </Form.Item>
          {/* A placeholder for file upload functionality */}
          <Form.Item name="files" label="Files">
            <Input disabled placeholder="File upload functionality not yet implemented" style={{ height: 48 }} />
          </Form.Item>
        </Form>
        <Button type='primary' size='large' style={{width: "100%"}}>Add Note</Button>
      </Modal>
    </div>
  );
};

// Main App component to demonstrate the usage
const ClassNote = () => {
  return (
    <div className="bg-gray-50">
      <ClassNotes />
    </div>
  );
};

export default ClassNote;
