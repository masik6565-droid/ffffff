interface CalendarGridProps {
  days: string[];
  completedDates: string[];
  color: string;
}

export function CalendarGrid({ days, completedDates, color }: CalendarGridProps) {
  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const startDayOfWeek = new Date(days[0]).getDay();
  const labels = [];
  for (let i = 0; i < 7; i++) {
    labels.push(dayLabels[(startDayOfWeek + i) % 7]);
  }

  return (
    <div className="space-y-1">
      <div className="flex gap-0.5">
        {labels.map((l, i) => (
          <span key={i} className="flex-1 text-[10px] text-gray-400 dark:text-gray-500 text-center">
            {l}
          </span>
        ))}
      </div>
      <div className="flex gap-0.5">
        {days.map(day => (
          <div
            key={day}
            className={`flex-1 aspect-square rounded-[3px] transition-colors ${
              completedDates.includes(day) ? '' : 'bg-gray-100 dark:bg-gray-700/50'
            }`}
            style={
              completedDates.includes(day) ? { backgroundColor: color } : undefined
            }
            title={new Date(day).toLocaleDateString()}
          />
        ))}
      </div>
    </div>
  );
}
