from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView
from rest_framework.exceptions import PermissionDenied, NotFound
from .models import Post, Comment, LegacyNotification
from .serializers import PostSerializer, CommentSerializer, PostDetailSerializer, NotificationSerializer


class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.select_related('author').prefetch_related('comments').all().order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class LikePostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response({'detail': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

        user = request.user
        if user in post.likes.all():
            post.likes.remove(user)
            return Response({'detail': 'Post unliked'}, status=status.HTTP_200_OK)
        else:
            post.likes.add(user)
            if post.author != user:
                LegacyNotification.objects.create(
                    recipient=post.author,
                    sender=user,
                    notification_type='like',
                    post=post
                )
            return Response({'detail': 'Post liked'}, status=status.HTTP_200_OK)


class MyPostsView(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Post.objects.filter(author=self.request.user).order_by('-created_at')


class CommentCreateView(CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        post_id = self.kwargs.get('post_id')
        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            raise NotFound("Post not found.")

        comment = serializer.save(author=self.request.user, post=post)

        if post.author != self.request.user:
            LegacyNotification.objects.create(
                recipient=post.author,
                sender=self.request.user,
                notification_type='comment',
                post=post
            )


class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        if self.request.user != serializer.instance.author:
            raise PermissionDenied("Você não tem permissão pra editar essa publicação!")
        serializer.save(avatar=self.requests.data.get("avatar"))


class PostDeleteView(generics.DestroyAPIView):
    queryset = Post.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        post = self.get_object()
        if post.author != request.user:
            return Response({'detail': 'Permissão Negada'}, status=status.HTTP_403_FORBIDDEN)
        return super().delete(request, *args, **kwargs)


class NotificationListView(ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return LegacyNotification.objects.filter(recipient=self.request.user).order_by('-timestamp')


class MarkNotificationAsReadView(UpdateAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return LegacyNotification.objects.filter(recipient=self.request.user)


class FollowingFeedView(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        following_users = user.following.values_list('followed', flat=True)
        return Post.objects.filter(
            author__in=list(following_users) + [user.id]
        ).order_by('-created_at')


class PostCommentsListView(ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        post_id = self.kwargs['post_id']
        return Comment.objects.filter(post_id=post_id).order_by('-created_at')
