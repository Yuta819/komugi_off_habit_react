import { calculateStreak, isOffDay, nextMilestone } from '../src/utils/streak';
import { DailyLog } from '../src/data/models';

const makeLog = (date: string, wheatStatus: DailyLog['wheatStatus'], sugarStatus: DailyLog['sugarStatus']): DailyLog => ({
  date,
  wheatStatus,
  sugarStatus,
  skinScore: 3,
  moodScore: 3,
});

describe('streak utilities', () => {
  it('counts consecutive off days', () => {
    const logs = [
      makeLog('2024-01-04', 'OFF', 'OFF'),
      makeLog('2024-01-03', 'OFF', 'OFF'),
      makeLog('2024-01-02', 'ATE', 'OFF'),
    ];
    expect(calculateStreak(logs, true)).toBe(2);
  });

  it('respects maybe setting', () => {
    const log = makeLog('2024-01-04', 'MAYBE', 'OFF');
    expect(isOffDay(log, true)).toBe(true);
    expect(isOffDay(log, false)).toBe(false);
  });

  it('finds next milestone', () => {
    expect(nextMilestone(0)).toBe(3);
    expect(nextMilestone(7)).toBe(14);
    expect(nextMilestone(120)).toBe(100);
  });
});
