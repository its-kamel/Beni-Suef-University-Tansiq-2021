from desires.functions import password_generator, prepare_password_email
from project.utils import Util
from .functions import validate_password
from rest_framework import serializers
from .models import User
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from desires.models import *



class AddAdminSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['email','national_id']
        

    def validate(self, attrs):
        national_id= attrs.get('national_id', '')
        email= attrs.get('email','').lower()
        user = User.objects.filter(email=email)
        
        #Checking if user is already registered
        if user:
            raise serializers.ValidationError({'error': 'Email already registered !'})

        national_id=str(national_id)
        if len(national_id) != 14:
            raise serializers.ValidationError('National ID must be equal to 14 characters')
            
        return attrs
    def create(self, validated_data): 
        user = User.objects.create(**validated_data)
        print(validated_data)
        user = User.objects.get(national_id=validated_data['national_id'])
        password = password_generator()
        user.set_password(password)
        user.is_verified = True
        user.is_admin = True
        user.save()
        #sending email
        from django.core import mail
        connection = mail.get_connection()
        connection.open()
        email= prepare_password_email(password,user)
        connection.send_messages([Util.send_email(email),])
        connection.close()
        return user 

class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['result']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['result', 'grade','email','national_id','is_admin']


#Sign up serializer
class SignUpSerializer(serializers.ModelSerializer):
    '''Serializer for Signing up'''
    password = serializers.CharField(max_length=16, min_length=6,
                                     write_only=True)

    class Meta:
        model = User
        fields = ['email','password','national_id','first_name','middle_name','last_name']
        

    def validate(self, attrs):
        
        password = attrs.get('password', '')
        age= attrs.get('age', '')
        national_id= attrs.get('national_id', '')
        email= attrs.get('email','').lower()
        user = User.objects.filter(email=email)
        
        #Checking if user is already registered
        if user:
            raise serializers.ValidationError({'error': 'Email already registered !'})
        
        password,error2=validate_password(password)

        if len(password)==0:
            raise serializers.ValidationError(error2)
        national_id=str(national_id)
        if len(national_id) != 14:
            raise serializers.ValidationError('National ID must be equal to 14 characters')
            
        return attrs
    def create(self, validated_data): 
        user = User.objects.create_user(**validated_data)
        return user 
    

#Log in serializer
class LogInSerializer(serializers.ModelSerializer):
    '''Serializer for Log in'''
    email = serializers.EmailField(max_length=60)

    
    password = serializers.CharField(max_length=16, min_length=6,
                                     write_only=True)
    
    class Meta:
        model = User
        fields = ['email', 'password', 'tokens']
        read_only_fields = ['tokens']
    def validate(self, attrs):
        email = attrs.get('email', '')
        password = attrs.get('password', '')
        email=email.lower()
        user = auth.authenticate(email=email, password=password)
        
        if not user:
            raise AuthenticationFailed('Invalid email or password.')
        if not user.is_active:
            raise AuthenticationFailed('Account disabled, contact admin')
        if not user.is_verified:
            raise AuthenticationFailed('Email is not verified')
        exist= Desire.objects.filter(name="غزل ونسيج", uid=1, order=1,owner=user)  
        if not exist:  
            Desire.objects.create(name="غزل ونسيج", uid=1, order=1,owner=user)
            Desire.objects.create(name="ميكانيكا انتاج", uid=2, order=2,owner=user)
            Desire.objects.create(name="ميكانيكا اجهزة", uid=3, order=3,owner=user)
            Desire.objects.create(name="كهرباء تحكم آلى", uid=4, order=4,owner=user)
            Desire.objects.create(name="كهرباء الكترونيات", uid=5, order=5,owner=user)
            Desire.objects.create(name="عمارة", uid=6, order=6,owner=user)
            Desire.objects.create(name="مدنى", uid=7, order=7,owner=user)
        return {
            'email': user.email,
            'tokens': user.tokens
        }
