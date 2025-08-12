// app/login/page.jsx (Next.js 13+ App Router)
// or pages/login.jsx if using Pages Router

"use client"; // Only if in App Router
import { useState } from "react";
import { Button, Input, Radio, Form, Checkbox } from "antd";
import { UserOutlined, LockOutlined, BookOutlined, TeamOutlined } from "@ant-design/icons";

export default function LoginPage() {
  const [role, setRole] = useState("student");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fbfd]">
      <div className="bg-white p-8 rounded-xl w-full max-w-md shadow-sm">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-4 rounded-full">
            <BookOutlined className="text-blue-600 text-3xl" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center text-2xl font-bold mb-1">Login to Your Account</h1>
        <p className="text-center text-gray-500 mb-6">
          Welcome back! Please sign in to continue
        </p>

        {/* Role Selection */}
        <p className="mb-2 font-medium text-gray-700">Select Your Role</p>
        <div className="flex gap-3 mb-5">
          <Button
            block
            size="large"
            className={`!h-[80px] flex flex-col items-center py-4 ${
              role === "student" ? "border-blue-500 bg-blue-50" : ""
            }`}
            icon={<BookOutlined className="text-xl" />}
            onClick={() => setRole("student")}
          >
            Student
          </Button>
          <Button
            block
            size="large"
            className={`!h-[80px] flex flex-col items-center py-4 ${
              role === "teacher" ? "border-blue-500 bg-blue-50" : ""
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
              style={{height: 48}}
              placeholder="Enter your email"
            />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              style={{height: 48}}
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
            className="bg-gradient-to-r from-blue-500 to-indigo-500"
          >
            Login / Sign Up
          </Button>
        </Form>

        {/* Links */}
        {/* <div className="mt-4 text-center">
          <a className="text-blue-500" href="#">Forgot your password?</a>
        </div>
        <div className="mt-2 text-center text-gray-600">
          Don’t have an account?{" "}
          <a className="text-blue-500" href="#">Sign up</a>
        </div> */}
      </div>
    </div>
  );
}
