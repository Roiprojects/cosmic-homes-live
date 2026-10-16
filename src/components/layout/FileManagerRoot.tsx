"use client";
import { FileManagerProvider, useFileManager } from "@/components/layout/FileManagerProvider";

function FileManagerButton() {
  const { openFileManager } = useFileManager();

  return (
    <button
      onClick={() => openFileManager()}
      className="fixed bottom-6 left-6 z-40 bg-teal-600 hover:bg-teal-500 text-white p-3 rounded-full shadow-lg shadow-teal-600/30 transition-all duration-300 hover:scale-110 flex items-center gap-2 pl-4"
      title="Open File Manager"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span className="text-sm font-medium pr-1 hidden sm:inline">Images</span>
    </button>
  );
}

export default function FileManagerRoot({ children }: { children: React.ReactNode }) {
  return (
    <FileManagerProvider>
      {children}
      <FileManagerButton />
    </FileManagerProvider>
  );
}
