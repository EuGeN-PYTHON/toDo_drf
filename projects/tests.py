import json

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase, \
    CoreAPIClient
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import ProjectModelViewSet, ToDoModelViewSet
from .models import Project, ToDo
from users.models import User as User1
from users.views import UserModelViewSet


# Create your tests here.

class TestUserViewSet(TestCase):
    url = '/api/users/'

    def setUp(self) -> None:
        self.url = '/api/users/'
        self.admin = User.objects.create_superuser('adminchik', 'adminchik@mail.ru', 'admin123456')
        self.data = {'user_name': 'Tren', 'first_name': 'Tigran', 'last_name': 'Tigranov',
                     'email': 'tren@mail.ru'}

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post(self.url,
                               {'user_name': 'Tren', 'first_name': 'Tigran', 'last_name': 'Tigranov',
                                'email': 'tren@mail.ru'},
                               format='json')
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post(self.url,
                               {'user_name': 'Tren', 'first_name': 'Tigran', 'last_name': 'Tigranov',
                                'email': 'tren@mail.ru'},
                               format='json')
        # admin = User.objects.create_superuser('adminchik', 'adminchik@mail.ru', 'admin123456')
        force_authenticate(request, self.admin)
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        user = User1.objects.create(user_name='Tren', first_name='Tigran', last_name='Tigranov',
                                    email='tren@mail.ru')
        client = APIClient()
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        user = User1.objects.create(**self.data)
        client = APIClient()
        response = client.put(f'/api/users/{user.id}/', {'username': 'Tryn'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        client = APIClient()
        user = User1.objects.create(**self.data)
        client.login(username='adminchik', password='admin123456')
        response = client.put(f'/api/users/{user.id}/',
                              {'user_name': 'Tryn', 'first_name': 'Tygran',
                               'last_name': 'Tygranov', 'email': 'tryn@mail.ru'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user_update = User1.objects.get(id=user.id)
        self.assertEqual(user_update.user_name, 'Tryn')
        self.assertEqual(user_update.email, 'tryn@mail.ru')
        self.assertEqual(user_update.first_name, 'Tygran')
        client.logout()

    def tearDown(self) -> None:
        pass


class TestMath(APISimpleTestCase):

    def test_sqrt(self):
        import math
        self.assertEqual(math.sqrt(4), 2)


class TestToDoViewSet(APITestCase):

    #     # def SetUp(self):
    #     # self.data1 = {'user_name': 'Petr13', 'first_name': 'Petr', 'last_name': 'Petrov',
    #     #               'email': 'petr@mail.ru'}
    #     # self.data2 = {'user_name': 'Ivan13', 'first_name': 'Ivan', 'last_name': 'Ivanov',
    #     #               'email': 'ivan@mail.ru'}
    #     # self.user1 = User1.objects.create(** self.data1)
    #     # self.user2 = User1.objects.create(**self.data2)
    #     # self.admin = User.objects.create_superuser('adminchik', 'adminchik@mail.ru', 'admin123456')
    #     # self.project = Project.objects.create(name='project1', users=[self.user1, self.user2])
    #     # self.todo = ToDo.objects.create(project=self.project, text='', create_user=self.user1)
    #
    def test_get_list(self):
        response = self.client.get('/api/todo/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        user1 = User1.objects.create(user_name='Petr13', first_name='Petr', last_name='Petrov',
                                     email='petr@mail.ru')
        user2 = User1.objects.create(user_name='Ivan13', first_name='Ivan', last_name='Ivanov',
                                     email='ivan@mail.ru')
        project = Project.objects.create(name='project1')
        project2 = Project.objects.create(name='project2')
        project.users.add(user1, user2)
        project2.users.add(user2)
        todo = ToDo.objects.create(project=project, text='te', create_user=user1)
        User.objects.create_superuser('adminchik', 'adminchik@mail.ru', 'admin123456')
        self.client.login(username='adminchik', password='admin123456')
        response = self.client.put(f'/api/todo/{todo.id}/',
                                   {'project': project2.id, 'text': 'text', 'create_user': user2.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = ToDo.objects.get(id=todo.id)
        self.assertEqual(todo.create_user, user2)
        self.assertEqual(todo.text, 'text')
        self.assertEqual(todo.project, project2)
        self.client.logout()

    def test_edit_mixer(self):
        todo = mixer.blend(ToDo)
        admin = User.objects.create_superuser('adminchik', 'adminchik@mail.ru', 'admin123456')
        self.client.login(username='adminchik', password='admin123456')
        response = self.client.put(f'/api/todo/{todo.id}/',
                                   {'project': todo.project.id, 'text': 'text', 'create_user': todo.create_user.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = ToDo.objects.get(id=todo.id)
        self.assertEqual(todo.text, 'text')
        self.client.logout()

    def test_edit_mixer_mixin(self):
        todo = mixer.blend(ToDo, text='te')  # ДОБАВИЛИ СВОИ ДАННЫЕ
        admin = User.objects.create_superuser('adminchik', 'adminchik@mail.ru', 'admin123456')
        self.client.login(username='adminchik', password='admin123456')
        response = self.client.put(f'/api/todo/{todo.id}/',
                                   {'project': todo.project.id, 'text': 'text', 'create_user': todo.create_user.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = ToDo.objects.get(id=todo.id)
        self.assertEqual(todo.text, 'text')
        self.client.logout()

    # def test_live_test(self):
    #     client = CoreAPIClient()
    #     users = client.get('http://127.0.0.1:8000/api/users/')
    #     params = {'user_name': 'Petr13', 'first_name': 'Petr', 'last_name':'Petrov', 'email':'petr@mail.ru'}
    #     client.action(users, ['users', 'create'], params)
    #     data = client.action(users, ['users', 'list'])
    #     assert(len(data) == 1)
    #     assert(data == [{'user_name': 'Petr13', 'first_name': 'Petr', 'last_name':'Petrov', 'email':'petr@mail.ru'}])