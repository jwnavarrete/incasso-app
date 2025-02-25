import { initReactI18next } from "react-i18next";
import i18next from "i18next";
// Importa common.json de cada idioma
import EN_COMMON from "../../../locales/en/common.json";
import ES_COMMON from "../../../locales/es/common.json";
import NL_COMMON from "../../../locales/nl/common.json";
// Importa menu.json de cada idioma
import ES_MENU from "../../../locales/es/menu.json";
import EN_MENU from "../../../locales/en/menu.json";
import NL_MENU from "../../../locales/nl/menu.json";
// Importar auth.json de cada idioma
import ES_AUTH from "../../../locales/es/auth.json";
import EN_AUTH from "../../../locales/en/auth.json";
import NL_AUTH from "../../../locales/nl/auth.json";

const resources = {
  en: {
    common: EN_COMMON,
    menu: EN_MENU,
    auth: EN_AUTH,
  },
  es: {
    common: ES_COMMON,
    menu: ES_MENU,
    auth: ES_AUTH,
  },
  nl: {
    common: NL_COMMON,
    menu: NL_MENU,
    auth: NL_AUTH,
  },
};

const initialLanguage = process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE || "nl";

i18next.use(initReactI18next).init({
  resources,
  fallbackLng: initialLanguage,
  defaultNS: "common",
});

export default i18next;
