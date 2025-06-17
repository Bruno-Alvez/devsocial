import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from users.models import CustomUser
from posts.models import Post

@pytest.mark.django_db
def test_delete_own_post_successfully():
    user = CustomUser.objects.create_user(
        username='deleter',
        email='deleter@example.com',
        password='testpass123'
    )

    post = Post.objects.create(
        author=user,
        content='Post a ser deletado'
    )

    client = APIClient()
    login_response = client.post(reverse('login'), {
        'email': 'deleter@example.com',
        'password': 'testpass123'
    }, format='json')
    access_token = login_response.data['access']
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')

    url = reverse('post-delete', args=[post.id])
    response = client.delete(url)

    assert response.status_code == 204
    assert not Post.objects.filter(id=post.id).exists()
