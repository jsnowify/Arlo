import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, webPage, itemList } from "@/lib/structured-data";
import { PageFrame } from "@/components/brand/page-frame";
import { ProductPanel } from "@/components/home/product-panel";
import styles from "@/components/home/products.module.css";
import { ZigzagReveal } from "@/components/motion/zigzag-reveal";
import { NextPage } from "@/components/pages/next-page";
import { objectsPage } from "@/data/pages";
import { demoProducts } from "@/data/products";

export const metadata: Metadata = pageMetadata({
  title: "The objects: five fictional wearable concepts",
  description:
    "Browse all five Arlo concepts (a wrist piece, ring, eyewear, vest and clip) with galleries and design notes. Fictional devices from an upskilling project by Joshua \u201cSnowi\u201d Cambronero; not for sale.",
  path: "/objects",
});

export default function ObjectsPage() {
  return (
    <PageFrame>
      <JsonLd
        data={[
          webPage({
            path: "/objects",
            name: "The objects",
            description: objectsPage.description,
          }),
          breadcrumbs([{ name: "The objects", path: "/objects" }]),
          itemList(
            "The five Arlo concepts",
            demoProducts.map((product) => ({
              id: product.id,
              name: product.name,
              description: product.description,
              image: product.images[0].src,
            })),
          ),
        ]}
      />
      <section
        className={`${styles.products} ${styles.productsPage}`}
        aria-labelledby="objects-title"
      >
        <div className={styles.heading}>
          <h1 id="objects-title">
            <ZigzagReveal afterIntro>Products</ZigzagReveal>
          </h1>
          <p>{objectsPage.title}</p>
        </div>
        <p className={styles.intro}>{objectsPage.description}</p>
        {demoProducts.map((product, index) => (
          <ProductPanel
            key={product.id}
            product={product}
            index={index}
            priority={index === 0}
          />
        ))}
        <p className={styles.note}>{objectsPage.note}</p>
      </section>
      <NextPage href="/thinking" label="The thinking" />
    </PageFrame>
  );
}
