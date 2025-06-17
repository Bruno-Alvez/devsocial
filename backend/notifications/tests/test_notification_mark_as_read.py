import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from users.models import CustomUser
from posts.models import Post, LegacyNotification

@pytest.mark.django_db
def test_mark_notification_as_read():
    recipient = CustomUser.objects.create_user(
        username='recipient', email='recipient@example.com', password='testpass123'
    )
    sender = CustomUser.objects.create_user(
        username='sender', email='sender@example.com', password='testpass123'
    )
    post = Post.objects.create(author=sender, content='Post de teste')

    notification = LegacyNotification.objects.create(
        recipient=recipient,
        sender=sender,
        notification_type='comment',
        post=post,
        is_read=False
    )

    client = APIClient()
    login_response = client.post(reverse('login'), {
        'email': 'recipient@example.com',
        'password': 'testpass123'
    }, format='json')
    token = login_response.data['access']

    client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
    url = reverse('notification-mark-read', args=[notification.id])
    response = client.patch(url, {'is_read': True}, format='json')

    assert response.status_code in [200, 204]
    notification.refresh_from_db()
    assert notification.is_read is True
