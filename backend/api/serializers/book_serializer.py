# serializers/book_serializer.py
from rest_framework import serializers
from api.models import Book, Author, Publisher, Category
from .author_serializer import AuthorSerializer
from .publisher_serializer import PublisherSerializer
from .category_serializer import CategorySerializer
import cloudinary.uploader

class BookSerializer(serializers.ModelSerializer):
   
    image = serializers.URLField(required=False)

    class Meta:
        model = Book
        fields = '__all__'

  

    def create(self, validated_data):
        # Không upload image ở đây nữa, chỉ nhận url
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Không upload image ở đây nữa, chỉ nhận url
        return super().update(instance, validated_data)