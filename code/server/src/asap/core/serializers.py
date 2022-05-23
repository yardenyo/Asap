from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Version, Profile, Rank, Department, Application, ApplicationStep


class VersionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Version
        fields = ['major', 'minor', 'patch']


class RankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rank
        fields = '__all__'


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name']


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    rank = RankSerializer(read_only=True)
    department = DepartmentSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ['user', 'rank', 'department', 'joined_date', 'degree']


class ApplicationStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationStep
        fields = ['step_name', 'can_update', 'can_cancel', 'currentStep']


class ApplicationSerializer(serializers.ModelSerializer):
    creator = ProfileSerializer(read_only=True)
    applicant = ProfileSerializer(read_only=True)
    desired_rank = RankSerializer(read_only=True)
    department = DepartmentSerializer(read_only=True)
    steps = ApplicationStepSerializer(read_only=True, many=True)

    class Meta:
        model = Application
        fields = ['id', 'creator', 'applicant', 'application_state', 'department', 'desired_rank', 'created_at', 'steps']
