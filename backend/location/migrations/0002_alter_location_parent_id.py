# Generated by Django 3.2.4 on 2022-07-19 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('location', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='parent_id',
            field=models.ManyToManyField(null=True, related_name='_location_location_parent_id_+', to='location.Location'),
        ),
    ]
