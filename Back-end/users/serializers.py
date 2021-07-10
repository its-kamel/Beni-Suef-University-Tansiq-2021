from .functions import validate_password
from rest_framework import serializers
from .models import User



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
        return User.objects.create_user(**validated_data)
