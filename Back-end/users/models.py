from django.db import models
from helpers.models import TrackingModel
from django.contrib.auth.models  import (PermissionsMixin, BaseUserManager, AbstractBaseUser)  
from django.contrib.auth.validators  import UnicodeUsernameValidator  
import jwt
from django.conf import settings
from datetime import datetime,timedelta
# Create your models here.
class MyUserManager(BaseUserManager):
    def create_user(self, email,name, national_id, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not name:
            raise ValueError('Users must have a  name')

        
        user = self.model(
            email=email.lower(),
            name=name,
            national_id=national_id
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, name='admin'):
        user = self.create_user(
            email=email.lower(),
            password=password,
            name=name
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.is_pro = True
        
        user.save(using=self._db)
        return user
class User(AbstractBaseUser, PermissionsMixin, TrackingModel):
    email = models.EmailField(verbose_name='email', max_length=60, unique=True)
    name = models.CharField(verbose_name='name', max_length=80,blank=True)
    national_id= models.BigIntegerField(unique=True,blank=False)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    result=models.CharField(max_length=1000, default=" لم تظهر بعد" )
    grade = models.FloatField(default= None)
    logged = models.BooleanField(default=False)
    edited = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    objects = MyUserManager()
    @property
    def tokens(self):
        token = jwt.encode({'email': self.email, 'national_id': self.national_id, 'exp':datetime.utcnow() + timedelta(hours=24)},settings.SECRET_KEY, algorithm='HS256')
        return token
        
    def __str__(self):
        return self.email

