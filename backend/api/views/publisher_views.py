from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models.publisher import Publisher
from ..serializers.publisher_serializer import PublisherSerializer
from api.permissions import IsAdmin
from rest_framework.decorators import permission_classes

@api_view(['GET'])
def get_all_publishers(request):
    publishers = Publisher.objects.all()
    serializer = PublisherSerializer(publishers, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_publisher_by_id(request, publisher_id):
    try:
        publisher = Publisher.objects.get(id=publisher_id)
        serializer = PublisherSerializer(publisher)
        return Response(serializer.data)
    except Publisher.DoesNotExist:
        return Response({"error": "Publisher not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])

def create_publisher(request):
    serializer = PublisherSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_publisher(request, publisher_id):
    try:
        publisher = Publisher.objects.get(id=publisher_id)
        serializer = PublisherSerializer(publisher, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Publisher.DoesNotExist:
        return Response({"error": "Publisher not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def delete_publisher(request, publisher_id):
    try:
        publisher = Publisher.objects.get(id=publisher_id)
        publisher.delete()
        return Response({"message": "Publisher deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except Publisher.DoesNotExist:
        return Response({"error": "Publisher not found"}, status=status.HTTP_404_NOT_FOUND)