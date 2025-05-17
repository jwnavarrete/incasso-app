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
  setEmails: React.Dispatch<React.SetStateAction<string[]>>;
}
