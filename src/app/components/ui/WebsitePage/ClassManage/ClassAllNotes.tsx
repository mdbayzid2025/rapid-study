"use client";
import React, { useState } from "react";

import { Eye, FileText, Paperclip, Plus, Search } from "lucide-react";
import { NoteCard } from "@/app/components/shared/Notes/NoteCard";
import AddNoteModal from "../Notes/AddNoteModal";

interface Note {
  id: string | number;
  title: string;
  content: string;
  date: string;
  instructor: string;
  tags: string[];
  attachments?: any;
  views?: number;
}

interface ClassNotesProps {
  notes: any[];
  showAddButton?: boolean;
}

const ClassAllNotes: React.FC<ClassNotesProps> = ({
  notes,
  showAddButton = true,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showAddNoteForm, setShowAddNoteForm] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 py-2 px-1.5 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <FileText className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Class Notes</h3>
          </div>
          {showAddButton && (
            <button
              onClick={() => setShowAddNoteForm(true)}
              className="flex items-center px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes?.map((note: any) => (
            <div key={note._id} className="relative bg-transparent">
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

        {/* Notes list */}
        {/* <div className="space-y-4 hidden">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-lg font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                  {note.title}
                </h4>
                <div className="flex items-center space-x-2">
                  {note.attachments && (
                    <Paperclip className="w-4 h-4 text-gray-400" />
                  )}
                  {note.views !== undefined && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Eye className="w-4 h-4 mr-1" />
                      {note.views}
                    </div>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {note.date} • {note.instructor}
              </p>
              <p className="text-gray-700 mb-3">{note.content}</p>
              <div className="flex flex-wrap gap-1">
                {note.tags?.map((tag: any) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div> */}

        {/* No results */}
        {/* {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              No notes found matching your criteria.
            </p>
          </div>
        )} */}
      </div>

      {/* AddNoteForm placeholder */}
      {/* 
      <AddNoteForm
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSubmit={handleAddNote}
      /> 
      */}
      <AddNoteModal
        isAddDialogOpen={showAddNoteForm}
        setIsAddDialogOpen={setShowAddNoteForm}
      />

    </>
  );
};

export default ClassAllNotes;
