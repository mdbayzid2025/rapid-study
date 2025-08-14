import { Assignment, Assignment2, Note, Notice, Student, Task, Teacher } from "@/types";

export const classNotesData: any[] = [
  {
    id: '1',
    title: 'Algorithm Analysis & Big O Notation',
    date: 'Oct 15, 2024',
    instructor: 'Dr. Sarah Johnson',
    content: 'Comprehensive overview of algorithm complexity analysis including time and space complexity...',
    tags: ['algorithms', 'complexity', 'big-o'],
    attachments: true,
    views: 24
  },
  {
    id: '2',
    title: 'Data Structures: Trees & Graphs',
    date: 'Oct 12, 2024',
    instructor: 'Dr. Sarah Johnson',
    content: 'Detailed explanation of binary trees, AVL trees, and graph traversal algorithms...',
    tags: ['data-structures', 'trees', 'graphs'],
    attachments: false,
    views: 18
  },
  {
    id: '3',
    title: 'Machine Learning Fundamentals',
    date: 'Oct 08, 2024',
    instructor: 'Dr. Sarah Johnson',
    content: 'Introduction to supervised and unsupervised learning algorithms...',
    tags: ['machine-learning', 'algorithms', 'ai'],
    attachments: true,
    views: 32
  }
];

export const assignments: any[] = [
  {
    id: '1',
    title: 'Programming Assignment 3',
    dueDate: 'Oct 25, 2024 at 11:59 PM',
    status: 'pending',
    description: 'Implement a binary search tree with insertion, deletion, and traversal methods'
  },
  {
    id: '2',
    title: 'Midterm Exam Preparation',
    dueDate: 'Oct 30, 2024',
    status: 'completed',
    description: 'Review chapters 1-8 and complete practice problems'
  }
];



export const upcomingEventsData: any[] = [
  {
    id: '1',
    title: 'Midterm Exam',
    date: 'Oct 30, 2024',
    time: '10:00 AM',
    type: 'exam'
  },
  {
    id: '2',
    title: 'Group Discussion',
    date: 'Oct 22, 2024',
    time: '10:00 AM',
    type: 'discussion'
  },
  {
    id: '3',
    title: 'Office Hours',
    date: 'Oct 20, 2024',
    time: '2:00 PM',
    type: 'office-hours'
  }
];

export const todoItems: any[] = [
  {
    id: '1',
    text: 'Study for midterm exam',
    completed: false,
    priority: 'high'
  },
  {
    id: '2',
    text: 'Submit Assignment 2',
    completed: true,
    priority: 'medium'
  },
  {
    id: '3',
    text: 'Read Chapter 9',
    completed: false,
    priority: 'medium'
  }
];

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    email: 'emma.johnson@email.com',
    studentId: 'STU001',
    grade: 'Grade 10',
    section: 'Section A',
    status: 'Active',
    enrollmentDate: '2023-09-01',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    studentId: 'STU002',
    grade: 'Grade 11',
    section: 'Section B',
    status: 'Active',
    enrollmentDate: '2023-08-28',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Sarah Williams',
    email: 'sarah.williams@email.com',
    studentId: 'STU003',
    grade: 'Grade 9',
    section: 'Section A',
    status: 'Inactive',
    enrollmentDate: '2023-09-05',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david.brown@email.com',
    studentId: 'STU004',
    grade: 'Grade 12',
    section: 'Section C',
    status: 'Active',
    enrollmentDate: '2023-08-15',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@email.com',
    studentId: 'STU005',
    grade: 'Grade 10',
    section: 'Section B',
    status: 'Active',
    enrollmentDate: '2023-09-12',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face'
  }
];


export const galleryItems: any[] = [
  {
    id: '1',
    title: 'Linear Algebra Notes',
    type: 'image',
    uploadedBy: 'Prof. Johnson',
    uploadedDate: '2 days ago',
    views: 24,
    category: 'notes'
  },
  {
    id: '2',
    title: 'Assignment 3 - Calculus',
    type: 'pdf',
    uploadedDate: 'March 15, 2024',
    size: '1.2 MB',
    category: 'assignments'
  },
  {
    id: '3',
    title: 'Study Group Session',
    type: 'image',
    uploadedDate: '5 days ago',
    category: 'images'
  },
  {
    id: '4',
    title: 'Lecture 12: Derivatives',
    type: 'video',
    uploadedDate: '1 week ago',
    category: 'videos'
  },
  {
    id: '5',
    title: 'Research Paper Guidelines',
    type: 'doc',
    uploadedDate: '856 KB',
    category: 'resources'
  },
  {
    id: '6',
    title: 'Lab Experiment Results',
    type: 'image',
    uploadedDate: '3 days ago',
    category: 'images'
  }
];


