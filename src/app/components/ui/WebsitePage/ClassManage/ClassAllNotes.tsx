"use client";
import React, { useState } from 'react';

import { Eye, FileText, Paperclip, Plus, Search } from 'lucide-react';



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
  notes: Note[];
  showAddButton?: boolean;
}

const ClassAllNotes: React.FC<ClassNotesProps> = ({ notes, showAddButton = true }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [notesList, setNotesList] = useState(notes);

  const allTags = Array.from(new Set(notes.flatMap(note => note.tags || [])));

  const filteredNotes = notesList.filter(note => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some(tag => note.tags?.includes(tag));
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleAddNote = (newNote: Note) => {
    setNotesList(prev => [newNote, ...prev]);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <FileText className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Class Notes</h3>
          </div>
          {showAddButton && (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Note
            </button>
          )}
        </div>

        {/* Search + Tags */}
        <div className="mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Notes list */}
        <div className="space-y-4">
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
                  {note.attachments && <Paperclip className="w-4 h-4 text-gray-400" />}
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
                {note.tags?.map((tag) => (
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
        </div>

        {/* No results */}
        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No notes found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* AddNoteForm placeholder */}
      {/* 
      <AddNoteForm
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSubmit={handleAddNote}
      /> 
      */}
    </>
  );
};

export default ClassAllNotes;
