"use client"
import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';
import SubjectAddModal from './SubjectAddModal';
import SubjectEditModal from './SubjectEditModal';

const SubjectList = () => {
  const [subjects, setSubjects] = useState([
    { id: 1, semesterNo: 2, name: 'Mathematics', teacher: 'John Doe' },
    { id: 2, semesterNo: 1, name: 'Physics', teacher: 'Jane Doe' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [subjectToEdit, setSubjectToEdit] = useState(null);

  const handleDelete = (id:any) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const handleEdit = (subject :any) => {
    setSubjectToEdit(subject);
    setShowEditModal(true);
  };

  const columns = [
    { title: 'Subject Name', dataIndex: 'name', key: 'name' },
    { title: 'Teacher', dataIndex: 'teacher', key: 'teacher' },
    { title: 'Semester No', dataIndex: 'semesterNo', key: 'semesterNo', render: (text:string)=>`${text} Semester` },
    {
      title: 'Actions',
      key: 'actions',
      render: (_:any, record :any) => (
        <span>
          <Button
            type="primary"
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button type="primary" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => setShowAddModal(true)} style={{ marginBottom: 16 }}>
        Add Subject
      </Button>

      <Table
        dataSource={subjects}
        columns={columns}
        rowKey="id"
      />

      <SubjectAddModal show={showAddModal} onClose={() => setShowAddModal(false)} setSubjects={setSubjects} />
      {subjectToEdit && (
        <SubjectEditModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          subjectToEdit={subjectToEdit}
          setSubjects={setSubjects}
        />
      )}
    </div>
  );
};

export default SubjectList;
