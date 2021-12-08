from django.contrib.auth.models import User


def create_super():

    User.objects.all().delete()

    us = User(username='ADMIN')
    us.set_password('ADMIN')
    us.email = 'admin@amin.ru'
    us.first_name = 'ADMIN'
    us.last_name = 'ADMIN'
    us.is_superuser = True
    us.is_staff = True
    us.save()
