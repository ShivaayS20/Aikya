"use client";

import { useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function ResourceUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const uploadFile = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus("Please select a file first.");
      return;
    }

    setStatus("Uploading...");

    const { data, error } = await supabase.storage
      .from("notes")
      .upload(`public/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      setStatus(`Error: ${error.message}`);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("notes")
      .getPublicUrl(data.path);

    setStatus(`✅ Uploaded Successfully! Public URL: ${urlData.publicUrl}`);
  };

  return (
    <form
      onSubmit={uploadFile}
      className="flex flex-col gap-3 bg-white/10 p-6 rounded-2xl backdrop-blur-md w-full max-w-md shadow-lg"
    >
      <label className="text-white font-medium">Select a file to upload:</label>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="text-white"
      />

      <button
        className="bg-purple-700 hover:bg-fuchsia-600 text-white rounded-md px-4 py-2 transition-all"
        type="submit"
      >
        Upload
      </button>

      {status && (
        <div className="text-sm text-white/90 bg-black/20 p-2 rounded-md">
          {status}
        </div>
      )}
    </form>
  );
}
