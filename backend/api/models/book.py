from django.db import models
from .author import Author
from .publisher import Publisher
from .category import Category

class Book(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    authors = models.ManyToManyField('Author', related_name='books')
    publishers = models.ManyToManyField('Publisher', related_name='books')
    category = models.ManyToManyField(Category, related_name='books')
    published_date = models.DateField(blank=True, null=True)
    image = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title