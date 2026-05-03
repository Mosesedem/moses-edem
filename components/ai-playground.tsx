
// "use client";

// import type React from "react";
// import { useState, useRef, useEffect, useCallback } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
// import {
//   Mic,
//   MicOff,
//   Send,
//   Volume2,
//   VolumeX,
//   Bot,
//   User,
//   Loader2,
//   Trash2,
//   Menu,
//   Copy,
//   Check,
//   ChevronDown,
//   X,
// } from "lucide-react";
// import { usePersona } from "@/hooks/usePersona";

// // ─── Types ────────────────────────────────────────────────────────────────────

// interface Message {
//   id: string;
//   role: "user" | "assistant";
//   content: string;
//   timestamp: Date;
// }

// // ─── CodeBlock ────────────────────────────────────────────────────────────────

// interface CodeBlockProps {
//   code: string;
//   lang?: string;
// }

// function CodeBlock({ code, lang }: CodeBlockProps) {
//   const [copied, setCopied] = useState(false);

//   const handleCopy = async () => {
//     await navigator.clipboard.writeText(code);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="my-3 rounded-xl overflow-hidden border border-gray-700/60 bg-[#0d1117] shadow-lg">
//       <div className="flex items-center justify-between px-4 py-2 bg-gray-800/80 border-b border-gray-700/50">
//         <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">
//           {lang || "code"}
//         </span>
//         <button
//           onClick={handleCopy}
//           className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-green-400 transition-colors"
//         >
//           {copied ? (
//             <>
//               <Check className="w-3.5 h-3.5" />
//               Copied!
//             </>
//           ) : (
//             <>
//               <Copy className="w-3.5 h-3.5" />
//               Copy
//             </>
//           )}
//         </button>
//       </div>
//       <div className="overflow-x-auto text-sm leading-relaxed font-mono [&>pre]:!bg-transparent">
//         <SyntaxHighlighter
//           language={lang || "text"}
//           style={vscDarkPlus}
//           customStyle={{ margin: 0, padding: "1rem", background: "transparent" }}
//         >
//           {code}
//         </SyntaxHighlighter>
//       </div>
//     </div>
//   );
// }

// // ─── Markdown Parser ──────────────────────────────────────────────────────────

// function parseMarkdown(raw: string): React.ReactNode[] {
//   const nodes: React.ReactNode[] = [];
//   const codeBlockRe = /```([^\r\n]*)\r?\n([\s\S]*?)(?:```|$)/g;
//   let lastIndex = 0;
//   let match: RegExpExecArray | null;

//   while ((match = codeBlockRe.exec(raw)) !== null) {
//     if (match.index > lastIndex) {
//       nodes.push(
//         <ProseBlock key={lastIndex} text={raw.slice(lastIndex, match.index)} />
//       );
//     }

//     let lang = match[1] ? match[1].trim().toLowerCase() : undefined;
//     if (lang === "golang" || lang === "go") lang = "go";
//     else if (lang === "js" || lang === "javascript") lang = "javascript";
//     else if (lang === "ts" || lang === "typescript") lang = "typescript";
//     else if (lang === "sh" || lang === "shell") lang = "bash";
//     else if (lang === "c++") lang = "cpp";
//     else if (lang === "c#") lang = "csharp";

//     nodes.push(
//       <CodeBlock key={match.index} lang={lang} code={match[2].trimEnd()} />
//     );
//     lastIndex = match.index + match[0].length;
//   }

//   if (lastIndex < raw.length) {
//     nodes.push(<ProseBlock key={lastIndex} text={raw.slice(lastIndex)} />);
//   }

//   return nodes;
// }

// function ProseBlock({ text }: { text: string }) {
//   const lines = text.split("\n");

//   return (
//     <div className="space-y-1.5">
//       {lines.map((line, i) => {
//         if (!line.trim()) return <div key={i} className="h-2" />;

//         const h3 = line.match(/^###\s+(.*)/);
//         const h2 = line.match(/^##\s+(.*)/);
//         const h1 = line.match(/^#\s+(.*)/);
//         if (h1)
//           return (
//             <h1 key={i} className="text-lg font-bold text-white mt-4 mb-1">
//               {renderInline(h1[1])}
//             </h1>
//           );
//         if (h2)
//           return (
//             <h2
//               key={i}
//               className="text-base font-semibold text-green-300 mt-3 mb-1"
//             >
//               {renderInline(h2[1])}
//             </h2>
//           );
//         if (h3)
//           return (
//             <h3
//               key={i}
//               className="text-sm font-semibold text-gray-200 mt-2"
//             >
//               {renderInline(h3[1])}
//             </h3>
//           );

//         const ul = line.match(/^[-*]\s+(.*)/);
//         if (ul)
//           return (
//             <div key={i} className="flex gap-2 text-sm">
//               <span className="text-green-400 mt-0.5 flex-shrink-0">•</span>
//               <span className="text-gray-100">{renderInline(ul[1])}</span>
//             </div>
//           );

