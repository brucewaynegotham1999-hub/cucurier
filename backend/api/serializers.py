from rest_framework import serializers
from .models import Sender, Receiver, Package, PackageTimeline


class SenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sender
        fields = '__all__'


class ReceiverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receiver
        fields = '__all__'


class PackageTimelineSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = PackageTimeline
        fields = ['id', 'package', 'status', 'status_display', 'timestamp', 'location', 'latitude', 'longitude', 'notes']



class PackageSerializer(serializers.ModelSerializer):
    sender_details = SenderSerializer(source='sender', read_only=True)
    receiver_details = ReceiverSerializer(source='receiver', read_only=True)
    timeline = PackageTimelineSerializer(many=True, read_only=True)
    current_status_display = serializers.CharField(source='get_current_status_display', read_only=True)

    class Meta:
        model = Package
        fields = [
            'id', 'tracking_number', 'description', 'weight',
            'origin', 'destination', 'current_status', 'current_status_display',
            'sender', 'receiver', 'sender_details', 'receiver_details', 'timeline',
            'created_at', 'updated_at',
        ]
