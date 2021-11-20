from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes, authentication_classes, permission_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from core.decorators import authorized_roles
from core.roles import Role


@api_view(['GET'])
@renderer_classes([JSONRenderer])
@authentication_classes([])
@permission_classes([])
def dummy_without_auth(request):
    return Response({'status': 'ok'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_ADMIN])
def dummy_with_admin_auth(request):
    return Response({'status': 'ok'}, status=status.HTTP_200_OK)
