// SubjectCard.tsx

import React from "react";
import { BookOpen, ArrowRight } from "lucide-react";
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

const SubjectCard: React.FC<SubjectCardProps> = ({ subject }) => {
  return (
    <div className="w-full rounded-lg overflow-hidden transform transition-all hover:scale-105 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500">
      <Card className="h-full text-white bg-transparent py-0 gap-0">
        <CardHeader className="p-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold">{subject.name}</CardTitle>
            <div className="bg-white text-blue-500 p-2 rounded-full">
              <BookOpen size={20} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-10">
          <Link
            href={`/subjects/${subject.id}`}
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

export default SubjectCard;
