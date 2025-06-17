import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from users.models import CustomUser
from posts.models import Post

@pytest.mark.django_db
def test_like_post_successfully():
    user = CustomUser.objects.create_user(
        username='liker',
        email='liker@example.com',
        password='testpass123'
    )

    another_user = CustomUser.objects.create_user(
        username='author',
        email='author@example.com',
        password='testpass123'
    )

    post = Post.objects.create(
        author=another_user,
        content='Post que será curtido'
    )

    client = APIClient()
    login_response = client.post(reverse('login'), {
        'email': 'liker@example.com',
        'password': 'testpass123'
    }, format='json')
    access_token = login_response.data['access']
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')

    url = reverse('like_post', args=[post.id])
    response = client.post(url)

    assert response.status_code == 200
    assert response.data['detail'] == 'Post liked'
    assert user in post.likes.all()


    response_unlike = client.post(url)
    assert response_unlike.status_code == 200
    assert response_unlike.data['detail'] == 'Post unliked'

    post.refresh_from_db()
    assert user not in post.likes.all()