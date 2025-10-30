// ClassCard.tsx

import React from "react";
import { BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

// Interface for Subject
interface Subject {
  id: string;
  name: string;
  classId: string;
}

// Interface for ClassData
interface ClassData {
  id: string;
  name: string;
  semester: string;
  subjects: string[];
}

// Function to generate dynamic gradient background based on the class or semester
const getGradientBackground = (className: string): string => {
  const gradients: { [key: string]: string } = {
    "CSE 3rd Year": "bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500",
    "CSE 4th Year": "bg-gradient-to-r from-green-400 via-green-500 to-teal-500",
    "CSE 2nd Year": "bg-gradient-to-r from-purple-400 via-purple-500 to-pink-500",
    "Semester 5": "bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500",
    "Semester 7": "bg-gradient-to-r from-teal-400 via-teal-500 to-blue-500",
    "Semester 3": "bg-gradient-to-r from-indigo-400 via-indigo-500 to-purple-500",
  };

  return gradients[className] || "bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600";
};

interface ClassCardProps {
  classData: ClassData;
  subjects: Subject[];
}

const ClassCard: React.FC<ClassCardProps> = ({ classData, subjects }) => {
  const gradientClass = getGradientBackground(classData.name || classData.semester);

  return (
    <div className={`w-full rounded-lg overflow-hidden transform transition-all hover:scale-105 ${gradientClass}`}>
      <Card className="h-full text-white bg-transparent py-0 gap-0">
        <CardHeader className="p-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold">{classData.name}</CardTitle>
            <div className="bg-white text-blue-500 p-2 rounded-full">
              <BookOpen size={20} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-10">
          <Link
            href={`/classes/${classData.id}`}
            className="inline-flex items-center text-white border border-white rounded-md px-4 hover:bg-white hover:text-blue-500 transition-all"
          >
            View Details
            <ArrowRight size={14} className="ml-2" />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassCard;
