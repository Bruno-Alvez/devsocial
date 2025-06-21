from rest_framework import serializers
from .models import Post, Comment, LegacyNotification
from users.models import CustomUser
from users.serializers import UserSerializer


class PostAuthorSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['username', 'avatar']

    def get_avatar(self, obj):
        if obj.avatar and hasattr(obj.avatar, 'url'):
            return obj.avatar.url
        return None


class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'author_username', 'content', 'created_at']
        read_only_fields = ['author', 'created_at', 'post']


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    likes_count = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'author', 'content', 'likes_count', 'created_at', 'comments']
        read_only_fields = ['id', 'author', 'likes_count', 'created_at']

    def get_likes_count(self, obj):
        return obj.likes.count()


class PostDetailSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    likes_count = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'author', 'content', 'likes_count', 'created_at', 'comments']
        read_only_fields = ['id', 'author', 'likes_count', 'created_at', 'comments']

    def get_likes_count(self, obj):
        return obj.likes.count()


class NotificationSerializer(serializers.ModelSerializer):
    sender_username = serializers.ReadOnlyField(source='sender.username')

    class Meta:
        model = LegacyNotification
        fields = ['id', 'sender', 'sender_username', 'notification_type', 'post', 'is_read', 'timestamp']
