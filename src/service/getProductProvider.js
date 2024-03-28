import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function getProductProvider() {
  const [productCategory, setProductCategory] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(
    function () {
      async function getCategory() {
        setLoading(true);
        try {
          const res = await fetch(
            `https://dummyjson.com/products/category/${categoryId}`,
          );

          const data = await res.json();
          setProductCategory(data);
          setLoading(false);
        } catch (err) {}
      }

      getCategory();
    },
    [categoryId],
  );

  const { products } = productCategory ?? [];

  return { categoryId, products, loading };
}

export default getProductProvider;
