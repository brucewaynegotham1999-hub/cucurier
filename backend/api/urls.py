from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    TrackPackageView, SenderViewSet, ReceiverViewSet, 
    PackageViewSet, PackageTimelineViewSet,
    AdminLoginView, AdminLogoutView
)

router = DefaultRouter()
router.register(r'senders', SenderViewSet)
router.register(r'receivers', ReceiverViewSet)
router.register(r'packages', PackageViewSet)
router.register(r'timeline', PackageTimelineViewSet)

urlpatterns = [
    path('track/<str:tracking_number>/', TrackPackageView.as_view(), name='track-package'),
    path('admin-api/login/', AdminLoginView.as_view(), name='admin-login'),
    path('admin-api/logout/', AdminLogoutView.as_view(), name='admin-logout'),
    path('admin-api/', include(router.urls)),
]
