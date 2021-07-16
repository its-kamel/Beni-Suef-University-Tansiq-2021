from django.contrib.auth import authenticate
from django.shortcuts import render
from .functions import prepare_verify_email,validate_password
from rest_framework import generics, status, views, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist

# from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def result_info(request):
    # GET
    result = ResultSerializer(request.user)
    return Response( result.data, status= status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes((IsAuthenticated,))
def edit_result(request,id):
    # PUT
    try:
        user_obj = User.objects.get(id=id)
    except ObjectDoesNotExist:
        return Response( status= status.HTTP_404_NOT_FOUND)
    serializer = ResultSerializer(user_obj, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status= status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
#@permission_classes((IsAuthenticated,))
@authentication_classes(())
def SortStudents(request):
    #put
    print("user_obj")
    try:
        users = User.objects.all().order_by('-grade')
    except ObjectDoesNotExist:
        return Response( status= status.HTTP_404_NOT_FOUND)
    
    users = list(users.values_list('national_id', 'grade'))
    Students = []
    student = []
    for ID, grade in users:
        student.append(ID)
        Desires = Desire.objects.filter(owner = User.objects.get(national_id = ID))
        for desire in Desires:
            student.append(str(desire))
        Students.append(student.copy())
        student = []
    Colleges = [["غزل ونسيج"],["ميكانيكا انتاج"], ["ميكانيكا اجهزة"], ["كهرباء تحكم آلى"], ["كهرباء الكترونيات"], ["عمارة"], ["مدنى"]]
    for i in range(len(Colleges)):
        Colleges[i].append(Desire.objects.get(name=Colleges[i][0]).students_count)
    
    
#sign up user
class SignUpView(generics.GenericAPIView):
    authentication_classes=[]
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
    authentication_classes=[]

    serializer_class = LogInSerializer

    #POST
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

#test
class AuthUserAPIView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self,request):
        user = request.user
        serializer = SignUpSerializer(user)
        return Response({'User': serializer.data})