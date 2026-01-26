"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useTypeQuery } from "@/hooks/useTypeQuery";

interface TypeFilterProps {
  /** Whether to show the label */
  showLabel?: boolean;
  /** Label text override */
  labelText?: string;
}

const TypeFilter = ({ showLabel = false, labelText }: TypeFilterProps) => {
  const t = useTranslations("filters");
  const [{ type }, setType] = useTypeQuery();

  const handleValueChange = (value: string) => {
    setType({ type: value === "all" ? "" : (value as any) });
  };

  return (
    <div className="space-y-2">
      {showLabel && (
        <Label htmlFor="type-filter">{labelText || t("type")}</Label>
      )}
      <Select value={type || "all"} onValueChange={handleValueChange}>
        <SelectTrigger id="type-filter">
          <SelectValue placeholder={t("selectType")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("allTypes")}</SelectItem>
          <SelectItem value="INCOME">{t("income")}</SelectItem>
          <SelectItem value="EXPENSE">{t("expense")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TypeFilter;
