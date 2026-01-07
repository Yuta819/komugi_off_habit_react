import { DailyLog } from '../data/models';

export const isOffDay = (log: DailyLog, maybeCountsAsOff: boolean): boolean => {
  const wheatOff = log.wheatStatus === 'OFF' || (maybeCountsAsOff && log.wheatStatus === 'MAYBE');
  const sugarOff = log.sugarStatus === 'OFF' || (maybeCountsAsOff && log.sugarStatus === 'MAYBE');
  return wheatOff && sugarOff;
};

export const calculateStreak = (logs: DailyLog[], maybeCountsAsOff: boolean): number => {
  const sorted = [...logs].sort((a, b) => (a.date < b.date ? 1 : -1));
  let streak = 0;
  for (const log of sorted) {
    if (isOffDay(log, maybeCountsAsOff)) {
      streak += 1;
    } else {
      break;
    }
  }
  return streak;
};

export const nextMilestone = (streak: number): number => {
  const milestones = [3, 7, 14, 21, 30, 50, 100];
  return milestones.find((value) => value > streak) ?? 100;
};
