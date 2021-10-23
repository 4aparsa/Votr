# Generated by Django 3.2.8 on 2021-10-23 20:02

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='RegisteredVoter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ssn', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(9999999999)])),
                ('dob', models.DateField()),
                ('name', models.CharField(max_length=100)),
            ],
        ),
    ]