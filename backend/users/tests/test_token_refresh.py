import pytest
from rest_framework.test import APIClient
from users.models import CustomUser
from rest_framework.reverse import reverse

@pytest.mark.django_db
def test_token_refresh_returns_new_access_token():
    # Cria usuário e obtém refresh token
    user = CustomUser.objects.create_user(
        username='refreshuser',
        email='refreshuser@example.com',
        password='refreshpass123'
    )
    client = APIClient()
    login_url = reverse('login')

    response = client.post(login_url, {
        'email': 'refreshuser@example.com',
        'password': 'refreshpass123'
    }, format='json')

    refresh_token = response.data['refresh']
    refresh_url = reverse('token_refresh')

    refresh_response = client.post(refresh_url, {
        'refresh': refresh_token
    }, format='json')

    assert refresh_response.status_code == 200
    assert 'access' in refresh_response.data
