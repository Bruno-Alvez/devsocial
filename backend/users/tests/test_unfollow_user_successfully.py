import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from users.models import CustomUser

@pytest.mark.django_db
def test_unfollow_user_successfully():
    user1 = CustomUser.objects.create_user(
        username='follower',
        email='follower@example.com',
        password='testpass123'
    )
    user2 = CustomUser.objects.create_user(
        username='following',
        email='following@example.com',
        password='testpass123'
    )

    client = APIClient()
    login_response = client.post(reverse('login'), {
        'email': 'follower@example.com',
        'password': 'testpass123'
    }, format='json')
    access_token = login_response.data['access']
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')

    client.post(reverse('follow', args=[user2.username]))

    response = client.post(reverse('unfollow', args=[user2.username]))

    assert response.status_code in [200, 204]
