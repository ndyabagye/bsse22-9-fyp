# Generated by Django 3.2.4 on 2022-07-19 18:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Vendor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(max_length=255)),
                ('value', models.EmailField(max_length=254)),
                ('advert1', models.ImageField(blank=True, null=True, upload_to='uploads/')),
                ('advert2', models.ImageField(blank=True, null=True, upload_to='uploads/')),
                ('advert3', models.ImageField(blank=True, null=True, upload_to='uploads/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['created_at'],
            },
        ),
    ]