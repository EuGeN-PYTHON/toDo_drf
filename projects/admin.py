from django.contrib import admin

# Register your models here.
from projects.models import Project, ToDo


# admin.site.register(Project)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'link_repository',)
    fields = (('name', 'users'), 'link_repository')
    readonly_fields = ('link_repository',)
    ordering = ('name', 'users',)
    search_fields = ('name',)

@admin.register(ToDo)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('project', 'text', 'create_date', 'create_user', 'updated_date', 'is_active')
    fields = (('project', 'create_user',), ('is_active'), 'text', ('create_date'),('updated_date'))
    readonly_fields = ('create_date', 'updated_date', )
    ordering = ('project', 'create_date', 'updated_date')
    search_fields = ('project',)
