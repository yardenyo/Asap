from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from django.db import models
import datetime


class Version(models.Model):
    id = models.AutoField(primary_key=True)
    major = models.IntegerField(MinValueValidator(0))
    minor = models.IntegerField(MinValueValidator(0))
    patch = models.IntegerField(MinValueValidator(1))
    created_at = models.DateTimeField(auto_now_add=True)


class Department(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(max_length=50)

    def __str__(self):
        return self.name


class Rank(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(max_length=50)

    def __str__(self):
        return self.name


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True, related_name='user')
    rank = models.ForeignKey(Rank, default=None, null=True, blank=True, on_delete=models.CASCADE, related_name='rank')
    department = models.ForeignKey(Department, default=None, null=True, blank=True, on_delete=models.CASCADE,
                                   related_name='department')
    joined_date = models.DateField("Date", default=datetime.date.today)

    def __str__(self):
        return self.user.get_full_name()


class Application(models.Model):
    id = models.AutoField(primary_key=True)
    creator = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='creator')
    department = models.ForeignKey(Department, default=None, null=True, blank=True, on_delete=models.CASCADE,
                                   related_name='department_id')
    applicant = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='applicant')
    desired_rank = models.ForeignKey(Rank, on_delete=models.CASCADE, related_name='desired_rank')
    application_state = models.JSONField(max_length=10000, default=None)
    is_done = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Step(models.TextChoices):
    STEP_0 = 'APPLICATION_CLOSE'
    STEP_1 = 'DEPT_HEAD_CREATE_NEW_APPLICATION'
    STEP_2 = 'DEPT_HEAD_FEEDBACK'
    STEP_3 = 'ADMIN_FEEDBACK'
    STEP_4 = 'ADMIN_VERIFY_APPLICATION'
    STEP_5 = 'CHAIR_HEAD_FEEDBACK'
    STEP_6 = 'CHAIR_HEAD_APPROVE_APPLICATION'


class ApplicationStep(models.Model):
    id = models.AutoField(primary_key=True)
    application = models.ForeignKey(Application, default=None, on_delete=models.CASCADE, related_name='steps')
    step_name = models.TextField(max_length=70, choices=Step.choices)
    currentStep = models.BooleanField(default=False, unique=True)
    can_update = models.BooleanField(default=False)
    can_cancel = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
