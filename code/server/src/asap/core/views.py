from django.conf import settings
from django.contrib.auth import logout
from rest_framework import status, generics
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from core.applications.fs_utils import copy_to_application_directory, get_document
from core.applications.utils import create_application_directory
from core.decorators import authorized_roles
from core.mail import send_email
from core.models import Version, Profile, Rank, Application, ApplicationStep, Step
from core.roles import Role
from core.serializers import VersionSerializer, ProfileSerializer, RankSerializer, ApplicationSerializer


@api_view(['POST'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_ADMIN, Role.ASAP_DEPT_HEAD, Role.ASAP_APPT_CHAIR])
def logout_user(request):
    logout(request)
    return Response(True, status=status.HTTP_200_OK)


@api_view(['POST'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_ADMIN, Role.ASAP_DEPT_HEAD, Role.ASAP_APPT_CHAIR])
def get_current_user(request):
    user = request.user
    roles = [row['name'] for row in user.groups.values('name')]
    content = {
        'id': user.id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'roles': roles,
    }
    return Response(content, status=status.HTTP_200_OK)


@api_view(['POST'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_ADMIN, Role.ASAP_DEPT_HEAD, Role.ASAP_APPT_CHAIR])
def get_current_version(request):
    version = Version.objects.get(pk=1)
    serializer = VersionSerializer(version)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_ADMIN, Role.ASAP_DEPT_HEAD, Role.ASAP_APPT_CHAIR])
def get_application(request, application_id):
    application = Application.objects.get(pk=application_id)
    serializer = ApplicationSerializer(application)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@authorized_roles(roles=[Role.ASAP_ADMIN, Role.ASAP_DEPT_HEAD, Role.ASAP_APPT_CHAIR])
def get_cv(request, application_id):
    return get_document(application_id, 'cv_filename')


@api_view(['GET'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_ADMIN, Role.ASAP_DEPT_HEAD, Role.ASAP_APPT_CHAIR])
def get_letter(request, application_id):
    return get_document(application_id, 'letter_filename')


@api_view(['GET'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_ADMIN])
def get_admin_applications(request):
    applications = Application.objects.filter(is_done=False)
    serializer = ApplicationSerializer(applications, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_DEPT_HEAD])
def get_dept_head_applications(request):
    creator = Profile.objects.get(user=request.user.id)
    applications = Application.objects.filter(creator=creator, is_done=False)
    serializer = ApplicationSerializer(applications, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_APPT_CHAIR])
def get_dept_chair_applications(request):
    applications = Application.objects.filter(is_done=False)
    serializer = ApplicationSerializer(applications, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_DEPT_HEAD])
def get_dept_candidates(request):
    requestor_id = request.user.id
    requestor_dept = Profile.objects.get(user_id=requestor_id)
    candidates = Profile.objects.filter(department=requestor_dept.department_id)

    serializer = ProfileSerializer(candidates, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_DEPT_HEAD])
def submit_dept_head_application(request, application_id):
    cv = request.FILES['cv']
    letter = request.FILES['letter']
    candidate_id = request.data['candidateId']
    rank_id = request.data['requestedRankId']
    application_state = {
        'candidate_id': candidate_id,
        'rank_id': rank_id,
        'cv_filename': cv.name,
        'letter_filename': letter.name,
    }

    creator = Profile.objects.get(user=request.user.id)
    applicant = Profile.objects.get(user=candidate_id)
    rank = Rank.objects.get(id=rank_id)

    try:
        application = Application.objects.get(id=application_id)
        # TODO - update application
    except Application.DoesNotExist:
        application = None

    if application is None:
        application = Application(creator=creator, applicant=applicant, desired_rank=rank,
                                  application_state=application_state)
        application.save()
        create_application_directory(application.id)

    ApplicationStep.objects.update_or_create(
        application=application, step_name=Step.STEP_1,
        defaults={'can_update': True, 'can_cancel': True}
    )

    copy_to_application_directory(cv, application.id)
    copy_to_application_directory(letter, application.id)

    send_email(settings.SENDGRID_SENDER, ['aviram26@gmail.com'], 'new application submitted',
               'new application submitted')

    return Response('ok', status=status.HTTP_200_OK)


@api_view(['POST'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_ADMIN])
def submit_admin_application(request, application_id):
    cv_comments = request.data['cvComments']
    letter_comments = request.data['letterComments']

    application = Application.objects.get(id=application_id)

    application_state = application.application_state
    application_state['cv_comments'] = cv_comments
    application_state['letter_comments'] = letter_comments

    Application.objects.update(application_state=application_state)

    ApplicationStep.objects.update_or_create(
        application=application, step_name=Step.STEP_2,
        defaults={'can_update': True, 'can_cancel': True}
    )

    ApplicationStep.objects.update_or_create(
        application=application, step_name=Step.STEP_1,
        defaults={'can_update': False, 'can_cancel': False}
    )

    send_email(settings.SENDGRID_SENDER, ['aviram26@gmail.com'], 'application updated by admin',
               'application updated by admin')

    return Response('ok', status=status.HTTP_200_OK)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_ADMIN])
def close_admin_application(request, application_id):
    # application = Application.objects.get(id=application_id)
    # application.delete()
    return Response(6, status=status.HTTP_200_OK)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_ADMIN])
def feedback_admin_application(request, application_id):

    return Response(7, status=status.HTTP_200_OK)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
def inquiries_table(request):
    admin_id = request.user.id

    requests_table = [
        {
            'admin_reaching': admin_id,
            'candidate': 1,
            'requestedRank': "Manager",
            'submissionDate': "25-11-2021",
            'stageNumber': 3,
            'stageName': "interview",
        }
    ]

    return Response(requests_table, status=status.HTTP_200_OK)


class ProfileList(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class RankList(generics.ListCreateAPIView):
    queryset = Rank.objects.all()
    serializer_class = RankSerializer


class RankDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Rank.objects.all()
    serializer_class = RankSerializer
