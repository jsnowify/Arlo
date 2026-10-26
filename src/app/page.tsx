import { DesignLanguage } from "@/components/home/design-language";
import { HomeHero } from "@/components/home/hero";
import { Details, Maker, Shift } from "@/components/home/long-form";
import { ProductCollection } from "@/components/home/product-collection";
import { HomeQuestions } from "@/components/home/questions";
import { SignalStory } from "@/components/home/signal-story";
import { SignalMarquee } from "@/components/motion/marquee";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/config/site";
import { homeData } from "@/data/home";
import { faqPage, webPage } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          webPage({ path: "/", name: site.title, description: site.description }),
          faqPage(homeData.questions.items),
        ]}
      />
      <HomeHero>
        <SignalStory />
        <SignalMarquee />
        <ProductCollection />
        <Shift />
        <DesignLanguage />
        <Details />
        <Maker />
        <HomeQuestions />
      </HomeHero>
    </>
  );
}
