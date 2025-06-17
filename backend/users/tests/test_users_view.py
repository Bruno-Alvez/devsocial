import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from users.models import CustomUser

@pytest.mark.django_db
def test_register_user():
    client = APIClient()
    url = reverse('register')
    data = {
        'username': 'newuser',
        'email': 'newuser@example.com',
        'password': 'StrongPass123'
    }

    response = client.post(url, data)
    assert response.status_code == status.HTTP_201_CREATED
    assert response.data['username'] == 'newuser'
    assert response.data['email'] == 'newuser@example.com'

@pytest.mark.django_db
def test_registration_fails_with_existing_email():
    CustomUser.objects.create_user(
        username='existinguser',
        email='existing@example.com',
        password='testpassword123'
    )

    client = APIClient()
    url = reverse('register')
    response = client.post(url, {
        'username': 'newuser',
        'email': 'existing@example.com',
        'password': 'testpassword123'
    }, format='json')

    assert response.status_code == 400
    assert 'email' in response.data or 'non_field_errors' in response.data