// Classes.tsx
"use client";
import React from "react";
import { School } from "lucide-react";

import Container from "@/components/shared/Container/Container";
import SubjectCard from "./SubjectCard";
import { useGetSemesterQuery} from "@/store/api/subjectApi";
import { PageLoader } from "@/components/shared/Loader/PageLoader";

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
  const {
    data: semesterData,
    isLoading,
    isError
  } = useGetSemesterQuery({});
  
  // Group classes by semester
  const groupedClasses = classes.reduce((acc, cls) => {
    if (!acc[cls.semester]) {
      acc[cls.semester] = [];
    }
    acc[cls.semester].push(cls);
    return acc;
  }, {} as Record<string, ClassData[]>);

  if (semesterData) {
    console.log("semesterData", semesterData);
  }
  return (
    <Container>
      <div>
        <div className="flex border items-center justify-center gap-6 my-8 p-4  bg-bottom rounded-lg gradient-to-r from-indigo-50 via-white to-purple-50 ">
          {/* <div className="flex items-center gap-6 my-8 p-4 bg-[url('/header-bg.jpg')] bg-cover bg-no-repeat rounded-lg shadow-lg"> */}
          <div className="p-2 border bg-white rounded-full shadow-md">
            <School size={24} className=" text-indigo-600" />
          </div>
          <div className="">
            <h1 className="text-3xl  leading-tight">Classes</h1>
          </div>
        </div>

        <div>
          {isLoading ? <PageLoader /> : isError ? (
        <div className="flex justify-center items-center w-full h-full text-red-500">
          <p>There was an error loading the notes. Please try again.</p>
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center w-full h-full text-red-500">
          <p>There was an error loading the notes. Please try again.</p>
        </div>
      ) : (
        semesterData && semesterData.map((semester: any) => (
          <div key={semester?._id} className="mb-8">
            <div className="grid gap-6">
              <div>
                <h3 className="font-semibold text-lg">{semester.title}</h3>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-5 gap-y-4">
                    {semester?.subjects?.map((subject: any) => (
                      <SubjectCard key={subject._id} subject={subject} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )))}
        </div>
      </div>
    </Container>
  );
};

export default Classes;
