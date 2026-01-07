import * as SQLite from 'expo-sqlite';
import { Cheer, DailyLog, Profile } from './models';

const db = SQLite.openDatabase('komugi.db');

export const initializeDatabase = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS profile (
          id INTEGER PRIMARY KEY NOT NULL,
          startDate TEXT,
          targetType TEXT,
          targetDays INTEGER,
          visionText TEXT,
          triggers TEXT,
          supporterEnabled INTEGER,
          pairingCode TEXT,
          maybeCountsAsOff INTEGER
        );`
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS daily_logs (
          date TEXT PRIMARY KEY NOT NULL,
          wheatStatus TEXT,
          sugarStatus TEXT,
          skinScore INTEGER,
          moodScore INTEGER,
          note TEXT
        );`
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS cheers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          createdAt TEXT,
          stickerId TEXT,
          message TEXT,
          fromRole TEXT
        );`
      );
    }, reject, resolve);
  });
};

export const saveProfile = (profile: Profile): Promise<void> => {
  const triggers = JSON.stringify(profile.triggers);
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM profile;'
      );
      tx.executeSql(
        `INSERT INTO profile (id, startDate, targetType, targetDays, visionText, triggers, supporterEnabled, pairingCode, maybeCountsAsOff)
         VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          profile.startDate,
          profile.targetType,
          profile.targetDays,
          profile.visionText,
          triggers,
          profile.supporterEnabled ? 1 : 0,
          profile.pairingCode ?? null,
          profile.maybeCountsAsOff ? 1 : 0,
        ]
      );
    }, reject, resolve);
  });
};

export const getProfile = (): Promise<Profile | null> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM profile LIMIT 1;', [], (_, result) => {
        if (result.rows.length === 0) {
          resolve(null);
          return;
        }
        const row = result.rows.item(0);
        resolve({
          startDate: row.startDate,
          targetType: row.targetType,
          targetDays: row.targetDays,
          visionText: row.visionText,
          triggers: JSON.parse(row.triggers ?? '[]'),
          supporterEnabled: Boolean(row.supporterEnabled),
          pairingCode: row.pairingCode ?? undefined,
          maybeCountsAsOff: Boolean(row.maybeCountsAsOff),
        });
      });
    }, reject);
  });
};

export const saveDailyLog = (log: DailyLog): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT OR REPLACE INTO daily_logs (date, wheatStatus, sugarStatus, skinScore, moodScore, note)
         VALUES (?, ?, ?, ?, ?, ?);`,
        [log.date, log.wheatStatus, log.sugarStatus, log.skinScore, log.moodScore, log.note ?? null]
      );
    }, reject, resolve);
  });
};

export const getDailyLogs = (): Promise<DailyLog[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM daily_logs ORDER BY date DESC;', [], (_, result) => {
        const rows: DailyLog[] = [];
        for (let i = 0; i < result.rows.length; i += 1) {
          rows.push(result.rows.item(i));
        }
        resolve(rows);
      });
    }, reject);
  });
};

export const saveCheer = (cheer: Cheer): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO cheers (createdAt, stickerId, message, fromRole)
         VALUES (?, ?, ?, ?);`,
        [cheer.createdAt, cheer.stickerId, cheer.message, cheer.fromRole]
      );
    }, reject, resolve);
  });
};

export const getCheers = (): Promise<Cheer[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM cheers ORDER BY createdAt DESC LIMIT 10;', [], (_, result) => {
        const rows: Cheer[] = [];
        for (let i = 0; i < result.rows.length; i += 1) {
          rows.push(result.rows.item(i));
        }
        resolve(rows);
      });
    }, reject);
  });
};
