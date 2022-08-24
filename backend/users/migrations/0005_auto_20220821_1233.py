# Generated by Django 3.2.4 on 2022-08-21 12:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_auto_20220821_1231'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='customuser',
            options={'ordering': ['name']},
        ),
        migrations.AddField(
            model_name='customuser',
            name='address',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='customuser',
            name='advert1',
            field=models.ImageField(blank=True, null=True, upload_to='uploads/'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='advert2',
            field=models.ImageField(blank=True, null=True, upload_to='uploads/'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='advert3',
            field=models.ImageField(blank=True, null=True, upload_to='uploads/'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='advert_status',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='customuser',
            name='advert_subscription',
            field=models.DecimalField(decimal_places=0, default=0, max_digits=20),
        ),
        migrations.AddField(
            model_name='customuser',
            name='business_status',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='customuser',
            name='business_subscription',
            field=models.DecimalField(decimal_places=0, default=0, max_digits=20),
        ),
        migrations.AddField(
            model_name='customuser',
            name='contact',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='customuser',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='customuser',
            name='location',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='customuser',
            name='logo',
            field=models.ImageField(blank=True, null=True, upload_to='uploads/'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='name',
            field=models.CharField(default='', max_length=255),
        ),
    ]