import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";

// translations
import EN from "./locales/en/translation.json";
import TW from "./locales/tw/translation.json";

const resources = {
  "en-US": {
    translation: EN,
  },
  "zh-TW": {
    translation: TW,
  },
};

i18n.use(reactI18nextModule).init({
  resources,
  lng: "zh-TW",
  keySeperator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
