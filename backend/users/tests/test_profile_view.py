import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from users.models import CustomUser

@pytest.mark.django_db
def test_update_profile_successfully():
    user = CustomUser.objects.create_user(
        username='editme',
        email='editme@example.com',
        password='testpass123'
    )

    client = APIClient()
    login_response = client.post(reverse('login'), {
        'email': 'editme@example.com',
        'password': 'testpass123'
    }, format='json')
    access_token = login_response.data['access']
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')

    update_data = {
        'bio': 'Novo perfil para teste',
        'location': 'São Paulo'
    }

    response = client.patch(reverse('profile'), update_data, format='json')

    assert response.status_code == 200
    assert response.data['bio'] == 'Novo perfil para teste'
    assert response.data['location'] == 'São Paulo'
