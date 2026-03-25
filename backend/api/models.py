import uuid
from django.db import models


class Sender(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=30, blank=True)
    address = models.TextField(blank=True)
    city = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.name


class Receiver(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=30, blank=True)
    address = models.TextField(blank=True)
    city = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.name


class Package(models.Model):
    STATUS_CHOICES = [
        ('order_placed', 'Order Placed'),
        ('left_warehouse', 'Left Warehouse'),
        ('arrived_at_office', 'Arrived at Office'),
        ('in_transit', 'In Transit'),
        ('on_hold', 'On Hold'),
        ('seized', 'Seized'),
        ('arrived_at_fulfilment_center', 'Arrived at Fulfilment Center'),
        ('out_for_delivery', 'Out for Delivery'),
        ('delivered', 'Delivered'),
    ]

    tracking_number = models.CharField(max_length=50, unique=True, db_index=True)
    description = models.TextField(blank=True)
    weight = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    origin = models.CharField(max_length=200, blank=True)
    destination = models.CharField(max_length=200, blank=True)
    current_status = models.CharField(
        max_length=40, choices=STATUS_CHOICES, default='order_placed'
    )
    sender = models.ForeignKey(Sender, on_delete=models.CASCADE, related_name='packages')
    receiver = models.ForeignKey(Receiver, on_delete=models.CASCADE, related_name='packages')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Package {self.tracking_number}"


class PackageTimeline(models.Model):
    STATUS_CHOICES = Package.STATUS_CHOICES

    package = models.ForeignKey(Package, on_delete=models.CASCADE, related_name='timeline')
    status = models.CharField(max_length=40, choices=STATUS_CHOICES)
    timestamp = models.DateTimeField()
    location = models.CharField(max_length=200, blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f"{self.package.tracking_number} — {self.get_status_display()} @ {self.timestamp}"


