"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Shop search, sort and stock toggle — all mirrored into the URL.
 *
 * The search input keeps local state so typing stays responsive, and only
 * rewrites the URL after a pause; each keystroke would otherwise trigger a
 * server round-trip and a history entry.
 */
export default function ShopControls({ total }: { total: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const urlQuery = params.get("q") ?? "";
  const [query, setQuery] = useState(urlQuery);

  // Re-sync when the URL changes from elsewhere (chip click, back button).
  const [lastUrlQuery, setLastUrlQuery] = useState(urlQuery);
  if (urlQuery !== lastUrlQuery) {
    setLastUrlQuery(urlQuery);
    setQuery(urlQuery);
  }

  function push(mutate: (next: URLSearchParams) => void) {
    const next = new URLSearchParams(params.toString());
    mutate(next);
    next.delete("page");
    const qs = next.toString();
    startTransition(() => {
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    });
  }

  useEffect(() => {
    if (query === urlQuery) return;
    const timer = setTimeout(() => {
      push((next) => {
        if (query.trim()) next.set("q", query.trim());
        else next.delete("q");
      });
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, urlQuery]);

  const inStockOnly = params.get("stock") === "in";

  return (
    <>
      <div className="shop-search-bar">
        <div className="shop-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search parts, brands, SKU…"
            aria-label="Search products"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              className="search-clear"
              aria-label="Clear search"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
            >
              ×
            </button>
          )}
        </div>

        <select
          className="shop-sort"
          aria-label="Sort products"
          value={params.get("sort") ?? "featured"}
          onChange={(e) =>
            push((next) => {
              if (e.target.value === "featured") next.delete("sort");
              else next.set("sort", e.target.value);
            })
          }
        >
          <option value="featured">Featured</option>
          <option value="low">Price ↑</option>
          <option value="high">Price ↓</option>
          <option value="az">Name A → Z</option>
        </select>
      </div>

      <div className="stock-bar">
        <label>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) =>
              push((next) => {
                if (e.target.checked) next.set("stock", "in");
                else next.delete("stock");
              })
            }
          />
          In Stock Only
        </label>
        <div className="filter-result" aria-live="polite">
          <strong>{String(total).padStart(2, "0")}</strong>{" "}
          {total === 1 ? "product" : "products"}
        </div>
      </div>
    </>
  );
}
