from django.contrib import admin
from .models import Sender, Receiver, Package, PackageTimeline


class PackageTimelineInline(admin.TabularInline):
    model = PackageTimeline
    extra = 1


@admin.register(Sender)
class SenderAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'city', 'country')
    search_fields = ('name', 'email')


@admin.register(Receiver)
class ReceiverAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'city', 'country')
    search_fields = ('name', 'email')


@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    list_display = ('tracking_number', 'description', 'current_status', 'origin', 'destination', 'created_at')
    list_filter = ('current_status',)
    search_fields = ('tracking_number', 'description')
    inlines = [PackageTimelineInline]


@admin.register(PackageTimeline)
class PackageTimelineAdmin(admin.ModelAdmin):
    list_display = ('package', 'status', 'timestamp', 'location')
    list_filter = ('status',)
