import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image,
  ActivityIndicator 
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { Card } from '../types';

type LearnScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

interface LearnScreenProps {
  navigation: LearnScreenNavigationProp;
}

const LearnScreen = ({ navigation }: LearnScreenProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockCategories = ['Tümü', 'Yazılım', 'Veri Bilimi', 'Tasarım', 'Kişisel Gelişim'];
    const mockCards: Card[] = [
      {
        id: '1',
        title: 'SOLID Prensipleri',
        category: 'Yazılım',
        description: 'SOLID prensipleri, yazılım tasarımında kullanılan beş temel prensiptir.',
        imageUrl: 'https://example.com/solid.jpg',
        dateAdded: new Date(),
      },
      // Add more mock cards as needed
    ];

    setTimeout(() => {
      setCategories(mockCategories);
      setCards(mockCards);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCards = selectedCategory === 'Tümü' 
    ? cards 
    : cards.filter(card => card.category === selectedCategory);

  const renderCategoryItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item && styles.selectedCategory
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text style={[
        styles.categoryText,
        selectedCategory === item && styles.selectedCategoryText
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderCardItem = ({ item }: { item: Card }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('CardDetails', { card: item })}
    >
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardCategory}>{item.category}</Text>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4285F4" />
        <Text style={styles.loadingText}>Kartlar yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Öğrenmeye Başla</Text>
      
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesList}
        contentContainerStyle={styles.categoriesListContent}
      />

      <FlatList
        data={filteredCards}
        renderItem={renderCardItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cardsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#757575'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#212121'
  },
  categoriesList: {
    marginBottom: 16
  },
  categoriesListContent: {
    paddingRight: 16
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  selectedCategory: {
    backgroundColor: '#4285F4'
  },
  categoryText: {
    color: '#757575',
    fontSize: 14
  },
  selectedCategoryText: {
    color: '#fff'
  },
  cardsList: {
    paddingBottom: 16
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  cardImage: {
    width: '100%',
    height: 150
  },
  cardContent: {
    padding: 16
  },
  cardCategory: {
    color: '#4285F4',
    fontSize: 14,
    marginBottom: 4
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#212121'
  },
  cardDescription: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20
  }
});

export default LearnScreen; 