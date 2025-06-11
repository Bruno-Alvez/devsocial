from rest_framework import generics, permissions, status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework import filters

from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from .serializers import (
    RegisterSerializer,
    ProfileSerializer,
    FollowingSerializer,
    PostSerializer,
    MyTokenObtainPairSerializer
)

from .models import CustomUser, Following
from posts.models import Post, Notification 

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = ProfileSerializer(request.user)
        return Response(serializer.data)


class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser] 

    def get_object(self):
        return self.request.user
    
class PublicProfileView(RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.AllowAny]

    def get_object(self):
        username = self.kwargs['username']
        user = get_object_or_404(CustomUser, username=username, is_private=False)
        return user

class FollowView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, username):
        try:
            to_follow = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        if to_follow == request.user:
            return Response({'error': "You can't follow yourself"}, status=status.HTTP_400_BAD_REQUEST)

        _, created = Following.objects.get_or_create(follower=request.user, followed=to_follow)

        if not created:
            return Response({'message': 'You already follow this user'}, status=status.HTTP_200_OK)

        Notification.objects.create(
            recipient=to_follow,
            sender=request.user,
            notification_type='follow'
        )

        return Response({'message': 'User followed successfully'}, status=status.HTTP_201_CREATED)


class UnfollowView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, username):
        try:
            to_unfollow = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        deleted, _ = Following.objects.filter(follower=request.user, followed=to_unfollow).delete()

        if deleted:
            return Response({'message': 'User unfollowed successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'You were not following this user'}, status=status.HTTP_400_BAD_REQUEST)


class FollowingListView(generics.ListAPIView):
    serializer_class = FollowingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Following.objects.filter(follower=self.request.user)
    
class PublicUserPostsView(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        username = self.kwargs['username']
        user = get_object_or_404(CustomUser, username=username, is_private=False)
        return Post.objects.filter(author=user).order_by('-created_at')

class UserSearchView(ListAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.AllowAny]
    queryset = CustomUser.objects.filter(is_private=False)
    filter_backends = [filters.SearchFilter]
    search_fields = ['username']

class EmailLoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


