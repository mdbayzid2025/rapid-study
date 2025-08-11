import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input } from 'antd';

const SubjectEditModal = ({ show, onClose, subjectToEdit, setSubjects }: any) => {
  const [subjectName, setSubjectName] = useState('');
  const [teacherName, setTeacherName] = useState('');

  useEffect(() => {
    if (subjectToEdit) {
      setSubjectName(subjectToEdit.name);
      setTeacherName(subjectToEdit.teacher);
    }
  }, [subjectToEdit]);

  const handleSave = () => {
    const updatedSubject = { ...subjectToEdit, name: subjectName, teacher: teacherName };
    setSubjects((prevSubjects: any) =>
      prevSubjects.map((s: any) => (s.id === updatedSubject.id ? updatedSubject : s))
    );
    onClose(); // Close modal after editing
  };

  return (
    <Modal
      title="Edit Subject"
      visible={show}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Close
        </Button>,
        <Button key="submit" type="primary" onClick={handleSave}>
          Save Changes
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="Subject Name">
          <Input
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            placeholder="Enter subject name"
          />
        </Form.Item>

        <Form.Item label="Teacher Name">
          <Input
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            placeholder="Enter teacher name"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SubjectEditModal;
