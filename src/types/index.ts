export type Teacher = {
  _id: string; // MongoDB generated ID
  name: string;  
  designation?: string; // Teacher's role/designation (e.g., "Math Teacher")
  department?: string; // Department (e.g., "Math", "Science")
  email?: string;
  contact?: string; // Optional contact number
  photo?: string; // Optional photo URL
  remarks?: string; // Optional remarks about the teacher
  subjects: string[]; // Array of subjects the teacher teaches
  status: "Active" | "Inactive"; // Teacher's status  
  createdAt: string; // Timestamp when the teacher was created
  updatedAt: string; // Timestamp when the teacher's data was last updated
};


export interface ClassNote {
  id: string;
  title: string;
  date: string;
  instructor: string;
  content: string;
  tags: string[];
  attachments?: boolean;
  views?: number;
}

export interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  description: string;
}


export interface Assignment2 {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: 'Urgent' | 'Moderate' | 'Low';
  daysLeft: number;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'exam' | 'discussion' | 'office-hours' | 'assignment';
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface GalleryItem {
  id: string;
  title: string;
  type: 'image' | 'pdf' | 'video' | 'doc' | 'note';
  uploadedBy?: string;
  uploadedDate: string;
  size?: string;
  views?: number;
  category: 'all' | 'images' | 'notes' | 'videos' | 'assignments' | 'resources';
}


export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  grade: string;
  section: string;
  status: 'Active' | 'Inactive';
  enrollmentDate: string;
  avatar?: string;
}




export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Completed';
  subject?: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: 'Urgent' | 'Moderate' | 'Low';
  daysLeft: number;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  subject?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  type: 'info' | 'warning' | 'success';
}
