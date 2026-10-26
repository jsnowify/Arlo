"use client";

import { useState } from "react";
import { ProductPanel } from "@/components/home/product-panel";
import { ZigzagReveal } from "@/components/motion/zigzag-reveal";
import { homeData } from "@/data/home";
import { demoProducts } from "@/data/products";
import styles from "./products.module.css";

export function ProductCollection() {
  const [index, setIndex] = useState(0);

  function step(direction: number) {
    setIndex((current) => (current + direction + demoProducts.length) % demoProducts.length);
  }

  return (
    <section
      id="collection"
      className={styles.products}
      aria-labelledby="collection-title"
    >
      <div className={styles.heading}>
        <h2 id="collection-title">
          <ZigzagReveal>Products</ZigzagReveal>
        </h2>
        <p>{homeData.collection.title}</p>
      </div>
      <p className={styles.intro}>{homeData.collection.description}</p>

      <ProductPanel
        key={demoProducts[index].id}
        product={demoProducts[index]}
        index={index}
        onStep={step}
        priority={index === 0}
      />
      <p className={styles.note}>
        Concept devices for display only. Figures and finishes are illustrative,
        not specifications.
      </p>
    </section>
  );
}
