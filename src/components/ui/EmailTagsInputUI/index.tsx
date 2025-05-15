import React, { useState } from "react";
import { Chip, Box, InputBase } from "@mui/material";
import { Cancel } from "@mui/icons-material";

interface EmailTagsInputProps {
  emails: string[];
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  setEmails: (emails: string[]) => void;
}

const EmailTagsInput: React.FC<EmailTagsInputProps> = ({
  emails,
  color = "default",
  setEmails,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddEmail = async (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setInputValue("");
      return;
    }

    if (email && !emails.includes(email)) {
      setEmails([...emails, email]);
    }
    setInputValue("");
  };

  const handleDelete = (emailToDelete: string) => {
    setEmails(emails.filter((email) => email !== emailToDelete));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.key === "Enter" || event.key === "Tab") && inputValue.trim()) {
      event.preventDefault();
      handleAddEmail(inputValue.trim());
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        border: "1px solid #ccc",
        padding: "8px",
        borderRadius: "4px",
      }}
    >
      {emails.map((email, index) => (
        <Chip
          key={index}
          label={email}
          onDelete={() => handleDelete(email)}
          color={color}
          deleteIcon={<Cancel />}
          sx={{ margin: "4px" }}
        />
      ))}
      <InputBase
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        onBlur={() => handleAddEmail(inputValue)}
        placeholder="Add email"
        sx={{ margin: "4px", flex: 1 }}
      />
    </Box>
  );
};

export default EmailTagsInput;
