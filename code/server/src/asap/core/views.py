from rest_framework import status, generics
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from core.decorators import authorized_roles
from core.models import Version, Profile
from core.roles import Role
from core.serializers import VersionSerializer, ProfileSerializer


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
def candidates_table(request):
    user_id = request.user.id
    response = [
        {
            'candidate': 1,
            'requestedRank': "Manager",
            'submissionDate': "25-11-2021",
            'stageNumber': 3,
            'stageName': "interview",
        }
    ]

    return Response(response, status=status.HTTP_200_OK)


@api_view(['POST'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_DEPT_HEAD])
def get_dept_head_appointments(request):
    response = [
        {
            'id': 1,
            'candidate': 1,
            'requestedRank': "Manager",
            'submissionDate': "25-11-2021",
            'stageNumber': 3,
            'stageName': "interview",
        }
    ]

    return Response(response, status=status.HTTP_200_OK)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
def get_table_data(request):
    user_id = request.user.id
    response = [
        {
            'candidate': 1,
            'requestedRank': "Manager",
            'submissionDate': "25-11-2021",
            'stageNumber': 3,
            'stageName': "interview",
        }
    ]

    return Response(response, status=status.HTTP_200_OK)


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
