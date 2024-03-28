import { useCallback, useRef, useState } from "react";
import { useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaShoppingBag } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, NavLink } from "react-router-dom";
import Modal from "./Modal";
import Search from "./Search";
import { useCartContext } from "../features/cart/CartProvider";

function NavBar() {
  const { cart } = useCartContext();

  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [showNavList, setShowNavList] = useState(false);
  const [products, setProducts] = useState([]);

  const getAllProduct = useCallback(async function () {
    const res = await fetch(`https://dummyjson.com/products/categories`);

    const data = await res.json();

    setProducts(data?.slice(0, 5));
  }, []);

  useEffect(
    function () {
      getAllProduct();
    },
    [getAllProduct],
  );

  useEffect(
    function () {
      if (query === "") return;
      async function getQuery() {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}`,
        );
        const data = await res.json();
        setSearchData(data?.products);
      }

      getQuery();
    },
    [query],
  );

  //   const data = products?.slice(0, 5);
  const navList = products?.filter((_, i) => i < 5);

  function handleQuery() {
    setQuery("");
    setShowSearch(true);
  }

  return (
    <header className="relative  mx-auto flex max-w-5xl items-center justify-between p-4 text-slate-800">
      <div className="text-3xl font-semibold text-slate-950">
        <NavLink to={"/"}>LOGO</NavLink>
      </div>
      <nav
        className={`absolute left-0 top-16 z-50 w-full  md:relative  md:top-0 md:[all:unset]`}
      >
        {showNavList && (
          <ul className="z-50 mt-6 flex flex-col gap-6 bg-slate-100 px-3 py-5 text-lg  font-medium md:hidden">
            {navList?.map((itm) => (
              <li
                key={itm}
                className="flex cursor-pointer items-center justify-between"
                onClick={() => setShowNavList(false)}
              >
                <Link to={`product-category/${itm}`}>{itm}</Link>
                <span className="text-lg ">+</span>
              </li>
            ))}
          </ul>
        )}
        <ul className="hidden gap-4 text-lg font-medium md:flex">
          {navList?.map((itm) => (
            <li key={itm} className="cursor-pointer">
              <Link to={`product-category/${itm}`}>{itm}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="relative flex items-center justify-center">
        <Modal>
          <Modal.Open>
            <CiSearch size={35} />
          </Modal.Open>
          <Modal.Window>
            <Search />
          </Modal.Window>
        </Modal>

        <div
          className={` ${showSearch ? "hidden" : "absolute top-10 z-20 h-28 w-full"} `}
        >
          {searchData?.map((item) => (
            <li onClick={handleQuery} key={item.id}>
              <Link to={`product-category/${item.category}/${item.id}`}>
                {item.title}
              </Link>
            </li>
          ))}
        </div>
        {/* {query !== "" && (
            <ul className="max-h-40 overflow-y-auto rounded-b-lg bg-white px-3">
              {searchData?.map((item) => (
                <>
                  <Link
                    key={item.id}
                    to={`product-category/${item.category}/${item.id}`}
                  >
                    <li
                      onClick={() => {
                        console.log(item.id, item.category);
                        console.log("render");
                        setQuery("");
                      }}
                      className="border-b-2 border-gray-500 pt-1"
                    >
                      {item.title}
                    </li>
                  </Link>
                </>
              ))}
              
            </ul>
          )} */}
      </div>
      <Link to={"/cart"}>
        <div className="relative cursor-pointer">
          <FaShoppingBag size={30} />
          <p className="absolute right-[6px] top-[0.65rem] text-base font-bold text-white">
            {cart.length === 0 ? `${0}` : `${cart.length}`}
          </p>
        </div>
      </Link>
      <GiHamburgerMenu
        size={40}
        className="text-slate-950 md:hidden"
        onClick={() => setShowNavList(!showNavList)}
      />
    </header>
  );
}

export default NavBar;
