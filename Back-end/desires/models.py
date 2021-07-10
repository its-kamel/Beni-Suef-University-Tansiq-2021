from django.db import models
from users.models import *
# Create your models here.
class Desire(models.Model):

    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='user_desires')

    order = models.IntegerField(blank=False)
<<<<<<< HEAD
    #ahlan wasahlan
=======
    #hello
>>>>>>> 63c0cdfed85d34eede49e134a29c43ff583aca3e
    title= models.CharField(max_length=1000)

    class Meta():
        ordering = ['order',]
    
    def __str__(self):
        return self.title
