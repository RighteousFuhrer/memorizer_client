export interface Note {
  id?: number;
  type: "kanji" | "word" | "paragraph";
  topicId: number;
  paragraph?: Paragraph;
  kanji?: Kanji;
  word?: Word;
}

export interface Paragraph {
  title: string;
  text: string;
  link: string;
}

export interface Word {
  katakana: string;
  hirogana: string;
  romanji: string;
  kanji?: string;
  translation: { translation: string }[];
}

export interface Kanji {
  link: string;
  symbol: string;
  examples: { example: string }[];
  forms: { form: string }[];
  translations: { translation: string }[];
}
