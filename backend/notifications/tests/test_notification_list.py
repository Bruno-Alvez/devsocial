import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from users.models import CustomUser
from posts.models import Post, LegacyNotification

@pytest.mark.django_db
def test_list_notifications():
    recipient = CustomUser.objects.create_user(
        username='recipient', email='recipient@example.com', password='testpass123'
    )
    sender = CustomUser.objects.create_user(
        username='sender', email='sender@example.com', password='testpass123'
    )
    post = Post.objects.create(author=sender, content='Post de teste')

    LegacyNotification.objects.create(
        recipient=recipient,
        sender=sender,
        notification_type='like',
        post=post
    )

    client = APIClient()
    login_response = client.post(reverse('login'), {
        'email': 'recipient@example.com',
        'password': 'testpass123'
    }, format='json')
    token = login_response.data['access']

    client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
    response = client.get(reverse('notifications-list'))

    assert response.status_code == 200
    assert len(response.data) == 1
    assert response.data[0]['notification_type'] == 'like'
