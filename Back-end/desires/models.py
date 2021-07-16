from django.db import models
from users.models import *
# Create your models here.
class Desire(models.Model):

    uid= models.IntegerField(blank=True)
    
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='user_desires', blank=True)

    order = models.IntegerField(blank=False)

    name = models.CharField(max_length=1000)

    students_count= models.IntegerField(default=0)
    
    first_count= models.IntegerField(default=0)

    second_count= models.IntegerField(default=0)
    
    third_count= models.IntegerField(default=0)
    
    fourth_count= models.IntegerField(default=0)
    
    fifth_count= models.IntegerField(default=0)

    sixth_count= models.IntegerField(default=0)
    
    seventh_count= models.IntegerField(default=0)

    Capacity = models.IntegerField(default=0)
    
    class Meta():
        ordering = ['order',]
    
    def __str__(self):
        return self.name

class Form(models.Model):
    is_enabled = models.BooleanField(default=True)
    due_date = models.DateTimeField(blank=True)
    # count
# class studentDesires (models.Model):
#     user = models.ForeignKey(User, related_name='user_desire', on_delete=models.CASCADE, editable=False)
#     desire = models.ForeignKey(Desire, related_name='desire_user', on_delete=models.CASCADE)
#     order = models.IntegerField(blank=False)
    