"use client";

import * as React from "react";

export function Dropzone({
  onFile,
  placeholder = "Drop image here or click to browse",
}: {
  onFile: (file: File) => void;
  placeholder?: string;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = React.useState(false);

  return (
    <div
      className={`border-2 border-dashed rounded-md p-4 text-sm cursor-pointer select-none ${
        dragOver
          ? "border-primary/60 bg-primary/5"
          : "border-muted-foreground/30"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) onFile(file);
      }}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
    >
      {placeholder}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
        }}
      />
    </div>
  );
}
