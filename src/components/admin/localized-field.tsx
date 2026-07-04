import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import type {LocalizedText} from "@/lib/admin/api";
import type {AdminLanguage} from "./language-tabs";

type LocalizedFieldProps = {
  label: string;
  value: LocalizedText;
  onChange: (value: LocalizedText) => void;
  language: AdminLanguage;
  textarea?: boolean;
  required?: boolean;
  rowsClassName?: string;
};

export function LocalizedField({
  label,
  value,
  onChange,
  language,
  textarea = false,
  required = false,
  rowsClassName,
}: LocalizedFieldProps) {
  const Control = textarea ? Textarea : Input;

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Control
        value={value[language]}
        required={required && language === "uz"}
        className={rowsClassName}
        onChange={(event) => onChange({...value, [language]: event.target.value})}
      />
    </div>
  );
}
