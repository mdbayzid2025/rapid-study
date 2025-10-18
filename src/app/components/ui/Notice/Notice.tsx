'use client';

import { useState } from 'react';
import { useGetNoticeQuery } from '@/store/api/settingApi';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, Eye, Plus } from 'lucide-react';

export default function Notice() {
  const { data: noticeData } = useGetNoticeQuery(undefined);
  const [notices, setNotices] = useState(noticeData || []);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    description: '',
    date: '',
    iconType: 'pdf',
  });

  const [open, setOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) setFile(uploadedFile);
  };

  const handleAddNotice = () => {
    if (!formData.description || !formData.date) {
      alert('Please fill in all required fields');
      return;
    }
    const newNotice = {
      id: (notices?.length || 0) + 1,
      description: formData.description,
      date: formData.date,
      icon: formData.iconType,
      file: file?.name || null,
    };
    setNotices([...(notices || []), newNotice]);
    setFormData({ description: '', date: '', iconType: 'pdf' });
    setFile(null);
    setOpen(false);
  };

  const displayData = notices || noticeData || [];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Notices</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-5 h-5" /> Add Notice
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create Notice</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div>
                <Label>Description *</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter notice description"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Date *</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Icon Type</Label>
                <Select
                  value={formData.iconType}
                  onValueChange={(val) =>
                    setFormData({ ...formData, iconType: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Upload File</Label>
                <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-teal-500 rounded-lg cursor-pointer hover:bg-teal-50 transition-colors">
                  <div className="flex items-center gap-2">
                    <Upload className="w-5 h-5 text-teal-500" />
                    <span className="text-sm text-gray-700">
                      {file ? file.name : 'Click to upload'}
                    </span>
                  </div>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddNotice}>Add Notice</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-teal-500/90 text-white">
              <TableHead className="w-[70px] text-center">ক্রমিক ন.</TableHead>
              <TableHead>বিষয়বস্তু</TableHead>
              <TableHead>প্রকাশের তারিখ</TableHead>
              <TableHead className="text-center">আইকন</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {displayData.map((row: any, idx: number) => (
              <TableRow
                key={row.id}
                className={`${
                  idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-teal-50 transition-colors`}
              >
                <TableCell className="text-center font-medium">
                  {row.id}
                </TableCell>
                <TableCell className="text-gray-700">
                  {row.description}
                </TableCell>
                <TableCell className="text-gray-600">{row.date}</TableCell>
                <TableCell className="text-center">
                  <IconComponent type={row.icon} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

const IconComponent = ({ type }: { type: string }) => {
  if (type === 'pdf') {
    return (
      <div className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-red-100 text-red-600">
        <FileText className="w-4 h-4" />
      </div>
    );
  }
  if (type === 'image') {
    return (
      <div className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-blue-100 text-blue-600">
        <Eye className="w-4 h-4" />
      </div>
    );
  }
  return (
    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-gray-400"></div>
  );
};
