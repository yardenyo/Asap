from django.db import models


# The model of the version according to semver standard: major.minor.patch.
class Version(models.Model):
    id = models.AutoField(primary_key=True)
    major = models.IntegerField(unique=False)
    minor = models.IntegerField(unique=False)
    patch = models.IntegerField(unique=False)
    creation_date = models.DateTimeField(auto_now_add=True)
