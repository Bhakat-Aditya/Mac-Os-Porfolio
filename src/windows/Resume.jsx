import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { Download } from "lucide-react";
import React from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function Resume() {
  return (
    <>
      <div id="window-header">
        <WindowControls target="resume" />
        <h2>Resume.pdf</h2>
        <a
          href="files/resume.pdf"
          download
          className="cursor-pointer"
          title="Download Resume"
        >
          <Download className="icon-hover" />
        </a>
      </div>
      
      <div className="flex-1 overflow-y-auto w-full bg-gray-100 dark:bg-[#1e1e1e] p-4 flex justify-center">
         <Document file="files/resume.pdf" className="shadow-md">
            <Page 
                pageNumber={1}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                scale={1.0} 
            />
        </Document>
      </div>
    </>
  );
}

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;