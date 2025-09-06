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
import { useGetNotesQuery } from "@/store/api/noteApi";

const Notes = () => {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const {data:notesData, isLoading} = useGetNotesQuery(null);

  console.log("notesData", notesData)
  if(isLoading)<p>Loading....</p>
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
        {/* <ChapterFilter /> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notesData?.map((note: any) => (
          <div key={note._id} className="relative bg-transparent">
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
              title={note?.title}
              subject={note?.subject?.name}
              description={note?.description}
              createdAt={note?.createdAt}
              images={note?.images}
              priority={note?.priority}
              tags={note?.tags}
              documents={note?.documents}
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
