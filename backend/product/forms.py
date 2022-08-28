from django import forms
from django.forms.fields import IntegerField
from django.forms.forms import Form


class AddToCartForm(forms.Form):
    quantity = forms.IntegerField()

class CategoryForm(forms.Form):
    title = forms.CharField(label='title', max_length=100)
    slug = forms.CharField(label='slug', max_length=100)
    description = forms.CharField(label='description', max_length=100)
    featured = forms.BooleanField(required=False,initial=False)
    menu = forms.BooleanField(required=False,initial=False)
