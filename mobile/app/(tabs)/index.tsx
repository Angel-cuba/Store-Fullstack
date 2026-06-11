import { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { AllProducts, SearchProducts } from '../../shared/api/requests';
import { ADD_CART } from '../../shared/types/CartActions';
import type { IProducts, ICartItem } from '../../shared/types/types';
import type { AppDispatch } from '../../shared/redux/store';
import { ProductCard } from '../../components/ProductCard';
import { Loading } from '../../components/Loading';

const PAGE_SIZE = 10;

export default function ProductsScreen() {
  const dispatch = useDispatch<AppDispatch>();

  const [products, setProducts] = useState<IProducts[]>([]);
  const [searchResults, setSearchResults] = useState<IProducts[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useRef for page avoids stale-closure bugs in loadMore under fast scrolling
  const pageRef = useRef(1);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      clearTimeout(searchTimeout.current);
    };
  }, []);

  const isSearching = searchQuery.trim().length > 0;
  const displayedProducts = isSearching ? searchResults : products;

  const fetchPage = useCallback(async (pageNum: number, replace = false) => {
    try {
      const result = await AllProducts(pageNum, PAGE_SIZE);
      if (!mountedRef.current) return;
      setProducts((prev) => (replace ? result.data : [...prev, ...result.data]));
      setHasMore(pageNum < result.totalPages);
      pageRef.current = pageNum;
    } catch {
      if (mountedRef.current) setError('Could not load products. Pull to refresh.');
    }
  }, []);

  useEffect(() => {
    fetchPage(1, true).finally(() => {
      if (mountedRef.current) setInitialLoading(false);
    });
  }, [fetchPage]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    setSearchQuery('');
    setSearchResults([]);
    await fetchPage(1, true);
    if (mountedRef.current) setRefreshing(false);
  }, [fetchPage]);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore || isSearching) return;
    setLoadingMore(true);
    await fetchPage(pageRef.current + 1);
    if (mountedRef.current) setLoadingMore(false);
  }, [loadingMore, hasMore, isSearching, fetchPage]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    clearTimeout(searchTimeout.current);
    if (!text.trim()) {
      setSearchResults([]);
      return;
    }
    searchTimeout.current = setTimeout(async () => {
      try {
        const results = await SearchProducts(text.trim());
        if (mountedRef.current) setSearchResults(results);
      } catch {
        if (mountedRef.current) setSearchResults([]);
      }
    }, 300);
  };

  const addToCart = useCallback((product: IProducts) => {
    if (!product._id) return;
    const item: ICartItem = { ...product, amount: 1 };
    dispatch({ type: ADD_CART, payload: item });
  }, [dispatch]);

  if (initialLoading) return <Loading />;

  return (
    <View className="flex-1 bg-white">
      <View className="px-4 pt-14 pb-3 border-b border-gray-100">
        <Text className="text-2xl font-bold text-primary mb-3">Products</Text>
        <TextInput
          className="border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 text-base"
          placeholder="Search products…"
          value={searchQuery}
          onChangeText={handleSearch}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>

      {error && !refreshing ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text style={{ fontSize: 40, marginBottom: 12 }}>⚠️</Text>
          <Text className="text-gray-700 font-semibold text-center">{error}</Text>
        </View>
      ) : (
        <FlatList
          data={displayedProducts}
          keyExtractor={(item) => item._id ?? item.name}
          numColumns={2}
          contentContainerStyle={{ padding: 8, paddingBottom: 16 }}
          columnWrapperStyle={{ gap: 8 }}
          renderItem={({ item, index }) => (
            <ProductCard item={item} index={index} onAddToCart={addToCart} />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#001a4f" />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator size="small" color="#001a4f" style={{ marginVertical: 16 }} />
            ) : null
          }
          ListEmptyComponent={
            isSearching ? (
              <View className="flex-1 items-center justify-center mt-16">
                <Text className="text-gray-400">No results for "{searchQuery}"</Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
}
