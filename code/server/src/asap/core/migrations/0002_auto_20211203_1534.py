# Generated by Django 3.2.9 on 2021-12-03 13:57

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='version',
            name='major',
            field=models.IntegerField(verbose_name=django.core.validators.MinValueValidator(0)),
        ),
        migrations.AlterField(
            model_name='version',
            name='minor',
            field=models.IntegerField(verbose_name=django.core.validators.MinValueValidator(0)),
        ),
        migrations.AlterField(
            model_name='version',
            name='patch',
            field=models.IntegerField(verbose_name=django.core.validators.MinValueValidator(1)),
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ApplicationStep',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('step_name', models.TextField(choices=[('DEPT_HEAD_CREATE_NEW_APPLICATION', 'Step 1'), ('ADMIN_VERIFY_APPLICATION', 'Step 2'), ('CHAIR_HEAD_APPROVE_APPLICATION', 'Step 3')], max_length=70)),
            ],
        ),
        migrations.RenameField(
            model_name='version',
            old_name='creation_date',
            new_name='created_at',
        ),
        migrations.CreateModel(
            name='Application',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('desired_rank', models.TextField(choices=[('rank-1', 'Rank 1'), ('rank-2', 'Rank 2'), ('rank-3', 'Rank 3')], max_length=15)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('applicant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='applicant', to='core.profile')),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='creator', to='core.profile')),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('current_step', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='core.applicationstep')),
            ],
        ),
    ]
