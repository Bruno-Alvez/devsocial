from django.urls import path
from posts.views import NotificationListView, MarkNotificationAsReadView

urlpatterns = [
    path('', NotificationListView.as_view(), name='notification_list'),
    path('<int:pk>/read/', MarkNotificationAsReadView.as_view(), name='mark_notification_read'),
]
