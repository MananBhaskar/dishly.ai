import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Flame, Star, Users } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { FEATURES, HOW_IT_WORKS_STEPS, SITE_STATS } from "@/lib/data";
import PricingSection from "@/components/PricingSection";

export default async function Home() {

  const { has } = await auth()
  const subscriptionTier = has({ plan: "pro" }) ? "pro" : "free";

  return (
    <div className="min-h-screen bg-[#FFFBF5] text-stone-900 font-sans">

      {/* Hero Section */}
      <section className="pt-10 sm:pt-14 pb-16 sm:pb-24 px-4 relative overflow-hidden">
        {/* Decorative background blobs — smaller on mobile */}
        <div className="pointer-events-none absolute -top-10 -left-10 w-50 sm:w-105 h-50 sm:h-105 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="pointer-events-none absolute top-10 right-0 w-37.5 sm:w-[320px] h-37.5 sm:h-80 rounded-full bg-yellow-200/50 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-75 sm:w-150 h-30 sm:h-50 rounded-full bg-red-100/40 blur-3xl" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-20">

            {/* Text content */}
            <div className="flex-1 text-center md:text-left w-full">
              <Badge
                variant="outline"
                className="border-2 border-orange-500 text-orange-600 bg-linear-to-r from-orange-50 to-amber-50 text-xs sm:text-sm font-bold uppercase tracking-widest px-3 sm:px-4 py-1.5 shadow-sm"
              >
                <Flame className="mr-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 fill-orange-500" />
                #1 AI Cooking Assistant
              </Badge>

              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-4 sm:mb-6 mt-4 sm:mt-5 leading-[0.9] tracking-tight">
                Turn your{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 italic text-orange-500 underline decoration-wavy decoration-amber-400 underline-offset-4">
                    leftovers
                  </span>
                </span>{" "}
                into{" "}
                <br className="hidden sm:block" />
                <span className="bg-linear-to-r from-orange-500 via-red-500 to-amber-500 bg-clip-text text-transparent">
                  masterpieces.
                </span>
              </h1>

              <p className="text-base sm:text-xl md:text-2xl text-stone-500 mb-8 sm:mb-10 max-w-lg mx-auto md:mx-0 font-light leading-relaxed">
                Snap a photo of your fridge. We&apos;ll tell you what to cook.
                Save money, reduce waste and eat better tonight.
              </p>

              <Link href={'/dashboard'}>
                <Button
                  size="xl"
                  variant="primary"
                  className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-linear-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all duration-300 rounded-2xl font-bold tracking-wide">
                  Start Cooking Free
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>

              <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-stone-400">
                <span className="font-bold text-stone-700">10k+ cooks</span>{" "}
                joined last month.
              </p>
            </div>

            {/* Hero Image Card — constrained width on mobile */}
            <div className="w-full max-w-85 sm:max-w-105 md:max-w-none md:flex-1 mx-auto">
              <Card className="relative aspect-square md:aspect-4/5 border-4 border-orange-200 bg-orange-50 overflow-hidden py-0 shadow-2xl shadow-orange-100 rounded-3xl hover:shadow-orange-200 transition-shadow duration-300">
                <Image
                  src="/pasta-dish.png"
                  alt="Pasta Dish"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

                <Card className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-white/95 backdrop-blur-md border-2 border-orange-100 py-0 rounded-2xl shadow-xl">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-sm sm:text-lg text-stone-800 leading-tight">
                          Rustic Tomato Basil Pasta
                        </h3>
                        <div className="flex gap-0.5 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-2 border-emerald-400 bg-emerald-50 text-emerald-700 font-bold text-xs px-2 py-0.5 rounded-full shrink-0 ml-2">
                        98% MATCH
                      </Badge>
                    </div>
                    <div className="flex gap-2 sm:gap-4 text-xs text-stone-400 font-semibold mt-2">
                      <span className="flex items-center gap-1 bg-orange-50 text-orange-500 px-2 py-1 rounded-full">
                        <Clock className="w-3 h-3" />25 mins
                      </span>
                      <span className="flex items-center gap-1 bg-blue-50 text-blue-500 px-2 py-1 rounded-full">
                        <Users className="w-3 h-3" />2 servings
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Card>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 sm:py-12 bg-linear-to-r from-orange-500 via-red-500 to-amber-500 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-10" style={{backgroundImage: "radial-gradient(circle at 25% 50%, white 1px, transparent 1px)", backgroundSize: "40px 40px"}} />
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center px-4 relative z-10">
          {SITE_STATS.map((stat, i) => (
            <div key={i}>
              <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-1 text-white drop-shadow-sm">
                {stat.val}
              </div>
              <Badge
                variant="secondary"
                className="bg-white/20 text-white/90 text-xs uppercase tracking-widest font-semibold border-none backdrop-blur-sm px-2 sm:px-3">
                {stat.label}
              </Badge>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-28 px-4 bg-[#FFFBF5]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 sm:mb-16">
            <Badge className="mb-4 bg-amber-100 text-amber-700 border-amber-200 text-xs uppercase tracking-widest font-bold px-4 py-1.5">
              Features
            </Badge>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 leading-tight">
              Your Smart{" "}
              <span className="bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Kitchen
              </span>
            </h2>
            <p className="text-stone-500 text-lg sm:text-xl font-light max-w-lg">
              Everything you need to master your meal prep.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {FEATURES.map((feature, i) => {
              const IconComponent = feature.icon;
              const cardColors = [
                "hover:border-orange-400 hover:bg-gradient-to-br hover:from-orange-50 hover:to-amber-50",
                "hover:border-red-400 hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50",
                "hover:border-amber-400 hover:bg-gradient-to-br hover:from-amber-50 hover:to-yellow-50",
                "hover:border-rose-400 hover:bg-gradient-to-br hover:from-rose-50 hover:to-pink-50",
              ];
              const iconColors = [
                "group-hover:bg-orange-100 group-hover:border-orange-300",
                "group-hover:bg-red-100 group-hover:border-red-300",
                "group-hover:bg-amber-100 group-hover:border-amber-300",
                "group-hover:bg-rose-100 group-hover:border-rose-300",
              ];
              return (
                <Card
                  key={i}
                  className={`border-2 border-stone-100 bg-white ${cardColors[i % cardColors.length]} hover:shadow-xl transition-all duration-300 group py-0 rounded-2xl`}>
                  <CardContent className="p-5 sm:p-8">
                    <div className="flex justify-between items-start mb-4 sm:mb-6">
                      <div className={`border-2 border-stone-100 bg-stone-50 p-3 rounded-xl ${iconColors[i % iconColors.length]} transition-colors duration-300`}>
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-xs font-mono bg-stone-100 text-stone-500 uppercase tracking-wider border border-stone-200 rounded-full px-2 sm:px-3"
                      >
                        {feature.limit}
                      </Badge>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-stone-800">
                      {feature.title}
                    </h3>
                    <p className="text-stone-500 text-base sm:text-lg font-light leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-28 px-4 relative overflow-hidden" style={{background: "linear-gradient(135deg, #1a0a00 0%, #2d1200 40%, #1f0f05 100%)"}}>
        <div className="pointer-events-none absolute inset-0 opacity-5" style={{backgroundImage: "radial-gradient(circle, #f97316 1.5px, transparent 1.5px)", backgroundSize: "32px 32px"}} />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 rounded-full bg-orange-600/10 blur-3xl" />

        <div className="max-w-5xl mx-auto relative z-10">
          <Badge className="mb-4 sm:mb-6 bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs uppercase tracking-widest font-bold px-4 py-1.5">
            How It Works
          </Badge>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-10 sm:mb-16 text-white leading-tight">
            Cook in{" "}
            <span className="bg-linear-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
              3 Steps
            </span>
          </h2>

          <div className="space-y-0">
            {HOW_IT_WORKS_STEPS.map((item, i) => {
              return (
                <div key={i}>
                  <div className="flex gap-4 sm:gap-8 items-start group cursor-default">
                    <div className="shrink-0 w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-linear-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-900/40 group-hover:scale-105 transition-transform duration-300">
                      <span className="text-xl sm:text-3xl font-black text-white">
                        {item.step}
                      </span>
                    </div>
                    <div className="pt-2 sm:pt-3">
                      <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2 text-white">{item.title}</h3>
                      <p className="text-sm sm:text-lg text-stone-400 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  {i < HOW_IT_WORKS_STEPS.length - 1 && (
                    <div className="my-6 sm:my-10 ml-7 sm:ml-10">
                      <div className="w-0.5 h-8 sm:h-10 bg-linear-to-b from-orange-500/50 to-transparent" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 sm:py-28 px-4 bg-[#FFFBF5] relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 right-0 w-50 sm:w-100 h-50 sm:h-100 rounded-full bg-amber-100/60 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-37.5 sm:w-75 h-37.5 sm:h-75 rounded-full bg-orange-100/60 blur-3xl" />
        <div className="max-w-5xl mx-auto relative z-10">
          <PricingSection />
        </div>
      </section>
    </div>
  );
}