import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../components/Card';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { useAppState } from '../viewmodels/AppState';

export const ReflectionScreen = () => {
  const { logs } = useAppState();
  const recentLogs = logs.slice(0, 7).reverse();
  const averageSkin = logs.length
    ? Math.round(logs.reduce((sum, log) => sum + log.skinScore, 0) / logs.length)
    : 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>ふりかえり</Text>
      <Text style={styles.subtitle}>ざっくり眺めて、成長を確認。</Text>

      <Card>
        <Text style={styles.cardTitle}>肌・気分の推移</Text>
        <View style={styles.graphRow}>
          {recentLogs.map((log) => (
            <View key={log.date} style={styles.graphItem}>
              <View style={[styles.bar, { height: 18 * log.skinScore }]} />
              <Text style={styles.caption}>{log.date.slice(5)}</Text>
            </View>
          ))}
        </View>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>小さな気づき</Text>
        {averageSkin ? (
          <Text style={styles.body}>最近の肌スコアは平均{averageSkin}。続いた週は少し上向きかも。</Text>
        ) : (
          <Text style={styles.body}>データが集まると、やさしいヒントが表示されるよ。</Text>
        )}
      </Card>

      <Card>
        <Text style={styles.cardTitle}>ログ一覧</Text>
        {logs.length === 0 ? (
          <Text style={styles.caption}>まだ記録がないよ。今日から育てよう。</Text>
        ) : (
          logs.slice(0, 10).map((log) => (
            <View key={log.date} style={styles.logRow}>
              <Text style={styles.body}>{log.date}</Text>
              <Text style={styles.caption}>{`肌${log.skinScore} / 気分${log.moodScore}`}</Text>
            </View>
          ))
        )}
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
  cardTitle: {
    ...typography.subtitle,
    color: colors.textPrimary,
  },
  body: {
    ...typography.body,
    color: colors.textSecondary,
  },
  caption: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  graphRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
    paddingTop: spacing.md,
  },
  graphItem: {
    alignItems: 'center',
  },
  bar: {
    width: 16,
    backgroundColor: colors.mintDeep,
    borderRadius: 8,
  },
  logRow: {
    marginTop: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.lavender,
    paddingBottom: spacing.sm,
  },
});
