import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetSubjectsQuery } from "@/store/api/subjectApi";
import TagInput from "@/app/components/shared/TagInput";
import { useDropzone } from "react-dropzone"; // Import react-dropzone
import { FaRegFileAlt, FaTimes } from "react-icons/fa"; // Import icon for remove button

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateNoteMutation } from "@/store/api/noteApi";

const AddNoteModal = ({ isAddDialogOpen, setIsAddDialogOpen }: any) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: subjectData } = useGetSubjectsQuery(undefined);
  const [tags, setTags] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]); // For image uploads
  const [documents, setDocuments] = useState<File[]>([]); // For document uploads
  const [createNote, { isLoading }] = useCreateNoteMutation();

  const [noteForm, setNoteForm] = useState({
    title: "",
    description: "",
    subject: "",
    priority: "",
  });

  const handleAddNote = async () => {
    console.log("Note added:", { ...noteForm, tags });
    console.log("images:", images);
    console.log("Documents:", documents);
    // setIsAddDialogOpen(false);
    // resetNoteForm();

    const formData = new FormData();
    formData.append("title", noteForm?.title);
    formData.append("description", noteForm?.description);
    formData.append("subject", noteForm?.subject);
    formData.append("priority", noteForm?.priority);
    formData.append("tags", JSON.stringify(tags));

    images?.length > 0 &&
      images.forEach((image) => {
        formData.append("images", image);
      });
    documents?.length > 0 &&
      documents.forEach((doc) => {
        formData.append("documents", doc);
      });

    try {
      const res = await createNote(formData);
      setIsAddDialogOpen(false);
      console.log("notes", res);
    } catch (error) {
      console.log("error", error);
    }
  };

  const resetNoteForm = () => {
    setNoteForm({
      title: "",
      description: "",
      subject: "",
      priority: "",
    });
    setImages([]);
    setDocuments([]);
  };

  // Sample options for the dropdown
  const filteredOptions = subjectData?.filter((subject: any) =>
    subject?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle file selection for images using react-dropzone
  const onDropImages = (acceptedFiles: File[]) => {
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
  };

  // Handle file selection for documents using react-dropzone
  const onDropDocuments = (acceptedFiles: File[]) => {
    setDocuments((prevDocuments) => [...prevDocuments, ...acceptedFiles]);
  };

  // Set up the dropzone for images
  const {
    getRootProps: getRootPropsImages,
    getInputProps: getInputPropsImages,
  } = useDropzone({
    onDrop: onDropImages,
    accept: "image/*" as any,
    multiple: true,
  });

  // Set up the dropzone for documents
  const { getRootProps: getRootPropsDocs, getInputProps: getInputPropsDocs } =
    useDropzone({
      onDrop: onDropDocuments,
      accept: ".pdf,.doc,.docx,.txt" as any,
      multiple: true,
    });

  // Handle file removal
  const removeDocument = (file: File) => {
    setDocuments(documents.filter((doc) => doc !== file));
  };

  // Handle file removal
  const removeImage = (file: File) => {
    setImages(images.filter((img) => img !== file));
  };

  // handle priority change
  const handlePriorityChange = (value: string) => {
    setNoteForm((prev) => ({ ...prev, priority: value }));
  };

  // handle subject change
  const handleSubjectChange = (value: string) => {
    setNoteForm((prev) => ({ ...prev, subject: value }));
  };

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogContent className="sm:max-w-[650px] h-full max-h-[800px] overflow-y-auto">
        <div className="grid gap-4 py-4">
          {/* Title Input */}
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={noteForm.title}
              className="h-[48]"
              onChange={(e: any) =>
                setNoteForm({ ...noteForm, title: e.target.value })
              }
              placeholder="Enter note title"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="images" className="text-lg font-semibold">
              Upload Images
            </label>
            <div
              {...getRootPropsImages({
                className: "dropzone border-2 border-dashed p-4",
              })}
            >
              <input {...getInputPropsImages()} />
              <p>Drag & drop some images here, or click to select files</p>
            </div>
            <div className="mt-2">
              {images.length > 0 && (
                <div>
                  <strong>Selected Images:</strong>
                  <div className="flex gap-4 mt-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={image.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <span
                          className="absolute top-0 right-0 text-red-500 cursor-pointer text-xl"
                          onClick={() => removeImage(image)}
                        >
                          <FaTimes />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Priority Select Input */}
          <div className="grid grid-cols-2 gap-x-5">
            <div className="grid gap-2 w-full">
              <Label htmlFor="priority" className="mb-2.5">
                Priority
              </Label>
              <Select
                value={noteForm?.priority}
                onValueChange={handlePriorityChange}
              >
                <SelectTrigger className="w-full !h-12">
                  <SelectValue placeholder="Set priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-semibold">
                Select Subject
              </label>
              <Select
                value={noteForm?.subject}
                onValueChange={handleSubjectChange}
              >
                <SelectTrigger className="w-full !h-12">
                  <SelectValue placeholder="Select a Subject" />
                </SelectTrigger>
                <SelectContent>
                  <div className="p-2">
                    <Input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="mb-2"
                    />
                    {filteredOptions?.map((subject: any) => (
                      <SelectItem key={subject?._id} value={subject?._id}>
                        {subject?.name}
                      </SelectItem>
                    ))}
                  </div>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags Input */}
          <div className="grid gap-4">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <TagInput
              value={tags}
              onChange={setTags}
              placeholder="Add tags…"
              maxTags={10}
              allowNew
            />
          </div>

          {/* Description Input */}
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={noteForm.description}
              onChange={(e: any) =>
                setNoteForm({ ...noteForm, description: e.target.value })
              }
              placeholder="Enter note description"
              rows={3}
            />
          </div>
          {/* Document Upload Section with Drag and Drop */}
          <div className="grid gap-2 mt-4">
            <Label htmlFor="documents">Upload Documents</Label>
            <div
              {...getRootPropsDocs({
                className: "dropzone border-2 border-dashed p-4",
              })}
            >
              <input {...getInputPropsDocs()} />
              <p>Drag & drop some documents here, or click to select files</p>
            </div>
            <div className="mt-2">
              {documents.length > 0 && (
                <div>
                  <strong>Selected Documents:</strong>
                  <ul className="space-y-2 grid grid-cols-4 gap-2">
                    {documents.map((doc, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center border p-2 h-14 bg-slate-100 whitespace-wrap"
                      >
                        <FaRegFileAlt className="mr-2" />
                        <span>{doc?.name.slice(0, 20)}</span>
                        <button
                          className="text-red-500 ml-2 cursor-pointer"
                          onClick={() => removeDocument(doc)}
                        >
                          <FaTimes />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => {
              resetNoteForm();
              setIsAddDialogOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button className="cursor-pointer" onClick={handleAddNote}>
            Add Note
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNoteModal;
