"use client"
import React, { useState } from "react";
import { Button, Input, Table } from "antd";
import { Edit, Trash2 } from "lucide-react";
import DeleteConfirmationDialog from "../../DeleteConfirmationDialog";
import { useGetTeachersQuery } from "@/store/api/teacherApi";

const TeachersList = ({ teachers, onDelete, onUpdate, viewMode, setViewMode }: any) => {
  const [searchTerm, setSearchTerm] = useState("");

  const {data, isLoading, refetch} = useGetTeachersQuery(undefined);

  // Filter teachers based on search term
  const filteredTeachers = teachers.filter((teacher: any) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Columns definition for Antd Table
  const columns = [
    {
      title: 'Teacher',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, teacher: any) => (
        <div className="flex gap-2">
          {/* Edit Button (use TeacherDialog or similar if needed) */}
          {/* <TeacherDialog 
            teacher={teacher} 
            isEdit={true} 
            onSuccess={onUpdate}
            trigger={<Button variant="outline" size="sm"><Edit size={16} /></Button>}
          /> */}
          
          {/* Delete Button */}
          <DeleteConfirmationDialog
            title="Delete Teacher"
            description="Are you sure you want to delete this teacher?"
            onDelete={() => onDelete(teacher.id)}
            trigger={<Button type="primary" size="middle"><Trash2 size={16} /></Button>}
          />
        </div>
      ),
    },
  ];

  if(isLoading){
    return <p>Loading</p>
  }
  if(data){
    console.log("teacher", data);
  }
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6 ">
        <div className="flex-1">
          <Input
            id="search"
            placeholder="Search by name, email, or designation..."
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
            className="bg-white dark:bg-gray-800"
          />
        </div>
        <div className="md:self-end flex gap-2">
          <Button
            type="primary"
            className={viewMode === "grid" ? "bg-accent" : ""}
            onClick={() => setViewMode("grid")}
          >
            Grid
          </Button>
          <Button
           type="primary"
            className={viewMode === "list" ? "bg-accent" : ""}
            onClick={() => setViewMode("list")}
          >
            List
          </Button>
        </div>
      </div>

      {/* Ant Design Table */}
      <Table
        columns={columns}
        dataSource={filteredTeachers}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
};

export default TeachersList;
