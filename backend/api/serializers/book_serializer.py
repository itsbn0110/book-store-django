# serializers/book_serializer.py
from rest_framework import serializers
from api.models import Book, Author, Publisher, Category
from .author_serializer import AuthorSerializer
from .publisher_serializer import PublisherSerializer
from .category_serializer import CategorySerializer
import cloudinary.uploader

class BookSerializer(serializers.ModelSerializer):
    authors = serializers.PrimaryKeyRelatedField(queryset=Author.objects.all(), many=True, write_only=True)
    publishers = serializers.PrimaryKeyRelatedField(queryset=Publisher.objects.all(), many=True, write_only=True)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), many=True, write_only=True)
    author_objs = AuthorSerializer(source='authors', many=True, read_only=True)
    publisher_objs = PublisherSerializer(source='publishers', many=True, read_only=True)
    category_objs = CategorySerializer(source='category', many=True, read_only=True)
    image = serializers.URLField(required=False)

    class Meta:
        model = Book
        fields = [
            'id', 'authors', 'publishers', 'category', 'author_objs', 'publisher_objs', 'category_objs',
            'image', 'title', 'description', 'price', 'published_date'
        ]

    def create(self, validated_data):
        authors = validated_data.pop('authors', [])
        publishers = validated_data.pop('publishers', [])
        categories = validated_data.pop('category', [])
        book = Book.objects.create(**validated_data)
        book.authors.set(authors)
        book.publishers.set(publishers)
        book.category.set(categories)
        return book

    def update(self, instance, validated_data):
        authors = validated_data.pop('authors', None)
        publishers = validated_data.pop('publishers', None)
        categories = validated_data.pop('category', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if authors is not None:
            instance.authors.set(authors)
        if publishers is not None:
            instance.publishers.set(publishers)
        if categories is not None:
            instance.category.set(categories)
        return instance