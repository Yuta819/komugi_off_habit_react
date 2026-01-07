import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export const SectionTitle: React.FC<{ title: string }> = ({ title }) => {
  return <Text style={styles.text}>{title}</Text>;
};

const styles = StyleSheet.create({
  text: {
    ...typography.subtitle,
    color: colors.textPrimary,
  },
});
