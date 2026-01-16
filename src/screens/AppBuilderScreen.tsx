import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

const steps = [
  {
    title: '1. つくりたいアプリを言語化',
    detail: '目的・ユーザー・提供価値を入力すると、AIが要件を整理します。',
  },
  {
    title: '2. 画面フローを自動生成',
    detail: 'React + Expo の構成で、必要な画面と導線を提案します。',
  },
  {
    title: '3. プレビューを即時確認',
    detail: 'デザイン案をプレビューしながら、テキストや色を調整できます。',
  },
];

export const AppBuilderScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>AIアプリ作成スタジオ</Text>
      <Text style={styles.subtitle}>Rorkと同じように、React + Expoでアプリを形にします。</Text>

      <Card style={styles.heroCard}>
        <Text style={styles.cardTitle}>今日のリクエスト</Text>
        <Text style={styles.body}>
          「アプリ作成用AIを使って、プレビューを見ながら進めたい」
        </Text>
        <PrimaryButton label="要件を整理する" onPress={() => {}} />
      </Card>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>進め方</Text>
        <View style={styles.stepList}>
          {steps.map((step) => (
            <Card key={step.title} style={styles.stepCard}>
              <Text style={styles.cardTitle}>{step.title}</Text>
              <Text style={styles.body}>{step.detail}</Text>
            </Card>
          ))}
        </View>
      </View>

      <Card style={styles.previewCard}>
        <Text style={styles.cardTitle}>ライブプレビュー</Text>
        <Text style={styles.caption}>生成中の画面をここで確認できます。</Text>
        <View style={styles.previewMock}>
          <Text style={styles.previewTitle}>ホーム</Text>
          <Text style={styles.previewBody}>・ボタン: 新しいプロジェクト</Text>
          <Text style={styles.previewBody}>・カード: 進捗、チェックリスト</Text>
        </View>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>次のアクション</Text>
        <Text style={styles.body}>具体的なアプリの要望を教えてください。</Text>
        <PrimaryButton label="要望を入力する" tone="mint" onPress={() => {}} />
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
    backgroundColor: colors.lavender,
    gap: spacing.sm,
  },
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colors.textPrimary,
  },
  stepList: {
    gap: spacing.md,
  },
  stepCard: {
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
  caption: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  previewCard: {
    backgroundColor: colors.peach,
    gap: spacing.sm,
  },
  previewMock: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.peachDeep,
    padding: spacing.md,
    backgroundColor: colors.surface,
    gap: spacing.xs,
  },
  previewTitle: {
    ...typography.subtitle,
    color: colors.textPrimary,
  },
  previewBody: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
