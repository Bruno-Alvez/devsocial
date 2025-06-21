from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework.exceptions import AuthenticationFailed
from .models import CustomUser, Following
from posts.models import Post

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )


class ProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField()

    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "birth_date", "location", "avatar", "bio", "is_private"]
        read_only_fields = ["id", "username", "email"]


class FollowingSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='followed.id')
    username = serializers.CharField(source='followed.username')
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = Following
        fields = ['id', 'username', 'avatar']

    def get_avatar(self, obj):
        if obj.followed.avatar and hasattr(obj.followed.avatar, 'url'):
            return obj.followed.avatar.url
        return None


class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'avatar']

    def get_avatar(self, obj):
        if obj.avatar and hasattr(obj.avatar, 'url'):
            return obj.avatar.url
        return None


class UserSuggestionSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'avatar']

    def get_avatar(self, obj):
        if obj.avatar and hasattr(obj.avatar, 'url'):
            return obj.avatar.url
        return None


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = CustomUser.EMAIL_FIELD

    def validate(self, attrs):
        credentials = {
            'email': attrs.get("email"),
            'password': attrs.get("password")
        }

        user = authenticate(**credentials)

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
