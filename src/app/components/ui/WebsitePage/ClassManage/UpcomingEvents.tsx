'use client';

import { Button, Card, DatePicker, Divider, Form, Input, List, Modal, Select, Space, Tag, TimePicker, Typography } from 'antd';
import { useState } from 'react';

const { Title, Text } = Typography;
const { Option } = Select;

// SVG icons for various resources and actions
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const mockEvents = [
  {
    id: 1,
    title: 'Midterm Exam',
    date: 'Oct 30, 2024',
    time: '10:00 AM',
    tag: 'Exam',
    tagColor: 'red',
  },
  {
    id: 2,
    title: 'Group Discussion',
    date: 'Oct 22, 2024',
    time: '10:00 AM',
    tag: 'Discussion',
    tagColor: 'blue',
  },
  {
    id: 3,
    title: 'Office Hours',
    date: 'Oct 20, 2024',
    time: '2:00 PM',
    tag: 'Office Hours',
    tagColor: 'green',
  },
];

const UpcomingEvent = () => {
  const [events, setEvents] = useState(mockEvents);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const getTagColor = (color: any) => {
    switch (color) {
      case 'red':
        return { tag: 'bg-red-100 text-red-600', bar: 'bg-red-500' };
      case 'blue':
        return { tag: 'bg-blue-100 text-blue-600', bar: 'bg-blue-500' };
      case 'green':
        return { tag: 'bg-green-100 text-green-600', bar: 'bg-green-500' };
      default:
        return { tag: 'bg-gray-100 text-gray-600', bar: 'bg-gray-500' };
    }
  };

  const handleAddEvent = (values: any) => {
    const newEvent = {
      id: events.length + 1,
      title: values.title,
      date: values.date.format('MMM D, YYYY'),
      time: values.time.format('h:mm A'),
      tag: values.tag,
      tagColor: values.tagColor,
    };
    setEvents([...events, newEvent]);
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="w-full pt-5">
      {/* Header section */}
      <div className="flex items-center justify-between mb-6 px-3">
        <Space>
          <CalendarIcon />
          <Title level={2} className="!my-0 !text-xl whitespace-nowrap">Upcoming Events</Title>
        </Space>
         <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Add Event
        </Button>
      </div>
      <Divider />


      {/* List of events */}
      <List
        itemLayout="vertical"
        dataSource={events}
        renderItem={(event: any) => (
          <List.Item className="!p-0 !border-none !mb-4 ">
            <Card bordered={false} className="  bg-white border-l-purple-700 border-l-5 hover:shadow-lg transition-shadow !rounded-none duration-300">
              <div className="flex items-start">
                {/* Vertical color bar */}
                <div className={`w-1.5 h-full rounded-l-lg mr-4 ${getTagColor(event.tagColor).bar}`}></div>
                
                <div className="flex-1">
                  {/* Event details */}
                  <Title level={4} className="!mt-0 !mb-1 text-lg">{event.title}</Title>
                  <Text type="secondary" className="text-sm">
                    {event.date} &bull; {event.time}
                  </Text>

                  {/* Status tag */}
                  <div className="mt-2">
                    <Tag
                      className={`rounded-full px-3 py-1 text-sm font-semibold border-none ${getTagColor(event.tagColor).tag}`}
                    >
                      {event.tag}
                    </Tag>
                  </div>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />

      {/* Modal for adding event */}
      <Modal
        title="Add New Event"
        
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={500}
        centered
        footer={null}
      >
        <Form layout="vertical"  form={form} onFinish={handleAddEvent} className='grid grid-cols-2  gap-x-10'>
          <Form.Item
            label="Event Title"
            name="title"
            className='col-span-2'
            rules={[{ required: true, message: 'Please input event title!' }]}
          >
            <Input  style={{height: 48}}/>
          </Form.Item>

          <Form.Item
            label="Event Date"
            name="date"
            rules={[{ required: true, message: 'Please select event date!' }]}
          >
            <DatePicker  style={{height: 48, width: "100%"}}/>
          </Form.Item>

          <Form.Item
            label="Event Time"
            name="time"
            rules={[{ required: true, message: 'Please select event time!' }]}
          >
            <TimePicker format="h:mm A"  style={{height: 48, width: "100%"}}/>
          </Form.Item>

          <Form.Item
            label="Event Type"
            name="tag"
            rules={[{ required: true, message: 'Please select event type!' }]}
          >
            <Select style={{height: 48}}>
              <Option style={{height: 48}} value="Exam">Exam</Option>
              <Option style={{height: 48}} value="Discussion">Discussion</Option>
              <Option style={{height: 48}} value="Office Hours">Office Hours</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Tag Color"
            name="tagColor"
            rules={[{ required: true, message: 'Please select a tag color!' }]}
          >
            <Select style={{height: 48}}>
              <Option style={{height: 48}} value="red">Red</Option>
              <Option style={{height: 48}} value="blue">Blue</Option>
              <Option style={{height: 48}} value="green">Green</Option>
            </Select>
          </Form.Item>

          <Form.Item className='col-span-2' >
            <Button type="primary" size='large' style={{width: "100%", }} htmlType="submit">
              Add Event
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

// Main App component to demonstrate the usage
const UpcomingEvents = () => {
  return (
    <div className="bg-gray-50 p-2 rounded-sm">
      <UpcomingEvent />
    </div>
  );
};

export default UpcomingEvents;
