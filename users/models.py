from django.db import models

# Create your models here.

NULL_INSTALL = {'null': True, 'blank': True}


class User(models.Model):
    user_name = models.CharField(max_length=64)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    # birthday_year = models.PositiveIntegerField()
    email = models.EmailField(unique=True, **NULL_INSTALL)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # def __init__(self, user_name, first_name, last_name, email):
    #     self.user_name = user_name
    #     self.first_name = first_name
    #     self.last_name = last_name
    #     self.email = email

    def __str__(self):
        return self.user_name
