from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Version, Profile, Rank, Department


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
        fields = ['user', 'rank', 'department']


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
