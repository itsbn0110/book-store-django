import HomeBook from '~/pages/HomeBook';
import BookDetails from '~/pages/BookDetail';
import Cart from '~/pages/Cart';
import CategoryPage from '~/pages/CategoryPage';
import { RouteConfig } from '~/types/routes';
import AddBookPage from '~/pages/Admin/AddBookPage';
import AdminDashboard from '~/pages/Admin/AdminDashboard';
import AuthorsPage from '~/pages/Admin/AuthorsPage';
import PublishersPage from '~/pages/Admin/PublisherPage';
import CategoriesPage from '~/pages/Admin/CategoriesPage';
import BookListPage from '~/pages/Admin/BooklListPage';
import MyPageBookDetail from '~/pages/MyPageBookDetail';
import AccountInfo from '~/components/AccountInfo';
const publicRoutes: RouteConfig[] = [
  { path: '/', component: HomeBook, books: true },
  { path: '/bookdetail/:id', component: BookDetails, books: true },
  { path: '/mypagebookdetail/:id', component: MyPageBookDetail, books: true },

  { path: '/checkout/cart', component: Cart },
  { path: '/category/:categoryName', component: CategoryPage, books: true },
  { path: '/account/:id', component: AccountInfo },
];

const privateRoutes: RouteConfig[] = [
  {
    path: "/admin",
    component: AdminDashboard,
  },
  {
    path: "/admin/books",
    component: BookListPage,
    
  },
  {
    path: "/admin/books/add",
    component: AddBookPage,
  },
  {
    path: "/admin/books/edit/:id",
    component: AddBookPage,
  },
  {
    path: "/admin/authors",
    component: AuthorsPage,
  },
  {
    path: "/admin/publishers",
    component: PublishersPage,
  },
  {
    path: "/admin/categories",
    component: CategoriesPage,
  },
  // {
  //   path: "/admin/blog",
  //   component: BlogPostsPage,
  // },
  // {
  //   path: "/admin/orders",
  //   component: OrdersPage,
  // }
];

export { publicRoutes, privateRoutes };