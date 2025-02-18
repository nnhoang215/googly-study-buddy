interface FlashCard {
  question: string;
  answer: string;
};

interface GenerateRequestBody {
  textDescription?: string;
  quantity?: number;
  setting?: string;
}

export type { FlashCard, GenerateRequestBody };