import { useState } from 'react';
import { Habit } from '../types';
import { useHabits } from '../hooks/useHabits';
import { useTheme } from '../hooks/useTheme';
import { HabitCard } from '../components/HabitCard';
import { HabitForm } from '../components/HabitForm';
import { StatsPanel } from '../components/StatsPanel';
import { ThemeToggle } from '../components/ThemeToggle';

export function Dashboard() {
  const { habits, addHabit, updateHabit, deleteHabit, toggleComplete, getStats } =
    useHabits();
  const { theme, toggleTheme } = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const stats = getStats();

  const handleSubmit = (data: {
    name: string;
    color: string;
    icon: string;
    category: string;
  }) => {
    if (editingHabit) {
      updateHabit(editingHabit.id, data);
    } else {
      addHabit(data);
    }
    setShowForm(false);
    setEditingHabit(null);
  };

  const handleEdit = (habit: Habit) => {
    setEditingHabit(habit);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingHabit(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-lg mx-auto px-4 py-6 pb-24">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Habit Tracker
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {new Date().toLocaleDateString('en', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>

        <StatsPanel stats={stats} />

        <div className="mt-6 space-y-3">
          {habits.map(habit => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggle={toggleComplete}
              onEdit={handleEdit}
              onDelete={deleteHabit}
            />
          ))}
        </div>

        {habits.length === 0 && (
          <div className="mt-16 text-center text-gray-400 dark:text-gray-500">
            <p className="text-5xl mb-3">📋</p>
            <p className="text-lg font-medium">No habits yet</p>
            <p className="text-sm mt-1">Tap + to create your first habit</p>
          </div>
        )}

        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 flex items-center justify-center text-3xl font-light"
        >
          +
        </button>

        {showForm && (
          <HabitForm
            onSubmit={handleSubmit}
            onClose={handleClose}
            initial={editingHabit || undefined}
          />
        )}
      </div>
    </div>
  );
}
