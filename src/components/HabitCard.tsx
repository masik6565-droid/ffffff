import { Habit } from '../types';
import { calculateStreak, getToday, getLastNDays } from '../utils/streak';
import { CalendarGrid } from './CalendarGrid';
import { StreakBadge } from './StreakBadge';

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (id: string) => void;
}

export function HabitCard({ habit, onToggle, onEdit, onDelete }: HabitCardProps) {
  const today = getToday();
  const isCompleted = habit.completedDates.includes(today);
  const streak = calculateStreak(habit.completedDates);
  const days = getLastNDays(30);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
          style={{ backgroundColor: habit.color + '20' }}
        >
          {habit.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
              {habit.name}
            </h3>
            <StreakBadge streak={streak} />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{habit.category}</p>
        </div>
      </div>

      <div className="mt-3">
        <CalendarGrid days={days} completedDates={habit.completedDates} color={habit.color} />
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={() => onToggle(habit.id)}
          className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-all ${
            isCompleted
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {isCompleted ? 'Done' : 'Mark done'}
        </button>
        <button
          onClick={() => onEdit(habit)}
          className="px-3 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(habit.id)}
          className="px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          Del
        </button>
      </div>
    </div>
  );
}
