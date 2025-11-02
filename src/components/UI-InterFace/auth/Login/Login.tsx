"use client";
import { useLoginMutation, useSignupMutation } from "@/store/api/authApi";
import {
  LockOutlined,
  MailOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function AuthPage() {
  const [login] = useLoginMutation();
  const [signup] = useSignupMutation();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter()


  const handleSubmit = async (values: {
    name?: string;
    email: string;
    password: string;
  }) => {
    try {
      if (isLogin) {
        const res: any = await login(values).unwrap();
        console.log("res:any", res);
        Cookie.set("accessToken", res?.data?.accessToken);
      } else {
        const res: any = await signup(values).unwrap();
        console.log("res:any", res);
        setIsLogin(true)
      }
      router.push('/')
      toast.success('Login Successfull')
    } catch (error: any) {
      console.log("error", error);
      toast.error(error?.data?.errorMessages[0]?.message)
    }
    // console.log(isLogin ? "Login Data:" : "Signup Data:", values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden md:p-0 p-4">
      {/* Background */}
      <div className="absolute w-full h-full inset-0 opacity-10 bg-[url('https://img.freepik.com/free-vector/education-pattern-background-doodle-style_53876-115365.jpg?t=st=1756877977~exp=1756881577~hmac=5f2d2c80363a05f9be19e7935cd4ae545bdbd896d41a4cbcccb3e7526f18f7db&w=1480')] bg-center bg-cover bg-no-repeat"></div>

      {/* Main Card */}
      <div className="relative bg-white flex gap-8 p-8 pb-10 rounded-2xl w-full !h-full max-w-5xl shadow-xl z-10 ">
        {/* Left Image (Constant) */}
        <div className="w-1/2 hidden md:block">
          <img
            className="w-full h-full object-cover"
            src="/login icon.png"
            alt="auth"
          />
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 relative">
          {/* Container with transition */}
          <div className="relative">
            {/* LOGIN */}
            <div
              className={`absolute top-0 left-0 w-full h-full   transition-all duration-500 ease-in-out ${
                isLogin
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10 pointer-events-none"
              }`}
            >
              <div className="flex justify-center w-14 mx-auto border p-2 mb-2 ">
                <img
                  src="/Prime_University.png"
                  className="w-12 object-cover"
                  alt=""
                />
              </div>
              <h1 className="text-center text-2xl font-bold mb-1">
                Login to Your Account
              </h1>
              <p className="text-center text-gray-500 mb-6">
                Welcome back! Please sign in to continue
              </p>

              <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[{ required: true }]}
                >
                  <Input
                    size="large"
                    prefix={<MailOutlined />}
                    style={{ height: 48 }}
                    placeholder="Enter your email"
                  />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true }]}
                >
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
                  Login
                </Button>
              </Form>

              <p className="text-center text-gray-600 mt-4">
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="cursor-pointer text-blue-600 hover:underline font-semibold"
                >
                  Sign Up
                </button>
              </p>
            </div>

            {/* SIGNUP */}
            <div
              className={`md:absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out ${
                isLogin
                  ? "opacity-0 -translate-x-10 pointer-events-none"
                  : "opacity-100 translate-x-0"
              }`}
            >
              <div className="flex justify-center w-14 mx-auto border p-2 mb-2 ">
                <img
                  src="/Prime_University.png"
                  className="w-12 object-cover"
                  alt=""
                />
              </div>

              <h1 className="text-center text-xl font-bold mb-1">
                Create an Account
              </h1>
              <p className="text-center text-sm text-gray-500 mb-3">
                Join the Student Class Management System
              </p>
              <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                  className="!mb-2"
                  label="Full Name"
                  name="name"
                  rules={[{ required: true }]}
                >
                  <Input
                    size="large"
                    prefix={<UserOutlined />}
                    style={{ height: 48 }}
                    placeholder="Enter your full name"
                  />
                </Form.Item>
                <Form.Item
                  className="!mb-2"
                  label="Email Address"
                  name="email"
                  rules={[{ required: true }]}
                >
                  <Input
                    size="large"
                    prefix={<MailOutlined />}
                    style={{ height: 48 }}
                    placeholder="Enter your email"
                  />
                </Form.Item>
                <Form.Item
                  className="!mb-2"
                  label="Password"
                  name="password"
                  rules={[{ required: true }]}
                >
                  <Input.Password
                    size="large"
                    prefix={<LockOutlined />}
                    style={{ height: 48 }}
                    placeholder="Enter your password"
                  />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg mt-3"
                >
                  Sign Up
                </Button>
              </Form>

              <p className="text-center text-gray-600 mt-4">
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="cursor-pointer text-blue-600 hover:underline font-semibold"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
