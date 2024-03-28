export async function getAllProducts() {
  const res = await fetch(`https://dummyjson.com/products?limit=100&skip=0`);

  if (!res.ok) throw new Error("Failed getting AllProducts");

  const data = await res.json();

  return { data };
}
