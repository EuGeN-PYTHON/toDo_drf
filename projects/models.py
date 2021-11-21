from django.db import models

# Create your models here.
from users.models import User


# NULL_INSTALL = {'null': True, 'blank': True}


class Project(models.Model):
    name = models.CharField(max_length=64)
    link_repository = models.URLField
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.name


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    create_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    users = models.ManyToManyField(User)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Заметка №{self.id}"
