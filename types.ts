/** @format */

export interface Buttontype {
  color:
    | "primary"
    | "default"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
  variant:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost"
    | undefined;
  onPress: () => void;
  buttonLabel: string;
}

export interface Comments {
  type: number;
  comment: string;
  score: number;
}

export interface CommentData {
  type: number;
  comment: string;
  positive_score: number;
  negative_score: number;
  neutral_score: number;
}
export interface SearchPrompt {
  youtubeLink: string;
  model: string;
  comment: number;
  page_number: string;
}

export interface CommentDataPaginationState {
  [key: number]: CommentData[]; // You might want to replace 'any' with a more specific type
}

export type User =
  | {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    }
  | undefined;

export type TextDataEntry = {
  negative_score: number;
  neutral_score: number;
  positive_score: number;
  type: number;
};

export type ModelData = {
  negative_score: number;
  neutral_score: number;
  positive_score: number;
  type: number;
};

export type TextDataMap = {
  GRU: ModelData;
  LSTM: ModelData;
  RNN: ModelData;
  Roberta: ModelData;
  comment: string;
};
