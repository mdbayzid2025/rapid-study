"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"

type EventType = {
  id: number
  title: string
  description: string
  date: Date
  time: string
}

const ClassEventManager = () => {
  const [events, setEvents] = useState<EventType[]>([])
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [time, setTime] = useState("10:00")
  const [editingEventId, setEditingEventId] = useState<number | null>(null)

  const handleSubmit = () => {
    if (!title || !selectedDate || !time) return

    const newEvent = {
      id: editingEventId ?? Date.now(),
      title,
      description,
      date: selectedDate,
      time,
    }

    if (editingEventId !== null) {
      setEvents(events.map(ev => (ev.id === editingEventId ? newEvent : ev)))
    } else {
      setEvents([...events, newEvent])
    }

    // Reset form
    setTitle("")
    setDescription("")
    setTime("10:00")
    setSelectedDate(new Date())
    setEditingEventId(null)
    setOpen(false)
  }

  const handleEdit = (event: EventType) => {
    setTitle(event.title)
    setDescription(event.description)
    setTime(event.time)
    setSelectedDate(new Date(event.date))
    setEditingEventId(event.id)
    setOpen(true)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Class Event Manager</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="lg">Add Event</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingEventId ? "Edit Event" : "Add Event"}</DialogTitle>
              <DialogDescription>
                Fill in the details and pick a date & time slot.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>Event Title</Label>
                <Input value={title} onChange={e => setTitle(e.target.value)} />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} />
              </div>
              <div>
                <Label>Date Slot</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border [--cell-size:clamp(0px,calc(100vw/7.5),52px)] w-full mt-3"
                />
              </div>
              <div>
                <Label>Time Slot</Label>
                <Input type="time" value={time} onChange={e => setTime(e.target.value)} />
              </div>
              <div className="flex justify-end">
                <Button size="lg" onClick={handleSubmit}>
                  {editingEventId ? "Update" : "Create"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {events.length === 0 && <p className="text-gray-500">No events scheduled yet.</p>}
        {events.map(event => (
          <div
            key={event.id}
            className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-sm text-muted-foreground">{event.description}</p>
              <p className="text-sm mt-1">
                📅 {format(new Date(event.date), "PPP")} at 🕒 {event.time}
              </p>
            </div>
            <Button variant="outline" onClick={() => handleEdit(event)}>
              Edit
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ClassEventManager
