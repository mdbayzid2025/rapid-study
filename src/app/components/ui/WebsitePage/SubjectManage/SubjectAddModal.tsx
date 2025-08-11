import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';

const SubjectAddModal = ({ show, onClose, setSubjects }:any) => {
  const [subjectName, setSubjectName] = useState('');
  const [teacherName, setTeacherName] = useState('');

  const handleAdd = () => {
    const newSubject = {
      id: Date.now(),
      name: subjectName,
      teacher: teacherName,
    };
    setSubjects((prevSubjects :any) => [...prevSubjects, newSubject]);
    onClose(); // Close modal after adding subject
  };

  return (
    <Modal
      title="Add New Subject"
      visible={show}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Close
        </Button>,
        <Button key="submit" type="primary" onClick={handleAdd}>
          Add Subject
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

export default SubjectAddModal;
