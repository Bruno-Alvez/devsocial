import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from users.models import CustomUser
from posts.models import Post, Comment

@pytest.mark.django_db
def test_list_post_comments():
    user = CustomUser.objects.create_user(
        username='user',
        email='user@example.com',
        password='testpass123'
    )

    post_author = CustomUser.objects.create_user(
        username='post_author',
        email='author@example.com',
        password='testpass123'
    )

    post = Post.objects.create(
        author=post_author,
        content='Post com comentários'
    )

    Comment.objects.create(post=post, author=user, content='Primeiro comentário')
    Comment.objects.create(post=post, author=post_author, content='Segundo comentário')

    client = APIClient()
    login_response = client.post(reverse('login'), {
        'email': 'user@example.com',
        'password': 'testpass123'
    }, format='json')
    access_token = login_response.data['access']
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')

    url = reverse('post_comments', args=[post.id])
    response = client.get(url)

    assert response.status_code == 200
    assert len(response.data) == 2
    contents = [comment['content'] for comment in response.data]
    assert 'Primeiro comentário' in contents
    assert 'Segundo comentário' in contents
