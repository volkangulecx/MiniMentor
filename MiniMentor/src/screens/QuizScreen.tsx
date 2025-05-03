import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { QuizQuestion } from '../types';

type QuizScreenRouteProp = RouteProp<RootStackParamList, 'Quiz'>;
type QuizScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Quiz'>;

interface QuizScreenProps {
  route: QuizScreenRouteProp;
  navigation: QuizScreenNavigationProp;
}

const QuizScreen = ({ route, navigation }: QuizScreenProps) => {
  const { cardId } = route.params;
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockQuestions: QuizQuestion[] = [
      {
        id: '1',
        cardId: cardId,
        question: 'SOLID prensiplerinden hangisi bir sınıfın sadece bir sorumluluğu olması gerektiğini söyler?',
        options: [
          'Single Responsibility Principle',
          'Open/Closed Principle',
          'Liskov Substitution Principle',
          'Interface Segregation Principle'
        ],
        correctOption: 0,
        explanation: 'Single Responsibility Principle (SRP), bir sınıfın sadece bir sorumluluğu olması gerektiğini belirtir.'
      },
      // Add more mock questions as needed
    ];

    setTimeout(() => {
      setQuestions(mockQuestions);
      setLoading(false);
    }, 1000);
  }, [cardId]);

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null) return; // Prevent multiple selections

    setSelectedOption(optionIndex);
    const isCorrect = optionIndex === questions[currentQuestionIndex].correctOption;
    if (isCorrect) {
      setScore(score + 1);
    }

    // Show explanation
    Alert.alert(
      isCorrect ? 'Doğru!' : 'Yanlış',
      questions[currentQuestionIndex].explanation,
      [
        {
          text: 'Devam Et',
          onPress: () => {
            if (currentQuestionIndex < questions.length - 1) {
              setCurrentQuestionIndex(currentQuestionIndex + 1);
              setSelectedOption(null);
            } else {
              setQuizCompleted(true);
            }
          }
        }
      ]
    );
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setQuizCompleted(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4285F4" />
        <Text style={styles.loadingText}>Quiz yükleniyor...</Text>
      </View>
    );
  }

  if (quizCompleted) {
    return (
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Quiz Tamamlandı!</Text>
          <Text style={styles.resultScore}>
            Puanınız: {score}/{questions.length}
          </Text>
          <Text style={styles.resultPercentage}>
            Başarı Oranı: {Math.round((score / questions.length) * 100)}%
          </Text>
          <TouchableOpacity 
            style={styles.restartButton}
            onPress={handleRestartQuiz}
          >
            <Text style={styles.restartButtonText}>Tekrar Başla</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Soru {currentQuestionIndex + 1}/{questions.length}
        </Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }
            ]} 
          />
        </View>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === index && styles.selectedOption
            ]}
            onPress={() => handleOptionSelect(index)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#757575'
  },
  progressContainer: {
    marginBottom: 20
  },
  progressText: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8
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
  questionContainer: {
    flex: 1
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 24
  },
  optionButton: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12
  },
  selectedOption: {
    backgroundColor: '#e3f2fd'
  },
  optionText: {
    fontSize: 16,
    color: '#212121'
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 16
  },
  resultScore: {
    fontSize: 20,
    color: '#4285F4',
    marginBottom: 8
  },
  resultPercentage: {
    fontSize: 18,
    color: '#757575',
    marginBottom: 24
  },
  restartButton: {
    backgroundColor: '#4285F4',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center'
  },
  restartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default QuizScreen; 