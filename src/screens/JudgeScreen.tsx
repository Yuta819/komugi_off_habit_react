import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

const options = [
  {
    id: 'now',
    title: '今すぐできる',
    emoji: '✨',
    body: '水を飲む / 歯磨き / 2分歩く。次の一手で流れを変えよう。',
    reward: '判子：未摂取！',
  },
  {
    id: 'wait',
    title: '待つしかない',
    emoji: '⏳',
    body: '2分だけ深呼吸。波は必ず落ち着く。',
    reward: '砂時計：えらい！',
  },
  {
    id: 'safe',
    title: 'そもそも食べてない',
    emoji: '🏆',
    body: '未遂は勝ち。深呼吸して称賛しよう。',
    reward: '称号：未摂取マスター',
  },
];

export const JudgeScreen = () => {
  const [selected, setSelected] = useState(options[0]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>こむぎ判定 たぶん大丈夫仕分け</Text>
      <Text style={styles.subtitle}>罪悪感を減らして、行動に戻る。</Text>

      <View style={styles.rowWrap}>
        {options.map((option) => (
          <PrimaryButton
            key={option.id}
            label={`${option.emoji} ${option.title}`}
            tone={selected.id === option.id ? 'mint' : 'lavender'}
            onPress={() => setSelected(option)}
            style={styles.choiceButton}
          />
        ))}
      </View>

      <Card>
        <Text style={styles.cardTitle}>{selected.title}</Text>
        <Text style={styles.body}>{selected.body}</Text>
        <Text style={styles.reward}>{selected.reward}</Text>
        <PrimaryButton label="この道でいく" onPress={() => null} />
      </Card>

      <Card>
        <Text style={styles.cardTitle}>次の一手カード</Text>
        <Text style={styles.body}>小さな行動で、気持ちはすぐに戻る。</Text>
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
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  choiceButton: {
    flexGrow: 1,
  },
  cardTitle: {
    ...typography.subtitle,
    color: colors.textPrimary,
  },
  body: {
    ...typography.body,
    color: colors.textSecondary,
  },
  reward: {
    ...typography.subtitle,
    color: colors.mintDeep,
    marginTop: spacing.sm,
  },
});
