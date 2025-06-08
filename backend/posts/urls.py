from django.urls import path
from .views import PostListCreateView, LikePostView, MyPostsView, CommentCreateView, PostDetailView, PostDeleteView

urlpatterns = [
    path('', PostListCreateView.as_view(), name='post-list-create'),
    path('<int:post_id>/like/', LikePostView.as_view(), name='like_post'),
    path('me/', MyPostsView.as_view(), name='my_posts'),
    path('comments/', CommentCreateView.as_view(), name='comment_create'),
    path('<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    path('<int:pk>/delete/', PostDeleteView.as_view(), name='post-delete'),
]
