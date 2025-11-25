import { WindowControls } from "#components";
import { blogPosts, locations, socials, techStack } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import React, { useEffect, useRef, useState } from "react";

function Terminal() {
  const { openWindow } = useWindowStore();
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom whenever history changes
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Initial Greeting
  useEffect(() => {
    setHistory([
      { 
        type: "output", 
        content: (
          <div className="mb-2">
            <p className="text-gray-400">Last login: {new Date().toUTCString()} on console</p>
            <p className="text-green-400 mt-1">Welcome to Aditya's Terminal v2.0</p>
            <p>Type <span className="text-yellow-400 font-bold">'help'</span> to see what I can do.</p>
          </div>
        )
      }
    ]);
  }, []);

  const handleCommand = (cmdRaw) => {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    // Add user command to history
    const newHistory = [...history, { type: "command", content: cmd }];

    let output = null;

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-2 text-gray-300">
            <p>Here are the commands you can use:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div><span className="text-yellow-400 font-bold">about</span> - Who am I?</div>
              <div><span className="text-yellow-400 font-bold">skills</span> - My technical arsenal</div>
              <div><span className="text-yellow-400 font-bold">projects</span> - See my work</div>
              <div><span className="text-yellow-400 font-bold">education</span> - My academic background</div>
              <div><span className="text-yellow-400 font-bold">contact</span> - How to reach me</div>
              <div><span className="text-yellow-400 font-bold">clear</span> - Clean the screen</div>
              <div><span className="text-yellow-400 font-bold">open [app]</span> - Launch an app (e.g., 'open safari')</div>
            </div>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "about":
        output = (
          <div className="text-gray-300 max-w-md leading-relaxed">
            <p>Hello! I'm <span className="text-green-400 font-bold">Aditya Bhakat</span>.</p>
            <p className="mt-1">
              I am a Frontend Developer transitioning from a Commerce background. 
              I build interactive, responsive, and user-friendly web experiences using the modern React ecosystem.
            </p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-2">
            <p className="text-gray-400 border-b border-gray-700 pb-1 mb-2 w-fit">My Technical Skills</p>
            {techStack.map((stack, i) => (
              <div key={i}>
                <span className="text-blue-400 font-bold w-24 inline-block">{stack.category}:</span>
                <span className="text-gray-300">{stack.items.join(", ")}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "education":
        output = (
          <div className="space-y-4">
            {blogPosts.map((edu) => (
              <div key={edu.id} className="flex flex-col">
                <span className="text-green-400 font-bold">{edu.title}</span>
                <span className="text-gray-500 text-xs">{edu.date}</span>
                <a href={edu.link} target="_blank" rel="noreferrer" className="text-blue-400 underline text-xs hover:text-blue-300 w-fit">
                  View Marksheet
                </a>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        const projects = locations.work?.children || [];
        output = (
          <div className="grid grid-cols-1 gap-3">
            {projects.map((proj) => {
                // Find the url file in the project's children to get the link
                const urlFile = proj.children.find(child => child.fileType === "url");
                const link = urlFile ? urlFile.href : "#";
                
                return (
                    <div key={proj.id} className="flex flex-col">
                        <a href={link} target="_blank" rel="noreferrer" className="text-yellow-400 font-bold hover:underline decoration-yellow-400 underline-offset-4 w-fit">
                            {proj.name} ↗
                        </a>
                        {/* Find description file */}
                        <span className="text-gray-400 text-sm line-clamp-2">
                            {proj.children.find(c => c.fileType === "txt")?.description[0]}
                        </span>
                    </div>
                );
            })}
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-2">
            {socials.map((social) => (
              <div key={social.id}>
                <span className="text-purple-400 font-bold w-24 inline-block">{social.text}:</span>
                <a href={social.link} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white hover:underline">
                  {social.link}
                </a>
              </div>
            ))}
            <div>
                <span className="text-purple-400 font-bold w-24 inline-block">Email:</span>
                <span className="text-gray-300">bhakataditya0@gmail.com</span>
            </div>
          </div>
        );
        break;

      case "whoami":
        output = <span className="text-green-400">root@aditya-portfolio</span>;
        break;

      default:
        // Handle "open [app]" command
        if (cmd.startsWith("open ")) {
            const appName = cmd.replace("open ", "").trim();
            const appMap = {
                "resume": "resume",
                "safari": "safari",
                "browser": "safari",
                "photos": "photos",
                "gallery": "photos",
                "contact": "contact",
                "projects": "finder",
                "finder": "finder"
            };
            
            const windowKey = appMap[appName];
            if (windowKey) {
                openWindow(windowKey);
                output = <span className="text-green-400">Opening {appName}...</span>;
            } else {
                output = <span className="text-red-400">App '{appName}' not found. Try: open safari, open photos, open resume</span>;
            }
        } else {
            output = (
                <span>
                    Command not found: <span className="text-red-400">{cmd}</span>. Type <span className="text-yellow-400">'help'</span> for options.
                </span>
            );
        }
    }

    if (output) {
      newHistory.push({ type: "output", content: output });
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <>
      <div id="window-header" className="bg-[#1e1e1e] text-gray-400 border-none flex-none">
        <WindowControls target="terminal" />
        <h2 className="text-gray-400 flex-1 text-center text-sm font-semibold">aditya — -zsh</h2>
      </div>

      <div 
        className="flex-1 bg-[#1e1e1e] p-4 font-mono text-sm overflow-y-auto text-gray-100 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, i) => (
          <div key={i} className="mb-3 break-words">
            {line.type === "command" ? (
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-bold">➜</span>
                <span className="text-cyan-400 font-bold">~</span>
                <span className="text-white">{line.content}</span>
              </div>
            ) : (
              <div className="ml-0">{line.content}</div>
            )}
          </div>
        ))}

        {/* Input Line */}
        <div className="flex items-center gap-2">
          <span className="text-green-400 font-bold">➜</span>
          <span className="text-cyan-400 font-bold">~</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCommand(input);
              }
            }}
            className="bg-transparent outline-none border-none flex-1 text-white ml-1"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <div ref={endRef} className="h-4" />
      </div>
    </>
  );
}

const TerminalWindow = WindowWrapper(Terminal, "terminal");
export default TerminalWindow;