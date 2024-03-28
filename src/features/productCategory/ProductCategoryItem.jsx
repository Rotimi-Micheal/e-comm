import { Link } from "react-router-dom";
import { calculateDiscount } from "../../utils/calculateDiscount";

function ProductCategoryItem({ items }) {
  const { id, images, title, brand, description, price, discountPercentage } =
    items;

  return (
    <Link key={id} to={`${id}`}>
      <div className="rounded-t-xl px-20 md:px-10">
        <img className="rounded-2xl" src={images[0]} alt={title} />
        <p className="mt-4 text-center text-lg font-medium leading-6">
          {brand}
        </p>
        <p className="mt-2 text-center text-lg font-medium leading-6">
          {title}
        </p>
        <p className="mt-2 text-center text-lg font-medium leading-6">
          {description}
        </p>
        <p className="mt-2 justify-between text-center text-lg font-medium leading-6">
          <span className="mx-3 line-through decoration-[2px]">
            ${Number(price)}
          </span>
          <span className="mx-3 text-yellow-600">
            ${Number(calculateDiscount(price, discountPercentage))}
          </span>
        </p>
      </div>
    </Link>
  );
}

export default ProductCategoryItem;
