from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from core import views

urlpatterns = [
    path('auth/obtain-token/', obtain_jwt_token),
    path('auth/refresh-token/', refresh_jwt_token),

    path('users/logout/', views.logout_user),
    path('users/get-current-user/', views.get_current_user),
    path('users/profiles/<int:pk>/', views.ProfileDetail.as_view()),
    path('users/profiles/', views.ProfileList.as_view()),

    path('version/get-current-version/', views.get_current_version),

    path('applications/dept-head/', views.get_dept_head_applications),
    path('applications/admin/', views.get_admin_applications),
    path('applications/<int:application_id>/', views.get_application),
    path('applications/cv/<int:application_id>/', views.get_cv),
    path('applications/<int:application_id>/letter/', views.get_letter),
    path('applications/candidates/', views.get_dept_candidates),
    path('applications/get-table-data', views.get_table_data),
    path('applications/ranks/<int:pk>/', views.RankDetail.as_view()),
    path('applications/ranks/', views.RankList.as_view()),
    path('applications/submit-application/<int:application_id>/', views.submit_application),
]
