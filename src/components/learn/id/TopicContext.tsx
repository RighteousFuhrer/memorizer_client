import { TopicContextType } from "@/interfaces/Topic";
import { createContext } from "react";

export const TopicContext = createContext<TopicContextType | null>(null);
