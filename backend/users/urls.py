from django.urls import path
from .views import EmailLoginView, RegisterView, MeView, ProfileView, FollowView, FollowingListView, UnfollowView, UserSearchView, PublicProfileView, PublicUserPostsView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', EmailLoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', MeView.as_view(), name='me'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('follow/<str:username>/', FollowView.as_view(), name='follow'),
    path('unfollow/<str:username>/', UnfollowView.as_view(), name='unfollow'),
    path('following/', FollowingListView.as_view(), name='following_list'),
    path('search/', UserSearchView.as_view(), name='user-search'),
    path('<str:username>/public/', PublicProfileView.as_view(), name='public-profile'),
    path('<str:username>/posts/', PublicUserPostsView.as_view(), name='public-user-posts'),
]
