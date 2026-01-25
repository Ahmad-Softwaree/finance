import { PiggyBank, TrendingUp, Wallet } from "lucide-react";
import { ElementType } from "react";

export interface Feature {
  icon: ElementType;
  label: string;
  value: string;
}

export const features: Feature[] = [
  {
    icon: TrendingUp,
    label: "hero.features.trackExpenses",
    value: "hero.features.realTime",
  },
  {
    icon: Wallet,
    label: "hero.features.manageBudget",
    value: "hero.features.efficiently",
  },
  {
    icon: PiggyBank,
    label: "hero.features.saveMoney",
    value: "hero.features.smartly",
  },
];
