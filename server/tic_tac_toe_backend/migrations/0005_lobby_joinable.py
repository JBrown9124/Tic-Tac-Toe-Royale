# Generated by Django 4.0.3 on 2022-03-07 21:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tic_tac_toe_backend', '0004_rename_lobby_id_gamestatus_lobby'),
    ]

    operations = [
        migrations.AddField(
            model_name='lobby',
            name='joinable',
            field=models.BooleanField(default=True),
        ),
    ]