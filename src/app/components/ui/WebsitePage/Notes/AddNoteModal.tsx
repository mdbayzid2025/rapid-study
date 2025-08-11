import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ChapterFilter from "./ChapterFilter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddNoteModal = ({ isAddDialogOpen, setIsAddDialogOpen }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValue, setSelectedValue] = useState("3"); // default value is 3 (Medium)    

  const [selectedChapter, setSelectedChapter] = useState('');

  const options = [
    { label: "Low", value: "1" },
    { label: "Medium", value: "3" },
    { label: "High", value: "5" },
  ];

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setSearchTerm(""); // Clear the search after selection
  };

  const [noteForm, setNoteForm] = useState({
    title: "",
    description: "",
    subject: "",
    chapter: "",
    priority: 3,
    tags: "",
  });

  const handleAddNote = () => {
    console.log("Note added:", noteForm);
    setIsAddDialogOpen(false);
    resetNoteForm();
  };

  const resetNoteForm = () => {
    setNoteForm({
      title: "",
      description: "",
      subject: "",
      chapter: "",
      priority: 3,
      tags: "",
    });
  };

    // Sample options for the dropdown
  const options2 = [
    'JavaScript',
    'Python',
    'React',
    'Node.js',
    'CSS',
    'HTML',
    'TypeScript',
    'Go',
    'Ruby',
    'Java',
  ];

  const filteredOptions = options2.filter((option :any) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogContent className="sm:max-w-[650px]">
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

          {/* Priority Select Input */}
          <div className="grid grid-cols-2 gap-x-5">
            <div className="grid gap-2 w-full">
              <Label htmlFor="priority" className="mb-2.5">
                Priority (1-5)
              </Label>
              <Select value={selectedValue} onValueChange={handleSelect}>
                <SelectTrigger className="w-full !h-12">
                  {" "}
                  {/* Apply width here */}
                  <SelectValue placeholder="Set priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">★ (Low)</SelectItem>
                  <SelectItem value="3">★★★ (Medium)</SelectItem>
                  <SelectItem value="5">★★★★★ (High)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-semibold">
                Select Language
              </label>
              <Select value={selectedChapter} onValueChange={setSelectedChapter}>
                <SelectTrigger className="w-full !h-12">
                  <SelectValue placeholder="Select a language" />
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
                    {filteredOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </div>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags Input */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={noteForm.tags}
                className="h-[48]"
                onChange={(e: any) =>
                  setNoteForm({ ...noteForm, tags: e.target.value })
                }
                placeholder="e.g. Important, Exam, Review"
              />
            </div>
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
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              resetNoteForm();
              setIsAddDialogOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleAddNote}>Add Note</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNoteModal;
