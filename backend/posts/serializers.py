from rest_framework import serializers
from .models import Post, Comment, Notification

class PostSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'author', 'content', 'image', 'likes_count', 'created_at']
        read_only_fields = ['id', 'author', 'likes_count', 'created_at']

    def get_likes_count(self, obj):
        return obj.likes.count()
    

class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'author_username', 'content', 'created_at']
        read_only_fields = ['author', 'created_at']

class PostDetailSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    likes_count = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, read_only=True, source='comment_set')

    class Meta:
        model = Post
        fields = [
            'id', 'author', 'content', 'image',
            'likes_count', 'created_at', 'comments'
        ]
        read_only_fields = ['id', 'author', 'likes_count', 'created_at', 'comments']

    def get_likes_count(self, obj):
        return obj.likes.count()
    
class NotificationSerializer(serializers.ModelSerializer):
    sender_username = serializers.ReadOnlyField(source='sender.username')
    class Meta:
        model = Notification
        fields = ['id', 'sender', 'sender_username', 'notification_type', 'post', 'is_read', 'timestamp']
