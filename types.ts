
export interface Service {
  title: string;
  desc: string;
  img: string;
}

export interface Project {
  id: number;
  size: string;
  img: string;
}

// Define ChatMessage interface for AI consultant conversation history and grounding sources
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  sources?: {
    web?: {
      uri: string;
      title: string;
    }
  }[];
}
