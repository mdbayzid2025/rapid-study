"use client";

import { useGetTeachersQuery } from "@/store/api/teacherApi";
import React from "react";
import { Card, List, Typography, Space, Avatar, Divider } from "antd";
import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { FaRegCommentDots } from "react-icons/fa6";
import { LucideUserPen } from "lucide-react";

const { Title, Text } = Typography;

const Teachers = () => {
  const {
    data: teachersData,
    isLoading,
    refetch,
  } = useGetTeachersQuery(undefined);

  return (
    <div>
      <div className="my-8">
        <div className="flex items-center justify-center gap-6 my-8 p-4 bg-[url('https://img.freepik.com/premium-vector/blue-purple-white-abstract-line-background-with-gradient-color-backdrop-presentation_1110513-3386.jpg')] bg-cover bg-no-repeat bg-bottom ">
          <LucideUserPen className="h-8 w-8 text-indigo-600" />

          <h1 className="text-3xl font-semibold leading-tight">Teachers</h1>
        </div>
        <List
          grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
          dataSource={teachersData?.data}
          renderItem={(teacher: any) => (
            <List.Item>
              <Card
                className="rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
                bordered={false}
              >
                <div className="flex items-center space-x-4 mb-4 gap-3">
                  <Avatar
                    size={64}
                    src={teacher?.photo ?? "/placeholder.png"}
                    alt={teacher?.name}
                    className="flex-shrink-0"
                  />
                  <div>
                    <Title level={4} className="!my-0 text-xl font-semibold">
                      {teacher?.name}
                    </Title>
                    <Text className="text-gray-500">{teacher?.role}</Text>
                  </div>
                </div>

                <Divider className="!my-2" />

                <Space direction="vertical" size="small" className="w-full">
                  <div className="flex items-center space-x-2">
                    <MailOutlined className="text-gray-500" />
                    <Text>{teacher?.email}</Text>
                  </div>
                  <Divider className="!my-2" />

                  <div className="flex items-center space-x-2">
                    <PhoneOutlined className="text-gray-500" />
                    <Text>{teacher?.contact}</Text>
                  </div>
                </Space>

                <Divider className="!my-2" />

                <div className="flex items-center space-x-2">
                  <FaRegCommentDots className="text-gray-500" />
                  <Text>{teacher?.remarks}</Text>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Teachers;
