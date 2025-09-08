import React from "react";
import { BookOpen } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

// Interface for Subject
interface Subject {
  id: string;
  name: string;
  classId: string;
}

interface SubjectCardProps {
  subject: Subject;
}

const SubjectCard: React.FC<any> = ({ subject }) => {
  console.log("asdfasd", subject);
  
  // Static Teacher Data
  const teacher = {
    name: "John Doe",
    designation: "Professor of Mathematics",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg", // Static avatar URL
  };

  return (
    <Link href={`/classes/${subject._id}`} className="w-full rounded-lg overflow-hidden transform transition-all hover:scale-105 shadow-lg">
      {/* Sky Gradient Background */}
      <Card className="h-full bg-gradient-to-r from-blue-400/20 via-indigo-500/15 to-purple-600/10 text-white border border-transparent gap-0 rounded-lg p-0">
        <CardHeader className="p-4 h-18">
          <div className="flex justify-between items-center">
            <CardTitle className="text-[15px] font-bold text-purple-800">{subject?.name}</CardTitle>
            <div className="bg-white text-indigo-600 p-1 rounded-full">
              <BookOpen size={15} />
            </div>
          </div>
        </CardHeader>

        {/* Card Content */}
        <CardContent className="flex flex-col px-4 pb-4">
          <div className="flex items-center space-x-4">
            <img
              src={subject?.teacher.photo ?? "/placeholder.png"}
              alt={teacher.name}
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">{subject?.teacher.name}</span>
              <span className="text-xs text-gray-700">{subject?.teacher.designation}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SubjectCard;
