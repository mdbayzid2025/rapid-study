'use client'

// AddTeacherModal.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const AddTeacherModal = ({ onAdd }:any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");

  const handleSubmit = () => {
    const newTeacher = { id: Math.random().toString(), name, email, designation };
    onAdd(newTeacher);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add New Teacher</h2>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <Input value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="Designation" />
        <div className="flex gap-2">
          <Button onClick={handleSubmit}>Add Teacher</Button>
          <Button>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default AddTeacherModal;
