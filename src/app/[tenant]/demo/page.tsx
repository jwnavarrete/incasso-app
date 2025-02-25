"use client";
import useTranslation from "@/common/hooks/useTranslation";
import store, { setLanguage } from "@/common/store/global.store";

export default function HomePage() {
  const {t} = useTranslation();
  //
  const handleChange = (valor: "nl" | "es" | "en") => {
    store.dispatch(setLanguage(valor));
  };

  return (
    <div>
      <h1>{t("HomePage.title")}</h1>
      <h1>Demo Page</h1>

      <button
        onClick={() => {
          handleChange("es");
        }}
      >
        ES
      </button>
      <button
        onClick={() => {
          handleChange("nl");
        }}
      >
        NL
      </button>
      <button
        onClick={() => {
          handleChange("en");
        }}
      >
        EN
      </button>
    </div>
  );
}
