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


class ApplicationStep(models.Model):
    class Step(models.TextChoices):
        STEP_1 = 'DEPT_HEAD_CREATE_NEW_APPLICATION'
        STEP_2 = 'ADMIN_VERIFY_APPLICATION'
        STEP_3 = 'CHAIR_HEAD_APPROVE_APPLICATION'

    id = models.AutoField(primary_key=True)
    step_name = models.TextField(max_length=70, choices=Step.choices)


class Application(models.Model):
    class Rank(models.TextChoices):
        RANK_1 = 'rank-1'
        RANK_2 = 'rank-2'
        RANK_3 = 'rank-3'

    id = models.AutoField(primary_key=True)
    creator = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='creator')
    applicant = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='applicant')
    desired_rank = models.TextField(max_length=15, choices=Rank.choices)
    current_step = models.ForeignKey(ApplicationStep, on_delete=models.CASCADE, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
