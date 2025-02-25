import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation as useI18nTranslation } from "react-i18next";
import { AppState, setLanguage } from "@/common/store/global.store";
import { ILanguage } from "../interfaces/language.interface";

const useTranslation = (namespace = "common") => {
  const dispatch = useDispatch();
  const language = useSelector((state: AppState) => state.language);
  const { t, i18n } = useI18nTranslation(namespace);

  useEffect(() => {
    console.log(`Changing: ${language}`);
    if (language && ["es", "en", "nl"].includes(language)) {
      console.log(`Changing language to ${language}`);
      i18n.changeLanguage(language); // Cambia el idioma en i18next
    }
  }, [language, i18n]);

  const changeLanguage = (language: ILanguage) => {
    localStorage.setItem("language", language);
    dispatch(setLanguage(language)); // Cambia el idioma en el estado global
  };

  return { t, i18n, changeLanguage };
};

export default useTranslation;
