"use client";

import {
  Github,
  ExternalLink,
  TrendingUp,
  Wallet,
  PiggyBank,
  CircleGauge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "../shared/animate";
import Link from "next/link";
import { Feature, features } from "@/lib/data/features";
import { useTranslations } from "next-intl";
import { SignedIn } from "@clerk/nextjs";
import { ENUMs } from "@/lib/enums";

const HeroSection = () => {
  const t = useTranslations();

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center  py-20 px-4">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-6xl mx-auto text-center space-y-8">
        {/* Floating Icons */}
        <div className="relative">
          <AnimateOnScroll animation="fade-up" delay={0.2}>
            <div className="absolute -top-10 left-10 md:left-20 opacity-20 animate-pulse">
              <TrendingUp className="w-12 h-12 md:w-16 md:h-16 text-primary" />
            </div>
            <div className="absolute -top-5 right-10 md:right-20 opacity-20 animate-pulse delay-500">
              <Wallet className="w-10 h-10 md:w-14 md:h-14 text-secondary" />
            </div>
            <div className="absolute top-20 left-5 md:left-10 opacity-20 animate-pulse delay-700">
              <PiggyBank className="w-8 h-8 md:w-12 md:h-12 text-primary" />
            </div>
          </AnimateOnScroll>
        </div>

        {/* Hero Text */}
        <AnimateOnScroll animation="fade-down" delay={0.1}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="block mb-2 md:mb-4">{t("hero.title")}</span>
            <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              {t("hero.titleHighlight")}
            </span>
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fade-up" delay={0.3}>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>
        </AnimateOnScroll>

        {/* CTA Buttons */}
        <AnimateOnScroll animation="fade-up" delay={0.5}>
          <SignedIn>
            <Button
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6"
              asChild>
              <Link href={ENUMs.PAGES.DASHBOARD}>
                <CircleGauge className="w-5 h-5 sm:w-6 sm:h-6 mr-2 group-hover:rotate-12 transition-transform" />
                {t("header.dashboard")}
              </Link>
            </Button>
          </SignedIn>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6"
              asChild>
              <Link
                href="https://github.com/Ahmad-Softwaree"
                target="_blank"
                rel="noopener noreferrer">
                <Github className="w-5 h-5 sm:w-6 sm:h-6 mr-2 group-hover:rotate-12 transition-transform" />
                {t("hero.cta.github")}
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="group border-2 hover:bg-accent hover:border-primary transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6"
              asChild>
              <Link
                href="https://ahmad-software.com"
                target="_blank"
                rel="noopener noreferrer">
                {t("hero.cta.portfolio")}
                <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </AnimateOnScroll>

        {/* Stats or Features (Optional) */}
        <AnimateOnScroll animation="fade-up" delay={0.7}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-12 sm:pt-16 max-w-4xl mx-auto">
            {features.map((item: Feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <item.icon className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 text-primary" />
                <p className="text-xs sm:text-sm font-semibold text-primary mb-1">
                  {t(item.value as any)}
                </p>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {t(item.label as any)}
                </p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default HeroSection;