export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete Math Assignment Chapter 5',
    description: 'Solve problems 1-15 from textbook',
    dueDate: 'Tomorrow',
    priority: 'High',
    status: 'Pending',
    subject: 'Mathematics'
  },
  {
    id: '2',
    title: 'Review Science Notes',
    description: 'Go through chemistry formulas',
    dueDate: 'Friday',
    priority: 'Medium',
    status: 'Pending',
    subject: 'Science'
  },
  {
    id: '3',
    title: 'Submit History Essay',
    description: 'Essay on World War II',
    dueDate: 'Completed',
    priority: 'High',
    status: 'Completed',
    subject: 'History'
  }
];

export const mockAssignments: Assignment2[] = [
  {
    id: '1',
    title: 'Physics Lab Report',
    subject: 'Physics',
    dueDate: 'Dec 15, 2024',
    priority: 'Urgent',
    daysLeft: 3
  },
  {
    id: '2',
    title: 'English Literature Analysis',
    subject: 'English',
    dueDate: 'Dec 20, 2024',
    priority: 'Moderate',
    daysLeft: 8
  }
];

export const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Chemistry Formula Review',
    content: 'Important formulas for upcoming exam',
    createdAt: '2 hours ago',
    subject: 'Chemistry'
  },
  {
    id: '2',
    title: 'Math Problem Solutions',
    content: 'Step-by-step solutions for complex problems',
    createdAt: 'Yesterday',
    subject: 'Mathematics'
  },
  {
    id: '3',
    title: 'History Timeline Notes',
    content: 'Key dates and events timeline',
    createdAt: '2 days ago',
    subject: 'History'
  }
];

export const mockNotices: Notice[] = [
  {
    id: '1',
    title: 'Exam Schedule Updated',
    content: 'Final exam schedules have been updated',
    createdAt: '3 hours ago',
    type: 'info'
  },
  {
    id: '2',
    title: 'New Assignment Posted',
    content: 'Chemistry lab assignment is now available',
    createdAt: '1 day ago',
    type: 'success'
  }
];

export const mockTeachers: Teacher[] = [
  {
    _id: "1",
    name: "John Doe",
    teacherId: "T001",
    designation: "Math Teacher",
    department: "Mathematics",
    email: "johndoe@example.com",
    contact: "+1 555-1234",
    photo: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face",
    remarks: "Highly experienced in Algebra and Calculus",
    subjects: ["Algebra", "Calculus", "Trigonometry"],
    status: "Active",
    hireDate: "2020-08-15",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "2",
    name: "Jane Smith",
    teacherId: "T002",
    designation: "Science Teacher",
    department: "Science",
    email: "janesmith@example.com",
    contact: "+1 555-5678",
    photo: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face",
    remarks: "Specializes in Biology and Chemistry",
    subjects: ["Biology", "Chemistry"],
    status: "Inactive",
    hireDate: "2018-04-10",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "3",
    name: "Emily Johnson",
    teacherId: "T003",
    designation: "English Teacher",
    department: "Languages",
    email: "emilyjohnson@example.com",
    contact: "+1 555-8765",
    photo: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face",
    remarks: "Passionate about literature and creative writing",
    subjects: ["English Literature", "Creative Writing", "Grammar"],
    status: "Active",
    hireDate: "2019-02-25",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "4",
    name: "Michael Brown",
    teacherId: "T004",
    designation: "History Teacher",
    department: "Humanities",
    email: "michaelbrown@example.com",
    contact: "+1 555-3344",
    photo: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face",
    remarks: "Expert in World History and Social Studies",
    subjects: ["World History", "Social Studies"],
    status: "Active",
    hireDate: "2021-06-30",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "5",
    name: "Sarah Wilson",
    teacherId: "T005",
    designation: "Chemistry Teacher",
    department: "Science",
    email: "sarahwilson@example.com",
    contact: "+1 555-9988",
    photo: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face",
    remarks: "Focuses on Organic Chemistry and Laboratory Safety",
    subjects: ["Organic Chemistry", "Laboratory Safety"],
    status: "Inactive",
    hireDate: "2017-08-10",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "6",
    name: "David Lee",
    teacherId: "T006",
    designation: "Physics Teacher",
    department: "Science",
    email: "davidlee@example.com",
    contact: "+1 555-1122",
    photo: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face",
    remarks: "Loves teaching Physics and Astronomical Science",
    subjects: ["Physics", "Astronomy"],
    status: "Active",
    hireDate: "2022-01-12",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];


