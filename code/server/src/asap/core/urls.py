from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from core import views

urlpatterns = [
    path('auth/obtain-token/', obtain_jwt_token),
    path('auth/refresh-token/', refresh_jwt_token),

    path('users/get-current-user/', views.get_current_user),
    path('users/profiles/<int:pk>/', views.ProfileDetail.as_view()),
    path('users/profiles/', views.ProfileList.as_view()),

    path('version/get-current-version/', views.get_current_version),

    path('appointments/dept-head/', views.get_dept_head_appointments),
    path('appointments/candidates/', views.get_dept_candidates),
    path('appointments/get-table-data', views.get_table_data),
    path('appointments/ranks/<int:pk>/', views.RankDetail.as_view()),
    path('appointments/ranks/', views.RankList.as_view()),
]
