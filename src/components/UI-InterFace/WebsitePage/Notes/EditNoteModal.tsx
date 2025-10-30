"use client";
import TagInput from "@/components/shared/TagInput";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateNoteMutation } from "@/store/api/noteApi";
import { useGetSubjectsQuery } from "@/store/api/subjectApi";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaRegFileAlt, FaTimes } from "react-icons/fa";

const EditNoteModal = ({
  isEditDialogOpen,
  setIsEditDialogOpen,
  editNote,
  setEditNote,
  onUpdateNote, // optional callback prop for update action
}: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [noteForm, setNoteForm] = useState({
    title: "",
    description: "",
    subject: "",
    priority: "",
  });
  const [tags, setTags] = useState<string[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);

  console.log("images", images);
  console.log("documents", documents);

  const [updateNote] = useUpdateNoteMutation();
  const { data: subjectData } = useGetSubjectsQuery(undefined);

  // Sync editNote to form when modal opens or editNote changes
  useEffect(() => {
    if (editNote && isEditDialogOpen) {
      setNoteForm({...editNote, subject: editNote?.subject?._id || ""});
      setTags(editNote?.tags || []);
      setImages(editNote?.images || []); 
      setDocuments(editNote?.documents || []);       
    } else if (!isEditDialogOpen) {
      setNoteForm({
        title: "", 
        description: "",
        subject: "",
        priority: "",
      });
      setTags([]); 
      setImages([]);
      setDocuments([]);
    }
  }, [editNote, isEditDialogOpen]);

  const resetNoteForm = () => {
    setNoteForm({
      title: "",
      description: "",
      subject: "",
      priority: "",
    });
    setTags([]);
    setImages([]);
    setDocuments([]);
    if (setEditNote) setEditNote(null);
  };

  const handleEditNote = async () => {
    const formData = new FormData();
    formData.append("title", noteForm?.title);
    formData.append("description", noteForm?.description);
    formData.append("subject", noteForm?.subject);
    formData.append("priority", noteForm?.priority);
    formData.append("tags", JSON.stringify(tags));

    images?.length > 0 &&
      images?.forEach((image) => {
        if (typeof image !== "string") {
          formData.append("images", image); // Existing image URL
        } else {
          formData.append("oldImages", image); // New File
        }
      });

    documents?.length > 0 &&
      documents?.forEach((doc) => {
        if (typeof doc !== "string") {
          formData.append("documents", doc); // Existing document name
        } else {
          formData.append("oldDocuments", doc); // New File
        }
      });

    try {
      const updateNoteRes = await updateNote({
        id: editNote?._id,
        data: formData,
      });      
      setIsEditDialogOpen(false);
      resetNoteForm();
    } catch (error) {
      console.log("error", error);
    }
  };

  const onDropImages = (acceptedFiles: File[]) => {
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
  };

  const onDropDocuments = (acceptedFiles: File[]) => {
    setDocuments((prevDocuments) => [...prevDocuments, ...acceptedFiles]);
  };

  const {
    getRootProps: getRootPropsImages,
    getInputProps: getInputPropsImages,
  } = useDropzone({
    onDrop: onDropImages,
    accept: "image/*" as any,
    multiple: true,
  });

  const { getRootProps: getRootPropsDocs, getInputProps: getInputPropsDocs } =
    useDropzone({
      onDrop: onDropDocuments,
      accept: ".pdf,.doc,.docx,.txt" as any,
      multiple: true,
    });

  const removeDocument = (doc: string) => {
    setDocuments(documents.filter((document) => document !== doc));
  };

  const removeImage = (image: string) => {
    setImages(images.filter((img) => img !== image));
  };

  const filteredOptions = subjectData?.filter((subject: any) =>
    subject?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // handle priority change
  const handlePriorityChange = (value: string) => {
    setNoteForm((prev) => ({ ...prev, priority: value }));
  };

  const handleSubjectChange = (value: string) => {
    setNoteForm((prev) => ({ ...prev, subject: value }));
  };

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="sm:max-w-[650px] max-h-[800px] overflow-y-auto">
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
                    {images.map((image: any, index) => (
                      <div key={index} className="relative">
                        {typeof image === "string" ? (
                          <img
                            src={image}
                            alt={`Uploaded Image ${index}`}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        ) : (
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Image Preview ${index}`}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        )}
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
              {documents?.length > 0 && (
                <div>
                  <strong>Selected Documents:</strong>
                  <ul className="space-y-2 grid grid-cols-3 gap-2">
                    {documents?.map((doc, index) => (
                      <li
                        key={index}
                        className="flex relative justify-between items-center border  h-14 bg-slate-100 pt-2 whitespace-wrap overflow-hidden"
                      >
                        <FaRegFileAlt className="mr-2" />
                        {/* Check if the document is a string or a file object */}
                        <span className="pr-4 ">
                          {typeof doc === "string" ? doc : doc.name}{" "}
                          {/* Show file name */}
                        </span>
                        <button
                          className="absolute bg-white rounded-full shadow p-1 top-1 right-1 text-red-500 ml-2 cursor-pointer"
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
              setIsEditDialogOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button className="cursor-pointer" onClick={handleEditNote}>
            Update Note
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditNoteModal;
