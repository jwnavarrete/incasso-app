import * as React from "react";
import Box from "@mui/material/Box";
import IconButton, { IconButtonOwnProps } from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Flag from "react-world-flags";
import { ILanguage } from "@/common/types/language";
import useTranslation from "@/hooks/useTranslation";

type Language = {
  label: string;
  flag: string;
};

const languages: { [key: string]: Language } = {
  es: { label: "Spanish", flag: "ES" },
  en: { label: "English", flag: "GB" },
  nl: { label: "Holandes", flag: "NL" },
};

export default function LanguageDropdown(props: IconButtonOwnProps) {
  const { changeLanguage } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currentLanguage, setCurrentLanguage] = React.useState<ILanguage>(
    (process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE as ILanguage) || "en"
  );

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage
        .getItem("language")
        ?.trim() as ILanguage;
      if (storedLanguage) {
        setCurrentLanguage(storedLanguage);
      }
    }
  }, []);

  const [_language, _setLanguage] = React.useState<string>(currentLanguage); // Default language

  React.useEffect(() => {
    _setLanguage(currentLanguage);
  }, [currentLanguage]);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLanguageChange = (lang: ILanguage) => () => {
    _setLanguage(lang);
    changeLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
    handleClose();
  };

  return (
    <React.Fragment>
      <IconButton
        data-screenshot="toggle-language"
        onClick={handleClick}
        disableRipple
        size="small"
        aria-controls={open ? "language-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        {...props}
      >
        <Box display="flex" alignItems="center">
          <Box ml={1} display="flex" alignItems="center">
            <Flag
              code={languages[_language].flag}
              style={{ width: 20, height: 15, marginRight: 8 }}
            />
          </Box>
        </Box>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="language-menu"
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            variant: "outlined",
            elevation: 0,
            sx: {
              my: "4px",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {Object.entries(languages).map(([lang, { label, flag }]) => (
          <MenuItem
            key={lang}
            selected={_language === lang}
            onClick={handleLanguageChange(lang as ILanguage)}
          >
            <Box display="flex" alignItems="center">
              <Flag
                code={flag}
                style={{ width: 20, height: 15, marginRight: 8 }}
              />
              {label}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}
