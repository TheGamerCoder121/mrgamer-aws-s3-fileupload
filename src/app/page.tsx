'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Upload() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [clientName, setClientName] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setClientName(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus('');
    if (!files || !clientName) {
      setStatus('<p>Please provide a client name and select files.</p>');
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = `${clientName}-${encodeURIComponent(file.name)}`;
      const fileType = file.type;

      const res = await fetch('/api/sign-s3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName, fileType })
      });

      const { signedUrl, url } = await res.json();

      const xhr = new XMLHttpRequest();
      xhr.open('PUT', signedUrl);
      xhr.setRequestHeader('Content-Type', fileType);
      xhr.onload = () => {
        if (xhr.status === 200) {
          setStatus((prev) => prev + `<p>File uploaded successfully! <a href="${url}" target="_blank">View File</a></p>`);
        } else {
          setStatus((prev) => prev + '<p>File upload failed!</p>');
        }
      };
      xhr.send(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-gray-100 dark:bg-gray-900">
      <header className="w-full py-4 bg-gray-900 text-white text-center">
        <h1 className="text-3xl font-bold">Mr. Gamer Video Uploading Interface</h1>
      </header>
      <main className="flex justify-center items-center flex-col flex-grow w-full px-4">
        <Card className="p-8 rounded-lg shadow-lg w-full max-w-2xl text-center bg-white dark:bg-gray-800">
          <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-gray-900 dark:text-white">
            Upload Your Video Files
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Name</label>
              <Input
                type="text"
                placeholder="Mr.Gamer"
                value={clientName}
                onChange={handleNameChange}
                className="mt-1 block w-full"
                required
              />
            </div>
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Files</label>
              <div className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M48 38v5c0 2-1 3-3 3H3c-2 0-3-1-3-3v-5" />
                    <path d="M5 22l19-19c1-1 2-1 3 0l19 19" />
                    <path d="M24 24v21" />
                  </svg>
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Choose files</span>
                      <Input
                        id="file-upload"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        accept="video/*"
                        className="sr-only"
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">MP4, MOV, AVI up to 2GB</p>
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Upload
            </Button>
          </form>
          <div dangerouslySetInnerHTML={{ __html: status }} className="mt-4 text-left text-gray-700 dark:text-gray-300" />
        </Card>
      </main>
      <footer className="w-full py-4 bg-gray-900 text-white text-center">
        <p>Created by Mr. Gamer</p>
      </footer>
    </div>
  );
}
