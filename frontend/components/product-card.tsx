import Image from "next/image";
import Link from "next/link";
import ProductIcon from "./product-icon";
import { formatLKR } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductCard({
  product,
  sizes = "(max-width: 640px) 100vw, (max-width: 1080px) 33vw, 25vw",
}: {
  product: Product;
  sizes?: string;
}) {
  const photo = product.gallery?.[0];

  return (
    <Link href={`/shop/${product.slug}`} className="product-card">
      <div className="img">
        {photo ? (
          <Image src={photo} alt="" fill sizes={sizes} />
        ) : (
          <ProductIcon name={product.icon} />
        )}
        {product.tag && <span className="tag">{product.tag}</span>}
        {!product.inStock && <span className="stock-flag">Special Order</span>}
      </div>
      <div className="info">
        <div className="cat">
          {[product.category, product.brand].filter(Boolean).join(" · ")}
        </div>
        <h4>{product.title}</h4>
        <p className="desc">{product.shortDescription}</p>
        <div className="foot">
          <div className="price">
            {formatLKR(product.price, false)}
            <small> LKR</small>
          </div>
          <span className="call-btn">Details →</span>
        </div>
      </div>
    </Link>
  );
}
