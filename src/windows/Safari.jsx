import { WindowControls } from "#components";
import { blogPosts, techStack } from "#constants"; // Imported techStack
import WindowWrapper from "#hoc/WindowWrapper";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Code, // Added icon
  Database, // Added icon
  Download,
  GraduationCap,
  LayoutGrid,
  Layers, // Added icon
  Palette, // Added icon
  RotateCcw,
  Server, // Added icon
  ShieldCheck,
  Star,
  Terminal // Added icon
} from "lucide-react";
import React, { useState } from "react";

// Helper to pick icons based on category name
const getCategoryIcon = (category) => {
  const lower = category.toLowerCase();
  if (lower.includes("frontend")) return <LayoutGrid className="w-6 h-6 text-blue-500" />;
  if (lower.includes("styling")) return <Palette className="w-6 h-6 text-pink-500" />;
  if (lower.includes("backend")) return <Server className="w-6 h-6 text-green-500" />;
  if (lower.includes("database")) return <Database className="w-6 h-6 text-yellow-500" />;
  if (lower.includes("tools")) return <Terminal className="w-6 h-6 text-gray-500" />;
  return <Code className="w-6 h-6 text-purple-500" />;
};

function Safari() {
  const [activeTab, setActiveTab] = useState("education");

  return (
    <>
      {/* Browser Toolbar */}
      <div id="window-header" className="flex items-center gap-4 px-4 py-3 bg-gray-100 border-b border-gray-300 dark:bg-[#2d2d2d] dark:border-black flex-none">
        <WindowControls target="safari" />
        
        <div className="flex gap-4 text-gray-500">
            <ChevronLeft className="w-5 h-5 cursor-pointer hover:text-black dark:hover:text-white" />
            <ChevronRight className="w-5 h-5 cursor-pointer hover:text-black dark:hover:text-white" />
            <RotateCcw className="w-4 h-4 mt-0.5 cursor-pointer hover:text-black dark:hover:text-white" />
        </div>

        {/* URL Bar */}
        <div className="flex-1 flex items-center justify-center bg-white dark:bg-[#1e1e1e] rounded-lg px-3 py-1.5 text-xs shadow-sm border border-gray-200 dark:border-gray-700 mx-4">
            <ShieldCheck className="w-3 h-3 mr-2 text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">apple.com/education/aditya-bhakat</span>
        </div>

        <div className="flex gap-3 text-gray-500">
            <LayoutGrid className="w-4 h-4 cursor-pointer hover:text-black dark:hover:text-white" />
            <Star className="w-4 h-4 cursor-pointer hover:text-black dark:hover:text-white" />
        </div>
      </div>

      {/* Browser Content Area - SCROLLABLE */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-[#1e1e1e]">
        
        {/* Hero Section */}
        <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600 flex flex-col items-center justify-center text-white text-center p-8">
            <GraduationCap className="w-16 h-16 mb-4 opacity-90" />
            <h1 className="text-4xl font-bold mb-2">Academic Journey</h1>
            <p className="text-blue-100 max-w-lg">Building a foundation in Commerce, transitioning into the world of Technology.</p>
            
            {/* Tabs */}
            <div className="absolute -bottom-6 flex gap-4 flex-wrap justify-center px-4">
                <button 
                    onClick={() => setActiveTab("education")}
                    className={`px-6 py-2 rounded-full shadow-lg transition-all ${activeTab === "education" ? "bg-white text-black font-bold" : "bg-white/20 backdrop-blur-md text-white hover:bg-white/30"}`}
                >
                    Education
                </button>
                <button 
                    onClick={() => setActiveTab("skills")}
                    className={`px-6 py-2 rounded-full shadow-lg transition-all ${activeTab === "skills" ? "bg-white text-black font-bold" : "bg-white/20 backdrop-blur-md text-white hover:bg-white/30"}`}
                >
                    Skills
                </button>
                <button 
                    onClick={() => setActiveTab("certifications")}
                    className={`px-6 py-2 rounded-full shadow-lg transition-all ${activeTab === "certifications" ? "bg-white text-black font-bold" : "bg-white/20 backdrop-blur-md text-white hover:bg-white/30"}`}
                >
                    Certifications
                </button>
            </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto p-10 pt-16">
            
            {/* 1. Education Tab */}
            {activeTab === "education" && (
                <div className="grid gap-8">
                    {blogPosts.map((item) => (
                        <div key={item.id} className="group relative flex flex-col sm:flex-row gap-6 p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                            <div className="hidden sm:flex flex-col items-end w-32 flex-shrink-0 pt-1">
                                <span className="font-bold text-gray-800 dark:text-white text-right">{item.date}</span>
                                <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">Completed</span>
                            </div>

                            <div className="hidden sm:block w-px bg-gray-200 dark:bg-gray-700 relative">
                                <div className="absolute top-2 -left-1.5 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white dark:ring-[#1e1e1e]" />
                            </div>

                            <div className="flex-1">
                                <div className="sm:hidden mb-2">
                                    <span className="font-bold text-gray-800 dark:text-white">{item.date}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                                <div className="relative aspect-video w-full mb-4 overflow-hidden rounded-xl shadow-sm group-hover:shadow-md transition-all">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex gap-2">
                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium dark:bg-blue-900 dark:text-blue-200">
                                            Full Time
                                        </span>
                                    </div>
                                    <a 
                                        href={item.link} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                    >
                                        <Download className="w-4 h-4" />
                                        View Marksheet
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 2. Skills Tab (NEW) */}
            {activeTab === "skills" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {techStack.map((stack, index) => (
                        <div key={index} className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow bg-gradient-to-br from-gray-50 to-white dark:from-[#2d2d2d] dark:to-[#1e1e1e]">
                            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                                <div className="p-2.5 bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm">
                                    {getCategoryIcon(stack.category)}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{stack.category}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {stack.items.map((tech, i) => (
                                    <span 
                                        key={i} 
                                        className="px-3 py-1.5 text-sm font-medium bg-white border border-gray-200 dark:bg-[#1e1e1e] dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-default"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 3. Certifications Tab */}
            {activeTab === "certifications" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow bg-gradient-to-br from-gray-50 to-white dark:from-[#2d2d2d] dark:to-[#1e1e1e]">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-2.5 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                                <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tailwind CSS Bootcamp</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">June 2025</p>
                            </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            Intensive training on utility-first CSS frameworks, responsive design principles, and modern theming workflows.
                        </p>
                    </div>
                    {/* You can add more certification cards here */}
                </div>
            )}

        </div>
      </div>
    </>
  );
}

const SafariWindow = WindowWrapper(Safari, "safari");
export default SafariWindow;