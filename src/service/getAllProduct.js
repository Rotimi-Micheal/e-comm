import { useCallback, useEffect, useState } from "react";

function getAllProduct() {
  const [products, setProducts] = useState([]);

  const getAllProduct = useCallback(async function () {
    const res = await fetch(`https://dummyjson.com/products?limit=100&skip=0`);

    const data = await res.json();

    setProducts(data);
  }, []);

  useEffect(
    function () {
      getAllProduct();
    },
    [getAllProduct],
  );

  return { products };
}

export default getAllProduct;
