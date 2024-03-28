import ProductCategoryItem from "./ProductCategoryItem";
import getProductProvider from "../../service/getProductProvider";

function ProductCategory() {
  const { categoryId, products, loading } = getProductProvider();

  if (loading)
    return <p className="mt-36 text-center text-5xl">Loading......</p>;

  return (
    <section className="mx-auto max-w-5xl">
      <header className="text-center text-3xl">
        <h1>{categoryId}</h1>
      </header>

      <div className="mt-8 flex flex-col items-center gap-8 md:grid md:grid-cols-2">
        {products?.map((itm) => (
          <ProductCategoryItem key={itm.id} items={itm} />
        ))}
      </div>
    </section>
  );
}

export default ProductCategory;
