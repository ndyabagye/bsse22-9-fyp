# Generated by Django 3.2.4 on 2022-07-19 18:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vendor', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='vendor',
            name='address',
            field=models.CharField(default='Kampala', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='vendor',
            name='advert1',
            field=models.ImageField(blank=True, null=True, upload_to='uploads/'),
        ),
        migrations.AddField(
            model_name='vendor',
            name='advert2',
            field=models.ImageField(blank=True, null=True, upload_to='uploads/'),
        ),
        migrations.AddField(
            model_name='vendor',
            name='advert3',
            field=models.ImageField(blank=True, null=True, upload_to='uploads/'),
        ),
        migrations.AddField(
            model_name='vendor',
            name='advert_status',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='vendor',
            name='advert_subscription',
            field=models.DecimalField(decimal_places=0, default=0, max_digits=20),
        ),
        migrations.AddField(
            model_name='vendor',
            name='business_status',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='vendor',
            name='business_subscription',
            field=models.DecimalField(decimal_places=0, default=0, max_digits=20),
        ),
        migrations.AddField(
            model_name='vendor',
            name='contact',
            field=models.CharField(default='+256777144354', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='vendor',
            name='email',
            field=models.EmailField(default='admin@gmail.com', max_length=254),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='vendor',
            name='location',
            field=models.CharField(default='Kampala', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='vendor',
            name='logo',
            field=models.ImageField(blank=True, null=True, upload_to='uploads/'),
        ),
    ]
