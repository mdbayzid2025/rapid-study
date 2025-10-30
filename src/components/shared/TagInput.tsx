"use client";

import * as React from "react";
import { X, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

type TagInputProps = {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  suggestions?: string[]; // optional: show dropdown suggestions
  allowNew?: boolean;     // allow new tags not in suggestions
  className?: string;
};

export default function TagInput({
  value,
  onChange,
  placeholder = "Type and press Enter or ,",
  maxTags,
  suggestions,
  allowNew = true,
  className,
}: TagInputProps) {
  const [input, setInput] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const addTags = (raw: string | string[]) => {
    const parts = Array.isArray(raw) ? raw : [raw];
    const next = [...value];
    for (const p of parts) {
      const t = p.trim();
      if (!t) continue;
      if (maxTags && next.length >= maxTags) break;
      if (!next.includes(t) && (allowNew || (suggestions ?? []).includes(t))) {
        next.push(t);
      }
    }
    if (next.length !== value.length) onChange(next);
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
    inputRef.current?.focus();
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    const key = e.key;
    if (key === "Enter" || key === "," ) {
      e.preventDefault();
      if (!input) return;
      addTags(input.split(",")); // handle cases like "a,b"
      setInput("");
      setOpen(false);
    } else if (key === "Backspace" && !input && value.length) {
      // remove last tag
      removeTag(value[value.length - 1]);
    }
  };

  const handlePaste: React.ClipboardEventHandler<HTMLInputElement> = (e) => {
    const text = e.clipboardData.getData("text");
    if (text.includes(",")) {
      e.preventDefault();
      addTags(text.split(","));
      setInput("");
    }
  };

  const filtered = React.useMemo(() => {
    if (!suggestions) return [];
    const q = input.toLowerCase();
    return suggestions
      .filter((s) => s.toLowerCase().includes(q) && !value.includes(s))
      .slice(0, 8);
  }, [suggestions, input, value]);

  const showDropdown = (suggestions?.length ?? 0) > 0;

  return (
    <div
      className={
        "min-h-12 w-full rounded-xl border bg-background p-2 flex flex-wrap gap-2 items-center " +
        (className ?? "")
      }
      onClick={() => inputRef.current?.focus()}
    >
      {value.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          className="flex items-center gap-1 rounded-full px-3 py-1"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="ms-1 inline-flex"
            aria-label={`Remove ${tag}`}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </Badge>
      ))}

      <div className="flex items-center gap-1 flex-1 min-w-[160px]">
        {showDropdown ? (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="gap-1"
                onClick={() => {
                  setOpen((o) => !o);
                  inputRef.current?.focus();
                }}
              >
                Suggestions <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[260px]" align="start">
              <Command>
                <CommandInput
                  placeholder="Filter suggestions..."
                  value={input}
                  onValueChange={setInput}
                />
                <CommandEmpty>No suggestions found.</CommandEmpty>
                <CommandGroup>
                  {filtered.map((s) => (
                    <CommandItem
                      key={s}
                      value={s}
                      onSelect={(val : any) => {
                        addTags(val);
                        setInput("");
                        setOpen(false);
                        inputRef.current?.focus();
                      }}
                    >
                      {s}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        ) : null}

        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder={placeholder}
          className="border-0 shadow-none focus-visible:ring-0 px-0"
        />
      </div>
    </div>
  );
}
