import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import { Card } from '../components/Card';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { useAppState } from '../viewmodels/AppState';
import { Profile, TargetType } from '../data/models';

const targets: { label: string; value: TargetType }[] = [
  { label: '小麦だけ', value: 'wheat' },
  { label: '砂糖だけ', value: 'sugar' },
  { label: '両方', value: 'both' },
];

const durations = [7, 14, 21, 30, 100];

export const OnboardingScreen = () => {
  const { updateProfile } = useAppState();
  const [step, setStep] = useState(0);
  const [targetType, setTargetType] = useState<TargetType>('both');
  const [targetDays, setTargetDays] = useState(14);
  const [reason, setReason] = useState('');
  const [triggers, setTriggers] = useState('パン、甘い飲み物');
  const [supporterEnabled, setSupporterEnabled] = useState(false);
  const [maybeCountsAsOff, setMaybeCountsAsOff] = useState(true);

  const visionText = useMemo(() => {
    const triggersPreview = triggers ? `敵は「${triggers.split('、')[0]}」` : '敵はまだ不明';
    return `まずは${targetDays}日。${reason || '自分らしさを取り戻す'}. ${triggersPreview}`;
  }, [reason, targetDays, triggers]);

  const save = async () => {
    const profile: Profile = {
      startDate: new Date().toISOString(),
      targetType,
      targetDays,
      visionText,
      triggers: triggers.split('、').map((item) => item.trim()).filter(Boolean),
      supporterEnabled,
      pairingCode: supporterEnabled ? Math.floor(100000 + Math.random() * 900000).toString() : undefined,
      maybeCountsAsOff,
    };
    await updateProfile(profile);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>こむぎOFF習慣へようこそ</Text>
      <Text style={styles.subtitle}>ゆるく、でも確実に。罪悪感ゼロで進めよう。</Text>

      {step === 0 && (
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>今日から何をOFFする？</Text>
          <View style={styles.rowWrap}>
            {targets.map((option) => (
              <PrimaryButton
                key={option.value}
                label={option.label}
                tone={targetType === option.value ? 'peach' : 'lavender'}
                onPress={() => setTargetType(option.value)}
                style={styles.choiceButton}
              />
            ))}
          </View>
          <PrimaryButton label="つぎへ" onPress={() => setStep(1)} />
        </Card>
      )}

      {step === 1 && (
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>ビジョンを一緒に描こう</Text>
          <Text style={styles.caption}>続けたい日数は？</Text>
          <View style={styles.rowWrap}>
            {durations.map((value) => (
              <PrimaryButton
                key={value}
                label={`${value}日`}
                tone={targetDays === value ? 'mint' : 'lavender'}
                onPress={() => setTargetDays(value)}
                style={styles.choiceButton}
              />
            ))}
          </View>
          <Text style={styles.caption}>何を変えたい？</Text>
          <TextInput
            style={styles.input}
            value={reason}
            onChangeText={setReason}
            placeholder="肌・お腹・気分…"
          />
          <Text style={styles.caption}>いちばん辛いのは？</Text>
          <TextInput
            style={styles.input}
            value={triggers}
            onChangeText={setTriggers}
            placeholder="パン、甘い飲み物"
          />
          <PrimaryButton label="つぎへ" onPress={() => setStep(2)} />
        </Card>
      )}

      {step === 2 && (
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>最後の調整</Text>
          <PrimaryButton
            label={supporterEnabled ? '応援者オン' : '応援者は後で'}
            tone={supporterEnabled ? 'mint' : 'lavender'}
            onPress={() => setSupporterEnabled((prev) => !prev)}
            style={styles.choiceButton}
          />
          <PrimaryButton
            label={maybeCountsAsOff ? '微妙はOK扱い' : '微妙はカウント外'}
            tone="lavender"
            onPress={() => setMaybeCountsAsOff((prev) => !prev)}
            style={styles.choiceButton}
          />
          <View style={styles.visionBox}>
            <Text style={styles.caption}>ビジョンカード</Text>
            <Text style={styles.visionText}>{visionText}</Text>
          </View>
          <PrimaryButton label="はじめる" onPress={save} />
        </Card>
      )}

      <Text style={styles.disclaimer}>
        ※このアプリは医療助言ではありません。必要に応じて医師に相談してください。
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
  card: {
    gap: spacing.md,
  },
  cardTitle: {
    ...typography.subtitle,
    color: colors.textPrimary,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  choiceButton: {
    flexGrow: 1,
  },
  caption: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lavender,
    borderRadius: 16,
    padding: spacing.sm,
    backgroundColor: colors.surface,
  },
  visionBox: {
    backgroundColor: colors.mint,
    borderRadius: 16,
    padding: spacing.md,
  },
  visionText: {
    ...typography.body,
    color: colors.textPrimary,
  },
  disclaimer: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
