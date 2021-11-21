from django.contrib import admin

# Register your models here.
from projects.models import Project


# admin.site.register(Project)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'link_repository',)
    fields = (('name', 'users'), 'link_repository')
    readonly_fields = ('link_repository',)
    ordering = ('name', 'users',)
    search_fields = ('name',)
