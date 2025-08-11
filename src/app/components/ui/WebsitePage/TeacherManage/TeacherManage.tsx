'use client'
// ManageTeachers.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";


import AddTeacherModal from "./AddTeacherModal";
import UpdateTeacherModal from "./UpdateTeacherModal";
import TeachersList from "./TeacherList";
import Container from "@/app/components/shared/Container/Container";


const TeacherManage = () => {
  const [teachers, setTeachers] = useState<any[]>([
    { id: "1", name: "John Doe", email: "john.doe@example.com", designation: "Math Teacher" },
    { id: "2", name: "Jane Smith", email: "jane.smith@example.com", designation: "Science Teacher" }
  ]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [teacherToUpdate, setTeacherToUpdate] = useState<any | null>(null);

  const handleAddTeacher = (newTeacher: any) => {
    setTeachers((prev) => [...prev, newTeacher]);
    alert("Teacher added successfully!");
  };

  const handleUpdateTeacher = (updatedTeacher: any) => {
    setTeachers((prev) => prev.map((teacher) => (teacher.id === updatedTeacher.id ? updatedTeacher : teacher)));
    alert("Teacher updated successfully!");
  };

  const handleDeleteTeacher = (teacherId: string) => {
    setTeachers((prev) => prev.filter((teacher) => teacher.id !== teacherId));
    alert("Teacher removed successfully!");
  };

  return (
    <Container>
      <div className="flex justify-between mb-4">
        <Button onClick={() => setIsAddModalOpen(true)}>Add Teacher</Button>
      </div>
      <TeachersList 
        teachers={teachers} 
        onDelete={handleDeleteTeacher} 
        onUpdate={setTeacherToUpdate} 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
      />
      {isAddModalOpen && <AddTeacherModal onAdd={handleAddTeacher} />}
      {teacherToUpdate && <UpdateTeacherModal teacher={teacherToUpdate} onUpdate={handleUpdateTeacher} />}
    </Container>
  );
};

export default TeacherManage;
