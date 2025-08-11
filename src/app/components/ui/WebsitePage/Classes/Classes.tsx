// Classes.tsx

import React from "react";
import { School } from "lucide-react";

import Container from "@/app/components/shared/Container/Container";
import SubjectCard from "./SubjectCard";

// Mock Classes and Subjects with Types

interface ClassData {
  id: string;
  name: string;
  description: string;
  semester: string;
  subjects: string[];
}

interface Subject {
  id: string;
  name: string;
  classId: string;
}

export const classes: ClassData[] = [
  {
    id: "c1",
    name: "CSE 3rd Year",
    description: "Computer Science Engineering Third Year",
    semester: "Semester 5",
    subjects: ["s1", "s2", "s3"],
  },
  {
    id: "c2",
    name: "CSE 4th Year",
    description: "Computer Science Engineering Fourth Year",
    semester: "Semester 7",
    subjects: ["s4", "s5", "s6"],
  },
  {
    id: "c3",
    name: "CSE 2nd Year",
    description: "Computer Science Engineering Second Year",
    semester: "Semester 3",
    subjects: ["s7", "s8", "s9"],
  },
];

export const subjects: Subject[] = [
  { id: "s1", name: "Data Structures and Algorithms", classId: "c1" },
  { id: "s2", name: "Operating Systems", classId: "c1" },
  { id: "s3", name: "Database Management Systems", classId: "c1" },
  { id: "s3", name: "Database Management Systems", classId: "c1" },
  { id: "s4", name: "Software Engineering", classId: "c2" },
  { id: "s4", name: "Software Engineering", classId: "c2" },
  { id: "s5", name: "Computer Networks", classId: "c2" },
  { id: "s5", name: "Computer Networks", classId: "c2" },
  { id: "s6", name: "Web Development 2", classId: "c2" },
  { id: "s6", name: "Web Development 2", classId: "c2" },
  { id: "s6", name: "Web Development 4", classId: "c2" },
  { id: "s7", name: "Algorithm Design", classId: "c3" },
  { id: "s7", name: "Algorithm Design", classId: "c3" },
  { id: "s7", name: "Algorithm Design", classId: "c3" },
  { id: "s8", name: "Software Testing", classId: "c3" },
  { id: "s9", name: "Database Systems", classId: "c3" },
  { id: "s9", name: "Database Systems", classId: "c3" },
  { id: "s9", name: "Database Systems", classId: "c3" },
  { id: "s9", name: "Database Systems", classId: "c3" },
];

const Classes: React.FC = () => {
  // Group classes by semester
  const groupedClasses = classes.reduce((acc, cls) => {
    if (!acc[cls.semester]) {
      acc[cls.semester] = [];
    }
    acc[cls.semester].push(cls);
    return acc;
  }, {} as Record<string, ClassData[]>);

  return (
    <Container>
      <div>
        <div className="flex items-center gap-6 my-8 p-4 bg-[url('https://images.all-free-download.com/images/graphiclarge/abstract_summer_floral_vector_illustration_148571.jpg')] bg-cover bg-no-repeat bg-bottom rounded-lg shadow-lg">
        {/* <div className="flex items-center gap-6 my-8 p-4 bg-[url('/header-bg.jpg')] bg-cover bg-no-repeat rounded-lg shadow-lg"> */}
          <div className="p-3 bg-white rounded-full shadow-md">
            <School className="h-8 w-8 text-indigo-600" />
          </div>
          <div className="text-black">
            <h1 className="text-3xl font-extrabold leading-tight">
              Classes & Subjects
            </h1>
            <p className="text-xl text-purple-700 font-bold mt-2">
              Explore and browse through available subjects grouped by semester.
            </p>
          </div>
        </div>

        <div>
          {Object.keys(groupedClasses).map((semester) => (
            <div key={semester} className="mb-8">
              <div className="grid gap-6">
                {groupedClasses[semester].map((cls) => {
                  const classSubjects = subjects.filter(
                    (s) => s.classId === cls.id
                  );
                  return (
                    <div key={cls.id}>
                      <h3 className="font-semibold text-lg">{cls.name}</h3>
                      <div className="mt-4 grid md:grid-cols-4 grid-cols-2 gap-5">
                        {classSubjects.map((subject) => (
                          <SubjectCard key={subject.id} subject={subject} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Classes;
