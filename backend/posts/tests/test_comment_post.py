import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from users.models import CustomUser
from posts.models import Post, Comment

@pytest.mark.django_db
def test_comment_post_successfully():
    user = CustomUser.objects.create_user(
        username='commenter',
        email='commenter@example.com',
        password='testpass123'
    )

    author = CustomUser.objects.create_user(
        username='post_author',
        email='author@example.com',
        password='testpass123'
    )

    post = Post.objects.create(
        author=author,
        content='Post para ser comentado'
    )

    client = APIClient()
    login_response = client.post(reverse('login'), {
        'email': 'commenter@example.com',
        'password': 'testpass123'
    }, format='json')
    access_token = login_response.data['access']
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')

    url = reverse('comment_create', args=[post.id])
    response = client.post(url, {
        'content': 'Comentário de teste'
    }, format='json')

    assert response.status_code == 201
    assert Comment.objects.filter(post=post, author=user, content='Comentário de teste').exists()
