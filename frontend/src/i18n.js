import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      home: "Home",
      services: "Services",
      locate: "Locate Us",
      contact: "Contact",
      gallery: "Gallery",
      welcome: "One Stop Solution For Digital Services",
      explore: "Explore Services",
      contactNow: "Contact Now",
      trust: "Why People Trust Us",
    },
  },

  kn: {
    translation: {
      home: "ಮುಖಪುಟ",
      services: "ಸೇವೆಗಳು",
      locate: "ನಮ್ಮ ಸ್ಥಳ",
      contact: "ಸಂಪರ್ಕಿಸಿ",
      Admin: "ನಿರ್ವಾಹಕ",
      gallery: "ಗ್ಯಾಲರಿ",
      welcome: "ಡಿಜಿಟಲ್ ಸೇವೆಗಳ ಏಕೈಕ ಪರಿಹಾರ ಕೇಂದ್ರ",
      explore: "ಸೇವೆಗಳು ನೋಡಿ",
      contactNow: "ಇದೀಗ ಸಂಪರ್ಕಿಸಿ",
      trust: "ಜನರು ನಮ್ಮ ಮೇಲೆ ನಂಬಿಕೆ ಇಡುವ ಕಾರಣ",
    },
  },

  hi: {
    translation: {
      home: "होम",
      services: "सेवाएं",
      locate: "हमारा स्थान",
      contact: "संपर्क करें",
      Admin:"प्रशासक",
      gallery: "गैलरी",
      welcome: "डिजिटल सेवाओं के लिए एक ही समाधान",
      explore: "सेवाएं देखें",
      contactNow: "अभी संपर्क करें",
      trust: "लोग हम पर भरोसा क्यों करते हैं",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
