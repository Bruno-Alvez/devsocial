import pytest
from rest_framework.test import APIClient
from rest_framework.reverse import reverse
from users.models import CustomUser

@pytest.mark.django_db
def test_authenticated_user_can_access_me_endpoint():
    # Cria e autentica usuário
    user = CustomUser.objects.create_user(
        username='meuser',
        email='meuser@example.com',
        password='mepassword123'
    )
    client = APIClient()
    login_url = reverse('login')

    login_response = client.post(login_url, {
        'email': 'meuser@example.com',
        'password': 'mepassword123'
    }, format='json')

    access_token = login_response.data['access']
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')

    # Acessa o endpoint /me/
    me_url = reverse('me')
    response = client.get(me_url)

    assert response.status_code == 200
    assert response.data['email'] == 'meuser@example.com'
    assert response.data['username'] == 'meuser'

@pytest.mark.django_db
def test_get_me_view_returns_user_info():
    user = CustomUser.objects.create_user(
        username='meuser',
        email='meuser@example.com',
        password='testpass123'
    )

    client = APIClient()
    login_response = client.post(reverse('login'), {
        'email': 'meuser@example.com',
        'password': 'testpass123'
    }, format='json')
    access_token = login_response.data['access']
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')

    response = client.get(reverse('me'))

    assert response.status_code == 200
    assert response.data['username'] == user.username
    assert response.data['email'] == user.email
