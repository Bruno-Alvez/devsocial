import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from users.models import CustomUser

@pytest.mark.django_db
def test_login_returns_jwt_token():
    user = CustomUser.objects.create_user(
        username='testuser',
        email='testuser@example.com',
        password='testpassword123'
    )

    client = APIClient()
    url = reverse('token_obtain_pair')

    response = client.post(url, {
        'email': 'testuser@example.com',
        'password': 'testpassword123'
    }, format='json')

    assert response.status_code == 200
    assert 'access' in response.data
    assert 'refresh' in response.data

@pytest.mark.django_db
def test_login_fails_with_invalid_credentials():
    CustomUser.objects.create_user(
        username='userfail',
        email='userfail@example.com',
        password='realpassword'
    )

    client = APIClient()
    url = reverse('login')

    response = client.post(url, {
        'email': 'userfail@example.com',
        'password': 'wrongpassword'
    }, format='json')

    
    assert response.status_code == 401
