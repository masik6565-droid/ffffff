import { Stats } from '../types';

interface StatsPanelProps {
  stats: Stats;
}

export function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {stats.totalHabits}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700">
        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
          {stats.completedToday}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Today</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700">
        <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
          {stats.bestStreak}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Best</p>
      </div>
    </div>
  );
}
