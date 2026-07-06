import { Habit, Theme } from '../types';

const HABITS_KEY = 'habit-tracker-habits';
const THEME_KEY = 'habit-tracker-theme';

export function loadHabits(): Habit[] {
  try {
    const data = localStorage.getItem(HABITS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveHabits(habits: Habit[]): void {
  localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
}

export function loadTheme(): Theme {
  try {
    const data = localStorage.getItem(THEME_KEY);
    if (data === 'light' || data === 'dark') return data;
    return 'dark';
  } catch {
    return 'dark';
  }
}

export function saveTheme(theme: Theme): void {
  localStorage.setItem(THEME_KEY, theme);
}
