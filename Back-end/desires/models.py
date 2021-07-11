from django.db import models
from users.models import *
# Create your models here.
class Desire(models.Model):

    owner = models.ManyToManyField(
        User, related_name='user_desires', blank=True)

    order = models.IntegerField(blank=False)

    name = models.CharField(max_length=1000)

    class Meta():
        ordering = ['order',]
    
    def __str__(self):
        return self.name

class Form(models.Model):
    is_enabled = models.BooleanField(default=True)
    due_date = models.DateTimeField(blank=True)
