"use client";

import { NoteCard } from "@/components/shared/Notes/NoteCard";
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
import { useDeleteNoteMutation, useGetNotesQuery } from "@/store/api/noteApi";
import { ConfigProvider, Input, Pagination } from "antd";
import { Edit, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import AddNoteModal from "./AddNoteModal";
import EditNoteModal from "./EditNoteModal";
import { PageLoader } from "@/components/shared/Loader/PageLoader";
import { useUpdateSearchParams } from "@/utils/updateSearchParams";
import { useSearchParams } from "next/navigation";

const Notes = () => {
  const searchParams = useSearchParams()
  
  const {
    data: notesData,
    isLoading,
    isError,
  } = useGetNotesQuery(searchParams.toString());
  const [deleteNote] = useDeleteNoteMutation();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [deleteNoteId, setDeleteNoteId] = useState(null);
    
  console.log('notesData', notesData)
  const updateSearchParams = useUpdateSearchParams();

  const handleDeleteNote = async () => {
    try {
      const res = await deleteNote(deleteNoteId);
      console.log("Deleted note:", res);
    } catch (error) {
      console.log("Error deleting note:", error);
    }
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Study Notes Gallery</h1>
          <p className="text-muted-foreground">
            Browse through your collection of study notes and materials
          </p>
        </div>

        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="gap-2 cursor-pointer"
        >
          <Plus className="h-4 w-4" /> Add New Note
        </Button>
      </div>

      <div className="w-full flex md:flex-row  gap-5 flex-col justify-between mb-3 border p-3 rounded-md">
        <Input
          onChange={(value) =>
            updateSearchParams({ searchTerms: value.target.value })
          }
          placeholder="Search notes by title, description or tags"
          prefix={<IoSearchOutline />}
          style={{ height: 48 }}
          className="w-full max-w-[500px] "
        />
        {/* <ChapterFilter /> */}
      </div>
      {isLoading ? (
        <PageLoader />
      ) : isError ? (
        <div className="flex justify-center items-center w-full h-full text-red-500">
          <p>There was an error loading the notes. Please try again.</p>
        </div>
      ) : notesData && notesData.length === 0 ? (
        <div className="flex justify-center items-center w-full h-full text-gray-500">
          <p>No notes available. Start adding your notes!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notesData?.map((note: any) => (
            <div key={note._id} className="relative bg-transparent">
              <div className="absolute bg-transparent w-full px-5 top-2 right-2 z-10 flex justify-between gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setIsEditDialogOpen(true);
                    setSelectedNote(note);
                  }}
                  className="h-7 w-7 bg-black/40 hover:bg-black/60 text-white"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setDeleteNoteId(note._id)}
                      className="h-7 w-7 bg-black/40 hover:bg-black/60 text-white cursor-pointer"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Note</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete &quot;{note.title}
                        &quot;? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteNote()}
                        className="bg-red-600 hover:bg-red-700 cursor-pointer"
                      >
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
                document={note?.document}
              />
            </div>
          ))}
        </div>
      )}
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemActiveBg: "#002C66",
              borderRadius: 50,
              colorText: "#000",
            },
          },
          token: {
            colorPrimary: "white",
          },
        }}
      >
        <Pagination
          style={{ paddingTop: 20 }}
          align="center"
          total={30}
          pageSize={10}
          showQuickJumper={false}
          showSizeChanger={false}
        />
      </ConfigProvider>
      <AddNoteModal
        isAddDialogOpen={isAddDialogOpen}
        setIsAddDialogOpen={setIsAddDialogOpen}
      />
      <EditNoteModal
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        editNote={selectedNote}
        setEditNote={setSelectedNote}
      />
    </div>
  );
};

export default Notes;
