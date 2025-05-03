import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image,
  TouchableOpacity
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { Card } from '../types';

type CardDetailsScreenRouteProp = RouteProp<RootStackParamList, 'CardDetails'>;
type CardDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CardDetails'>;

interface CardDetailsScreenProps {
  route: CardDetailsScreenRouteProp;
  navigation: CardDetailsScreenNavigationProp;
}

const CardDetailsScreen = ({ route, navigation }: CardDetailsScreenProps) => {
  const { card } = route.params;

  const handleStartQuiz = () => {
    navigation.navigate('Quiz', { cardId: card.id });
  };

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: card.imageUrl }} 
        style={styles.cardImage}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <Text style={styles.category}>{card.category}</Text>
        <Text style={styles.title}>{card.title}</Text>
        <Text style={styles.description}>{card.description}</Text>

        {card.content?.sections && card.content.sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}

        {card.content?.references && card.content.references.length > 0 && (
          <View style={styles.references}>
            <Text style={styles.referencesTitle}>Kaynaklar</Text>
            {card.content.references.map((reference, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.referenceItem}
                onPress={() => {/* TODO: Handle reference link */}}
              >
                <Text style={styles.referenceTitle}>{reference.title}</Text>
                <Text style={styles.referenceUrl}>{reference.url}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity 
          style={styles.quizButton}
          onPress={handleStartQuiz}
        >
          <Text style={styles.quizButtonText}>Quiz'e Başla</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  cardImage: {
    width: '100%',
    height: 200
  },
  content: {
    padding: 20
  },
  category: {
    color: '#4285F4',
    fontSize: 14,
    marginBottom: 8
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 16
  },
  description: {
    fontSize: 16,
    color: '#757575',
    lineHeight: 24,
    marginBottom: 24
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8
  },
  sectionContent: {
    fontSize: 16,
    color: '#757575',
    lineHeight: 24
  },
  references: {
    marginBottom: 24
  },
  referencesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 12
  },
  referenceItem: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8
  },
  referenceTitle: {
    fontSize: 16,
    color: '#212121',
    marginBottom: 4
  },
  referenceUrl: {
    fontSize: 14,
    color: '#4285F4'
  },
  quizButton: {
    backgroundColor: '#4285F4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16
  },
  quizButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default CardDetailsScreen; 