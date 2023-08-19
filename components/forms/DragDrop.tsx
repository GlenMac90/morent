"use client";

import { useRef, useState, ChangeEvent, DragEvent, useEffect } from "react";
import Image from "next/image";

interface FileWithPreview extends File {
  preview?: string;
}

interface DragDropProps {
  handleFilesChange: (files: FileWithPreview[]) => void;
}

// https://innocentanyaele.medium.com/create-a-drag-and-drop-file-component-in-reactjs-nextjs-tailwind-6ae70ba06e4b
// Drag and Drop component from medium article

const DragDrop: React.FC<DragDropProps> = ({ handleFilesChange }) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    handleFilesChange(files);
    setIsMounted(true);
  }, [files]);

  if (!isMounted) return null;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { files: newFiles } = e.target;
    if (newFiles) {
      setFiles((prevState) => [...prevState, ...Array.from(newFiles)]);
    }
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      setFiles((prevState) => [
        ...prevState,
        ...Array.from(e.dataTransfer.files),
      ]);
    }
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile(idx: number) {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles(newArr);
  }

  function openFileExplorer() {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  }

  return (
    <div
      className={`${
        dragActive ? "bg-blue-400" : "bg-blue-100"
      }  flex  w-full  flex-col items-center justify-center rounded-lg border border-dotted border-gray400 bg-white py-10  text-center  dark:bg-gray850`}
      style={{
        borderWidth: "1px",
        borderStyle: "dashed",
      }}
      onDragEnter={handleDragEnter}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
    >
      <input
        placeholder="fileInput"
        className="hidden  "
        ref={inputRef}
        type="file"
        multiple={true}
        onChange={handleChange}
        accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
      />
      <Image
        src="/pngs/uploadFile.png"
        width={30}
        height={30}
        alt="file upload png"
      />

      <p className="mt-2.5 text-sm text-gray400">
        Drag & Drop an image, or{" "}
        <span
          className="cursor-pointer font-bold text-blue500"
          onClick={openFileExplorer}
        >
          Browse
        </span>
      </p>
      <p className="mt-2 text-xs sm:text-sm ">
        High resolution images (png, jpg, gif)
      </p>

      <div className="flex flex-col items-center p-3">
        {files.map((file: any, idx: any) => (
          <div key={idx} className="flex flex-row space-x-5">
            <span>{file.name}</span>
            <span
              className="cursor-pointer text-red-500"
              onClick={() => removeFile(idx)}
            >
              remove
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragDrop;
