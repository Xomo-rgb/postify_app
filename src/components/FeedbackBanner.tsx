import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePosts } from '../context/PostContext';

const FeedbackBanner = () => {
  const { feedback } = usePosts();

  if (!feedback) return null;

  return (
    <View style={[styles.banner, feedback.type === 'success' ? styles.success : styles.error]}>
      <Text style={styles.text}>{feedback.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 8,
  },
  success: {
    backgroundColor: '#e8f5e9',
    borderLeftWidth: 4,
    borderLeftColor: '#66bb6a',
  },
  error: {
    backgroundColor: '#fdecea',
    borderLeftWidth: 4,
    borderLeftColor: '#e57373',
  },
  text: {
    fontSize: 13,
    color: '#333',
  },
});

export default FeedbackBanner;
