import json

from django.core.management.base import BaseCommand

from projects.models import Project, ToDo
from users.models import User
from django.contrib.auth.models import User as User1

class Command(BaseCommand):
    def handle(self, *args, **options):
        User.objects.all().delete()
        user = User.objects.create(user_name='Ivan13', first_name='Ivan', last_name='Ivanov', email='ivan13@mail.ru')
        user2 = User.objects.create(user_name='Petr13', first_name='Petr', last_name='Petrov', email='petr13@mail.ru')
        Project.objects.all().delete()
        project = Project.objects.create(name='Project1')
        project2 = Project.objects.create(name='Project2')
        project.users.add(user)
        project.save()
        project2.users.add(user2)
        project2.save()
        ToDo.objects.all().delete()
        todo = ToDo.objects.create(project=project, text='text1', create_user=user)
        todo2 = ToDo.objects.create(project=project2, text='text2', create_user=user2)
        todo.save()
        todo2.save()

        User1.objects.all().delete()
        us = User1(username='ADMIN')
        us.set_password('ADMIN')
        us.email = 'admin@amin.ru'
        us.first_name = 'ADMIN'
        us.last_name = 'ADMIN'
        us.is_superuser = True
        us.is_staff = True
        us.save()