from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from core import views

urlpatterns = [
    path('auth/obtain-token/', obtain_jwt_token),
    path('auth/refresh-token/', refresh_jwt_token),

    path('users/get-current-user/', views.get_current_user),

    path('dummy-without-auth/', views.dummy_without_auth),
    path('dummy-with-admin-auth/', views.dummy_with_admin_auth),
]
