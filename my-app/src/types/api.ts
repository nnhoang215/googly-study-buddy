import { Flashcard } from "@/types/flashcard";

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface FlashcardSet {
  id: string;
  name: string;
  flashcards: Flashcard[];
  tags: string[];
}