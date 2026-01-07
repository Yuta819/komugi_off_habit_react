import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { useAppState } from '../viewmodels/AppState';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const { profile, streak, milestone, cheers, purchaseState } = useAppState();
  const latestCheer = cheers[0];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>おはよう、こむぎOFF隊</Text>
      <Text style={styles.subtitle}>今日も「戻れば勝ち」。</Text>

      <Card style={styles.heroCard}>
        <Text style={styles.cardTitle}>今日のチェックイン</Text>
        <Text style={styles.body}>1分でOK。今日の状態を残そう。</Text>
        <PrimaryButton label="チェックインする" onPress={() => navigation.navigate('CheckIn' as never)} />
      </Card>

      <View style={styles.row}>
        <Card style={styles.streakCard}>
          <Text style={styles.cardTitle}>連続記録</Text>
          <Text style={styles.streakValue}>{streak}日</Text>
          <Text style={styles.caption}>あと{Math.max(milestone - streak, 0)}日で称号</Text>
        </Card>
        <Card style={styles.streakCard}>
          <Text style={styles.cardTitle}>今日のこむぎ</Text>
          <Text style={styles.body}>本日の小麦、欠席です。出席確認ヨシ。</Text>
        </Card>
      </View>

      {profile && (
        <Card>
          <Text style={styles.cardTitle}>ビジョンカード</Text>
          <Text style={styles.body}>{profile.visionText}</Text>
        </Card>
      )}

      <Card>
        <Text style={styles.cardTitle}>応援が届いてる</Text>
        {latestCheer ? (
          <Text style={styles.body}>
            {latestCheer.stickerId} {latestCheer.message}
          </Text>
        ) : (
          <Text style={styles.caption}>まだ応援はないよ。あなたのペースでOK。</Text>
        )}
      </Card>

      <Card>
        <Text style={styles.cardTitle}>プレミアム</Text>
        <Text style={styles.body}>毎週追加の称号・応援カードでモチベUP。</Text>
        <PrimaryButton
          label={purchaseState.isLifetime || purchaseState.isSubscription ? '購入済み' : 'プランをみる'}
          tone="mint"
          onPress={() => navigation.navigate('Paywall' as never)}
        />
      </Card>
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
  heroCard: {
    backgroundColor: colors.peach,
    gap: spacing.sm,
  },
  cardTitle: {
    ...typography.subtitle,
    color: colors.textPrimary,
  },
  body: {
    ...typography.body,
    color: colors.textSecondary,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  streakCard: {
    flex: 1,
    gap: spacing.sm,
  },
  streakValue: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  caption: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
