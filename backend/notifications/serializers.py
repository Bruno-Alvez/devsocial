from backend.notifications.models import Notification
from backend.posts import serializers


class NotificationSerializer(serializers.ModelSerializer):
    sender_username = serializers.CharField(source='sender.username', read_only=True)
    sender_avatar = serializers.ImageField(source='sender.avatar', read_only=True)

    class Meta:
        model = Notification
        fields = ['id', 'notification_type', 'post', 'is_read', 'timestamp', 'sender_username', 'sender_avatar']
