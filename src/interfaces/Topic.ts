import { Note } from "./Note";

export interface Subject {
  id: number;
  title: string;
}

export interface TopicContextType {
  topic : Topic;
}

export interface Topic {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  subject: Subject;
  notes: Note[];
  questions: any[];
}
