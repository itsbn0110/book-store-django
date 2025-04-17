import cloudinary
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

from ..models import Book
from ..serializers import BookSerializer
import json

def example_view(request):
    return JsonResponse({"message": "This is an example API response."})


@api_view(['POST'])
def create_book(request):
    try:
        data = request.data.copy()
        print("Incoming data:", data)

        # Parse stringified JSON arrays from FormData
        def parse_ids(field):
            value = data.get(field, None)
            if value:
                try:
                    return json.loads(value)
                except Exception as e:
                    print(f"Error parsing {field}: {e}")
                    return []
            return []

        authors = parse_ids('authors')
        publishers = parse_ids('publishers')
        categories = parse_ids('categories')

        # Remove these fields so serializer doesn't see them as string
        data.pop('authors', None)
        data.pop('publishers', None)
        data.pop('categories', None)

        image = data.get('image', None)
        if image:
            upload_result = cloudinary.uploader.upload(image)
            data['image'] = upload_result.get('url')
            print("Image uploaded successfully. URL:", data['image'])

        serializer = BookSerializer(data=data)
        if serializer.is_valid():
            print("Serializer is valid. Validated data:", serializer.validated_data)
            book = serializer.save()
            if authors:
                book.authors.set(authors)
            if publishers:
                book.publishers.set(publishers)
            if categories:
                book.category.set(categories)
            return Response(BookSerializer(book).data, status=status.HTTP_201_CREATED)
        else:
            print("Serializer errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print("Exception occurred:", str(e))
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
        return Response(serializer.data)
    except Book.DoesNotExist:
        return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
def update_book(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
        data = request.data.copy()
        def parse_ids(field):
            value = data.get(field, None)
            if value:
                try:
                    return json.loads(value)
                except Exception as e:
                    print(f"Error parsing {field}: {e}")
                    return []
            return []
        authors = parse_ids('authors')
        publishers = parse_ids('publishers')
        categories = parse_ids('categories')
        data.pop('authors', None)
        data.pop('publishers', None)
        data.pop('categories', None)
        image = data.get('image', None)
        if image:
            upload_result = cloudinary.uploader.upload(image)
            data['image'] = upload_result.get('url')
        serializer = BookSerializer(book, data=data, partial=True)
        if serializer.is_valid():
            book = serializer.save()
            if authors:
                book.authors.set(authors)
            if publishers:
                book.publishers.set(publishers)
            if categories:
                book.category.set(categories)
            return Response(BookSerializer(book).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Book.DoesNotExist:
        return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def delete_book(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
        # Remove relationships from authors, publishers, categories
        book.authors.clear()
        book.publishers.clear()
        book.category.clear()
        # Delete the book itself
        book.delete()
        return Response({"message": "Book deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except Book.DoesNotExist:
        return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

