from .functions import validate_password
from rest_framework import serializers
from .models import User
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from desires.models import *



class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['result']

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
        print('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',len(national_id))
        if len(national_id) != 14:
            raise serializers.ValidationError('National ID must be equal to 14 characters')
            
        return attrs
    def create(self, validated_data): 
        exist= Desire.objects.filter(name="غزل ونسيج", id=1, order=1)
        print(exist)
        if not exist :
            Desire.objects.create(name="غزل ونسيج", id=1, order=1)
            Desire.objects.create(name="ميكانيكا انتاج", id=2, order=2)
            Desire.objects.create(name="ميكانيكا اجهزة", id=3, order=3)
            Desire.objects.create(name="كهرباء تحكم آلى", id=4, order=4)
            Desire.objects.create(name="كهرباء الكترونيات", id=5, order=5)
            Desire.objects.create(name="عمارة", id=6, order=6)
            Desire.objects.create(name="مدنى", id=7, order=7)
            Form.objects.create(id=1,is_enabled=True)
            
        user = User.objects.create_user(**validated_data)
        
        print(user)
        first_desire = Desire.objects.get(name="غزل ونسيج", id=1, order=1)
        first_desire.owner.add(user)
        first_desire.save()
        second_desire = Desire.objects.get(name="ميكانيكا انتاج", id=2, order=2)
        second_desire.owner.add(user)
        second_desire.save()
        third_desire= Desire.objects.get(name="ميكانيكا اجهزة", id=3, order=3)
        third_desire.owner.add(user)
        third_desire.save()
        fourth_desire= Desire.objects.get(name="كهرباء تحكم آلى", id=4, order=4)
        fourth_desire.owner.add(user)
        fourth_desire.save()
        fifth_desire= Desire.objects.get(name="كهرباء الكترونيات", id=5, order=5)
        fifth_desire.owner.add(user)
        fifth_desire.save()
        sixth_desire= Desire.objects.get(name="عمارة", id=6, order=6)
        sixth_desire.owner.add(user)
        sixth_desire.save()
        seventh_desire= Desire.objects.get(name="مدنى", id=7, order=7)
        seventh_desire.owner.add(user)
        seventh_desire.save()

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
        read_only_fileds = ['tokens']
    def validate(self, attrs):
        print('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
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
        user.login_from = "email"
        user.save()
        return {
            'email': user.email,
            'tokens': user.tokens
        }
