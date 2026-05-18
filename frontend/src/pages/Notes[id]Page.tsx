import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getNote, updateNote, deleteNote, createNote, summarizeNote } from "@/lib/api";
import { Loader2, ArrowLeft, Save, Trash2, Sparkles, Copy, Download, Check } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ReactMarkdown from "react-markdown";

export default function NoteEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);
  const [note, setNote] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [summarizing, setSummarizing] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useNavigate();

  useEffect(() => {
    params.then((p) => {
      setId(p.id);
      if (p.id === "new") {
        setLoading(false);
      } else {
        getNote(p.id)
          .then((n) => {
            setNote(n);
            setTitle(n.title || "");
            setContent(n.content || "");
          })
          .catch((err) => {
            console.error(err);
            alert("Note not found");
            router("/notes");
          })
          .finally(() => setLoading(false));
      }
    });
  }, [params, router]);

  const handleSave = async () => {
    if (!title.trim()) return alert("Please enter a title");
    setSaving(true);
    try {
      if (id === "new") {
        const newNote = await createNote(title, content);
        router(`/notes/${newNote.id}`);
      } else {
        await updateNote(id as string, title, content);
        alert("Saved successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save note");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    try {
      await deleteNote(id as string);
      router("/notes");
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  const handleSummarize = async () => {
    if (id === "new") {
      alert("Please save the note first before summarizing.");
      return;
    }
    setSummarizing(true);
    try {
      const summary = await summarizeNote(id as string);
      setNote({ ...note, summary });
    } catch (err) {
      console.error(err);
      alert("Failed to generate AI summary. Try again later.");
    } finally {
      setSummarizing(false);
    }
  };

  const handleCopySummary = () => {
    if (!note?.summary) return;
    const text = `SUMMARY\n${note.summary.summary}\n\nBULLETS\n${note.summary.bulletPoints}\n\nKEYWORDS\n${note.summary.keywords}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto h-full flex flex-col pb-6">
        <div className="flex items-center justify-between mb-6">
          <Link to="/notes" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Notes
          </Link>
          <div className="flex items-center gap-2">
            {id !== "new" && (
              <Button variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            )}
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save
            </Button>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
          {/* Editor Area */}
          <div className={`col-span-1 flex flex-col min-h-0 ${note?.summary ? "lg:col-span-7" : "lg:col-span-8 lg:col-start-3"}`}>
            <input
              type="text"
              placeholder="Note Title"
              className="text-3xl font-bold bg-transparent border-none outline-none focus:ring-0 mb-4 px-0 placeholder:text-muted-foreground/50"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Card className="flex-1 overflow-hidden flex flex-col p-0">
              <textarea
                placeholder="Start typing your note here... Or paste your study material."
                className="flex-1 w-full p-6 bg-transparent border-none outline-none focus:ring-0 resize-none font-medium leading-relaxed"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Card>
          </div>

          {/* AI Summary Panel */}
          {id !== "new" && (
            <div className="col-span-1 lg:col-span-5 flex flex-col min-h-0 space-y-4">
              <Card className="p-6 flex flex-col items-center justify-center text-center bg-primary/5 border-primary/20 shrink-0">
                <Sparkles className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-lg mb-2">Smart AI Summarization</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Turn long text into quick revision bullet points and key concepts.
                </p>
                <Button onClick={handleSummarize} disabled={summarizing || !content.trim()} className="w-full sm:w-auto">
                  {summarizing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Generate Summary"}
                </Button>
              </Card>

              {note?.summary && (
                <Card className="flex-1 flex flex-col min-h-0 overflow-hidden bg-background">
                  <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" /> AI Summary
                    </h4>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={handleCopySummary}>
                        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="p-6 overflow-y-auto flex-1 space-y-6">
                    <div>
                      <h5 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">Quick Summary</h5>
                      <p className="text-sm leading-relaxed">{note.summary.summary}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">Revision Bullets</h5>
                      <div className="text-sm space-y-2 prose prose-sm dark:prose-invert">
                         <ReactMarkdown>{note.summary.bulletPoints}</ReactMarkdown>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">Keywords</h5>
                      <div className="flex flex-wrap gap-2">
                        {note.summary.keywords?.split(',').map((kw: string, i: number) => (
                          <span key={i} className="px-2 py-1 bg-secondary rounded-md text-xs font-medium">
                            {kw.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                    {note.summary.formulas && note.summary.formulas.trim() !== "" && (
                      <div>
                        <h5 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">Formulas & Key Equations</h5>
                        <div className="text-sm space-y-2 prose prose-sm dark:prose-invert bg-secondary/30 p-4 rounded-xl">
                           <ReactMarkdown>{note.summary.formulas}</ReactMarkdown>
                        </div>
                      </div>
                    )}
                    {note.summary.interviewPoints && note.summary.interviewPoints.trim() !== "" && (
                      <div>
                        <h5 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">Interview Points</h5>
                        <div className="text-sm space-y-2 prose prose-sm dark:prose-invert">
                           <ReactMarkdown>{note.summary.interviewPoints}</ReactMarkdown>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
