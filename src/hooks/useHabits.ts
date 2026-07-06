import { useState, useEffect, useCallback } from 'react';
import { Habit, Stats } from '../types';
import { loadHabits, saveHabits } from '../services/storage';
import { calculateStreak, getToday } from '../utils/streak';

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(() => loadHabits());

  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  const addHabit = useCallback((data: Omit<Habit, 'id' | 'createdAt' | 'completedDates'>) => {
    const newHabit: Habit = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      completedDates: [],
    };
    setHabits(prev => [...prev, newHabit]);
  }, []);

  const updateHabit = useCallback((id: string, updates: Partial<Habit>) => {
    setHabits(prev => prev.map(h => (h.id === id ? { ...h, ...updates } : h)));
  }, []);

  const deleteHabit = useCallback((id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  }, []);

  const toggleComplete = useCallback((id: string) => {
    const today = getToday();
    setHabits(prev =>
      prev.map(h => {
        if (h.id !== id) return h;
        const has = h.completedDates.includes(today);
        return {
          ...h,
          completedDates: has
            ? h.completedDates.filter(d => d !== today)
            : [...h.completedDates, today],
        };
      })
    );
  }, []);

  const getStreak = useCallback((habit: Habit): number => {
    return calculateStreak(habit.completedDates);
  }, []);

  const getStats = useCallback((): Stats => {
    const today = getToday();
    const completedToday = habits.filter(h => h.completedDates.includes(today)).length;
    const bestStreak = habits.reduce(
      (max, h) => Math.max(max, calculateStreak(h.completedDates)),
      0
    );
    return {
      totalHabits: habits.length,
      completedToday,
      bestStreak,
    };
  }, [habits]);

  return {
    habits,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleComplete,
    getStreak,
    getStats,
  };
}
