export interface Mentor {
  id: string;
  name: string;
  college: string;
  branch: string;
  rating: number;
  price: number;
  duration: number;
  avatarUrl: string;
  tags: string[];
  isVerified: boolean;
  isTopMentor?: boolean;
  rank?: string;
  cgpa?: number;
  bio?: string;
  availability?: string[]; // e.g. ["Mon 10:00 AM", "Wed 2:00 PM"]
  reviews?: Review[];
}

export interface Review {
  id: string;
  studentName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Session {
  id: string;
  title: string;
  mentorName: string;
  date: string;
  time: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface Recommendation {
  id: string;
  name: string;
  college: string;
  branch: string;
  rating: number;
  tags: string[];
  avatarUrl: string;
}