//         const ol = line.match(/^(\d+)\.\s+(.*)/);
//         if (ol)
//           return (
//             <div key={i} className="flex gap-2 text-sm">
//               <span className="text-green-400 font-mono w-4 flex-shrink-0">
//                 {ol[1]}.
//               </span>
//               <span className="text-gray-100">{renderInline(ol[2])}</span>
//             </div>
//           );

//         if (/^---+$/.test(line.trim()))
//           return <hr key={i} className="border-gray-700 my-2" />;

//         const bq = line.match(/^>\s+(.*)/);
//         if (bq)
//           return (
//             <div
//               key={i}
//               className="border-l-2 border-green-500/50 pl-3 text-sm text-gray-300 italic"
//             >
//               {renderInline(bq[1])}
//             </div>
//           );

//         return (
//           <p key={i} className="text-sm leading-relaxed text-gray-100">
//             {renderInline(line)}
//           </p>
//         );
//       })}
//     </div>
//   );
// }

// function renderInline(text: string): React.ReactNode {
//   const parts: React.ReactNode[] = [];
//   const re =
//     /(\*\*(.+?)\*\*|\*(.+?)\*|`([^`]+)`|\[(.+?)\]\((.+?)\))/g;
//   let last = 0;
//   let m: RegExpExecArray | null;

//   while ((m = re.exec(text)) !== null) {
//     if (m.index > last) parts.push(text.slice(last, m.index));

//     if (m[2])
//       parts.push(
//         <strong key={m.index} className="font-semibold text-white">
//           {m[2]}
//         </strong>
//       );
//     else if (m[3])
//       parts.push(
//         <em key={m.index} className="italic text-gray-200">
//           {m[3]}
//         </em>
//       );
//     else if (m[4])
//       parts.push(
//         <code
//           key={m.index}
//           className="bg-gray-700/70 text-green-300 rounded px-1 py-0.5 text-xs font-mono"
//         >
//           {m[4]}
//         </code>
//       );
//     else if (m[5])
//       parts.push(
//         <a
//           key={m.index}
//           href={m[6]}
//           target="_blank"
//           rel="noreferrer"
//           className="text-green-400 underline underline-offset-2 hover:text-green-300"
//         >
//           {m[5]}
//         </a>
//       );

//     last = m.index + m[0].length;
//   }

//   if (last < text.length) parts.push(text.slice(last));
//   return parts;
// }

// // ─── Avatar ───────────────────────────────────────────────────────────────────

// function Avatar({ role }: { role: "user" | "assistant" }) {
//   return (
//     <div
//       className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
//         role === "assistant"
//           ? "bg-gradient-to-br from-green-500/25 to-lime-400/10"
//           : "bg-gradient-to-br from-orange-500/25 to-red-500/10"
//       }`}
//     >
//       {role === "assistant" ? (
//         <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
//       ) : (
//         <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400" />
//       )}
//     </div>
//   );
// }

// // ─── MessageBubble ────────────────────────────────────────────────────────────

// function MessageBubble({ message }: { message: Message }) {
//   const isUser = message.role === "user";

//   return (
//     <div
//       className={`flex gap-2 sm:gap-3 items-start ${
//         isUser ? "flex-row-reverse" : "flex-row"
//       }`}
//     >
//       <Avatar role={message.role} />

//       <div
//         className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 shadow-sm ${
//           isUser
//             ? "rounded-tr-sm bg-green-700/25 border border-green-500/25 text-green-50"
//             : "rounded-tl-sm bg-gray-800/60 border border-gray-700/50 text-gray-100"
//         }`}
//       >
//         {isUser ? (
//           <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
//             {message.content}
//           </p>
//         ) : (
//           <div className="prose-custom">{parseMarkdown(message.content)}</div>
//         )}

//         <p
//           className={`text-[10px] mt-1.5 ${
//             isUser ? "text-green-400/50 text-right" : "text-gray-600"
//           }`}
//         >
//           {message.timestamp.toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           })}
//         </p>
//       </div>
//     </div>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────

// const WELCOME_CONTENT =
//   "Hey there! I'm **AI Moses**, powered by advanced AI to respond just like the real Moses Edem.\n\nAsk me about my:\n- **Projects** and what I've shipped\n- **Technical expertise** and stack\n- **Experience** and background\n- Or anything else you'd like to know!\n\nI can chat via text or voice — whatever works best for you.";

// export default function AIPlayground() {
//   const { currentPersona } = usePersona();

//   const makeWelcome = (): Message => ({
//     id: "welcome",
//     role: "assistant",
//     content: WELCOME_CONTENT,
//     timestamp: new Date(),
//   });

//   const [messages, setMessages] = useState<Message[]>([makeWelcome()]);
//   const [inputText, setInputText] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   // ── Speaker is OFF by default — user must enable manually ──
//   const [speechEnabled, setSpeechEnabled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [showScrollBtn, setShowScrollBtn] = useState(false);

