import React, { useState, useMemo } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity,
  ActivityIndicator, StyleSheet, SafeAreaView,
} from 'react-native';
import { usePosts } from '../context/PostContext';
import PostCard from '../components/PostCard';
import FeedbackBanner from '../components/FeedbackBanner';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const PAGE_SIZE = 10;

const HomeScreen = () => {
  const { posts, loading } = usePosts();
  const navigation = useNavigation<Nav>();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() =>
    posts.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.body.toLowerCase().includes(search.toLowerCase())
    ), [posts, search]);

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < filtered.length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Postify</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('CreatePost')}>
          <Text style={styles.addBtnText}>+ New Post</Text>
        </TouchableOpacity>
      </View>

      <FeedbackBanner />

      <TextInput
        style={styles.search}
        placeholder="Search posts..."
        placeholderTextColor="#aaa"
        value={search}
        onChangeText={(text) => { setSearch(text); setPage(1); }}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#c8a96e" style={styles.loader} />
      ) : (
        <FlatList
          data={paginated}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PostCard post={item} />}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No posts found.</Text>}
          ListFooterComponent={
            hasMore ? (
              <TouchableOpacity style={styles.loadMore} onPress={() => setPage((p) => p + 1)}>
                <Text style={styles.loadMoreText}>Load more</Text>
              </TouchableOpacity>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f6f3' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
  },
  heading: { fontSize: 22, fontWeight: '700', color: '#1a1a1a' },
  addBtn: {
    backgroundColor: '#c8a96e',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  addBtnText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  search: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  list: { paddingHorizontal: 16, paddingBottom: 24 },
  loader: { marginTop: 60 },
  empty: { textAlign: 'center', color: '#aaa', marginTop: 40, fontSize: 14 },
  loadMore: {
    alignItems: 'center',
    paddingVertical: 14,
  },
  loadMoreText: { color: '#c8a96e', fontWeight: '600', fontSize: 14 },
});

export default HomeScreen;
