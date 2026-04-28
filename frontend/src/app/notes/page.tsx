"use client";

import { useEffect, useState, useRef } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { H1, Body } from "@/components/ui/typography";
import { getNotes, uploadNote, searchNotes, createNote } from "@/lib/api";
import { Plus, Upload, FileText, Search, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotesPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const loadNotes = () => {
    setLoading(true);
    getNotes()
      .then(setNotes)
      .catch((err) => console.error("Failed to load notes:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      loadNotes();
      return;
    }
    setLoading(true);
    searchNotes(searchQuery)
      .then(setNotes)
      .catch((err) => console.error("Search failed:", err))
      .finally(() => setLoading(false));
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const newNote = await uploadNote(file);
      router.push(`/notes/${newNote.id}`);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload file. Make sure it's a TXT, PDF, or DOCX.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleCreateNew = async () => {
    try {
      setLoading(true);
      const newNote = await createNote("Untitled Note", "Start typing your notes here...");
      window.location.href = `/notes/${newNote.id}`;
    } catch (err) {
      console.error("Failed to create note:", err);
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <H1>Smart Notes</H1>
            <Body className="text-muted-foreground mt-1">
              Store your study notes and let AI summarize them for you.
            </Body>
          </div>
          <div className="flex items-center gap-3">
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef}
              accept=".txt,.pdf,.docx"
              onChange={handleUpload}
            />
            <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
              {uploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
              Upload File
            </Button>
            <Button onClick={handleCreateNew}>
              <Plus className="w-4 h-4 mr-2" />
              New Note
            </Button>
          </div>
        </div>

        <Card className="p-2 flex items-center gap-2">
          <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2">
            <Search className="w-5 h-5 text-muted-foreground ml-2" />
            <input 
              type="text"
              placeholder="Search your notes..."
              className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-sm py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" variant="ghost" size="sm">Search</Button>
          </form>
        </Card>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-border rounded-xl">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No notes found</h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              You haven't created any notes yet. Create a new note or upload a file to get started.
            </p>
            <Button onClick={handleCreateNew}>Create your first Note</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <Link key={note.id} href={`/notes/${note.id}`}>
                <Card variant="interactive" className="p-5 h-full flex flex-col group">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                        {note.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                    {note.content || "Empty note"}
                  </p>
                  {note.summary && (
                    <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      AI Summary Available
                    </div>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
