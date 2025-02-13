"use client"; // ✅ Ensure this is a Client Component

import { useState, ChangeEvent } from "react";
import InputGroup from "@/components/FormElements/InputGroup"; // ✅ Import InputGroup

export default function UploadWrapper() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    console.log("Selected file:", selectedFile);
  };

  return (
    <div>
      <InputGroup
        label="Upload a File"
        type="file"
        name="fileUpload"
        fileStyleVariant="style1"
        required
        placeholder="Select a file"
        handleChange={handleFileChange} // ✅ Handles file selection
      />

      {file && <p className="mt-2 text-sm text-green-500">Selected: {file.name}</p>}
    </div>
  );
}