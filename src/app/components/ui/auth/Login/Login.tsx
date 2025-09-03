"use client";
import { useState } from "react";
import { Button, Input, Form, Checkbox } from "antd";
import {
  UserOutlined,
  LockOutlined,
  BookOutlined,
  TeamOutlined,
} from "@ant-design/icons";

export default function LoginPage() {
  const [role, setRole] = useState("student");

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute w-full h-full inset-0 opacity-10 bg-[url('https://img.freepik.com/free-vector/education-pattern-background-doodle-style_53876-115365.jpg?t=st=1756877977~exp=1756881577~hmac=5f2d2c80363a05f9be19e7935cd4ae545bdbd896d41a4cbcccb3e7526f18f7db&w=1480')] bg-center bg-cover bg-no-repeat"></div>

      {/* Main Card */}
      <div className="relative bg-white p-8 rounded-2xl w-full max-w-md shadow-xl z-10">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-4 rounded-full shadow-sm">
            <BookOutlined className="text-blue-600 text-3xl" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center text-2xl font-bold mb-1">
          Login to Your Account
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Welcome back! Please sign in to continue
        </p>

        {/* Role Selection */}
        <p className="mb-2 font-medium text-gray-700">Select Your Role</p>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button
            block
            size="large"
            className={`!h-[80px] flex flex-col items-center justify-center py-4 rounded-xl ${
              role === "student" ? "border-blue-500 bg-blue-50 shadow-md" : ""
            }`}
            icon={<BookOutlined className="text-xl" />}
            onClick={() => setRole("student")}
          >
            Student
          </Button>
          <Button
            block
            size="large"
            className={`!h-[80px] flex flex-col items-center justify-center py-4 rounded-xl ${
              role === "teacher" ? "border-blue-500 bg-blue-50 shadow-md" : ""
            }`}
            icon={<TeamOutlined className="text-xl" />}
            onClick={() => setRole("teacher")}
          >
            Teacher
          </Button>
        </div>

        {/* Form */}
        <Form layout="vertical">
          <Form.Item label="Email Address" name="email">
            <Input
              size="large"
              prefix={<UserOutlined />}
              style={{ height: 48 }}
              placeholder="Enter your email"
            />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              style={{ height: 48 }}
              placeholder="Enter your password"
            />
          </Form.Item>

          <div className="flex justify-between items-center mb-6">
            <Checkbox>Remember me</Checkbox>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg"
          >
            Login / Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
}
