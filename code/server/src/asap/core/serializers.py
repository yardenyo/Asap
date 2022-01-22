from rest_framework import serializers

from .models import Version, Profile


class VersionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Version
        fields = ['major', 'minor', 'patch']


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
