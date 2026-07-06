export interface Habit {
  id: string;
  name: string;
  category: string;
  color: string;
  icon: string;
  createdAt: string;
  completedDates: string[];
}

export type Theme = 'dark' | 'light';

export interface Stats {
  totalHabits: number;
  completedToday: number;
  bestStreak: number;
}
