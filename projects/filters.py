import django_filters
from django.db import models as django_models
import timestamp as timestamp
from django_filters import rest_framework as filters
from .models import Project, ToDo


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']

class ToDoFilter(filters.FilterSet):
    project = filters.ModelChoiceFilter(field_name='project', queryset=Project.objects.all())
    create_date_lte = django_filters.DateTimeFilter(field_name='create_date', lookup_expr='lte')
    create_date_gte = django_filters.DateTimeFilter(field_name='create_date', lookup_expr='gte')


    class Meta:
        model = ToDo
        # fields = {'create_date': ('gte', 'lte')}
        fields = ['project', 'create_date_gte', 'create_date_lte']

    # filter_overrides = {
    #     django_models.DateTimeField: {
    #         'filter_class': django_filters.IsoDateTimeFilter
    #     },
    # }
    #