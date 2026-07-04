"use client";

import {Bold, Italic, List, ListOrdered, Underline} from "lucide-react";
import {useEffect, useRef} from "react";

import {Button} from "@/components/ui/button";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const actions = [
  {command: "bold", label: "Bold", icon: Bold},
  {command: "italic", label: "Italic", icon: Italic},
  {command: "underline", label: "Underline", icon: Underline},
  {command: "insertUnorderedList", label: "Bullet list", icon: List},
  {command: "insertOrderedList", label: "Numbered list", icon: ListOrdered},
] as const;

export function RichTextEditor({value, onChange}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor && editor.innerHTML !== value) editor.innerHTML = value;
  }, [value]);

  function runCommand(command: string) {
    editorRef.current?.focus();
    document.execCommand(command);
    onChange(editorRef.current?.innerHTML ?? "");
  }

  return (
    <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap gap-1 border-b border-slate-100 bg-slate-50 p-2">
        {actions.map(({command, label, icon: Icon}) => (
          <Button key={command} type="button" variant="ghost" size="sm" onClick={() => runCommand(command)} aria-label={label}>
            <Icon className="size-4" />
          </Button>
        ))}
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[320px] px-3 py-2 text-sm leading-7 outline-none empty:before:text-slate-400 empty:before:content-['News_content...']"
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
      />
    </div>
  );
}
