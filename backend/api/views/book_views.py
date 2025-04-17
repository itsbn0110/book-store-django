import cloudinary
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from ..models import Book, Author, Publisher, Category
from ..serializers import BookSerializer
from api.permissions import IsAdmin
import json

def example_view(request):
    return JsonResponse({"message": "This is an example API response."})

@api_view(['POST'])
def create_book(request):
    try:
        # Parse JSON fields
        print ("request data: ", request.data)

        try:
            authors_ids = json.loads(request.data.get('authors', '[]'))
            publishers_ids = json.loads(request.data.get('publishers', '[]'))
            categories_ids = json.loads(request.data.get('categories', '[]'))
        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON format for authors, publishers, or categories"}, status=status.HTTP_400_BAD_REQUEST)

        # Convert to list of IDs if not already
        if not isinstance(authors_ids, list):
            authors_ids = []
        if not isinstance(publishers_ids, list):
            publishers_ids = []
        if not isinstance(categories_ids, list):
            categories_ids = []

        print (" authors_ids:", authors_ids )
        print (" publishers_ids:", publishers_ids )
        print (" categories_ids:", categories_ids )

        # Handle image upload and pass image_url to serializer
        image_file = request.FILES.get('image')
        image_url = None
        if image_file:
            try:
                print(f"image_file in book_view: {image_file.name}")
                upload_result = cloudinary.uploader.upload(file=image_file, resource_type="image")
                image_url = upload_result.get('secure_url')
            except Exception as e:
                return Response({"error": "Failed to upload image", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Ensure authors, publishers, and categories are lists of IDs
        authors_ids = authors_ids[0] if isinstance(authors_ids, list) and len(authors_ids) == 1 and isinstance(authors_ids[0], list) else authors_ids
        publishers_ids = publishers_ids[0] if isinstance(publishers_ids, list) and len(publishers_ids) == 1 and isinstance(publishers_ids[0], list) else publishers_ids
        categories_ids = categories_ids[0] if isinstance(categories_ids, list) and len(categories_ids) == 1 and isinstance(categories_ids[0], list) else categories_ids

        # Flatten lists if they are nested
        authors_ids = authors_ids if isinstance(authors_ids, list) else json.loads(authors_ids)
        publishers_ids = publishers_ids if isinstance(publishers_ids, list) else json.loads(publishers_ids)
        categories_ids = categories_ids if isinstance(categories_ids, list) else json.loads(categories_ids)

        # Prepare data for serializer (include authors, publishers, categories)
        data = request.data.copy()
        data['authors'] = authors_ids
        data['publishers'] = publishers_ids
        data['categories'] = categories_ids
        if image_url:
            data['image'] = image_url

        # Log data before serializer validation
        print("Data passed to serializer:", data)

        serializer = BookSerializer(data=data, context={'request': request})

        if serializer.is_valid():
            print("Serializer is valid")
            book = serializer.save()
            # Set ManyToMany relations using IDs
            book.authors.set(authors_ids)
            book.publishers.set(publishers_ids)
            book.category.set(categories_ids)
            book.save()
            return Response(BookSerializer(book).data, status=status.HTTP_201_CREATED)
        else:
            print("Serializer errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    except json.JSONDecodeError:
        return Response({"error": "Invalid JSON format"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
@api_view(['GET'])
def get_all_books(request):
    books = Book.objects.all()
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_book_by_id(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
        serializer = BookSerializer(book)
        return Response({
            "id": book.id,
            "title": book.title,
            "author": book.author,
            "published_date": book.published_date,
            "isbn": book.isbn,
            "page_count": book.page_count,
            "cover": book.cover,
            "language": book.language,
            "image": book.image
        })
    except Book.DoesNotExist:
        return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
def update_book(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
        serializer = BookSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Book.DoesNotExist:
        return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def delete_book(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
        book.delete()
        return Response({"message": "Book deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except Book.DoesNotExist:
        return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)
