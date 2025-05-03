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

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [todayStreak, setTodayStreak] = useState(0);

  useEffect(() => {
    // TODO: Replace with actual API call
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
      setCards(mockCards);
      setTodayStreak(3); // Mock streak
      setLoading(false);
    }, 1000);
  }, []);

  const renderCardItem = ({ item }: { item: Card }) => {
    return (
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
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4285F4" />
        <Text style={styles.loadingText}>Günlük kartlarınız yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.streakContainer}>
        <Text style={styles.streakTitle}>Günlük Öğrenme Seriniz</Text>
        <View style={styles.streakContent}>
          <Text style={styles.streakCount}>{todayStreak}</Text>
          <Text style={styles.streakLabel}>GÜN</Text>
        </View>
      </View>
      
      <Text style={styles.sectionTitle}>Bugünün Kartları</Text>
      <FlatList
        data={cards}
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
  streakContainer: {
    backgroundColor: '#4285F4',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16
  },
  streakTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8
  },
  streakContent: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  streakCount: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 5
  },
  streakLabel: {
    color: '#fff',
    fontSize: 16
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#212121'
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

export default HomeScreen; 