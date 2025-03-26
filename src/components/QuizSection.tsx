import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, GripVertical } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  heading?: string;
  footerText?: string;
  buttonText?: string;
}

interface QuizSectionProps {
  question: QuizQuestion;
  onChange: (question: QuizQuestion) => void;
}

export const QuizSection = ({ question, onChange }: QuizSectionProps) => {
  const updateQuestion = (updates: Partial<QuizQuestion>) => {
    onChange({ ...question, ...updates });
  };

  const addOption = () => {
    const newOption: QuizOption = {
      id: `option-${Date.now()}`,
      text: ""
    };
    updateQuestion({ options: [...question.options, newOption] });
  };

  const updateOption = (id: string, text: string) => {
    updateQuestion({
      options: question.options.map(opt => 
        opt.id === id ? { ...opt, text } : opt
      )
    });
  };

  const removeOption = (id: string) => {
    updateQuestion({
      options: question.options.filter(opt => opt.id !== id)
    });
  };

  const moveOption = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= question.options.length) return;
    
    const newOptions = [...question.options];
    const [movedOption] = newOptions.splice(fromIndex, 1);
    newOptions.splice(toIndex, 0, movedOption);
    
    updateQuestion({ options: newOptions });
  };

  return (
    <div className="space-y-4 border rounded-md p-4">
      <div className="space-y-4">
        <div>
          <Label htmlFor="quiz-heading" className="text-sm font-medium">Quiz Section Heading</Label>
          <Input
            id="quiz-heading"
            value={question.heading || ""}
            onChange={(e) => updateQuestion({ heading: e.target.value })}
            placeholder="Check Your Knowledge"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="quiz-question" className="text-sm font-medium">Question</Label>
          <Textarea
            id="quiz-question"
            value={question.question}
            onChange={(e) => updateQuestion({ question: e.target.value })}
            placeholder="Enter your quiz question"
            className="mt-1"
            rows={2}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Answer Options</Label>
            <Button 
              type="button" 
              size="sm" 
              variant="outline" 
              onClick={addOption}
              className="h-7 px-2 text-xs"
            >
              <Plus size={12} className="mr-1" /> Add Option
            </Button>
          </div>

          {question.options.length === 0 ? (
            <div className="text-sm text-muted-foreground py-3 text-center border rounded-md">
              No options added yet
            </div>
          ) : (
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <div key={option.id} className="flex items-center gap-2 border rounded-md p-2 bg-muted/10">
                  <div className="cursor-grab">
                    <GripVertical size={16} className="text-muted-foreground" />
                  </div>
                  <div className="w-5 h-5 rounded-full border flex items-center justify-center text-xs">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <Input
                    value={option.text}
                    onChange={(e) => updateOption(option.id, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1 h-8 text-sm"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeOption(option.id)}
                    className="h-7 w-7 p-0"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="quiz-footer" className="text-sm font-medium">Footer Text (Optional)</Label>
          <Textarea
            id="quiz-footer"
            value={question.footerText || ""}
            onChange={(e) => updateQuestion({ footerText: e.target.value })}
            placeholder="Additional information or context for the quiz"
            className="mt-1"
            rows={2}
          />
        </div>

        <div>
          <Label htmlFor="button-text" className="text-sm font-medium">Button Text</Label>
          <Input
            id="button-text"
            value={question.buttonText || "Submit Answer"}
            onChange={(e) => updateQuestion({ buttonText: e.target.value })}
            placeholder="Submit Answer"
            className="mt-1"
          />
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-sm font-medium mb-3">Preview</h4>
        <div className="border rounded-lg p-4 bg-card">
          {question.heading && <h3 className="text-lg font-semibold mb-3">{question.heading}</h3>}
          <p className="mb-4">{question.question}</p>
          
          <div className="space-y-2 mb-4">
            {question.options.map((option, index) => (
              <div key={option.id} className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center text-xs mt-0.5">
                  {String.fromCharCode(65 + index)}
                </div>
                <p>{option.text || `Option ${index + 1}`}</p>
              </div>
            ))}
          </div>
          
          {question.footerText && <p className="text-sm text-muted-foreground mb-4">{question.footerText}</p>}
          
          <div className="flex justify-center">
            <Button className="px-4">
              {question.buttonText || "Submit Answer"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}; 