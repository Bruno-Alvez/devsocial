import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from users.models import CustomUser
from posts.models import Post

@pytest.mark.django_db
def test_cannot_delete_others_post():
    owner = CustomUser.objects.create_user(
        username='owner',
        email='owner@example.com',
        password='testpass123'
    )

    intruder = CustomUser.objects.create_user(
        username='intruder',
        email='intruder@example.com',
        password='testpass123'
    )

    post = Post.objects.create(
        author=owner,
        content='Post protegido'
    )

    client = APIClient()
    login_response = client.post(reverse('login'), {
        'email': 'intruder@example.com',
        'password': 'testpass123'
    }, format='json')
    access_token = login_response.data['access']
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')

    url = reverse('post-delete', args=[post.id])
    response = client.delete(url)

    assert response.status_code == 403
    assert Post.objects.filter(id=post.id).exists()
