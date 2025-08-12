import { Assignment, Assignment2, Note, Notice, Student, Task } from "@/types";

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