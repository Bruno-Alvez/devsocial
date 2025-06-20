from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework.response import Response
from .models import CustomUser
from .models import Following
from posts.models import Post

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class ProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(use_url=True)
    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "birth_date", "location", "avatar", "bio", "is_private"]
        ready_only_fields = ["id", "username", "email"]

class FollowingSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='followed.id')
    username = serializers.CharField(source='followed.username')
    avatar = serializers.ImageField(source='followed.avatar', read_only=True)

    class Meta:
        model = Following
        fields = ['id', 'username', 'avatar',]

class PostSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'author', 'content', 'image', 'likes_count', 'created_at']

    def get_author(self, obj):
        return {
            'username': obj.author.username,
            'avatar': obj.author.avatar.url if obj.author.avatar else None
        }


    def get_likes_count(self, obj):
        return obj.likes.count()
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = CustomUser.EMAIL_FIELD

    def validate(self, attrs):
        credentials = {
            'email': attrs.get("email"),
            'password': attrs.get("password")
        }

        user = authenticate(**credentials)

        if user is None:
            if user is None:
                raise AuthenticationFailed("Credenciais incorretas!")


        refresh = self.get_token(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'avatar': user.avatar.url if user.avatar and hasattr(user.avatar, 'url') else None

            }
        }

class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(use_url=True)
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'avatar']

class UserSuggestionSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(use_url=True)
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'avatar']