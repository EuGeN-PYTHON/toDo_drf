from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer

from .models import User


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'user_name', 'first_name', 'last_name', 'email')

class UserModelSerializerV2(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
