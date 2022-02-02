from django.contrib import admin

from core.models import Application, Version, Profile, ApplicationStep, Rank, Department

admin.site.register(Version)
admin.site.register(Profile)
admin.site.register(Application)
admin.site.register(ApplicationStep)
admin.site.register(Rank)
admin.site.register(Department)
