function toDateStr(d: Date): string {
  return d.toISOString().split('T')[0];
}

export function getToday(): string {
  return toDateStr(new Date());
}

export function getNDaysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return toDateStr(d);
}

export function calculateStreak(completedDates: string[]): number {
  if (completedDates.length === 0) return 0;

  const sorted = [...new Set(completedDates)].sort().reverse();
  const today = getToday();

  let streak = 0;
  let checkDate: string;

  if (sorted[0] === today) {
    checkDate = today;
  } else {
    const yesterday = getNDaysAgo(1);
    if (sorted[0] !== yesterday) return 0;
    checkDate = yesterday;
  }

  for (const date of sorted) {
    if (date !== checkDate) break;
    streak++;
    const d = new Date(checkDate);
    d.setDate(d.getDate() - 1);
    checkDate = toDateStr(d);
  }

  return streak;
}

export function getLastNDays(n: number): string[] {
  const days: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    days.push(getNDaysAgo(i));
  }
  return days;
}
