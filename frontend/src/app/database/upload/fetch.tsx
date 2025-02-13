"use client";

import { useState, ChangeEvent } from "react";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3001/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Response from backend:", data);
      setMessage(data.message || data.error);
    } catch (error) {
      console.error("Upload failed:", error);
      setMessage("Upload failed.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
}