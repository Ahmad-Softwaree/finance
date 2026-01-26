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
import { useYearQuery } from "@/hooks/useYearQuery";

interface YearFilterProps {
  /** Whether to show the label */
  showLabel?: boolean;
  /** Label text override */
  labelText?: string;
}

const YearFilter = ({ showLabel = false, labelText }: YearFilterProps) => {
  const t = useTranslations("filters");
  const [{ year }, setYear] = useYearQuery();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const handleValueChange = (value: string) => {
    setYear({ year: parseInt(value) });
  };

  return (
    <div className="space-y-2">
      {showLabel && (
        <Label htmlFor="year-filter">{labelText || t("year")}</Label>
      )}
      <Select value={year?.toString()} onValueChange={handleValueChange}>
        <SelectTrigger id="year-filter" className="w-[120px]">
          <SelectValue placeholder={t("selectYear")} />
        </SelectTrigger>
        <SelectContent>
          {years.map((y) => (
            <SelectItem key={y} value={y.toString()}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default YearFilter;
