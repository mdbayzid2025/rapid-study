// UpdateTeacherModal.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const UpdateTeacherModal = ({ teacher, onUpdate } :any) => {
  const [name, setName] = useState(teacher.name);
  const [email, setEmail] = useState(teacher.email);
  const [designation, setDesignation] = useState(teacher.designation);

  const handleSubmit = () => {
    const updatedTeacher = { ...teacher, name, email, designation };
    onUpdate(updatedTeacher);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Update Teacher</h2>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <Input value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="Designation" />
        <div className="flex gap-2">
          <Button onClick={handleSubmit}>Update Teacher</Button>
          <Button>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTeacherModal;
