import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { UserData, Achievement } from '../types';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
}

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockUserData: UserData = {
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      joinDate: '2024-01-01',
      streak: 7,
      totalCards: 42,
      completedQuizzes: 15,
      averageScore: 85,
      preferredCategories: ['Yazılım', 'Veri Bilimi']
    };

    const mockAchievements: Achievement[] = [
      {
        id: '1',
        title: '7 Günlük Seri',
        icon: '🏆',
        unlocked: true,
        progress: 100
      },
      {
        id: '2',
        title: '10 Quiz Tamamlandı',
        icon: '🎯',
        unlocked: true,
        progress: 100
      },
      {
        id: '3',
        title: '30 Günlük Seri',
        icon: '🌟',
        unlocked: false,
        progress: 23
      }
    ];

    setTimeout(() => {
      setUserData(mockUserData);
      setAchievements(mockAchievements);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading || !userData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4285F4" />
        <Text style={styles.loadingText}>Profil yükleniyor...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://example.com/profile.jpg' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.email}>{userData.email}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userData.streak}</Text>
          <Text style={styles.statLabel}>Günlük Seri</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userData.totalCards}</Text>
          <Text style={styles.statLabel}>Toplam Kart</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userData.averageScore}%</Text>
          <Text style={styles.statLabel}>Ortalama</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Başarılar</Text>
        {achievements.map((achievement) => (
          <View key={achievement.id} style={styles.achievementItem}>
            <Text style={styles.achievementIcon}>{achievement.icon}</Text>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { width: `${achievement.progress}%` }
                  ]} 
                />
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tercih Edilen Kategoriler</Text>
        <View style={styles.categoriesContainer}>
          {userData.preferredCategories.map((category, index) => (
            <View key={index} style={styles.categoryTag}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
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
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 5
  },
  email: {
    fontSize: 16,
    color: '#757575'
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10
  },
  statItem: {
    alignItems: 'center'
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4285F4'
  },
  statLabel: {
    fontSize: 14,
    color: '#757575',
    marginTop: 5
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 15
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 15
  },
  achievementContent: {
    flex: 1
  },
  achievementTitle: {
    fontSize: 16,
    color: '#212121',
    marginBottom: 5
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4285F4',
    borderRadius: 2
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  categoryTag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8
  },
  categoryText: {
    color: '#4285F4',
    fontSize: 14
  }
});

export default ProfileScreen; 