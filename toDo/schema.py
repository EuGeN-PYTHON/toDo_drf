from turtle import update

import graphene
from graphene_django import DjangoObjectType
from graphene import ObjectType, String, Schema
from requests import delete

from users.models import User
from projects.models import Project, ToDo


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class Query(ObjectType):
    all_projects = graphene.List(ProjectType)
    all_todo = graphene.List(ToDoType)
    all_users = graphene.List(UserType)
    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    todo_by_id = graphene.Field(ToDoType, id=graphene.Int(required=True))
    projects_by_user_name = graphene.List(ProjectType, name=graphene.String(required=False))

    def resolve_projects_by_user_name(root, info, name=None):
        projects = Project.objects.all()
        if name:
            projects = projects.filter(users__user_name=name)
        return projects

    def resolve_user_by_id(root, info, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return None

    def resolve_project_by_id(root, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None

    def resolve_todo_by_id(root, info, id):
        try:
            return ToDo.objects.get(id=id)
        except ToDo.DoesNotExist:
            return None

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_todo(root, info):
        return ToDo.objects.all()


class UserUpdateMutation(graphene.Mutation):
    class Arguments:
        user_name = graphene.String(required=True)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        id = graphene.ID()

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, user_name, first_name, last_name, id):
        user = User.objects.get(id=id)
        user.user_name = user_name
        user.first_name = first_name
        user.last_name = last_name
        user.save()
        return UserUpdateMutation(user=user)

class UserCreateMutation(graphene.Mutation):
    class Arguments:
        user_name = graphene.String(required=True)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, user_name, first_name, last_name):
        user = User.objects.create(user_name=user_name, first_name=first_name, last_name=last_name)
        return UserCreateMutation(user=user)

class UserDeleteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()


    user = graphene.List(UserType)

    @classmethod
    def mutate(cls, root, info, id):
        User.objects.get(id=id).delete()
        user = User.objects.all()
        return UserDeleteMutation(user=user)


class Mutation(graphene.ObjectType):
    update_user = UserUpdateMutation.Field()
    create_user = UserCreateMutation.Field()
    delete_user = UserDeleteMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