//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const audioChunksRef = useRef<Blob[]>([]);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const scrollContainerRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   // ── Scroll helpers ──────────────────────────────────────────────────────────

//   const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollTo({
//         top: scrollContainerRef.current.scrollHeight,
//         behavior,
//       });
//     }
//   }, []);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, isLoading, scrollToBottom]);

//   useEffect(() => {
//     const container = scrollContainerRef.current;
//     if (!container) return;

//     const onScroll = () => {
//       const distFromBottom =
//         container.scrollHeight - container.scrollTop - container.clientHeight;
//       setShowScrollBtn(distFromBottom > 120);
//     };

//     container.addEventListener("scroll", onScroll, { passive: true });
//     return () => container.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     return () => {
//       window.speechSynthesis?.cancel();
//     };
//   }, []);

//   // Close mobile menu when clicking outside
//   useEffect(() => {
//     if (!isMobileMenuOpen) return;
//     const handler = (e: MouseEvent) => {
//       const target = e.target as HTMLElement;
//       if (!target.closest("[data-mobile-menu]")) {
//         setIsMobileMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, [isMobileMenuOpen]);

//   // ── TTS ─────────────────────────────────────────────────────────────────────

//   const pickMaleVoice = (): SpeechSynthesisVoice | null => {
//     const voices = window.speechSynthesis.getVoices();
//     const maleKeywords = [
//       "male", "daniel", "alex", "james", "david", "george",
//       "arthur", "oliver", "guy", "microsoft david", "microsoft james",
//     ];
//     for (const kw of maleKeywords) {
//       const found = voices.find(
//         (v) => v.name.toLowerCase().includes(kw) && v.lang.startsWith("en")
//       );
//       if (found) return found;
//     }
//     return voices.find((v) => v.lang.startsWith("en")) ?? null;
//   };

//   const speakText = useCallback(
//     (text: string) => {
//       // Guard: only speak if user has explicitly enabled speech
//       if (!speechEnabled || !("speechSynthesis" in window)) return;

//       const cleaned = text
//         .replace(/```[\s\S]*?```/g, "code block")
//         .replace(/[*_`#>]/g, "")
//         .replace(/\[(.+?)\]\(.+?\)/g, "$1")
//         .trim();

//       window.speechSynthesis.cancel();
//       setIsSpeaking(true);

//       const speak = () => {
//         const utterance = new SpeechSynthesisUtterance(cleaned);
//         const voice = pickMaleVoice();
//         if (voice) utterance.voice = voice;
//         utterance.lang = "en-GB";
//         utterance.rate = 0.95;
//         utterance.pitch = 0.7;
//         utterance.volume = 1;
//         utterance.onend = () => setIsSpeaking(false);
//         utterance.onerror = () => setIsSpeaking(false);
//         window.speechSynthesis.speak(utterance);
//       };

//       if (window.speechSynthesis.getVoices().length === 0) {
//         window.speechSynthesis.onvoiceschanged = speak;
//       } else {
//         speak();
//       }
//     },
//     [speechEnabled]
//   );

//   const stopSpeaking = () => {
//     window.speechSynthesis?.cancel();
//     setIsSpeaking(false);
//   };

//   const toggleSpeech = () => {
//     if (isSpeaking) stopSpeaking();
//     setSpeechEnabled((v) => !v);
//   };

//   // ── API call ────────────────────────────────────────────────────────────────

//   const sendMessage = useCallback(
//     async (content: string) => {
//       if (!content.trim()) return;

//       const userMessage: Message = {
//         id: Date.now().toString(),
//         role: "user",
//         content: content.trim(),
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, userMessage]);
//       setIsLoading(true);

//       try {
//         const response = await fetch("/api/chat", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             message: content.trim(),
//             persona: currentPersona,
//             history: messages.slice(-12),
//           }),
//         });

//         if (!response.ok) throw new Error("Failed to get response");

//         const data = await response.json();

//         const assistantMessage: Message = {
//           id: (Date.now() + 1).toString(),
//           role: "assistant",
//           content: data.response,
//           timestamp: new Date(),
//         };

//         setMessages((prev) => [...prev, assistantMessage]);

//         // Only speak if user has explicitly turned on speech
//         if (speechEnabled) speakText(data.response);
//       } catch {
//         setMessages((prev) => [
//           ...prev,
//           {
//             id: (Date.now() + 1).toString(),
//             role: "assistant",
//             content:
//               "Sorry, I'm having trouble responding right now. Please try again in a moment.",
//             timestamp: new Date(),
//           },
//         ]);
//       } finally {
//         setIsLoading(false);
//         // Re-focus input on desktop after send
//         setTimeout(() => inputRef.current?.focus(), 50);
//       }
//     },
//     [currentPersona, messages, speechEnabled, speakText]
//   );

//   // ── Voice input ─────────────────────────────────────────────────────────────

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const mediaRecorder = new MediaRecorder(stream);
//       mediaRecorderRef.current = mediaRecorder;
//       audioChunksRef.current = [];

