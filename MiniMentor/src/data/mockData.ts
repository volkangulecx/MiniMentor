import { Card, QuizQuestion, UserData, Achievement } from '../types';

export const mockCards: Card[] = [
  {
    id: '1',
    title: 'SOLID Prensipleri',
    category: 'Yazılım',
    description: 'SOLID prensipleri, yazılım tasarımında kullanılan beş temel prensiptir.',
    imageUrl: 'https://example.com/solid.jpg',
    dateAdded: new Date(),
    content: {
      sections: [
        {
          title: 'Single Responsibility Principle (SRP)',
          content: 'Bir sınıfın sadece bir sorumluluğu olmalıdır. Yani bir sınıfın değişmesi için sadece bir nedeni olmalıdır.'
        },
        {
          title: 'Open/Closed Principle (OCP)',
          content: 'Yazılım varlıkları (sınıflar, modüller, fonksiyonlar vb.) genişletmeye açık, değişikliğe kapalı olmalıdır.'
        }
      ],
      references: [
        {
          title: 'SOLID Principles: Explanation and examples',
          url: 'https://example.com/solid-principles'
        }
      ]
    }
  },
  {
    id: '2',
    title: 'Veri Yapıları: Hash Tablosu',
    category: 'Veri Bilimi',
    description: 'Hash tablosu, veri yapılarında hızlı erişim sağlayan önemli bir yapıdır.',
    imageUrl: 'https://example.com/hash-table.jpg',
    dateAdded: new Date(),
    content: {
      sections: [
        {
          title: 'Hash Fonksiyonu',
          content: 'Hash fonksiyonu, bir anahtarı (key) bir indekse dönüştüren matematiksel bir fonksiyondur.'
        },
        {
          title: 'Çakışma Çözümü',
          content: 'Farklı anahtarların aynı indekse dönüşmesi durumunda çakışma çözümü yöntemleri kullanılır.'
        }
      ]
    }
  }
];

export const mockQuestions: QuizQuestion[] = [
  {
    id: '1',
    cardId: '1',
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
  {
    id: '2',
    cardId: '1',
    question: 'Open/Closed Principle\'a göre bir sınıf nasıl olmalıdır?',
    options: [
      'Genişletmeye açık, değişikliğe kapalı',
      'Hem genişletmeye hem değişikliğe açık',
      'Hem genişletmeye hem değişikliğe kapalı',
      'Genişletmeye kapalı, değişikliğe açık'
    ],
    correctOption: 0,
    explanation: 'Open/Closed Principle, bir sınıfın genişletmeye açık ama değişikliğe kapalı olması gerektiğini belirtir.'
  }
];

export const mockUserData: UserData = {
  name: 'Ahmet Yılmaz',
  email: 'ahmet@example.com',
  joinDate: '2024-01-01',
  streak: 7,
  totalCards: 42,
  completedQuizzes: 15,
  averageScore: 85,
  preferredCategories: ['Yazılım', 'Veri Bilimi']
};

export const mockAchievements: Achievement[] = [
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