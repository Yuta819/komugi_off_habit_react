import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Cheer, DailyLog, Profile, PurchaseState } from '../data/models';
import {
  getCheers,
  getDailyLogs,
  getProfile,
  initializeDatabase,
  saveCheer,
  saveDailyLog,
  saveProfile,
} from '../data/storage';
import { calculateStreak, nextMilestone } from '../utils/streak';
import { loadPurchaseState, refreshPurchases } from './purchase';

interface AppStateContextValue {
  loading: boolean;
  profile: Profile | null;
  logs: DailyLog[];
  cheers: Cheer[];
  purchaseState: PurchaseState;
  streak: number;
  milestone: number;
  initialize: () => Promise<void>;
  updateProfile: (profile: Profile) => Promise<void>;
  addDailyLog: (log: DailyLog) => Promise<void>;
  addCheer: (cheer: Cheer) => Promise<void>;
  refreshPurchase: () => Promise<void>;
}

const defaultPurchaseState: PurchaseState = {
  isLifetime: false,
  isSubscription: false,
  lastCheckedAt: new Date().toISOString(),
};

const AppStateContext = createContext<AppStateContextValue | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [cheers, setCheers] = useState<Cheer[]>([]);
  const [purchaseState, setPurchaseState] = useState<PurchaseState>(defaultPurchaseState);

  const initialize = useCallback(async () => {
    setLoading(true);
    await initializeDatabase();
    const [storedProfile, storedLogs, storedCheers, storedPurchase] = await Promise.all([
      getProfile(),
      getDailyLogs(),
      getCheers(),
      loadPurchaseState(),
    ]);
    setProfile(storedProfile);
    setLogs(storedLogs);
    setCheers(storedCheers);
    setPurchaseState(storedPurchase ?? defaultPurchaseState);
    setLoading(false);
  }, []);

  const updateProfile = useCallback(async (nextProfile: Profile) => {
    await saveProfile(nextProfile);
    setProfile(nextProfile);
  }, []);

  const addDailyLog = useCallback(async (log: DailyLog) => {
    await saveDailyLog(log);
    const updated = await getDailyLogs();
    setLogs(updated);
  }, []);

  const addCheer = useCallback(async (cheer: Cheer) => {
    await saveCheer(cheer);
    const updated = await getCheers();
    setCheers(updated);
  }, []);

  const refreshPurchase = useCallback(async () => {
    const updated = await refreshPurchases();
    setPurchaseState(updated);
  }, []);

  const streak = useMemo(() => {
    if (!profile) return 0;
    return calculateStreak(logs, profile.maybeCountsAsOff);
  }, [logs, profile]);

  const milestone = useMemo(() => nextMilestone(streak), [streak]);

  const value = {
    loading,
    profile,
    logs,
    cheers,
    purchaseState,
    streak,
    milestone,
    initialize,
    updateProfile,
    addDailyLog,
    addCheer,
    refreshPurchase,
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return context;
};
