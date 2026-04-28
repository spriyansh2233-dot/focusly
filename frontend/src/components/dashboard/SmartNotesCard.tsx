"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { H3 } from "@/components/ui/typography";
import { FileText, Loader2, Plus, Sparkles, ChevronRight } from "lucide-react";
import { getNotes } from "@/lib/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function SmartNotesCard() {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getNotes();
        setNotes(data.slice(0, 3));
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <Card className="flex flex-col h-full col-span-1 md:col-span-2 lg:col-span-1 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
      <div className="p-5 border-b border-border flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <H3>Smart Notes</H3>
        </div>
        <Link href="/notes" className="text-xs font-semibold text-primary hover:underline flex items-center">
          View All <ChevronRight className="w-3 h-3 ml-1" />
        </Link>
      </div>
      <div className="p-5 flex-1 flex flex-col z-10">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
            <p className="text-xs font-bold uppercase tracking-wider">Failed to load notes</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <p className="text-sm text-muted-foreground mb-4">No notes yet.</p>
            <Button variant="outline" size="sm" onClick={() => router.push("/notes/new")}>
              <Plus className="w-4 h-4 mr-2" /> Create First Note
            </Button>
          </div>
        ) : (
          <div className="space-y-3 flex-1">
            {notes.map((note) => (
              <div key={note.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-pointer" onClick={() => router.push(`/notes/${note.id}`)}>
                <div className="flex-1 min-w-0 pr-4">
                  <p className="text-sm font-medium text-foreground truncate">{note.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{new Date(note.createdAt).toLocaleDateString()}</p>
                </div>
                {note.summary ? (
                  <Sparkles className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                ) : (
                  <Button variant="ghost" size="sm" className="h-7 text-xs flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    Summarize
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
