from django.db import models
from django.contrib.auth import get_user_model
from posts.models import Post
from users.models import CustomUser

User = get_user_model()

class Notification(models.Model):
    NOTIFICATION_TYPES = [
        ('like', 'Like'),
        ('follow', 'Follow'),
        ('new_post', 'New Post'),
    ]

    from_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='notifications_sent')
    to_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='notifications_received')
    notification_type = models.CharField(max_length=10, choices=NOTIFICATION_TYPES)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.notification_type} - to {self.to_user.username}"
