from rest_framework import viewsets
from rest_framework import mixins
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer

from .models import User
from .serializers import UserModelSerializer


class UserModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet, mixins.UpdateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
