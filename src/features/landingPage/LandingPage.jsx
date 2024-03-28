import { useQuery } from "@tanstack/react-query";
import Slider from "./Slider";
import { getAllProducts } from "../../service/getAllProducts";
import { calculateDiscount } from "../../utils/calculateDiscount";
import { useCartContext } from "../cart/CartProvider";

const categoriesToInclude = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
];

function LandingPage() {
  const { addToCart } = useCartContext();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["productImage"],
    queryFn: getAllProducts,
    staleTime: 10000,
  });

  const product = data?.data?.products ?? [];

  const itemsByCategory = categoriesToInclude.reduce((acc, cur) => {
    const filteredItem = product?.filter((item) => item.category === cur);

    acc[cur] = filteredItem;

    return acc;
  }, {});

  const KeyNdValue = Object.entries(itemsByCategory);

  // function handleAddToCart() {
  //   // addToCart({});
  //   console.log("up");
  // }

  // const { smartphones, laptops, fragrances, skincare, groceries } =
  //   itemsByCategory;
  // console.log(smartphones, laptops, fragrances, skincare, groceries);

  if (isError)
    return (
      <p className="mt-20 text-center text-5xl text-red-600">
        an error occured while loading website 😓😔😞
      </p>
    );

  if (isLoading)
    return (
      <p className="mt-20 text-center text-5xl text-green-500">loading.....</p>
    );

  return (
    <section className="mx-auto mt-4 max-w-5xl  px-4">
      <Slider data={data} />
      {KeyNdValue.map((item, i) => (
        <div className="mt-8" key={i}>
          <h2 className="text-center text-2xl font-medium">{item[0]}</h2>
          <div className="flex items-center justify-between">
            {item[1].map((value, i) => (
              <div key={i} className="flex flex-col">
                <div className="flex h-36 w-24 items-center" key={i}>
                  <img className="" src={value.images[0]} />
                </div>
                <p>{value.title.slice(0, 9)}</p>
                <p>
                  ${calculateDiscount(value.price, value.discountPercentage)}
                </p>
                <button
                  className="mt-2 rounded-xl bg-amber-500  p-2 text-base font-normal  text-white hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-700 focus:ring-offset-2"
                  onClick={() =>
                    addToCart({
                      thumbnail: value.thumbnail,
                      title: value.title,
                      price: +calculateDiscount(
                        value.price,
                        value.discountPercentage,
                      ),
                      category: value.category,
                      quantity: 1,
                      brand: value.brand,
                    })
                  }
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default LandingPage;
