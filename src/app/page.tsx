'use client';
import { ChangeEvent, useState } from "react";
import { useS3Upload } from "next-s3-upload";

export default function UploadPage() {
  const { uploadToS3, files } = useS3Upload();
  const [status, setStatus] = useState<string>('');
  
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      // Convert FileList to an array
      const filesArray = Array.from(selectedFiles);
      for (const file of filesArray) {
        setStatus(`Uploading ${file.name}...`);
        await uploadToS3(file);
        setStatus(`Uploaded ${file.name} successfully.`);
      }
      setStatus('All files uploaded successfully.');
    }
  };
  
  

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-gray-100 dark:bg-gray-900">
      <header className="w-full py-4 bg-gray-900 text-white text-center shadow-md">
        <h1 className="text-3xl font-bold">Mr. Gamer Video Uploading Interface</h1>
      </header>
      <main className="flex justify-center items-center flex-col flex-grow w-full px-4">
        <div className="p-8 rounded-lg shadow-lg w-full max-w-2xl text-center bg-white dark:bg-gray-800">
          <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-gray-900 dark:text-white">
            Upload Your Video Files
          </h2>
          <input
            onChange={handleFileChange}
            type="file"
            accept="video/*"
            multiple={true}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-4 p-2"
          />
          {status && <p className="text-gray-700 dark:text-gray-300 mb-4">{status}</p>}
          <div className="pt-8">
            {files.map((file, index) => (
              <div key={index} className="mb-4">
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-1">
                  File #{index + 1} progress: {file.progress}%
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{ width: `${file.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="w-full py-4 bg-gray-900 text-white text-center shadow-md">
        <p>Created by Mr. Gamer</p>
      </footer>
    </div>
  );
}
