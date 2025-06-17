import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from users.models import CustomUser
from posts.models import Post

@pytest.mark.django_db
def test_list_my_posts():
    user = CustomUser.objects.create_user(
        username='user1',
        email='user1@example.com',
        password='testpass123'
    )

    other_user = CustomUser.objects.create_user(
        username='user2',
        email='user2@example.com',
        password='testpass123'
    )

    Post.objects.create(author=user, content='Meu post 1')
    Post.objects.create(author=user, content='Meu post 2')

    Post.objects.create(author=other_user, content='Post alheio')

    client = APIClient()
    login_response = client.post(reverse('login'), {
        'email': 'user1@example.com',
        'password': 'testpass123'
    }, format='json')
    access_token = login_response.data['access']
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')

    response = client.get(reverse('my_posts'))

    assert response.status_code == 200
    assert len(response.data) == 2
    assert all(post['author']['username'] == 'user1' for post in response.data)
