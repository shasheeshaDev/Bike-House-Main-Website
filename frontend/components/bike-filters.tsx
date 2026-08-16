"use client";

import { useCallback, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PRICE_CAPS } from "@/lib/format";

export interface Facet {
  label: string;
  value: string;
}

/**
 * URL-driven filter bar.
 *
 * Every change rewrites searchParams and lets the server re-query, so filtered
 * views are shareable, bookmarkable and indexable. `page` is dropped on any
 * change — staying on page 3 of a narrower result set lands on an empty list.
 */
export default function BikeFilters({
  brands,
  types,
  total,
}: {
  brands: Facet[];
  types: Facet[];
  total: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      next.delete("page");
      const qs = next.toString();
      startTransition(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    },
    [params, pathname, router],
  );

  const fields = [
    { name: "brand", label: "Brand", placeholder: "All Brands", options: brands },
    {
      name: "cc",
      label: "Engine (cc)",
      placeholder: "Any Capacity",
      options: [
        { label: "Up to 300cc", value: "0-300" },
        { label: "300 – 700cc", value: "300-700" },
        { label: "700 – 1000cc", value: "700-1000" },
        { label: "1000cc+", value: "1000-9999" },
      ],
    },
    { name: "type", label: "Type", placeholder: "All Types", options: types },
    { name: "price", label: "Max Price (LKR)", placeholder: "No Limit", options: PRICE_CAPS },
    {
      name: "reg",
      label: "Registration",
      placeholder: "All",
      options: [
        { label: "Registered", value: "yes" },
        { label: "Unregistered", value: "no" },
      ],
    },
  ];

  const hasFilters = fields.some((f) => params.get(f.name));

  return (
    <>
      <div className="filters" data-pending={pending || undefined}>
        {fields.map((field) => (
          <div className="filter-group" key={field.name}>
            <label htmlFor={`f-${field.name}`}>{field.label}</label>
            <select
              id={`f-${field.name}`}
              value={params.get(field.name) ?? ""}
              onChange={(e) => setParam(field.name, e.target.value)}
            >
              <option value="">{field.placeholder}</option>
              {field.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-small btn-ghost"
          disabled={!hasFilters}
          onClick={() =>
            startTransition(() => router.replace(pathname, { scroll: false }))
          }
        >
          Reset
        </button>
      </div>

      <div className="filter-row">
        <div className="filter-result" aria-live="polite">
          <strong>{String(total).padStart(2, "0")}</strong>{" "}
          {total === 1 ? "bike" : "bikes"} match
        </div>
        <div className="spec-line sort">
          <label htmlFor="f-sort">Sort:</label>
          <select
            id="f-sort"
            value={params.get("sort") ?? "newest"}
            onChange={(e) => setParam("sort", e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="low">Price ↑</option>
            <option value="high">Price ↓</option>
            <option value="cc">Capacity ↓</option>
          </select>
        </div>
      </div>
    </>
  );
}
