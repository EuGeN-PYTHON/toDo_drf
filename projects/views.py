from djangorestframework_camel_case.parser import CamelCaseJSONParser
from rest_framework.generics import CreateAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer, TemplateHTMLRenderer, StaticHTMLRenderer, \
    AdminRenderer
from rest_framework.viewsets import ModelViewSet

# Create your views here.

from .models import ToDo, Project
from .serializers import ToDoModelSerializer, ProjectModelSerializer
from .filters import ProjectFilter, ToDoFilter


# class NoUnderscoreBeforeNumberCamelCaseJSONParser(CamelCaseJSONParser):
#     json_underscoreize = {'no_underscore_before_number': True}

class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ToDoModelViewSet(ModelViewSet):
    # parser_classes = (NoUnderscoreBeforeNumberCamelCaseJSONParser,)
    # renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    pagination_class = ToDoLimitOffsetPagination
    filterset_class = ToDoFilter

