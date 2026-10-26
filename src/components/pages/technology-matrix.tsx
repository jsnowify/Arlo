"use client";

import { useState } from "react";
import { RippleButton } from "@/components/ui/ripple-button";
import { systemAnchor } from "@/data/technology";
import styles from "./technology.module.css";

type Product = { id: string; name: string };
type System = { id: string; name: string; usedIn: string[] };

// The matrix is a table first. Hover or focus highlights a row and column, choosing a product
// dims the systems it doesn't use, and a system's name jumps to its detail below.
export function TechnologyMatrix({
  products,
  systems,
}: {
  products: Product[];
  systems: System[];
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [hover, setHover] = useState<{ row: string; col: string } | null>(null);

  const chosen = products.find((product) => product.id === selected);
  const count = chosen ? systems.filter((system) => system.usedIn.includes(chosen.id)).length : 0;

  return (
    <>
      <div className={styles.matrixScroll}>
        <table className={styles.matrix} onPointerLeave={() => setHover(null)}>
          <caption className={styles.srOnly}>
            Which of the six systems appear in which of the five objects
          </caption>
          <thead>
            <tr>
              <th scope="col">System</th>
              {products.map((product) => (
                <th
                  key={product.id}
                  scope="col"
                  className={
                    selected === product.id || hover?.col === product.id ? styles.colOn : undefined
                  }
                >
                  <small className={styles.colId}>{product.id}</small>
                  <RippleButton
                    compact
                    pressed={selected === product.id}
                    onClick={() => setSelected(selected === product.id ? null : product.id)}
                  >
                    {product.name}
                  </RippleButton>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {systems.map((system) => {
              const dim = chosen && !system.usedIn.includes(chosen.id);
              return (
                <tr
                  key={system.id}
                  className={[
                    hover?.row === system.id ? styles.rowOn : "",
                    dim ? styles.rowDim : "",
                  ].join(" ")}
                >
                  <th scope="row">
                    <a href={`#${systemAnchor(system.id)}`} className={styles.rowLink}>
                      <small>{system.id}</small>
                      {system.name}
                    </a>
                  </th>
                  {products.map((product) => {
                    const used = system.usedIn.includes(product.id);
                    return (
                      <td
                        key={product.id}
                        className={
                          selected === product.id || hover?.col === product.id
                            ? styles.colOn
                            : undefined
                        }
                        onPointerEnter={() => setHover({ row: system.id, col: product.id })}
                      >
                        <span className={used ? styles.dot : styles.dash} aria-hidden="true" />
                        <span className={styles.srOnly}>{used ? "Used" : "Not used"}</span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className={styles.matrixStatus} role="status">
        {chosen ? (
          <>
            {chosen.name} uses {count} of {systems.length} systems.{" "}
            <RippleButton className={styles.clear} onClick={() => setSelected(null)}>
              Clear
            </RippleButton>
          </>
        ) : (
          "Choose an object to see which systems it uses."
        )}
      </p>
    </>
  );
}
