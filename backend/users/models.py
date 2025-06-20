from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db import models
from cloudinary.models import CloudinaryField

class CustomUser(AbstractUser):
    bio = models.TextField(blank=True, null=True)
    avatar = CloudinaryField('image', folder= 'avatars' , blank=True, null=True)
    email = models.EmailField(unique=True)
    birth_date = models.DateField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    is_private = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


    def __str__(self):
        return str(self.username) if self.username else f"Usuário#{self.pk}"



class Following(models.Model):
    follower = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='following'
    )
    followed = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='followers'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('follower', 'followed')

    def __str__(self):
        return f'{self.follower.username} -> {self.followed.username}'
