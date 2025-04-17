from django.urls import path

from .views.book_views import create_book, get_all_books, get_book_by_id, update_book, delete_book
from .views.category_views import get_all_categories, get_category_by_id, create_category, update_category, delete_category
from .views.auth_views import register_user, CustomTokenObtainPairView, admin_create_user, admin_list_users, admin_get_user, admin_update_user, admin_delete_user
from rest_framework_simplejwt.views import TokenRefreshView
from .views.publisher_views import get_all_publishers, get_publisher_by_id, create_publisher, update_publisher, delete_publisher
from .views.author_views import get_all_authors, get_author_by_id, create_author, update_author, delete_author

urlpatterns = [
    path('books/create/', create_book, name='create_book'),
    path('books/', get_all_books, name='get_all_books'),
    path('books/<int:book_id>/', get_book_by_id, name='get_book_by_id'),
    path('books/<int:book_id>/update/', update_book, name='update_book'),
    path('books/<int:book_id>/delete/', delete_book, name='delete_book'),
    path('categories/', get_all_categories, name='get_all_categories'),
    path('categories/   /', get_category_by_id, name='get_category_by_id'),
    path('categories/create/', create_category, name='create_category'),
    path('categories/<int:category_id>/update/', update_category, name='update_category'),
    path('categories/<int:category_id>/delete/', delete_category, name='delete_category'),
    path('auth/register/', register_user, name='register_user'),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Publisher routes
    path('publishers/', get_all_publishers, name='get_all_publishers'),
    path('publishers/<int:publisher_id>/', get_publisher_by_id, name='get_publisher_by_id'),
    path('publishers/create/', create_publisher, name='create_publisher'),
    path('publishers/<int:publisher_id>/update/', update_publisher, name='update_publisher'),
    path('publishers/<int:publisher_id>/delete/', delete_publisher, name='delete_publisher'),

    # Author routes
    path('authors/', get_all_authors, name='get_all_authors'),
    path('authors/<int:author_id>/', get_author_by_id, name='get_author_by_id'),
    path('authors/create/', create_author, name='create_author'),
    path('authors/<int:author_id>/update/', update_author, name='update_author'),
    path('authors/<int:author_id>/delete/', delete_author, name='delete_author'),

    # Admin user routes
    path('admin/users/', admin_list_users, name='admin_list_users'),
    path('admin/users/create/', admin_create_user, name='admin_create_user'),
    path('admin/users/<int:user_id>/', admin_get_user, name='admin_get_user'),
    path('admin/users/<int:user_id>/update/', admin_update_user, name='admin_update_user'),
    path('admin/users/<int:user_id>/delete/', admin_delete_user, name='admin_delete_user'),
]