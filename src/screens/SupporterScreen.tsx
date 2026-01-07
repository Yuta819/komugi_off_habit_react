import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { useAppState } from '../viewmodels/AppState';

const stickers = ['🌟', '🧡', '🥖', '🌿', '👏'];
const messages = ['見守ってるよ', '今日はえらい！', '戻れば勝ち！', 'ゆっくりでOK'];

export const SupporterScreen = () => {
  const { profile, addCheer, cheers } = useAppState();
  const [selectedSticker, setSelectedSticker] = useState(stickers[0]);
  const [message, setMessage] = useState(messages[0]);
  const [freeMessage, setFreeMessage] = useState('');

  const sendCheer = async () => {
    await addCheer({
      createdAt: new Date().toISOString(),
      stickerId: selectedSticker,
      message: freeMessage || message,
      fromRole: 'supporter',
    });
    setFreeMessage('');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>応援者モード</Text>
      <Text style={styles.subtitle}>気にかけてるよ、を送ろう。</Text>

      <Card>
        <Text style={styles.cardTitle}>ペアリングコード</Text>
        <Text style={styles.code}>{profile?.pairingCode ?? '--- ---'}</Text>
        <Text style={styles.caption}>同じ端末でもOK。MVPはダミー応援で動作。</Text>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>スタンプ</Text>
        <View style={styles.rowWrap}>
          {stickers.map((sticker) => (
            <PrimaryButton
              key={sticker}
              label={sticker}
              tone={selectedSticker === sticker ? 'mint' : 'lavender'}
              onPress={() => setSelectedSticker(sticker)}
              style={styles.choiceButton}
            />
          ))}
        </View>
        <Text style={styles.caption}>メッセージ</Text>
        <View style={styles.rowWrap}>
          {messages.map((preset) => (
            <PrimaryButton
              key={preset}
              label={preset}
              tone={message === preset ? 'peach' : 'lavender'}
              onPress={() => setMessage(preset)}
              style={styles.choiceButton}
            />
          ))}
        </View>
        <TextInput
          style={styles.input}
          placeholder="自由入力もOK"
          value={freeMessage}
          onChangeText={setFreeMessage}
        />
        <PrimaryButton label="応援を送る" onPress={sendCheer} />
      </Card>

      <Card>
        <Text style={styles.cardTitle}>最近の応援</Text>
        {cheers.length === 0 ? (
          <Text style={styles.caption}>まだ応援なし。最初の1個を送ってみよう。</Text>
        ) : (
          cheers.slice(0, 5).map((cheer) => (
            <Text key={cheer.createdAt} style={styles.body}>
              {cheer.stickerId} {cheer.message}
            </Text>
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
  caption: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  code: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 4,
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
  input: {
    borderWidth: 1,
    borderColor: colors.lavender,
    borderRadius: 16,
    padding: spacing.sm,
    backgroundColor: colors.surface,
  },
  body: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
