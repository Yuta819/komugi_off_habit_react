import React, { useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text } from 'react-native';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { useAppState } from '../viewmodels/AppState';
import { purchaseLifetime, purchaseSubscription, restorePurchases } from '../viewmodels/purchase';

export const PaywallScreen = () => {
  const { purchaseState, refreshPurchase } = useAppState();
  const [busy, setBusy] = useState(false);

  const handlePurchase = async (type: 'lifetime' | 'subscription') => {
    if (purchaseState.isLifetime && type === 'subscription') {
      Alert.alert('すでに買い切りをお持ちです', '二重加入防止のため、月額購入はオフにしています。');
      return;
    }
    setBusy(true);
    try {
      if (type === 'lifetime') {
        await purchaseLifetime();
      } else {
        await purchaseSubscription();
      }
      await refreshPurchase();
      Alert.alert('購入リクエストを送信しました', 'ストアの表示に従ってください。');
    } finally {
      setBusy(false);
    }
  };

  const handleRestore = async () => {
    setBusy(true);
    try {
      await restorePurchases();
      await refreshPurchase();
      Alert.alert('復元完了', '購入状態を更新しました。');
    } finally {
      setBusy(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>プレミアム</Text>
      <Text style={styles.subtitle}>応援と称号が毎週追加。あなた専用のモチベ。</Text>

      <Card>
        <Text style={styles.cardTitle}>買い切り ¥650</Text>
        <Text style={styles.body}>ずっと使える。Family Sharing対応の前提。</Text>
        <PrimaryButton
          label={purchaseState.isLifetime ? '購入済み' : '買い切りにする'}
          onPress={() => handlePurchase('lifetime')}
          disabled={busy || purchaseState.isLifetime}
          style={styles.cta}
        />
      </Card>

      <Card>
        <Text style={styles.cardTitle}>月額 ¥300</Text>
        <Text style={styles.body}>毎週追加のスタンプ・称号・ミニチャレンジ。</Text>
        <PrimaryButton
          label={purchaseState.isSubscription ? '加入中' : purchaseState.isLifetime ? '買い切り保有中' : '月額で続ける'}
          onPress={() => handlePurchase('subscription')}
          tone="mint"
          disabled={busy || purchaseState.isLifetime || purchaseState.isSubscription}
          style={styles.cta}
        />
      </Card>

      <Card>
        <Text style={styles.cardTitle}>その他</Text>
        <PrimaryButton
          label={busy ? '処理中...' : 'Restore Purchases'}
          onPress={handleRestore}
          tone="lavender"
          disabled={busy}
        />
        <PrimaryButton
          label="サブスク管理へ"
          onPress={() => Linking.openURL('https://apps.apple.com/account/subscriptions')}
          tone="lavender"
          disabled={busy}
        />
      </Card>

      <Text style={styles.disclaimer}>
        ※このアプリは医療助言ではありません。体調不良が続く場合は医師へ。
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  cardTitle: {
    ...typography.subtitle,
    color: colors.textPrimary,
  },
  body: {
    ...typography.body,
    color: colors.textSecondary,
  },
  cta: {
    marginTop: spacing.sm,
  },
  disclaimer: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
