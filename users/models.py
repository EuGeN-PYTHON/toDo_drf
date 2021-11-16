from django.db import models

# Create your models here.

NULL_INSTALL = {'null': True, 'blank': True}


class User(models.Model):
    user_name = models.CharField(max_length=64)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    # birthday_year = models.PositiveIntegerField()
    email = models.EmailField(unique=True, **NULL_INSTALL)
