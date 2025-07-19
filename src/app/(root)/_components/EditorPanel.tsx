"use client";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect, useState, useCallback } from "react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../_constants";
import { Editor, Monaco } from "@monaco-editor/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { RotateCcwIcon, ShareIcon, TypeIcon } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { EditorPanelSkeleton } from "./EditorPannelSkeleton";
import useMounted from "@/hooks/useMounted";
import ShareSnippetDialog from "./ShareSnippetDialog";
import debounce from "lodash.debounce";

// Define types for suggestions
interface Suggestion {
  label: string;
  kind: any; // Monaco's CompletionItemKind
  insertText: string;
  range?: any; // Monaco's Range for suggestion placement
}

function EditorPanel() {
  const clerk = useClerk();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const { language, theme, fontSize, editor, setFontSize, setEditor } =
    useCodeEditorStore();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const mounted = useMounted();

  // Fetch suggestions from API based on cursor position
  const fetchSuggestions = useCallback(
    debounce(async (code: string, cursorPosition: { lineNumber: number; column: number }) => {
      try {
        // Get the current line up to the cursor
        const lines = code.split("\n");
        const currentLine = lines[cursorPosition.lineNumber - 1]?.slice(0, cursorPosition.column - 1) || "";
        const codeUpToCursor = lines.slice(0, cursorPosition.lineNumber - 1).join("\n") + "\n" + currentLine;

        const response = await fetch("/api/codegeex", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cursorText: codeUpToCursor, language }),
        });
        const data = await response.json();
        if (data.suggestions) {
          // Map API suggestions to Monaco's completion items
          const mappedSuggestions: Suggestion[] = data.suggestions
            .filter((suggestion: string) => suggestion.trim()) // Ensure non-empty suggestions
            .map((suggestion: string, index: number) => ({
              label: suggestion.slice(0, 50), // Shorten for display
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: suggestion,
              range: null as any, // Will be set by Monaco
            }));
          setSuggestions(mappedSuggestions);
        }
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
      }
    }, 500),
    [language]
  );

  // Register Monaco completion provider
  useEffect(() => {
    if (!editor || !monaco) return;

    const provider = monaco.languages.registerCompletionItemProvider(language, {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };
        return {
          suggestions: suggestions.map((suggestion) => ({
            ...suggestion,
            range,
          })),
        };
      },
      triggerCharacters: [".", " ", "\n", "(", "["], // Add more trigger characters as needed
    });

    return () => provider.dispose(); // Cleanup on unmount or language change
  }, [editor, suggestions, language]);

  // Save code and fetch suggestions on change
  const handleEditorChange = (value: string | undefined) => {
    if (value && editor) {
      localStorage.setItem(`editor-code-${language}`, value);
      const position = editor.getPosition();
      if (position) {
        fetchSuggestions(value, position); // Pass cursor position
      }
    }
  };

  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${language}`);
    const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(newCode);
  }, [language, editor]);

  useEffect(() => {
    const savedFontSize = localStorage.getItem("editor-font-size");
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
  }, [setFontSize]);

  const handleRefresh = () => {
    const defaultCode = LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(defaultCode);
    localStorage.removeItem(`editor-code-${language}`);
    setSuggestions([]); // Clear suggestions on refresh
  };

  const handleFontSizeChange = (newSize: number) => {
    const size = Math.min(Math.max(newSize, 12), 24);
    setFontSize(size);
    localStorage.setItem("editor-font-size", size.toString());
  };

  if (!mounted) return null;

  return (
    <div className="relative">
      <div className="relative bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/[0.05] p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1e1e2e] ring-1 ring-white/5">
              <Image
                src={"/" + language + ".png"}
                alt="Logo"
                width={24}
                height={24}
              />
            </div>
            <div>
              <h2 className="text-sm font-medium text-white">Code Editor</h2>
              <p className="text-xs text-gray-500">
                Write and execute your code
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Font Size Slider */}
            <div className="flex items-center gap-3 px-3 py-2 bg-[#1e1e2e] rounded-lg ring-1 ring-white/5">
              <TypeIcon className="size-4 text-gray-400" />
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={fontSize}
                  onChange={(e) =>
                    handleFontSizeChange(parseInt(e.target.value))
                  }
                  className="w-20 h-1 bg-gray-600 rounded-lg cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-400 min-w-[2rem] text-center">
                  {fontSize}
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="p-2 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-lg ring-1 ring-white/5 transition-colors"
              aria-label="Reset to default code"
            >
              <RotateCcwIcon className="size-4 text-gray-400" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsShareDialogOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg overflow-hidden bg-gradient-to-r
               from-blue-500 to-blue-600 opacity-90 hover:opacity-100 transition-opacity"
            >
              <ShareIcon className="size-4 text-white" />
              <span className="text-sm font-medium text-white ">Share</span>
            </motion.button>
          </div>
        </div>

        {/* Editor */}
        <div className="relative group rounded-xl overflow-hidden ring-1 ring-white/[0.05]">
          {clerk.loaded && (
            <Editor
              height="600px"
              language={LANGUAGE_CONFIG[language].monacoLanguage}
              onChange={handleEditorChange}
              theme={theme}
              beforeMount={(monaco) => {
                defineMonacoThemes(monaco);
                (window as any).monaco = monaco; // Ensure monaco is globally accessible
              }}
              onMount={(editor, monaco) => {
                setEditor(editor);
                // Initial fetch for suggestions
                const initialCode = editor.getValue();
                if (initialCode) {
                  const position = editor.getPosition() || { lineNumber: 1, column: 1 };
                  fetchSuggestions(initialCode, position);
                }
              }}
              options={{
                minimap: { enabled: false },
                fontSize,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
                renderWhitespace: "selection",
                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                fontLigatures: true,
                cursorBlinking: "smooth",
                smoothScrolling: true,
                contextmenu: true,
                renderLineHighlight: "all",
                lineHeight: 1.6,
                letterSpacing: 0.5,
                roundedSelection: true,
                scrollbar: {
                  verticalScrollbarSize: 8,
                  horizontalScrollbarSize: 8,
                },
                suggestOnTriggerCharacters: true,
                acceptSuggestionOnEnter: "on",
              }}
            />
          )}

          {!clerk.loaded && <EditorPanelSkeleton />}
        </div>
      </div>
      {isShareDialogOpen && (
        <ShareSnippetDialog onClose={() => setIsShareDialogOpen(false)} />
      )}
    </div>
  );
}

export default EditorPanel;