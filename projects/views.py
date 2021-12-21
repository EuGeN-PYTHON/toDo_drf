from djangorestframework_camel_case.parser import CamelCaseJSONParser
from rest_framework.generics import CreateAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer, TemplateHTMLRenderer, StaticHTMLRenderer, \
    AdminRenderer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

# Create your views here.

from .models import ToDo, Project
from .serializers import ToDoModelSerializer, ProjectModelSerializer, ToDoModelSerializerBase
from .filters import ProjectFilter, ToDoFilter


# class NoUnderscoreBeforeNumberCamelCaseJSONParser(CamelCaseJSONParser):
#     json_underscoreize = {'no_underscore_before_number': True}

class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    # pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ToDoModelViewSet(ModelViewSet):
    # parser_classes = (NoUnderscoreBeforeNumberCamelCaseJSONParser,)
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializerBase
    # pagination_class = ToDoLimitOffsetPagination
    # filterset_class = ToDoFilter
    #
    # def get_serializer_class(self):
    #     if self.request.method in ['GET']:
    #         return ToDoModelSerializer
    #     return ToDoModelSerializerBase

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.is_active:
            instance.is_active = False
        else:
            instance.is_active = True
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

