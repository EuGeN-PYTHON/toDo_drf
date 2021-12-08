from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User

# Register your models here.

# admin.site.register(User)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('user_name', 'first_name', 'last_name', 'email')
    fields = (('user_name', 'email'), ('first_name', 'last_name'))
    # readonly_fields = ('email',)
    ordering = ('user_name', 'first_name', 'last_name', 'email')
    search_fields = ('user_name',)

# admin.site.register(User, UserAdmin)
