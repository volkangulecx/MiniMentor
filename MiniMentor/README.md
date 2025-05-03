# MiniMentor

MiniMentor, her gün 5 dakika ayırarak kısa bilgi kartları (flashcard) ve quizler üzerinden yeni şeyler öğrenmenizi sağlayan bir mobil uygulamadır.

## Özellikler

- 📅 Günlük Kartlar: Her gün belirli bir konuda 3-5 yeni kart
- ❓ Quiz Modülü: Her bölüm sonunda kısa quiz'ler ile pekiştirme
- 🎮 Gamification: Seviye, rozet, günlük seri koruma (streak) puanları
- 🔄 Kişisel Takvim: Öğrenilen konular, gelişim haritası
- 🧠 AI Kart Önerisi: Kullanıcının ilgi alanına göre kart önerme
- 💬 Günlük Motivasyon: Kısa ilham sözleri veya teknik ipuçları bildirimi
- 🌐 Offline Kullanım: Kartlar indirilebilir, metroda bile erişim

## Teknik Detaylar

- Frontend: React Native (iOS + Android)
- Backend: Firebase (Realtime DB / Firestore, Authentication, Functions)
- Bildirimler: Firebase Cloud Messaging
- Gamification & AI: OpenAI API (gelecek sürümde)

## Kurulum

1. Node.js'i yükleyin (https://nodejs.org/)
2. Projeyi klonlayın:
   ```bash
   git clone https://github.com/yourusername/minimentor.git
   cd minimentor
   ```
3. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
4. Firebase yapılandırmasını ayarlayın:
   - Firebase Console'dan yeni bir proje oluşturun
   - `src/services/firebase.ts` dosyasındaki yapılandırma bilgilerini güncelleyin
5. Uygulamayı başlatın:
   ```bash
   npm start
   ```

## Geliştirme

### Proje Yapısı

```
src/
  ├── screens/         # Ekran bileşenleri
  ├── services/        # Firebase ve diğer servisler
  ├── types/          # TypeScript tip tanımlamaları
  ├── components/     # Yeniden kullanılabilir bileşenler
  └── utils/          # Yardımcı fonksiyonlar
```

### Katkıda Bulunma

1. Bu depoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Bir Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.

## İletişim

Proje Sahibi - [@yourusername](https://twitter.com/yourusername)

Proje Linki: [https://github.com/yourusername/minimentor](https://github.com/yourusername/minimentor) 