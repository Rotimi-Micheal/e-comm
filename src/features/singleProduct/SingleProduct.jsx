import { calculateDiscount } from "../../utils/calculateDiscount";
import getSingleProduct from "../../service/getSingleProduct";
import { useCartContext } from "../cart/CartProvider";
import { useNavigate } from "react-router-dom";

function SingleProduct() {
  const { addToCart } = useCartContext();
  const navigate = useNavigate();
  const {
    product: {
      thumbnail,
      title,
      price,
      discountPercentage,
      stock,
      rating,
      brand,
      category,
      description,
    } = [],
    count: quantity,
    handleAddCount,
    handleMinusCount,
    onChange,
    loading,
  } = getSingleProduct();

  function handleAddToCart() {
    addToCart({
      thumbnail,
      title,
      price: calculateDiscount(price, discountPercentage) * quantity,
      category,
      quantity,
      brand,
    });
    navigate("/cart");
  }

  if (loading)
    return <p className="mt-36 text-center text-5xl">Loading......</p>;

  return (
    <div className="mx-auto max-w-5xl">
      <div className=" mt-8 flex  flex-col justify-center gap-3 md:mx-12">
        <img className="rounded-t-2xl" src={thumbnail} alt={title} />
        <p className="my-4 text-center text-3xl font-medium">{title}</p>
        <p className="flex justify-center gap-24 text-2xl font-medium leading-6">
          <span className="line-through decoration-[2px]">${price}</span>
          <span className=" text-yellow-600">
            ${calculateDiscount(price, discountPercentage)}
          </span>
        </p>
        <p className="mt-2 text-center text-2xl">
          <span>Availabilty: </span>
          <span
            className={`${Number(stock) > 0 ? "text-green-600" : "bg-red-600"}`}
          >
            {stock}
          </span>
        </p>
        <p className="mt-4 text-xl font-normal">Category: {category}</p>
        <p className="text-xl font-normal">Brand: {brand}</p>

        <div className="mt-12 flex items-center justify-between gap-3">
          <label className="text-xl font-normal" htmlFor="quantity">
            Quantity:
          </label>
          <div className="flex-1 ">
            <button
              onClick={handleMinusCount}
              className="border-2 border-black px-4 hover:bg-gray-600 hover:text-white focus:bg-gray-600 focus:text-white focus:outline-none focus:ring focus:ring-gray-700 focus:ring-offset-2"
            >
              -
            </button>
            <input
              disabled={quantity === 1}
              onChange={onChange}
              value={quantity}
              id="quantity"
              type="text"
              className="w-10 border-2 border-black pl-3 hover:bg-gray-600 hover:text-white focus:bg-gray-600 focus:text-white focus:outline-none focus:ring focus:ring-gray-700 focus:ring-offset-2"
            />
            <button
              onClick={handleAddCount}
              className="border-2 border-black px-4 hover:bg-gray-600 hover:text-white focus:bg-gray-600 focus:text-white focus:outline-none focus:ring focus:ring-gray-700 focus:ring-offset-2"
            >
              +
            </button>
          </div>
        </div>
        <div>
          <button
            className="mt-2 rounded-xl bg-amber-500 px-8 py-4  text-xl font-medium  text-white hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-700 focus:ring-offset-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
        <p className="mt-12 text-center text-3xl font-medium">{description}</p>
      </div>
    </div>
  );
}

export default SingleProduct;
