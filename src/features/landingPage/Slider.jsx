import { Link } from "react-router-dom";
import { useSlider } from "../../hooks/useSlider";

const categoriesToInclude = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
];

function Slider({ data }) {
  const allProducts = data?.data?.products ?? [];

  const firstItemsByCategories = allProducts?.reduce((acc, cur) => {
    if (categoriesToInclude.includes(cur.category)) {
      if (!acc[cur.category]) acc[cur.category] = cur;
    }

    return acc;
  }, []);

  const firstItem = Object.values(firstItemsByCategories);
  const categoryArr = firstItem?.map((item) => item.category);
  const ImageArr = firstItem?.map((item) => item.thumbnail);

  const { slide, handleNext, handlePrev } = useSlider(3000, ImageArr);

  return (
    <section className="">
      <div className="relative">
        <Link to={`product-category/${categoryArr[slide]}`}>
          <div>
            <img
              className="h-96 w-full object-cover"
              src={ImageArr[slide]}
              alt={`${ImageArr[slide]}/alt`}
            />
          </div>
          {/* <p className="absolute bottom-0 left-[50%] -translate-x-1/2 text-center text-5xl text-gray-800">
            {categoryArr[slide]}
          </p> */}
        </Link>
        <button
          onClick={handleNext}
          className="absolute bottom-0 left-0 inline-block rounded-full bg-gray-800 px-4 py-3 text-sm font-semibold uppercase  tracking-wide text-white transition-colors duration-300 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-700 focus:ring-offset-2  disabled:cursor-not-allowed md:px-6 md:py-4 "
        >
          left
        </button>
        <button
          onClick={handlePrev}
          className="absolute bottom-0 right-0 inline-block rounded-full bg-gray-800 px-4 py-3 text-sm font-semibold uppercase  tracking-wide  text-white transition-colors duration-300 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-700  focus:ring-offset-2 disabled:cursor-not-allowed md:px-6 md:py-4"
        >
          Right
        </button>
      </div>
    </section>
  );
}

export default Slider;
