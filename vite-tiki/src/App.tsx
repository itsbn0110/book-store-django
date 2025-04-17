import { Routes, Route } from 'react-router-dom';
import { useEffect, useState, createContext } from 'react';
import * as productService from '~/services/productService';
import { publicRoutes, privateRoutes } from '~/routes';
import GlobalStyles from '~/components/GlobalStyles';
import { ProductResponse } from './types/types';
import AdminLayout from './pages/Admin/AdminLayout'

// Create context for product data if needed
export const BookContext = createContext<ProductResponse['data']>([]);

function App() {
  const [productResult, setProductResult] = useState<ProductResponse['data']>([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await productService.getProducts();
      setProductResult(result.data);
    };
    fetchApi();
  }, []);

  return (
    <BookContext.Provider value={productResult}>
      <GlobalStyles>
        <Routes>
          {/* Public routes */}
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return route.books ? (
              <Route key={index} path={route.path} element={<Page books={productResult} />} />
            ) : (
              <Route key={index} path={route.path} element={<Page />} />
            );
          })}

          {/* Admin routes - wrapped with AdminLayout */}
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <AdminLayout>
                    <Page books={route.books ? productResult : undefined} />
                  </AdminLayout>
                }
              />
            );
          })}
        </Routes>
      </GlobalStyles>
    </BookContext.Provider>
  );
}

export default App;