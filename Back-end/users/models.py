from django.db import models
from helpers.models import TrackingModel
from django.contrib.auth.models  import (PermissionsMixin, BaseUserManager, AbstractBaseUser)  
from django.contrib.auth.validators  import UnicodeUsernameValidator  

# Create your models here.
class MyUserManager(BaseUserManager):
    def create_user(self, email,first_name ,last_name , age, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not first_name:
            raise ValueError('Users must have a first name')
        if not last_name:
            raise ValueError('Users must have a last name')
        
            user = self.model(
            email=email.lower(),
            first_name=first_name,
            last_name=last_name,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, first_name='admin' ,last_name='admin'):
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
    last_name = models.CharField(verbose_name='last-name', max_length=60)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_allowed = models.BooleanField(default=True)
    
    USERNAME_FIELD = 'email'
    objects = MyUserManager()

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }
        
    def __str__(self):
        return self.email

    # For checking permissions. to keep it simple all admin have ALL permissons
    def has_perm(self, perm, obj=None):
        return self.is_admin

    # Does this user have permission to view this app?
    def has_module_perms(self, app_label):
        return True
