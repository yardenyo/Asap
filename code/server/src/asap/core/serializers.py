from rest_framework import serializers

from .models import Version


class VersionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Version
        fields = ['id', 'major', 'minor', 'patch', 'creation_date']