import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { DailyLog, StatusType } from '../data/models';
import { useAppState } from '../viewmodels/AppState';

const statusOptions: { label: string; value: StatusType }[] = [
  { label: 'OFFできた', value: 'OFF' },
  { label: '食べた', value: 'ATE' },
  { label: '微妙', value: 'MAYBE' },
];

const scoreOptions = [1, 2, 3, 4, 5];

export const CheckInScreen = () => {
  const { addDailyLog } = useAppState();
  const [wheatStatus, setWheatStatus] = useState<StatusType>('OFF');
  const [sugarStatus, setSugarStatus] = useState<StatusType>('OFF');
  const [skinScore, setSkinScore] = useState(3);
  const [moodScore, setMoodScore] = useState(3);
  const [note, setNote] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  const save = async () => {
    const log: DailyLog = {
      date: new Date().toISOString().slice(0, 10),
      wheatStatus,
      sugarStatus,
      skinScore,
      moodScore,
      note,
    };
    await addDailyLog(log);
    setSavedMessage('保存完了！今日もよくやった。');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>チェックイン</Text>
      <Text style={styles.subtitle}>サクッと決めて、終わりにしよう。</Text>

      <Card>
        <Text style={styles.cardTitle}>今日のOFF状況</Text>
        <Text style={styles.caption}>小麦</Text>
        <View style={styles.rowWrap}>
          {statusOptions.map((option) => (
            <PrimaryButton
              key={`wheat-${option.value}`}
              label={option.label}
              tone={wheatStatus === option.value ? 'mint' : 'lavender'}
              onPress={() => setWheatStatus(option.value)}
              style={styles.choiceButton}
            />
          ))}
        </View>
        <Text style={styles.caption}>砂糖</Text>
        <View style={styles.rowWrap}>
          {statusOptions.map((option) => (
            <PrimaryButton
              key={`sugar-${option.value}`}
              label={option.label}
              tone={sugarStatus === option.value ? 'mint' : 'lavender'}
              onPress={() => setSugarStatus(option.value)}
              style={styles.choiceButton}
            />
          ))}
        </View>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>肌コンディション</Text>
        <View style={styles.rowWrap}>
          {scoreOptions.map((value) => (
            <PrimaryButton
              key={`skin-${value}`}
              label={`${value}`}
              tone={skinScore === value ? 'peach' : 'lavender'}
              onPress={() => setSkinScore(value)}
              style={styles.scoreButton}
            />
          ))}
        </View>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>気分</Text>
        <View style={styles.rowWrap}>
          {scoreOptions.map((value) => (
            <PrimaryButton
              key={`mood-${value}`}
              label={`${value}`}
              tone={moodScore === value ? 'peach' : 'lavender'}
              onPress={() => setMoodScore(value)}
              style={styles.scoreButton}
            />
          ))}
        </View>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>ひとことメモ</Text>
        <TextInput
          style={styles.input}
          placeholder="気づきがあれば"
          value={note}
          onChangeText={setNote}
        />
      </Card>

      <PrimaryButton label="保存する" onPress={save} />
      {savedMessage ? <Text style={styles.saved}>{savedMessage}</Text> : null}
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
  caption: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  choiceButton: {
    flexGrow: 1,
  },
  scoreButton: {
    width: 64,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lavender,
    borderRadius: 16,
    padding: spacing.sm,
    backgroundColor: colors.surface,
  },
  saved: {
    ...typography.subtitle,
    color: colors.mintDeep,
    textAlign: 'center',
  },
});
