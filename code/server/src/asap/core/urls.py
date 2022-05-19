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
    path('users/profiles/getProfile/<int:candidate_id>', views.get_remaining_days),

    path('version/get-current-version/', views.get_current_version),

    path('application/member/', views.get_member_application),

    path('applications/dept-head/', views.get_dept_head_applications),
    path('applications/dept-chair/', views.get_dept_chair_applications),
    path('applications/admin/landing-page', views.landing_page_applications),
    path('applications/admin/', views.get_admin_applications),
    path('applications/quality-dept/', views.get_quality_dept_applications),
    path('applications/<int:application_id>/', views.get_application),
    path('applications/cv/<int:application_id>/', views.get_cv),
    path('applications/letter/<int:application_id>/', views.get_letter),
    path('applications/candidates/', views.get_dept_candidates),
    path('applications/ranks/<int:pk>/', views.RankDetail.as_view()),
    path('applications/ranks/', views.RankList.as_view()),
    path('applications/submit-dept-head-application/<int:application_id>/', views.submit_dept_head_application),
    path('applications/submit-dept-member-application/<int:application_id>/', views.submit_dept_member_application),
    path('applications/submit-admin-application/<int:application_id>/', views.submit_admin_application),
    path('applications/handle-appt-chair-application/<int:application_id>/', views.handle_appt_chair_application),
    path('applications/handle-dept-head-application/<int:application_id>/', views.handle_dept_head_application),



]
