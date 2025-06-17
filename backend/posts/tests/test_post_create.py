import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from users.models import CustomUser
from posts.models import Post

@pytest.mark.django_db
def test_create_post_successfully():
    user = CustomUser.objects.create_user(
        username='poster',
        email='poster@example.com',
        password='testpass123'
    )

    client = APIClient()
    login_response = client.post(reverse('login'), {
        'email': 'poster@example.com',
        'password': 'testpass123'
    }, format='json')
    access_token = login_response.data['access']

    client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
    response = client.post(reverse('post-list-create'), {
        'content': 'This is a test post',
    }, format='json')

    assert response.status_code in [200, 201]
    assert Post.objects.filter(author=user, content='This is a test post').exists()
