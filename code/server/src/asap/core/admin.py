from django.contrib import admin

from core.models import Application, Version, Profile

admin.site.register(Version)
admin.site.register(Profile)
admin.site.register(Application)
