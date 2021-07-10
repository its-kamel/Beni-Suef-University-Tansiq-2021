from django.shortcuts import render
from .functions import prepare_verify_email,validate_password
from rest_framework import generics, status, views
from .serializers import SignUpSerializer,LogInSerializer
from .models import User
from rest_framework.response import Response

# from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.


#sign up user
class SignUpView(generics.GenericAPIView):
    serializer_class = SignUpSerializer
    
    #POST for user signing up
    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data

        #Setting email message
        user = User.objects.get(email=user_data['email'])
        # token = RefreshToken.for_user(user).access_token
        # current_site = get_current_site(request).domain

        # email = prepare_verify_email(current_site,user,token)
        
        #sending mail
        # Util.send_email(email)
        
        return Response(user_data, status=status.HTTP_201_CREATED)
    
#User login
class LoginView(generics.GenericAPIView):
    serializer_class = LogInSerializer

    #POST
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        print('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
