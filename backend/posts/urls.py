from django.urls import path
from .views import PostListCreateView, LikePostView, MyPostsView, CommentCreateView, PostDetailView, PostDeleteView, NotificationListView, MarkNotificationAsReadView, FollowingFeedView, PostCommentsListView

urlpatterns = [
    path('', PostListCreateView.as_view(), name='post-list-create'),
    path('<int:post_id>/like/', LikePostView.as_view(), name='like_post'),
    path('me/', MyPostsView.as_view(), name='my_posts'),
    path('<int:post_id>/comment/', CommentCreateView.as_view(), name='comment_create'),
    path('<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    path('<int:pk>/delete/', PostDeleteView.as_view(), name='post-delete'),
    path('notifications/', NotificationListView.as_view(), name='notifications-list'),
    path('notifications/<int:pk>/read/', MarkNotificationAsReadView.as_view(), name='notification-mark-read'),
    path('feed/', FollowingFeedView.as_view(), name='following-feed'),
    path('<int:post_id>/comments/', PostCommentsListView.as_view(), name='post_comments'),

]
