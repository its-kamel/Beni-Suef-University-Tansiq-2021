from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import *
from users.models import *
from .serializers import *
# from project.permissions import check_permission
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import IsAuthenticated
import openpyxl
from rest_framework import exceptions
from .functions import password_generator,prepare_password_email
from project.utils import Util
# Create your views here.

    # print("NNNNNNNN", request.data.getlist(["ids"]))
    # print("KKKKKKK",request.data.getlist('ids'))
@api_view(['PUT'])
@permission_classes((IsAuthenticated,))
def edit_desires(request):
    # PUT
    
    list=request.data["ids"].split(',')
    i=1
    for id in list :
        desire_obj=Desire.objects.get(id=id)
        desire_obj.order=i
        desire_obj.save()
        i+=1
    desires_list = Desire.objects.filter(owner=request.user)
    desires = DesireSerializer(desires_list, many=True)
    return Response(desires.data, status= status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def desires_list(request):
    # GET
    desires_list = Desire.objects.filter(owner=request.user)
    desires = DesireSerializer(desires_list, many=True)
    return Response( desires.data, status= status.HTTP_200_OK)

@api_view(['GET','PUT'])
@permission_classes((IsAuthenticated,))
def form_info(request):
    
    form_obj = Form.objects.get(id=1)
    # GET
    if request.method == 'GET':
        form = FormSerializer(form_obj)
        return Response(form.data)
    # PUT
    if request.method == 'PUT':
        if form_obj.is_enabled :
            form_obj.is_enabled= False
        else:
            form_obj.is_enabled= True
        form_obj.save()
        form = FormSerializer(form_obj)
        return Response(form.data, status= status.HTTP_200_OK )


@api_view(['POST'])
@authentication_classes(())

def upload_grade(request):
    if request.method == 'POST':
        
        excel_file = request.FILES["excel_file"]
        wb = openpyxl.load_workbook(excel_file)
        worksheet = wb["Sheet1"]
        emails_to_be_sent=[]
        from django.core import mail
        connection = mail.get_connection()
        connection.open()
        for row in worksheet.iter_rows():
            national_id = row.__getitem__(0).value
            email = row.__getitem__(1).value
            grade = row.__getitem__(2).value
            try:
                User.objects.create(national_id=national_id, grade=grade,email=email)
                user = User.objects.get(national_id=national_id)
                password = password_generator()
                user.set_password(password)
                user.is_verified = True
                user.save()
            except:
                print('bleh')
            #sending mail
            email= prepare_password_email(password,user)
            emails_to_be_sent.append(Util.send_email(email))
        connection.send_messages(emails_to_be_sent)
        connection.close()
        print(emails_to_be_sent)
        return Response("Grades uploaded successfully")

@api_view(['GET'])
@permission_classes((IsAuthenticated,))

def department_students(request):
    first_students = User.objects.filter(result="غزل ونسيج").count()
    first_desire = Desire.objects.get(name="غزل ونسيج")
    first_desire.students_count= first_students
    first_desire.save()
    second_students = User.objects.filter(result="ميكانيكا انتاج").count()
    second_desire = Desire.objects.get(name="ميكانيكا انتاج")
    second_desire.students_count= second_students
    second_desire.save()
    third_students =User.objects.filter(result="ميكانيكا اجهزة").count()
    third_desire= Desire.objects.get(name="ميكانيكا اجهزة")
    third_desire.students_count= third_students
    third_desire.save()
    fourth_students= User.objects.filter(result="كهرباء تحكم آلى").count()
    fourth_desire= Desire.objects.get(name="كهرباء تحكم آلى")
    fourth_desire.students_count= fourth_students
    fourth_desire.save()
    fifth_students=User.objects.filter(result="كهرباء الكترونيات").count()    
    fifth_desire= Desire.objects.get(name="كهرباء الكترونيات")
    fifth_desire.students_count= fifth_students
    fifth_desire.save()
    sixth_students= User.objects.filter(result="عمارة").count()
    sixth_desire= Desire.objects.get(name="عمارة")
    sixth_desire.students_count= sixth_students
    sixth_desire.save()
    seventh_students= User.objects.filter(result="مدنى").count()
    seventh_desire= Desire.objects.get(name="مدنى")
    seventh_desire.students_count= seventh_students
    seventh_desire.save()

    desires_list = Desire.objects.all()
    desires = DesireSerializer(desires_list, many=True)
    return Response(desires.data, status= status.HTTP_200_OK)





