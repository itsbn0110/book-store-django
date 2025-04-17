import cloudinary.uploader
from rest_framework import serializers
from ..models.user import CustomUser as User
import cloudinary

print("Cloudinary Config:", cloudinary.config().cloud_name, cloudinary.config().api_key, cloudinary.config().api_secret)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        print(cloudinary.config().api_key)
        avatar_file = self.context['request'].FILES.get('avatar') if 'request' in self.context else None
        avatar_url = None
        if avatar_file:
            upload_result = cloudinary.uploader.upload(avatar_file)
            avatar_url = upload_result.get('secure_url')
        role = validated_data.get('role', 'user')
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            role=role,
            avatar=avatar_url or validated_data.get('avatar')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        avatar_file = self.context['request'].FILES.get('avatar') if 'request' in self.context else None
        if avatar_file:
            upload_result = cloudinary.uploader.upload(avatar_file)
            instance.avatar = upload_result.get('secure_url')
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance