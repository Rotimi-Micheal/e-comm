import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import ProductCategoryPage from "./pages/ProductCategoryPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartPage from "./pages/CartPage";
import CartProvider from "./features/cart/CartProvider";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <p>error</p>,
    children: [
      { index: true, element: <Home /> },
      {
        path: "product-category",
        children: [
          { index: true, element: <ProductCategoryPage /> },
          {
            path: ":categoryId",
            children: [
              { index: true, element: <Category /> },
              { path: ":productId", element: <Product /> },
            ],
          },
        ],
      },
      { path: "cart", element: <CartPage /> },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Toaster />
    </>
  );
}

export default App;
