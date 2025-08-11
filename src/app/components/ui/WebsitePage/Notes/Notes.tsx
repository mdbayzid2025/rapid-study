'use client'

import { NoteCard } from "@/app/components/shared/Notes/NoteCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ConfigProvider, Input, Pagination, Select, Space } from "antd";
import { Edit, Plus, Trash } from "lucide-react";
import { IoSearchOutline } from "react-icons/io5";
import ChapterFilter from "./ChapterFilter";
import { useState } from "react";
import AddNoteModal from "./AddNoteModal";
import EditNoteModal from "./EditNoteModal";

const Notes = () => {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Study Notes Gallery</h1>
          <p className="text-muted-foreground">
            Browse through your collection of study notes and materials
          </p>
        </div>

        <Button onClick={()=>setIsAddDialogOpen(true)} className="gap-2 cursor-pointer">
          <Plus className="h-4 w-4" /> Add New Note
        </Button>
      </div>

      <div className="w-full flex md:flex-row  gap-5 flex-col justify-between mb-3 border p-3 rounded-md">
        <Input
          placeholder="Search notes by title, description or tags"
          prefix={<IoSearchOutline />}
          style={{ height: 48 }}
          className="w-full max-w-[500px] "
        />
        <ChapterFilter />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div key={note.id} className="relative bg-transparent">
            <div className="absolute bg-transparent w-full px-5 top-2 right-2 z-10 flex justify-between gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 bg-black/40 hover:bg-black/60 text-white"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 bg-black/40 hover:bg-black/60 text-white"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Note</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete &quot;{note.title}&quot;?
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <NoteCard
              title={note.title}
              description={note.description}
              createdAt={note.createdAt}
              attachments={note.attachments}
              priority={note.priority}              
              tags={note.tags}
            />
          </div>
        ))}
      </div>
      <ConfigProvider
          theme={{
            components: {
              Pagination: {
                itemActiveBg: "#002C66",
                borderRadius: 50,
                colorText: "#000"
              },
            },
            token: {
              colorPrimary: "white",
            },
          }}
        >
          <Pagination
          style={{paddingTop: 20}}
            align="center"            
            total={30}
            pageSize={10}
            showQuickJumper={false}
            showSizeChanger={false}            
          />          
        </ConfigProvider>
        <AddNoteModal isAddDialogOpen={isAddDialogOpen} setIsAddDialogOpen={setIsAddDialogOpen}/>
        <EditNoteModal isEditDialogOpen={isEditDialogOpen} setIsEditDialogOpen={setIsEditDialogOpen}/>
    </div>
  );
};

export default Notes;

const notes = [
  {
    id: "1",
    title: "Chapter 1: Introduction to Physics",
    description:
      "Hand-written notes covering the basics of physics including motion and forces.",
    createdAt: new Date(2023, 2, 15),
    priority: 5,
    isPrepared: false,
    subject: "Physics",
    chapter: "Chapter 1",
    tags: ["Important", "Examination",],
    attachments: [
      {
        url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
        type: "image",
        caption: "Physics diagram 1",
        fileName: "Test",
      },
      {
        url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
        type: "image",
        caption: "Physics diagram 2",
        fileName: "Test",
      },
      {
        url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        type: "image",
        caption: "Physics diagram 3",
        fileName: "Test",
      },
      {
        url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
        type: "image",
        caption: "Physics diagram 4",
        fileName: "Test",
      },
      {
        url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
        type: "image",
        caption: "Physics diagram 5",
        fileName: "Test",
      },
      {
        url: "https://example.com/physics-notes.pdf",
        type: "pdf",
        fileName: "Physics Chapter 1.pdf",
        caption: "Physics PDF Notes",
      },
    ],
  },
  {
    id: "2",
    title: "Chemistry Notes: Chemical Bonding",
    description: "Detailed notes on covalent and ionic bonding with examples.",
    createdAt: new Date(2023, 3, 10),
    priority: 4,
    isPrepared: true,
    subject: "Chemistry",
    chapter: "Chemical Bonding",
    tags: ["Important", "Bonding"],
    attachments: [
      {
        url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        type: "image",
        caption: "Chemical bonding diagram",
        fileName: "Chemical Bonding.pptx",
      },
      {
        url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
        type: "image",
        caption: "Atomic structure",
        fileName: "Chemical Bonding.pptx",
      },
      {
        url: "https://example.com/chemistry-presentation.pptx",
        type: "powerpoint",
        fileName: "Chemical Bonding.pptx",
        caption: "Bonding Presentation",
      },
    ],
  },
  {
    id: "3",
    title: "Mathematics: Differential Calculus",
    description:
      "Step-by-step solutions and explanations for differential calculus problems.",
    createdAt: new Date(2023, 4, 5),
    priority: 3,
    isPrepared: false,
    subject: "Mathematics",
    chapter: "Calculus",
    tags: ["Calculus", "Formulas"],
    attachments: [
      {
        url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
        type: "image",
        caption: "Calculus formula 1",
        fileName: "Chemical Bonding.pptx",
      },
      {
        url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
        type: "image",
        caption: "Calculus formula 2",
        fileName: "Chemical Bonding.pptx",
      },
      {
        url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
        type: "image",
        caption: "Calculus formula 3",
        fileName: "Chemical Bonding.pptx",
      },
      {
        url: "https://example.com/calculus-notes.docx",
        type: "word",
        fileName: "Differential Calculus.docx",
        caption: "Calculus Notes",
      },
    ],
  },
];
