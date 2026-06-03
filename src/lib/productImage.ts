const PRODUCT_IMAGES = [
  "/images/products/plazion.png",
  "/images/products/coolsoniq.png",
  "/images/products/coolfase.png",
  "/images/products/liftera2.png",
  "/images/products/ultline.png",
  "/images/products/gentlemax-pro-plus.png",
  "/images/products/cellvibe.png",
  "/images/products/winnage.png",
];

export function getProductImage(productId: string): string {
  const hash = productId.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return PRODUCT_IMAGES[hash % PRODUCT_IMAGES.length];
}
