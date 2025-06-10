from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.password_validation import validate_password
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
    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "birth_date", "location", "avatar", "bio", "is_private"]
        ready_only_fields = ["id", "username", "email"]

class FollowingSerializer(serializers.ModelSerializer):
    follower = serializers.StringRelatedField(read_only=True)
    followed = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Following
        fields = ['id', 'follower', 'followed', 'created_at']

class PostSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'author', 'content', 'image', 'likes_count', 'created_at']
        read_only_fields = ['id', 'author', 'likes_count', 'created_at']

    def get_likes_count(self, obj):
        return obj.likes.count()

class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = CustomUser.EMAIL_FIELD

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        user = authenticate(request=self.context.get('request'), email=email, password=password)

        if not user:
            raise serializers.ValidationError("Credenciais inválidas")

        refresh = self.get_token(user)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            },
        }

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username
        return token
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = CustomUser.EMAIL_FIELD  # <- garante uso do email

    def validate(self, attrs):
        credentials = {
            'email': attrs.get("email"),
            'password': attrs.get("password")
        }

        user = authenticate(**credentials)

        if user is None:
            raise serializers.ValidationError("Invalid email or password.")

        refresh = self.get_token(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'profile_picture': user.profile_picture.url if user.profile_picture else None
            }
        }

