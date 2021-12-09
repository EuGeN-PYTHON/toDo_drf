from django.db import models

# Create your models here.
from users.models import User


NULL_INSTALL = {'null': True, 'blank': True}


class Project(models.Model):
    name = models.CharField(max_length=64)
    link_repository = models.URLField
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.name


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    create_date = models.DateTimeField(auto_now_add=True, **NULL_INSTALL)
    updated_date = models.DateTimeField(auto_now=True, **NULL_INSTALL)
    create_user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True, **NULL_INSTALL)

    def __str__(self):
        return f"Заметка №{self.id}"
