# serializers/category_serializer.py
from rest_framework import serializers
from api.models import Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']