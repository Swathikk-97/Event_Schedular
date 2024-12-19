from django.db import models
from datetime import date

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email

class Events(models.Model):
    title =models.CharField(max_length = 200)
    description =models.TextField(max_length = 300)
    date =models.DateField(default=date.today, null = True)
    location = models.CharField(max_length = 200)
    created_at = models.DateTimeField(auto_now_add=True)  
    updated_at = models.DateTimeField(auto_now=True) 

    class Meta:
        db_table = 'events_tb'

class Sessions(models.Model):
    event = models. ForeignKey(Events,related_name = 'sessions', on_delete=models.CASCADE)
    title =models.CharField(max_length = 200)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time =  models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)  
    updated_at = models.DateTimeField(auto_now=True) 

    class Meta:
        db_table = 'sessions_tb'

class Speakers(models.Model):
    name = models.CharField(max_length = 200)
    email = models.EmailField(unique=True)

    class Meta:
        db_table = 'speakers_tb'