//       mediaRecorder.ondataavailable = (e) =>
//         audioChunksRef.current.push(e.data);
//       mediaRecorder.onstop = async () => {
//         const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
//         stream.getTracks().forEach((t) => t.stop());
//         await processAudioInput(blob);
//       };

//       mediaRecorder.start();
//       setIsRecording(true);
//     } catch {
//       alert("Could not access microphone. Please check permissions.");
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   const processAudioInput = async (blob: Blob) => {
//     setIsLoading(true);
//     try {
//       const fd = new FormData();
//       fd.append("audio", blob, "recording.wav");
//       const res = await fetch("/api/speech-to-text", {
//         method: "POST",
//         body: fd,
//       });
//       if (!res.ok) throw new Error();
//       const data = await res.json();
//       if (data.text) await sendMessage(data.text);
//     } catch {
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now().toString(),
//           role: "assistant",
//           content:
//             "Sorry, I couldn't understand the audio. Please try again or type instead.",
//           timestamp: new Date(),
//         },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ── Form submit ─────────────────────────────────────────────────────────────

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (inputText.trim() && !isLoading) {
//       sendMessage(inputText.trim());
//       setInputText("");
//     }
//   };

//   const clearChat = () => {
//     stopSpeaking();
//     setMessages([makeWelcome()]);
//     setIsMobileMenuOpen(false);
//   };

//   // ── Status ──────────────────────────────────────────────────────────────────

//   const statusLabel = isSpeaking
//     ? "Speaking"
//     : isRecording
//     ? "Listening"
//     : isLoading
//     ? "Thinking"
//     : "Online";

//   const statusColor = isRecording
//     ? "bg-red-600/20 text-red-400 border-red-500/50"
//     : isSpeaking
//     ? "bg-blue-600/20 text-blue-400 border-blue-500/50"
//     : isLoading
//     ? "bg-yellow-600/20 text-yellow-400 border-yellow-500/50"
//     : "bg-green-600/20 text-green-400 border-green-500/50";

//   // ── Render ──────────────────────────────────────────────────────────────────

//   return (
// <Card
//   className={`
//     flex flex-col w-full mx-auto
//     h-[calc(100dvh-120px)] min-h-[480px]
//     sm:h-[72vh] sm:min-h-[540px]
//     lg:max-w-4xl lg:h-[75vh] lg:max-h-[820px]
//     bg-gray-900/60 backdrop-blur-md border-gray-800 shadow-2xl overflow-hidden
//     rounded-2xl sm:rounded-3xl
//   `.replace(/\s+/g, ' ').trim()}
// >
//       {/* ── Header ── */}
//       <CardHeader className="border-b border-gray-800 p-3 sm:p-4 flex-shrink-0">
//         <div className="flex items-center justify-between gap-2" data-mobile-menu>
//           {/* Left: avatar + title */}
//           <div className="flex items-center gap-2 sm:gap-3 min-w-0">
//             <div className="relative w-9 h-9 flex-shrink-0">
//               <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-lime-400/10 rounded-full" />
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <Bot className="w-4 h-4 text-green-400" />
//               </div>
//               {(isLoading || isSpeaking || isRecording) && (
//                 <span className="absolute inset-0 rounded-full border border-green-500/50 animate-ping opacity-60" />
//               )}
//             </div>
//             <div className="min-w-0">
//               <CardTitle className="text-white text-sm sm:text-base font-semibold truncate leading-tight">
//                 AI Moses Playground
//               </CardTitle>
//               <p className="text-[11px] text-gray-500 leading-tight">
//                 AI Powered · Voice &amp; Text
//               </p>
//             </div>
//           </div>

//           {/* Right: controls */}
//           <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
//             {/* Status badge — always visible */}
//             <Badge
//               variant="secondary"
//               className={`${statusColor} text-[10px] sm:text-xs px-2 py-0.5 hidden xs:inline-flex`}
//             >
//               {statusLabel}
//             </Badge>

//             {/* Speaker toggle — always visible on all sizes */}
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={toggleSpeech}
//               className={`w-8 h-8 transition-colors ${
//                 speechEnabled
//                   ? "text-green-400 hover:text-green-300"
//                   : "text-gray-500 hover:text-gray-300"
//               }`}
//               title={
//                 isSpeaking
//                   ? "Stop speaking"
//                   : speechEnabled
//                   ? "Speaker on — click to mute"
//                   : "Speaker off — click to enable"
//               }
//             >
//               {speechEnabled ? (
//                 <Volume2 className="w-4 h-4" />
//               ) : (
//                 <VolumeX className="w-4 h-4" />
//               )}
//             </Button>

//             {/* Clear — visible on sm+ inline, hidden on xs (in menu) */}
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={clearChat}
//               className="hidden sm:flex w-8 h-8 text-gray-400 hover:text-red-400 transition-colors"
//               title="Clear chat"
//             >
//               <Trash2 className="w-4 h-4" />
//             </Button>

//             {/* Mobile overflow menu — xs only */}
//             <div className="relative sm:hidden" data-mobile-menu>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => setIsMobileMenuOpen((v) => !v)}
//                 className="w-8 h-8 text-gray-400 hover:text-green-400"
//               >
//                 {isMobileMenuOpen ? (
//                   <X className="w-4 h-4" />
//                 ) : (
//                   <Menu className="w-4 h-4" />
//                 )}
//               </Button>

//               {isMobileMenuOpen && (
//                 <div className="absolute right-0 top-10 z-50 min-w-[140px] bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden">
//                   <div className="px-3 py-1.5 text-[10px] text-gray-500 uppercase tracking-widest border-b border-gray-700">
//                     {statusLabel}
//                   </div>
//                   <button
//                     onClick={clearChat}
//                     className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-gray-300 hover:bg-gray-700 hover:text-red-400 transition-colors"
//                   >
//                     <Trash2 className="w-3.5 h-3.5" />
//                     Clear Chat
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </CardHeader>

//       {/* ── Message list ── */}
//       <CardContent className="p-0 flex flex-col flex-1 min-h-0 relative">
//         <div
//           ref={scrollContainerRef}
//           className="flex-1 overflow-y-auto px-3 sm:px-5 py-4 space-y-4 sm:space-y-5 scroll-smooth overscroll-contain"
//           style={{ scrollbarWidth: "thin", scrollbarColor: "#374151 transparent" }}
//         >
//           {messages.map((msg) => (
//             <MessageBubble key={msg.id} message={msg} />
//           ))}

//           {isLoading && (
//             <div className="flex gap-2 sm:gap-3 items-start">
//               <Avatar role="assistant" />
//               <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl rounded-tl-sm px-4 py-3">
//                 <div className="flex items-center gap-1.5">
//                   <span
//                     className="w-2 h-2 rounded-full bg-green-400 animate-bounce"
//                     style={{ animationDelay: "0ms" }}
//                   />
//                   <span
//                     className="w-2 h-2 rounded-full bg-green-400 animate-bounce"
//                     style={{ animationDelay: "150ms" }}
//                   />
//                   <span
//                     className="w-2 h-2 rounded-full bg-green-400 animate-bounce"
//                     style={{ animationDelay: "300ms" }}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           <div ref={messagesEndRef} />
//         </div>

//         {/* Scroll-to-bottom FAB */}
//         {showScrollBtn && (
//           <button
//             onClick={() => scrollToBottom()}
//             className="absolute bottom-[72px] right-3 sm:bottom-[76px] sm:right-4 w-8 h-8 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-500/50 shadow-lg transition-all z-10"
//             aria-label="Scroll to bottom"
//           >
//             <ChevronDown className="w-4 h-4" />
//           </button>
//         )}

//         {/* ── Input area ── */}
//         <div className="border-t border-gray-800 px-3 sm:px-5 py-3 flex-shrink-0 bg-gray-900/40 safe-area-bottom">
//           <form onSubmit={handleSubmit} className="flex gap-2 items-center">
//             <Input
//               ref={inputRef}
//               value={inputText}
//               onChange={(e) => setInputText(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey) {
//                   e.preventDefault();
//                   handleSubmit(e as unknown as React.FormEvent);
//                 }
//               }}
//               placeholder={
//                 isRecording
//                   ? "Listening…"
//                   : "Ask me anything…"
//               }
//               className="flex-1 bg-gray-800/60 border-gray-700 text-white placeholder-gray-500 focus:border-green-500/70 focus:ring-green-500/20 rounded-xl text-sm h-10 min-w-0"
//               disabled={isLoading || isRecording}
//               autoComplete="off"
//               autoCorrect="off"
//               autoCapitalize="sentences"
//               enterKeyHint="send"
//             />

//             {/* Mic button */}
//             <Button
//               type="button"
//               variant="outline"
//               size="icon"
//               onClick={isRecording ? stopRecording : startRecording}
//               disabled={isLoading}
//               className={`flex-shrink-0 w-10 h-10 rounded-xl transition-all ${
//                 isRecording
//                   ? "bg-red-600/20 text-red-400 border-red-500/60 hover:bg-red-600/30 animate-pulse"
//                   : "border-gray-700 text-gray-400 hover:text-green-400 hover:border-green-500/50"
//               }`}
//               title={isRecording ? "Stop recording" : "Start voice input"}
//               aria-label={isRecording ? "Stop recording" : "Start voice input"}
//             >
//               {isRecording ? (
//                 <MicOff className="w-4 h-4" />
//               ) : (
//                 <Mic className="w-4 h-4" />
//               )}
//             </Button>

//             {/* Send button */}
//             <Button
//               type="submit"
//               size="icon"
//               disabled={!inputText.trim() || isLoading || isRecording}
//               className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-600 hover:bg-green-500 text-white shadow-md shadow-green-900/30 disabled:opacity-40 transition-all"
//               title="Send message"
//               aria-label="Send message"
//             >
//               {isLoading ? (
//                 <Loader2 className="w-4 h-4 animate-spin" />
//               ) : (
//                 <Send className="w-4 h-4" />
//               )}
//             </Button>
//           </form>

//           {/* Hint text */}
//           <p className="text-[10px] text-gray-600 mt-1.5 text-center leading-tight">
//             {isRecording ? (
//               <span className="text-red-400/70">
//                 🔴 Recording… tap mic to stop
//               </span>
//             ) : !speechEnabled ? (
//               <span>
//                 Tap <Volume2 className="inline w-2.5 h-2.5 mx-0.5" /> to enable
//                 voice replies
//               </span>
//             ) : (
//               "Enter to send · Mic for voice"
//             )}
//           </p>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }


"use client";

import type React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  Bot,
  User,
  Loader2,
  Trash2,
  Menu,
  Copy,
  Check,
  ChevronDown,
} from "lucide-react";
import { usePersona } from "@/hooks/usePersona";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// ─── Tiny Markdown Renderer ───────────────────────────────────────────────────
// Parses a small but rich subset of Markdown and outputs styled JSX.

interface CodeBlockProps {
  code: string;
  lang?: string;
}

function CodeBlock({ code, lang }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-gray-700/60 bg-[#0d1117] shadow-lg">
      {/* Code header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800/80 border-b border-gray-700/50">
        <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">
          {lang || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-green-400 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto text-sm leading-relaxed font-mono [&>pre]:!bg-transparent">
        <SyntaxHighlighter
          language={lang || "text"}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "1rem",
            background: "transparent",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

// Splits raw Markdown text into segments: fenced code blocks vs. prose.
function parseMarkdown(raw: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const codeBlockRe = /```([^\r\n]*)\r?\n([\s\S]*?)(?:```|$)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRe.exec(raw)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(
        <ProseBlock key={lastIndex} text={raw.slice(lastIndex, match.index)} />
      );
    }

    let lang = match[1] ? match[1].trim().toLowerCase() : undefined;
    if (lang === "golang" || lang === "go") lang = "go";
    else if (lang === "js" || lang === "javascript") lang = "javascript";
    else if (lang === "ts" || lang === "typescript") lang = "typescript";
    else if (lang === "sh" || lang === "shell") lang = "bash";
    else if (lang === "c++") lang = "cpp";
    else if (lang === "c#") lang = "csharp";

    nodes.push(
      <CodeBlock key={match.index} lang={lang} code={match[2].trimEnd()} />
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < raw.length) {
    nodes.push(<ProseBlock key={lastIndex} text={raw.slice(lastIndex)} />);
  }

  return nodes;
}

// Renders inline-formatted prose: headings, bold, italic, inline-code, links, lists.
function ProseBlock({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-2" />;

        // ATX headings
        const h3 = line.match(/^###\s+(.*)/);
        const h2 = line.match(/^##\s+(.*)/);
        const h1 = line.match(/^#\s+(.*)/);
        if (h1) return <h1 key={i} className="text-lg font-bold text-white mt-4 mb-1">{renderInline(h1[1])}</h1>;
        if (h2) return <h2 key={i} className="text-base font-semibold text-green-300 mt-3 mb-1">{renderInline(h2[1])}</h2>;
        if (h3) return <h3 key={i} className="text-sm font-semibold text-gray-200 mt-2">{renderInline(h3[1])}</h3>;

        // Unordered list items
        const ul = line.match(/^[-*]\s+(.*)/);
        if (ul) return (
          <div key={i} className="flex gap-2 text-sm">
            <span className="text-green-400 mt-0.5 flex-shrink-0">•</span>
            <span className="text-gray-100">{renderInline(ul[1])}</span>
          </div>
        );

        // Ordered list items
        const ol = line.match(/^(\d+)\.\s+(.*)/);
        if (ol) return (
          <div key={i} className="flex gap-2 text-sm">
            <span className="text-green-400 font-mono w-4 flex-shrink-0">{ol[1]}.</span>
            <span className="text-gray-100">{renderInline(ol[2])}</span>
          </div>
        );

        // Horizontal rule
        if (/^---+$/.test(line.trim())) return <hr key={i} className="border-gray-700 my-2" />;

        // Blockquote
        const bq = line.match(/^>\s+(.*)/);
        if (bq) return (
          <div key={i} className="border-l-2 border-green-500/50 pl-3 text-sm text-gray-300 italic">
            {renderInline(bq[1])}
          </div>
        );

        // Normal paragraph line
        return <p key={i} className="text-sm leading-relaxed text-gray-100">{renderInline(line)}</p>;
      })}
    </div>
  );
}

// Renders inline Markdown: **bold**, *italic*, `code`, [link](url)
function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const re = /(\*\*(.+?)\*\*|\*(.+?)\*|`([^`]+)`|\[(.+?)\]\((.+?)\))/g;
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));

    if (m[2]) parts.push(<strong key={m.index} className="font-semibold text-white">{m[2]}</strong>);
    else if (m[3]) parts.push(<em key={m.index} className="italic text-gray-200">{m[3]}</em>);
    else if (m[4]) parts.push(<code key={m.index} className="bg-gray-700/70 text-green-300 rounded px-1 py-0.5 text-xs font-mono">{m[4]}</code>);
    else if (m[5]) parts.push(<a key={m.index} href={m[6]} target="_blank" rel="noreferrer" className="text-green-400 underline underline-offset-2 hover:text-green-300">{m[5]}</a>);

    last = m.index + m[0].length;
  }

  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AIPlayground() {
  const { currentPersona } = usePersona();

  const WELCOME: Message = {
    id: "welcome",
    role: "assistant",
    content:
      "Hey there! I'm **AI Moses**, powered by advanced AI to respond just like the real Moses Edem.\n\nAsk me about my:\n- **Projects** and what I've shipped\n- **Technical expertise** and stack\n- **Experience** and background\n- Or anything else you'd like to know!\n\nI can chat via text or voice — whatever works best for you.",
    timestamp: new Date(),
  };

  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // ── Scroll helpers ──────────────────────────────────────────────────────────

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior,
      });
    }
  }, []);

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // Show "scroll to bottom" fab when user has scrolled up
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onScroll = () => {
      const distFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
      setShowScrollBtn(distFromBottom > 120);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  // Cleanup TTS on unmount
  useEffect(() => {
    return () => { window.speechSynthesis?.cancel(); };
  }, []);

  // ── TTS with male voice ─────────────────────────────────────────────────────

  const pickMaleVoice = (): SpeechSynthesisVoice | null => {
    const voices = window.speechSynthesis.getVoices();

    // Prefer deep male en voices by name heuristics
    const maleKeywords = ["male", "daniel", "alex", "james", "david", "george", "arthur", "oliver", "guy", "microsoft david", "microsoft james"];
    for (const kw of maleKeywords) {
      const found = voices.find(v => v.name.toLowerCase().includes(kw) && v.lang.startsWith("en"));
      if (found) return found;
    }
    // Fallback: first English voice
    return voices.find(v => v.lang.startsWith("en")) ?? null;
  };

  const speakText = useCallback(
    (text: string, force: boolean = false) => {
      if ((!speechEnabled && !force) || !("speechSynthesis" in window)) return;

      // Strip markdown symbols for cleaner speech
      const cleaned = text
        .replace(/```[\s\S]*?```/g, "code block")
        .replace(/[*_`#>]/g, "")
        .replace(/\[(.+?)\]\(.+?\)/g, "$1")
        .trim();

      window.speechSynthesis.cancel();
      setIsSpeaking(true);

      const speak = () => {
        const utterance = new SpeechSynthesisUtterance(cleaned);
        const voice = pickMaleVoice();
        if (voice) utterance.voice = voice;
        utterance.lang = "en-GB";
        utterance.rate = 0.95;
        utterance.pitch = 0.7; // Lower = deeper/more masculine
        utterance.volume = 1;

        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      };

      // Chrome loads voices async
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = () => { speak(); };
      } else {
        speak();
      }
    },
    [speechEnabled]
  );

  const stopSpeaking = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  };

  // ── API call ────────────────────────────────────────────────────────────────

  const sendMessage = useCallback(
    async (content: string, isVoiceInput: boolean = false) => {
      if (!content.trim()) return;

      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: content.trim(),
            persona: currentPersona,
            history: messages.slice(-12),
          }),
        });

        if (!response.ok) throw new Error("Failed to get response");

        const data = await response.json();

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.response,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, assistantMessage]);
        if (speechEnabled || isVoiceInput) speakText(data.response, isVoiceInput);
      } catch {
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: "Sorry, I'm having trouble responding right now. Please try again in a moment.",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [currentPersona, messages, speechEnabled, speakText]
  );

  // ── Voice input ─────────────────────────────────────────────────────────────

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = e => audioChunksRef.current.push(e.data);
      mediaRecorder.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        stream.getTracks().forEach(t => t.stop());
        await processAudioInput(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch {
      alert("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const processAudioInput = async (blob: Blob) => {
    setIsLoading(true);
    try {
      const fd = new FormData();
      fd.append("audio", blob, "recording.wav");
      const res = await fetch("/api/speech-to-text", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.text) await sendMessage(data.text, true);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "Sorry, I couldn't understand the audio. Please try again or type instead.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Form submit ─────────────────────────────────────────────────────────────

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      sendMessage(inputText.trim());
      setInputText("");
    }
  };

  const clearChat = () => {
    stopSpeaking();
    setMessages([{ ...WELCOME, id: "welcome", timestamp: new Date() }]);
  };

  // ── Status badge label ──────────────────────────────────────────────────────

  const statusLabel = isSpeaking
    ? "Speaking"
    : isRecording
    ? "Listening"
    : isLoading
    ? "Thinking"
    : "Online";

  const statusColor = isRecording
    ? "bg-red-600/20 text-red-400 border-red-500/50"
    : "bg-green-600/20 text-green-400 border-green-500/50";

  // ── Render ──────────────────────────────────────────────────────────────────

return (
    <Card className="flex flex-col w-full h-[85vh] sm:h-[75vh] max-h-[900px] border-gray-800 bg-gray-900/60 backdrop-blur-xl shadow-2xl overflow-hidden rounded-t-3xl sm:rounded-3xl border-b-0 sm:border-b">
      
      {/* ── Mobile-Optimized Header ── */}
      <CardHeader className="border-b border-gray-800/50 p-4 sm:p-5 flex-shrink-0 bg-gray-900/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/10 flex items-center justify-center border border-green-500/20">
                <Bot className="w-5 h-5 text-green-400" />
              </div>
              {(isLoading || isSpeaking || isRecording) && (
                <span className="absolute inset-0 rounded-full border border-green-500/50 animate-ping opacity-40" />
              )}
            </div>
            <div className="min-w-0">
              <CardTitle className="text-white text-sm sm:text-base font-bold truncate tracking-tight">
                AI Moses
              </CardTitle>
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
                <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                  {isRecording ? "Listening..." : "Live Representative"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={isSpeaking ? stopSpeaking : () => setSpeechEnabled(v => !v)}
              className="text-gray-500 hover:text-green-400 h-9 w-9 sm:flex hidden"
              title={isSpeaking ? "Stop speaking" : speechEnabled ? "Mute" : "Unmute"}
            >
              {isSpeaking || !speechEnabled ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>

             <Button
                variant="ghost"
                size="icon"
                onClick={clearChat}
                className="text-gray-500 hover:text-red-400 h-9 w-9 sm:flex hidden"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            
            <Badge variant="outline" className={`${statusColor} hidden sm:flex px-2 py-0.5 border-green-500/30`}>
              {statusLabel}
            </Badge>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-400 hover:text-white h-10 w-10 sm:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Expandable Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="grid grid-cols-2 gap-2 mt-4 sm:hidden animate-in slide-in-from-top-2 duration-200">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => { setSpeechEnabled(!speechEnabled); setIsMobileMenuOpen(false); }}
              className="bg-gray-800/50 text-gray-300 border-gray-700 h-9"
            >
              {speechEnabled ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
              {speechEnabled ? "Mute" : "Unmute"}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => { clearChat(); setIsMobileMenuOpen(false); }}
              className="bg-gray-800/50 text-red-400 border-gray-700 h-9"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        )}
      </CardHeader>

      {/* ── Messages Container ── */}
      <CardContent className="p-0 flex flex-col flex-1 min-h-0 bg-transparent">
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6 scroll-smooth"
        >
          {messages.map(msg => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isLoading && <LoadingIndicator />}
          <div ref={messagesEndRef} className="h-4" />
        </div>

        {/* ── Action-Oriented Input Area ── */}
        <div className="p-3 sm:p-5 border-t border-gray-800/50 bg-gray-900/80 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Input
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Message..."
                className="h-12 bg-gray-800/40 border-gray-700/50 text-white rounded-2xl px-4 text-base focus-visible:ring-green-500/30 focus-visible:border-green-500/50 transition-all placeholder:text-gray-500"
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center gap-1.5">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={isRecording ? stopRecording : startRecording}
                className={`h-12 w-12 rounded-2xl transition-all ${
                  isRecording 
                    ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" 
                    : "bg-gray-800/40 text-gray-400 hover:text-green-400"
                }`}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>

              <Button
                type="submit"
                size="icon"
                disabled={!inputText.trim() || isLoading}
                className="h-12 w-12 rounded-2xl bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20 disabled:bg-gray-800 disabled:text-gray-600"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </Button>
            </div>
          </form>
          <p className="hidden sm:block text-[10px] text-center text-gray-600 mt-3 font-medium uppercase tracking-widest">
            Powered by Moses' Custom AI Logic
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Avatar({ role }: { role: "user" | "assistant" }) {
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
        role === "assistant"
          ? "bg-gradient-to-br from-green-500/25 to-lime-400/10"
          : "bg-gradient-to-br from-orange-500/25 to-red-500/10"
      }`}
    >
      {role === "assistant" ? (
        <Bot className="w-4 h-4 text-green-400" />
      ) : (
        <User className="w-4 h-4 text-orange-400" />
      )}
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 items-start ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <Avatar role={message.role} />

      <div
        className={`max-w-[82%] sm:max-w-[78%] rounded-2xl px-4 py-3 shadow-sm ${
          isUser
            ? "rounded-tr-sm bg-green-700/25 border border-green-500/25 text-green-50"
            : "rounded-tl-sm bg-gray-800/60 border border-gray-700/50 text-gray-100"
        }`}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose-custom">{parseMarkdown(message.content)}</div>
        )}

        <p className={`text-[11px] mt-2 ${isUser ? "text-green-400/50 text-right" : "text-gray-600"}`}>
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  );
}

function LoadingIndicator() {
  return (
    <div className="flex gap-3 items-start">
      <Avatar role="assistant" />
      <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
