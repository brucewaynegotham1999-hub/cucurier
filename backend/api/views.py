from rest_framework import generics, viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAdminUser, AllowAny
from django.contrib.auth import authenticate
from .models import Sender, Receiver, Package, PackageTimeline
from .serializers import (
    SenderSerializer, ReceiverSerializer, PackageSerializer, 
    PackageTimelineSerializer
)

class TrackPackageView(generics.RetrieveAPIView):
    """Public lookup for tracking."""
    permission_classes = [AllowAny]
    serializer_class = PackageSerializer
    lookup_field = 'tracking_number'
    queryset = Package.objects.select_related('sender', 'receiver').prefetch_related('timeline')

class AdminLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        
        if user and user.is_superuser:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'username': user.username})
        return Response({'error': 'Invalid credentials or not an admin'}, status=status.HTTP_401_UNAUTHORIZED)

class AdminLogoutView(APIView):
    permission_classes = [IsAdminUser]
    
    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class SenderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = Sender.objects.all()
    serializer_class = SenderSerializer

class ReceiverViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = Receiver.objects.all()
    serializer_class = ReceiverSerializer

class PackageViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = Package.objects.all()
    serializer_class = PackageSerializer

class PackageTimelineViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = PackageTimeline.objects.all()
    serializer_class = PackageTimelineSerializer
