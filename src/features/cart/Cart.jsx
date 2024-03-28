import { useNavigate } from "react-router-dom";
import { useCartContext } from "./CartProvider";

function Cart() {
  const navigate = useNavigate();
  const {
    cart,
    HandleIncreaseQuantity,
    HandleDecreaseCart,
    DeleteItemFromCart,
  } = useCartContext();

  const TotalPrice = cart.reduce((acc, cur) => acc + cur.price, 0);

  if (cart.length === 0)
    return (
      <div className="">
        <button className="ml-6 mt-5" onClick={() => navigate(-1)}>
          👈 Go back
        </button>
        <p className="mt-10 text-center">Cart is Empty</p>;
      </div>
    );

  return (
    <div className="mx-auto max-w-5xl p-4">
      <button onClick={() => navigate(-1)}>👈 Go back</button>

      <ul className="h-[65vh] overflow-y-scroll">
        {cart.map((item) => (
          <li
            key={item.title}
            className="flex items-center justify-between py-2 text-xl font-bold"
          >
            <h4 className="flex-1 text-wrap">{`${item.title.slice(0, 10)}`}</h4>
            <p className="flex-1">Quantity: {item.quantity}</p>
            <div className="flex flex-1 justify-evenly">
              <button
                className="cursor-pointer"
                onClick={() => HandleDecreaseCart(item.title)}
              >
                ◀
              </button>
              <button
                className="cursor-pointer"
                onClick={() => HandleIncreaseQuantity(item.title)}
              >
                ▶
              </button>
              <button
                className="cursor-pointer"
                onClick={() => DeleteItemFromCart(item)}
              >
                🚮
              </button>
            </div>
            <div className="flex-1 text-center">${item.price.toFixed(2)}</div>
            <div className="max-h-14 max-w-14">
              <img className="" src={item.thumbnail} alt={item.title} />
            </div>
          </li>
        ))}
      </ul>
      <div className="">
        <div className="mb-3 flex items-center justify-between text-xl font-semibold">
          <p className="">TotalPrice : ${TotalPrice.toFixed(2)}</p>
          <p>
            there {`${cart.length === 1 ? "is" : "are"}`} {cart.length} product
            {`${cart.length === 1 ? "" : "s"}`} in cart
          </p>
        </div>
        <button className="inline-block rounded-full bg-gray-800 px-4 py-3 text-sm font-semibold uppercase  tracking-wide text-white transition-colors duration-300 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-700 focus:ring-offset-2  disabled:cursor-not-allowed md:px-6 md:py-4">
          Order
        </button>
      </div>
    </div>
  );
}

export default Cart;
