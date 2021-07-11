from django.db import models
from helpers.models import TrackingModel
from django.contrib.auth.models  import (PermissionsMixin, BaseUserManager, AbstractBaseUser)  
from django.contrib.auth.validators  import UnicodeUsernameValidator  
import jwt
from django.conf import settings
from datetime import datetime,timedelta
# Create your models here.
class MyUserManager(BaseUserManager):
    def create_user(self, email,first_name ,middle_name ,last_name , national_id, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not first_name:
            raise ValueError('Users must have a first name')
        if not middle_name:
            raise ValueError('Users must have a middle name')
        if not last_name:
            raise ValueError('Users must have a last name')
        
        user = self.model(
            email=email.lower(),
            first_name=first_name,
            last_name=last_name,
            middle_name=middle_name,
            national_id=national_id
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, first_name='admin',middle_name='admin' ,last_name='admin'):
        user = self.create_user(
            email=email.lower(),
            password=password,
            first_name=first_name,
            last_name=last_name
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.is_pro = True
        
        user.save(using=self._db)
        return user
class User(AbstractBaseUser, PermissionsMixin, TrackingModel):
    email = models.EmailField(verbose_name='email', max_length=60, unique=True)
    first_name = models.CharField(verbose_name='first-name', max_length=60)
    middle_name = models.CharField(verbose_name='middle-name', max_length=60)
    last_name = models.CharField(verbose_name='last-name', max_length=60)
    department = models.CharField(verbose_name='department', max_length=60, blank = True)
    national_id= models.BigIntegerField(unique=True)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    result=models.CharField(max_length=1000, default=" لم تظهر بعد" )
    grade = models.IntegerField(default= 0)
    
    USERNAME_FIELD = 'email'
    objects = MyUserManager()
    @property
    def tokens(self):
        token = jwt.encode({'email': self.email, 'national_id': self.national_id, 'exp':datetime.utcnow() + timedelta(hours=24)},settings.SECRET_KEY, algorithm='HS256')
        return token
        
    def __str__(self):
        return self.email

