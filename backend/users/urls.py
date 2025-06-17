from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import (
    RegisterView, MeView, ProfileView, FollowView,
    UnfollowView, FollowingListView, UserSearchView,
    PublicProfileView, PublicUserPostsView, UserSuggestionView
)
from .views import EmailLoginView

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', EmailLoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', MeView.as_view(), name='me'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('follow/<str:username>/', FollowView.as_view(), name='follow'),
    path('unfollow/<str:username>/', UnfollowView.as_view(), name='unfollow'),
    path('following/', FollowingListView.as_view(), name='following'),
    path('search/', UserSearchView.as_view(), name='user-search'),
    path('<str:username>/public/', PublicProfileView.as_view(), name='public-profile'),
    path('<str:username>/posts/', PublicUserPostsView.as_view(), name='user-posts'),
    path('suggestions/', UserSuggestionView.as_view(), name='suggested-users'),
]
