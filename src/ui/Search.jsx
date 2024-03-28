// import { useEffect, useState } from "react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useModalContext } from "./Modal";

// function Search() {
//   const [query, setQuery] = useState("");
//   const [searchData, setSearchData] = useState([]);
//   const [showSearch, setShowSearch] = useState(false);

//   useEffect(
//     function () {
//       if (query === "") return;
//       async function getQuery() {
//         const res = await fetch(
//           `https://dummyjson.com/products/search?q=${query}`,
//         );
//         const data = await res.json();
//         setSearchData(data?.products);
//       }

//       getQuery();
//     },
//     [query],
//   );

//   return (
//     <div className="">
//       <input
//         value={query}
//         onChange={(e) => {
//           setShowSearch(false);
//           setQuery(e.target.value);
//         }}
//         type="text"
//         placeholder="search.."
//         className="rounded-xl border-[1px] border-black pl-3 focus:outline-none focus:ring focus:ring-gray-800 focus:ring-offset-2"
//       />

//       <div
//         className={`${showSearch ? "hidden" : "absolute top-10 z-20 h-28 w-full"}`}
//       >
//         {searchData?.map((item) => (
//           <li onClick={handleQuery} key={item.id}>
//             <Link to={`product-category/${item.category}/${item.id}`}>
//               {item.title}
//             </Link>
//           </li>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Search;

function Search() {
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const { closeModal } = useModalContext();

  useEffect(
    function () {
      if (query === "") return;

      async function getQuery() {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}`,
        );
        const data = await res.json();

        setSearchData(data.products);
      }
      getQuery();
    },
    [query],
  );

  return (
    <div className="w-full">
      <input
        className="rounded-xl px-2 text-xl"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />
      <div className="mt-3">
        <ul className="max-h-64 overflow-auto rounded-lg bg-white">
          {searchData?.map((item) => (
            <li
              className="border-b-2 border-gray-600 px-2 text-xl"
              key={item.id}
              onClick={() => closeModal()}
            >
              <Link to={`product-category/${item.category}/${item.id}`}>
                {item.title.slice(0, 10)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Search;
