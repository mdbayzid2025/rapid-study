'use client';

import React from 'react';
import { Card, Avatar, Tag, Typography } from 'antd';

const { Title, Text } = Typography;

const CourseCard = ({ course }:any) => {
  // Use a placeholder image for the avatar
  const avatarUrl = "https://placehold.co/100x100/A1C4FD/ffffff?text=SJ";

  return (
    // The Ant Design Card component is wrapped with Tailwind for styling the container
    <Card
      bordered={false}
      className="w-full mx-auto my-8 rounded-lg bg-white"
    >
      {/* Header section with flex layout for alignment */}
      <div className="flex justify-between items-start mb-4">
        {/* Left side: Avatar and Text content */}
        <div className="flex items-center space-x-4 gap-5">
          <Avatar size={64} src={avatarUrl} />
          <div>
            {/* Title for the course name */}
            <Title level={4} className="!my-0 !text-xl">
              {course.title}
            </Title>
            {/* Subtitle for the instructor name */}
            <Text type="secondary" className="!text-base">
              {course.instructor}
            </Text>
          </div>
        </div>

        {/* Right side: Class times with text-right alignment */}
        <div className="text-right">
          <Text type="secondary" strong>Class Times</Text>
          <p className="font-semibold text-base !mb-0">
            {course.classDays}
          </p>
          <Text type="secondary">
            {course.classTime}
          </Text>
        </div>
      </div>

      {/* Tags section for course code and semester */}
      <div className="flex items-center space-x-2 my-4">
        <Tag color="geekblue" className="rounded-full px-3 py-1">
          {course.courseCode}
        </Tag>
        <Tag color="blue" className="rounded-full px-3 py-1">
          {course.semester}
        </Tag>
      </div>

      {/* Description section */}
      <div className="mt-4">
        <Text>{course.description}</Text>
      </div>
    </Card>
  );
};

// Main App component to demonstrate the usage of the CourseCard
const ClassHeader = () => {
  const sampleCourse = {
    title: "Advanced Computer Science",
    instructor: "Dr. Sarah Johnson",
    courseCode: "CS-401",
    semester: "Fall 2024",
    classDays: "Mon, Wed, Fri",
    classTime: "10:00 AM - 11:30 AM",
    description: "This course covers advanced topics in computer science including algorithms, data structures, machine learning fundamentals, and software engineering principles.",
  };

  return (
    <div className="mb-10">
      <CourseCard course={sampleCourse} />
    </div>
  );
};

export default ClassHeader;
