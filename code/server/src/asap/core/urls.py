from django.conf import settings
from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from core import views

api_prefix = settings.API_PREFIX

urlpatterns = [
    path(f'{api_prefix}auth/obtain-token/', obtain_jwt_token),
    path(f'{api_prefix}auth/refresh-token/', refresh_jwt_token),

    path(f'{api_prefix}dummy-without-auth/', views.dummy_without_auth),
    path(f'{api_prefix}dummy-with-admin-auth/', views.dummy_with_admin_auth),
]
