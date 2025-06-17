import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from users.models import CustomUser
from posts.models import Post

@pytest.mark.django_db
def test_post_detail_view():
    user = CustomUser.objects.create_user(
        username='viewer',
        email='viewer@example.com',
        password='testpass123'
    )

    post = Post.objects.create(
        author=user,
        content='Detalhes do post de teste'
    )

    client = APIClient()
    login_response = client.post(reverse('login'), {
        'email': 'viewer@example.com',
        'password': 'testpass123'
    }, format='json')
    access_token = login_response.data['access']
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')

    response = client.get(reverse('post-detail', args=[post.id]))

    assert response.status_code == 200
    assert response.data['content'] == 'Detalhes do post de teste'
    assert response.data['id'] == post.id
