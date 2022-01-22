from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.core.validators import MinValueValidator
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Version(models.Model):
    id = models.AutoField(primary_key=True)
    major = models.IntegerField(MinValueValidator(0))
    minor = models.IntegerField(MinValueValidator(0))
    patch = models.IntegerField(MinValueValidator(1))
    created_at = models.DateTimeField(auto_now_add=True)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    try:
        instance.profile.save()
    except ObjectDoesNotExist:
        Profile.objects.create(user=instance)


class Rank(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(max_length=50)


class ApplicationStep(models.Model):
    class Step(models.TextChoices):
        STEP_1 = 'DEPT_HEAD_CREATE_NEW_APPLICATION'
        STEP_2 = 'ADMIN_VERIFY_APPLICATION'
        STEP_3 = 'CHAIR_HEAD_APPROVE_APPLICATION'

    id = models.AutoField(primary_key=True)
    step_name = models.TextField(max_length=70, choices=Step.choices)
    step_data = models.JSONField(max_length=1000)
    can_update = models.BooleanField(default=False)
    can_cancel = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Application(models.Model):
    id = models.AutoField(primary_key=True)
    creator = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='creator')
    applicant = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='applicant')
    desired_rank = models.ForeignKey(Rank, on_delete=models.CASCADE, related_name='rank')
    current_step = models.ForeignKey(ApplicationStep, on_delete=models.CASCADE, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
