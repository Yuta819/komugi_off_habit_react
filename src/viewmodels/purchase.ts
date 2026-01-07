import * as InAppPurchases from 'expo-in-app-purchases';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { PurchaseState } from '../data/models';

const STORAGE_KEY = 'komugi_purchase_state_v1';

export const PRODUCT_IDS = {
  lifetime: 'komugi_off_lifetime_650',
  monthly: 'komugi_off_monthly_300',
};

export const loadPurchaseState = async (): Promise<PurchaseState | null> => {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  return stored ? (JSON.parse(stored) as PurchaseState) : null;
};

const persistPurchaseState = async (state: PurchaseState) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

const deriveStateFromHistory = (history: InAppPurchases.InAppPurchase[]): PurchaseState => {
  const productIds = history.map((item) => item.productId);
  const isLifetime = productIds.includes(PRODUCT_IDS.lifetime);
  const isSubscription = productIds.includes(PRODUCT_IDS.monthly);
  return {
    isLifetime,
    isSubscription,
    lastCheckedAt: new Date().toISOString(),
  };
};

export const refreshPurchases = async (): Promise<PurchaseState> => {
  if (Platform.OS !== 'ios') {
    const fallback: PurchaseState = {
      isLifetime: false,
      isSubscription: false,
      lastCheckedAt: new Date().toISOString(),
    };
    await persistPurchaseState(fallback);
    return fallback;
  }

  await InAppPurchases.connectAsync();
  const history = await InAppPurchases.getPurchaseHistoryAsync();
  const state = deriveStateFromHistory(history.responseCode === 0 ? history.results : []);
  await InAppPurchases.disconnectAsync();
  await persistPurchaseState(state);
  return state;
};

export const purchaseLifetime = async (): Promise<void> => {
  await InAppPurchases.connectAsync();
  await InAppPurchases.purchaseItemAsync(PRODUCT_IDS.lifetime);
  await InAppPurchases.disconnectAsync();
};

export const purchaseSubscription = async (): Promise<void> => {
  await InAppPurchases.connectAsync();
  await InAppPurchases.purchaseItemAsync(PRODUCT_IDS.monthly);
  await InAppPurchases.disconnectAsync();
};

export const restorePurchases = async (): Promise<PurchaseState> => {
  return refreshPurchases();
};
