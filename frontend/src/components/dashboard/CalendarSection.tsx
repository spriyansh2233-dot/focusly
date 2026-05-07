import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type EventType = "Study" | "Revision" | "Quiz" | "Exam" | "Goal";

interface Event {
  id: string;
  date: number; // Day of month
  type: EventType;
  title: string;
  completed: boolean;
}

const EVENT_COLORS: Record<EventType, string> = {
  Study: "bg-blue-500",
  Revision: "bg-purple-500",
  Quiz: "bg-amber-500",
  Exam: "bg-rose-500",
  Goal: "bg-emerald-500",
};

export function CalendarSection() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [events, setEvents] = useState<Event[]>([
    { id: "1", date: new Date().getDate(), type: "Study", title: "React Hooks Deep Dive", completed: false },
    { id: "2", date: new Date().getDate() + 1, type: "Quiz", title: "Intro to AI Quiz", completed: false },
    { id: "3", date: new Date().getDate() - 1, type: "Revision", title: "CSS Grid Review", completed: true },
  ]);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

  const toggleEvent = (id: string) => {
    setEvents(events.map(e => e.id === id ? { ...e, completed: !e.completed } : e));
  };

  return (
    <Card className="elevated overflow-hidden border-border/50">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-4 bg-muted/20">
        <div className="flex items-center gap-2">
          <CalendarIcon className="text-primary w-5 h-5" />
          <CardTitle className="text-lg">Schedule</CardTitle>
        </div>
        <div className="flex items-center gap-1 bg-background/50 rounded-lg p-1 border border-border/50">
          <Button variant="ghost" size="icon" onClick={prevMonth} className="h-7 w-7">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-[10px] font-bold uppercase tracking-wider min-w-[70px] text-center">
            {monthNames[currentDate.getMonth()].slice(0, 3)} {currentDate.getFullYear()}
          </span>
          <Button variant="ghost" size="icon" onClick={nextMonth} className="h-7 w-7">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex flex-col">
        {/* Calendar Grid */}
        <div className="p-5 border-b border-border/50 bg-background">
          <div className="grid grid-cols-7 gap-1 mb-3">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
              <div key={d} className="text-center text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                {d.slice(0, 1)}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="h-10" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const hasEvents = events.some(e => e.date === day);
              const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth();
              const isSelected = day === selectedDate;

              return (
                <motion.div
                  key={day}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -2,
                    zIndex: 10,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedDate(day)}
                  className={`h-10 relative flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all ${
                    isSelected ? "bg-primary text-primary-foreground shadow-[0_5px_15px_rgba(37,99,235,0.4)]" : 
                    isToday ? "bg-primary/10 text-primary border border-primary/20" : "hover:bg-muted"
                  }`}
                >
                  <span className="text-xs font-bold">{day}</span>
                  {hasEvents && !isSelected && (
                    <div className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Selected Day Events */}
        <div className="flex-1 bg-muted/30 p-5 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold flex items-center gap-2 text-foreground uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-primary" />
              {selectedDate} {monthNames[currentDate.getMonth()]}
            </h4>
            <Badge variant="outline" className="rounded-full text-[10px] bg-background/50">
              {events.filter(e => e.date === selectedDate).length} Tasks
            </Badge>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-hide">
            <AnimatePresence mode="popLayout">
              {events.filter(e => e.date === selectedDate).map((event) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className={`p-3 rounded-2xl border border-border/50 bg-background/50 hover:border-primary/30 hover:shadow-sm transition-all group cursor-pointer ${event.completed ? 'opacity-50' : ''}`}
                  onClick={() => toggleEvent(event.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center border transition-colors ${event.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-border group-hover:border-primary'}`}>
                      {event.completed && <CheckCircle2 className="w-3 h-3" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${EVENT_COLORS[event.type]}`} />
                        <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                          {event.type}
                        </span>
                      </div>
                      <p className={`text-xs font-bold truncate ${event.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {event.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              {events.filter(e => e.date === selectedDate).length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-30 py-8">
                  <CalendarIcon className="w-8 h-8 mb-2" />
                  <p className="text-[10px] font-bold">CLEAR DAY</p>
                </div>
              )}
            </AnimatePresence>
          </div>
          
          <Button variant="outline" size="sm" className="w-full mt-4 rounded-xl border-dashed border-border/50 hover:border-primary transition-colors text-[10px] font-bold h-9">
            <Plus className="w-3 h-3 mr-1" /> New Study Task
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
