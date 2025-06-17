import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from users.models import CustomUser
from users.models import Following

@pytest.mark.django_db
def test_get_following_list():
    user1 = CustomUser.objects.create_user(
        username='follower_user',
        email='follower@example.com',
        password='testpass123'
    )

    user2 = CustomUser.objects.create_user(
        username='followed_user',
        email='followed@example.com',
        password='testpass123'
    )

    Following.objects.create(follower=user1, followed=user2)

    client = APIClient()
    login_response = client.post(reverse('login'), {
        'email': 'follower@example.com',
        'password': 'testpass123'
    }, format='json')
    access_token = login_response.data['access']

    client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
    response = client.get(reverse('following'))

    assert response.status_code == 200
    assert len(response.data) == 1
    assert response.data[0]['username'] == 'followed_user'
