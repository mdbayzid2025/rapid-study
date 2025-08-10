'use client';

import React, { useState } from 'react';
import { Card, Button, Typography, Space, List, Modal, Form, Input, Select } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

// SVG icons for various resources and actions
const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L6.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
);

const PdfIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const PptxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h6l-1-1-6-6zm3-12l2-2m-2 2l-2 2m2-2v11m-8-2.5a2.5 2.5 0 012.5-2.5h10.5a2.5 2.5 0 012.5 2.5v7.5a2.5 2.5 0 01-2.5 2.5H4.5a2.5 2.5 0 01-2.5-2.5v-7.5zm11.5 5a.5.5 0 110-1 .5.5 0 010 1z" />
  </svg>
);

const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.142a.5.5 0 00-.708 0l-1.101 1.101a4 4 0 11-5.656-5.656l4-4a4 4 0 115.656 5.656L14.89 12.01m-1.278 1.278l-1.55 1.55a1 1 0 000 1.414l1.55 1.55" />
  </svg>
);

const VideoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M15 10l4.553-2.276A1 1 0 0121 8.682v6.636a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const mockResources = {
  lectureMaterials: [
    { title: 'Lecture 1 - Introduction.pdf', type: 'pdf' },
    { title: 'Algorithm Slides.pptx', type: 'pptx' },
  ],
  studyMaterials: [
    { title: 'Online Coding Practice', type: 'link' },
    { title: 'Recorded Lectures', type: 'video' },
  ],
};

// Function to get the correct icon component based on type
const getIcon = (type :any) => {
  switch (type) {
    case 'pdf':
      return <PdfIcon />;
    case 'pptx':
      return <PptxIcon />;
    case 'link':
      return <LinkIcon />;
    case 'video':
      return <VideoIcon />;
    default:
      return null;
  }
};

const ClassResources = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        // Here you would typically handle the file upload and new resource creation
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

  const renderResourceList = (title :any, resources : any) => (
    <Card bordered={false} className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <Title level={4} className="!mt-0 !mb-4">{title}</Title>
      <List
        dataSource={resources}
        renderItem={(item : any) => (
          <List.Item className="!p-0 !border-none !mb-2">
            <Space>
              {getIcon(item.type)}
              <Text className="!text-base">{item.title}</Text>
            </Space>
          </List.Item>
        )}
      />
    </Card>
  );

  return (
    <div className="max-w-4xl mx-auto my-8 p-4">
      {/* Header section */}
      <div className="flex justify-between items-center mb-6">
        <Space>
          <FolderIcon />
          <Title level={2} className="!my-0 !text-3xl">Class Resources</Title>
        </Space>
        <Button
          type="primary"
          size='large'
          icon={<UploadIcon />}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2"
          onClick={showModal}
        >
          Upload
        </Button>
      </div>

      {/* Main content with two cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderResourceList("Lecture Materials", mockResources.lectureMaterials)}
        {renderResourceList("Study Materials", mockResources.studyMaterials)}
      </div>

      {/* Modal for uploading a new resource */}
      <Modal
        title="Upload New Resource"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        okText="Upload"
        cancelText="Cancel"
        centered
      >
        <Form
          form={form}
          layout="vertical"
          name="upload_resource_form"
          className="mt-4"
        >
          <Form.Item
            name="title"
            label="Resource Title"
            rules={[{ required: true, message: 'Please enter a title for the resource!' }]}
          >
            <Input placeholder="e.g., 'Chapter 5 Notes'" style={{height: 48}}/>
          </Form.Item>
          <Form.Item
            name="type"
            label="Resource Type"
            rules={[{ required: true, message: 'Please select a resource type!' }]}
          >
            <Select style={{height: 48}} placeholder="Select type">
              <Option style={{height: 48}} value="pdf">PDF</Option>
              <Option style={{height: 48}} value="pptx">PowerPoint</Option>
              <Option style={{height: 48}} value="link">Link</Option>
              <Option style={{height: 48}} value="video">Video</Option>
            </Select>
          </Form.Item>
          {/* Placeholder for the actual file input */}
          <Form.Item
            name="file"
            label="File Upload"
            // File upload logic would go here, e.g., using Antd's Upload component
          >
            <Input placeholder="File upload functionality not yet implemented" disabled  style={{height: 48}}/>
          </Form.Item>
          <Button type='primary' size='large' style={{width:"100%"}}>Upload</Button>
        </Form>
      </Modal>
    </div>
  );
};

// Main App component to demonstrate the usage
const ClassResourse = () => {
  return (
    <div className="bg-gray-50 ">
      <ClassResources />
    </div>
  );
};

export default ClassResourse;
