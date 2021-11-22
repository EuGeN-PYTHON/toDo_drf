from rest_framework import serializers
from rest_framework.relations import SlugRelatedField, StringRelatedField
from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer

from users.models import User
from users.serializers import UserModelSerializer
from . import models
from .models import ToDo, Project


class ProjectModelSerializer(HyperlinkedModelSerializer):
    name = serializers.CharField(max_length=128)
    # users = UserModelSerializer(many=True)
    # users = StringRelatedField(many=True)
    class Meta:
        model = Project
        fields = '__all__'
        # assigned = serializers.SlugRelatedField(slug_field=Project.users, required=False, read_only=True)

    # def create(self, validated_data):
    #     return Project(**validated_data)
    #
    # def update(self, instance, validated_data):
    #     instance.name = validated_data.get('name', instance.name)
    #     instance.users = validated_data.get('users', instance.users)
    #     instance.link_repository = validated_data.get('link_repository', instance.link_repository)
    #     return instance


class ToDoModelSerializer(HyperlinkedModelSerializer):
    # project = ProjectModelSerializer(read_only=True)
    class Meta:
        model = ToDo
        fields = '__all__'

