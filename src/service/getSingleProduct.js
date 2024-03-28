import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function getSingleProduct() {
  const [product, useProduct] = useState();
  const [count, useCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const { productId } = useParams();

  useEffect(
    function () {
      async function getSingleProduct() {
        try {
          setLoading(true);
          const res = await fetch(
            `https://dummyjson.com/products/${productId}`,
          );
          const data = await res.json();
          useProduct(data);
          setLoading(false);
        } catch (err) {}
      }

      getSingleProduct();
    },
    [productId],
  );

  function handleAddCount() {
    useCount((count) => +count + 1);
  }

  function handleMinusCount() {
    if (count > 1) useCount((count) => +count - 1);
  }

  function handleCountInput(e) {
    if (count === 1) return;
    useCount(e.target.value);
  }

  return {
    product,
    count,
    handleAddCount,
    handleMinusCount,
    onChange: handleCountInput,
    loading,
  };
}

export default getSingleProduct;
