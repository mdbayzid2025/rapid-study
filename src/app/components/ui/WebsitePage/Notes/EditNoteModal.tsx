'use client'
import React, { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const initialState = {
  id: null,
  title: "",
  description: "",
  subject: "",
  chapter: "",
  priority: 1,
  tags: ""
}

const EditNoteModal = ({
  isEditDialogOpen,
  setIsEditDialogOpen,
  editNote,
  setEditNote,
  onUpdateNote // optional callback prop for update action
}: any) => {
  const [noteForm, setNoteForm] = useState(initialState);

  // Sync editNote to form when modal opens or editNote changes
  useEffect(() => {
    if (editNote && isEditDialogOpen) {
      setNoteForm(editNote);
    } else if (!isEditDialogOpen) {
      setNoteForm(initialState);
    }
  }, [editNote, isEditDialogOpen]);

  const resetNoteForm = () => {
    setNoteForm(initialState);
    if (setEditNote) setEditNote(null);
  };

  const handleEditNote = () => {
    if (onUpdateNote) {
      onUpdateNote(noteForm); // call parent update handler
    }
    setIsEditDialogOpen(false);
    resetNoteForm();
  };

  return (
    <Dialog
      open={isEditDialogOpen}
      onOpenChange={(open) => {
        setIsEditDialogOpen(open)
        if (!open) resetNoteForm()
      }}
    >
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Title */}
          <div className="grid gap-2">
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              value={noteForm.title}
              onChange={(e) =>
                setNoteForm({ ...noteForm, title: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={noteForm.description}
              onChange={(e) =>
                setNoteForm({ ...noteForm, description: e.target.value })
              }
              rows={3}
            />
          </div>

          {/* Subject & Chapter */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-subject">Subject</Label>
              <Input
                id="edit-subject"
                value={noteForm.subject}
                onChange={(e) =>
                  setNoteForm({ ...noteForm, subject: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-chapter">Chapter</Label>
              <Input
                id="edit-chapter"
                value={noteForm.chapter}
                onChange={(e) =>
                  setNoteForm({ ...noteForm, chapter: e.target.value })
                }
              />
            </div>
          </div>

          {/* Priority & Tags */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-priority">Priority (1-5)</Label>
              <Select
                value={noteForm.priority.toString()}
                onValueChange={(value) =>
                  setNoteForm({ ...noteForm, priority: parseInt(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Set priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">★ (Low)</SelectItem>
                  <SelectItem value="2">★★ (Medium-Low)</SelectItem>
                  <SelectItem value="3">★★★ (Medium)</SelectItem>
                  <SelectItem value="4">★★★★ (Medium-High)</SelectItem>
                  <SelectItem value="5">★★★★★ (High)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-tags">Tags (comma separated)</Label>
              <Input
                id="edit-tags"
                value={noteForm.tags}
                onChange={(e) =>
                  setNoteForm({ ...noteForm, tags: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              resetNoteForm()
              setIsEditDialogOpen(false)
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleEditNote}>Update Note</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditNoteModal
