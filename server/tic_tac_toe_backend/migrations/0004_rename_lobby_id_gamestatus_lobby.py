# Generated by Django 3.2.9 on 2022-03-06 19:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tic_tac_toe_backend', '0003_auto_20220306_1435'),
    ]

    operations = [
        migrations.RenameField(
            model_name='gamestatus',
            old_name='lobby_id',
            new_name='lobby',
        ),
    ]
