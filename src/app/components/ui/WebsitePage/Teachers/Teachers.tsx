"use client";

import { useGetTeachersQuery } from "@/store/api/teacherApi";
import React, { useState, useMemo } from "react";
import {
  Card,
  List,
  Typography,
  Space,
  Avatar,
  Divider,
  Input,
  Button,
  Table,
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  AppstoreOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { FaRegCommentDots } from "react-icons/fa6";
import { LucideUserPen } from "lucide-react";

const { Title, Text } = Typography;
const { Search } = Input;

const Teachers = () => {
  const {
    data: teachersData,
    isLoading,
  } = useGetTeachersQuery(undefined);

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // 🔍 Filter teachers by name or email
  const filteredTeachers = useMemo(() => {
    if (!teachersData) return [];
    return teachersData.filter(
      (teacher: any) =>
        teacher?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [teachersData, searchTerm]);

  // 📋 Table columns for list view
  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (photo: string, record: any) => (
        <Avatar src={photo ?? "/placeholder.png"} icon={<UserOutlined />} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => <span className="font-semibold">{name}</span>,
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      render: (text :any, record:any) =><span className="capitalize">{text} ({record?.department})</span>
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
    },
  ];

  return (
    <div>
      <div className="my-8">
        {/* Header */}
        <div className=" gap-4 my-8 flex justify-center p-4 bg-[url('https://img.freepik.com/premium-vector/blue-purple-white-abstract-line-background-with-gradient-color-backdrop-presentation_1110513-3386.jpg')] bg-cover bg-no-repeat bg-bottom">
          <div className="flex items-center gap-3">
            <LucideUserPen className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-semibold leading-tight">Teachers</h1>
          </div>
        </div>

        {/* Search + View Toggle */}
        <div className="flex items-center justify-between gap-3">
          <Search
            size="large"
            placeholder="Search teachers..."
            allowClear
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 300, height: 48 }}
          />
          <div className="flex items-center gap-5">
            <Button
              type={viewMode === "grid" ? "primary" : "default"}
              icon={<AppstoreOutlined />}
              onClick={() => setViewMode("grid")}
            />
            <Button
              type={viewMode === "list" ? "primary" : "default"}
              icon={<BarsOutlined />}
              onClick={() => setViewMode("list")}
            />
          </div>
        </div>

        {/* Loading */}
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : viewMode === "grid" ? (
          // 🟦 GRID VIEW
          <List
            grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
            dataSource={filteredTeachers}
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
                      <Text className="text-gray-500">{teacher?.designation} ({teacher?.department})</Text>
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
        ) : (
          // 📋 TABLE VIEW
          <Table
            columns={columns}
            dataSource={filteredTeachers}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
          />
        )}
      </div>
    </div>
  );
};

export default Teachers;
