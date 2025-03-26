import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, MapPin, Trash2, Plus, ArrowUp, ArrowDown } from "lucide-react";

export interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
}

interface EventListProps {
  events: Event[];
  onChange: (events: Event[]) => void;
  sectionTitle?: string;
  onSectionTitleChange?: (title: string) => void;
}

export const EventList = ({ 
  events, 
  onChange, 
  sectionTitle = "Upcoming Events", 
  onSectionTitleChange 
}: EventListProps) => {
  
  const addEvent = () => {
    const newEvent: Event = {
      id: `event-${Date.now()}`,
      title: "",
      date: "",
      time: "",
      location: "",
      description: ""
    };
    onChange([...events, newEvent]);
  };

  const updateEvent = (id: string, updates: Partial<Event>) => {
    onChange(
      events.map(event => 
        event.id === id ? { ...event, ...updates } : event
      )
    );
  };

  const removeEvent = (id: string) => {
    onChange(events.filter(event => event.id !== id));
  };

  const moveEvent = (id: string, direction: "up" | "down") => {
    const index = events.findIndex(event => event.id === id);
    if (
      (direction === "up" && index === 0) || 
      (direction === "down" && index === events.length - 1)
    ) {
      return;
    }

    const newEvents = [...events];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    
    [newEvents[index], newEvents[newIndex]] = [newEvents[newIndex], newEvents[index]];
    onChange(newEvents);
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Label htmlFor="section-title" className="text-sm font-medium">Section Title</Label>
          <Input
            id="section-title"
            value={sectionTitle}
            onChange={(e) => onSectionTitleChange?.(e.target.value)}
            className="mt-1"
          />
        </div>
        <div className="ml-4 mt-6">
          <Button 
            type="button" 
            onClick={addEvent} 
            variant="outline" 
            size="sm"
            className="gap-1"
          >
            <Plus size={14} />
            Add Event
          </Button>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-8 border rounded-lg bg-muted/10">
          <p className="text-muted-foreground">No events added yet</p>
          <Button 
            type="button" 
            onClick={addEvent} 
            variant="outline" 
            size="sm" 
            className="mt-2"
          >
            Add Your First Event
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event, index) => (
            <div 
              key={event.id} 
              className="border rounded-lg p-4 bg-card relative group"
            >
              <div className="absolute right-2 top-2 flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0"
                  onClick={() => moveEvent(event.id, "up")}
                  disabled={index === 0}
                >
                  <ArrowUp size={14} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0"
                  onClick={() => moveEvent(event.id, "down")}
                  disabled={index === events.length - 1}
                >
                  <ArrowDown size={14} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 text-destructive"
                  onClick={() => removeEvent(event.id)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>

              <div className="space-y-3 pt-4">
                <div>
                  <Label htmlFor={`${event.id}-title`} className="text-sm font-medium">Event Title</Label>
                  <Input
                    id={`${event.id}-title`}
                    value={event.title}
                    onChange={(e) => updateEvent(event.id, { title: e.target.value })}
                    placeholder="Webinar: Introduction to AI"
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor={`${event.id}-date`} className="text-sm font-medium">Date</Label>
                    <Input
                      id={`${event.id}-date`}
                      type="date"
                      value={event.date}
                      onChange={(e) => updateEvent(event.id, { date: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`${event.id}-time`} className="text-sm font-medium">Time (Optional)</Label>
                    <Input
                      id={`${event.id}-time`}
                      value={event.time || ""}
                      onChange={(e) => updateEvent(event.id, { time: e.target.value })}
                      placeholder="2:00 PM EST"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor={`${event.id}-location`} className="text-sm font-medium">Location (Optional)</Label>
                  <Input
                    id={`${event.id}-location`}
                    value={event.location || ""}
                    onChange={(e) => updateEvent(event.id, { location: e.target.value })}
                    placeholder="Virtual / Zoom / Physical location"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor={`${event.id}-description`} className="text-sm font-medium">Description (Optional)</Label>
                  <Textarea
                    id={`${event.id}-description`}
                    value={event.description || ""}
                    onChange={(e) => updateEvent(event.id, { description: e.target.value })}
                    placeholder="Brief description of the event"
                    className="mt-1"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="border-t pt-4">
        <h4 className="text-sm font-medium mb-3">Preview</h4>
        <div className="border rounded-lg p-4 bg-white">
          <h2 className="text-xl font-bold mb-4">{sectionTitle}</h2>
          
          {events.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No events to display</p>
          ) : (
            <div className="space-y-6">
              {events.map(event => (
                <div key={event.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <h3 className="font-medium text-lg">{event.title || "Event Title"}</h3>
                  
                  <div className="flex flex-wrap gap-y-2 mt-2 text-sm text-muted-foreground">
                    {event.date && (
                      <div className="flex items-center mr-4">
                        <Calendar size={14} className="mr-1 flex-shrink-0" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                    )}
                    
                    {event.time && (
                      <div className="flex items-center mr-4">
                        <Clock size={14} className="mr-1 flex-shrink-0" />
                        <span>{event.time}</span>
                      </div>
                    )}
                    
                    {event.location && (
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1 flex-shrink-0" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                  
                  {event.description && (
                    <p className="mt-2 text-sm">{event.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 