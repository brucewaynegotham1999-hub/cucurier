from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('kirikuadminman/', admin.site.urls),
    path('api/', include('api.urls')),
]
