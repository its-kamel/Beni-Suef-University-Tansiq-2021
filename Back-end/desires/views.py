from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.parsers import FormParser
from rest_framework.decorators import parser_classes
from project.permissions import IsAdminUser
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
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
# Create your views here.

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_dates(request):
    exist= Form.objects.filter(id=1)
    if not exist :
        Form.objects.create(id=1,is_enabled=False)
    form_obj = Form.objects.get(id=1)
    # GET
    serializer = DateSerializer(form_obj)
    return Response(serializer.data)

@swagger_auto_schema( methods = ['PUT'] , request_body = DateSerializer )    
@api_view(['PUT'])
@permission_classes((IsAuthenticated,IsAdminUser))
def edit_dates(request):
    exist= Form.objects.filter(id=1)
    if not exist :
        Form.objects.create(id=1,is_enabled=False)
    form_obj = Form.objects.get(id=1)
    # PUT
    serializer = DateSerializer(form_obj,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status= status.HTTP_200_OK )

@api_view(['GET'])
@permission_classes((IsAuthenticated,IsAdminUser))
def get_capacity(request):
    Desire_obj =Desire.objects.filter(owner=request.user)
    # GET
    desires = CapacitySerializer(Desire_obj,many=True)
    return Response(desires.data)

@swagger_auto_schema( methods = ['PUT'] , request_body = CapacitySerializer )    

@api_view(['GET','PUT'])
@permission_classes((IsAuthenticated,IsAdminUser))
def edit_capacity(request,id):
    try:
        Desire_obj =Desire.objects.get(owner=request.user,uid=id)
    except ObjectDoesNotExist :
        return Response(status= status.HTTP_404_NOT_FOUND)
    # GET
    if request.method == 'GET':
        desire = CapacitySerializer(Desire_obj)
        return Response(desire.data)
    # PUT
    if request.method == 'PUT':
        serializer = EditCapacitySerializer(Desire_obj,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_200_OK )  

@swagger_auto_schema( methods = ['PUT'] , request_body = GroupSerializer )    

@api_view(['GET','PUT'])
@permission_classes((IsAuthenticated,IsAdminUser))
def edit_groups(request):

    exist= Form.objects.filter(id=1)
    if not exist :
        Form.objects.create(id=1,is_enabled=False)
    form_obj = Form.objects.get(id=1)
    # GET
    if request.method == 'GET':
        groups_count = GroupSerializer(form_obj)
        return Response(groups_count.data)
    # PUT
    if request.method == 'PUT':
        groups_count = GroupSerializer(form_obj,data=request.data)
        if groups_count.is_valid():
            groups_count.save()
            return Response(groups_count.data, status= status.HTTP_200_OK )

@api_view(['GET'])
@permission_classes((IsAuthenticated,IsAdminUser))
def students_list(request,id):
    #GET
    try:
        Desire_obj =Desire.objects.get(owner=request.user,uid=id)
    except ObjectDoesNotExist :
        return Response(status= status.HTTP_404_NOT_FOUND)

    students_list= User.objects.filter(result=Desire_obj.name)
    students = UserSerializer(students_list, many=True)
    return Response(students.data, status= status.HTTP_200_OK)

user_response = openapi.Response('response description', DesireSerializer)

@swagger_auto_schema(method='PUT', request_body=openapi.Schema(
                             type=openapi.TYPE_OBJECT,
                             required=['ids'],
                             properties={
                                 'ids': openapi.Schema(type=openapi.TYPE_STRING)
                             },
                         ), responses={200: user_response})

@api_view(['PUT'])
@permission_classes((IsAuthenticated,))
def edit_desires(request):
    # PUT
    list= request.data["ids"]
    new_list=[]
    for char in list:
        if char.isnumeric():
            new_list.append(int(char))
    i=1
    for id in new_list :
        desire_obj=Desire.objects.get(uid=id,owner=request.user)
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


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def form_enable(request):
    exist= Form.objects.filter(id=1)
    if not exist :
        Form.objects.create(id=1,is_enabled=False)
    form_obj = Form.objects.get(id=1)
    # GET
    form = EnableSerializer(form_obj)
    return Response(form.data)

@swagger_auto_schema( methods = ['PUT'] , request_body = EnableSerializer )    

@api_view(['GET','PUT'])
@permission_classes((IsAuthenticated,))
def form_info(request):
    exist= Form.objects.filter(id=1)
    if not exist :
        Form.objects.create(id=1,is_enabled=False)
    form_obj = Form.objects.get(id=1)
    # GET
    if request.method == 'GET':
        form = FormSerializer(form_obj)
        return Response(form.data)
    # PUT
    if request.method == 'PUT':
        serializer = EnableSerializer(form_obj,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_200_OK )

user_response = openapi.Response('response description', DesireSerializer)

@swagger_auto_schema(method='POST',manual_parameters=[openapi.Parameter(
                            name="excel_file",
                            in_=openapi.IN_FORM,
                            type=openapi.TYPE_FILE,
                            required=True,
                            description="excel_file"
                            )], responses={200: user_response})
@api_view(['POST'])
@permission_classes((IsAuthenticated,IsAdminUser))
@parser_classes((FormParser,MultiPartParser,))
def upload_grade(request):
    if request.method == 'POST':
        users_list=User.objects.all()
        for user in users_list:
            if not user.is_admin:
                user.delete()
        exist= Form.objects.filter(id=1)
        if not exist :
            Form.objects.create(id=1,is_enabled=False)
        excel_file = request.FILES["excel_file"]
        wb = openpyxl.load_workbook(excel_file)
        worksheet = wb["Sheet1"]
        emails_to_be_sent=[]
        from django.core import mail
        connection = mail.get_connection()
        connection.open()
        for i,row in enumerate(worksheet.iter_rows()):
            if i == 0:                                                                              
                continue
            national_id = row.__getitem__(1).value
            name = row.__getitem__(0).value
            email = row.__getitem__(3).value
            grade = row.__getitem__(2).value
            if national_id == None or email== None or grade== None or name==None:
               continue             
            User.objects.create(national_id=national_id, grade=grade,email=email,name = name)
            user = User.objects.get(national_id=national_id)
            password = password_generator()
            user.set_password(password)
            user.is_verified = True
            user.save()            
           
            #sending mail
            email= prepare_password_email(password,user)
            emails_to_be_sent.append(Util.send_email(email))

        counter = 0
        temp = []
        length= len(emails_to_be_sent)
        for email in emails_to_be_sent:
            temp.append(email)
            if counter == 9:
                connection.send_messages(temp)
                temp.clear()
                # length-=9
                del emails_to_be_sent[:counter]
                counter = 0
            counter +=1
            
        connection.send_messages(emails_to_be_sent)
        connection.close()
        return Response("Grades uploaded successfully")

@api_view(['GET'])
@permission_classes((IsAuthenticated,IsAdminUser))
def department_students(request):
    first_students = User.objects.filter(result="غزل ونسيج").count()
    first_desire = Desire.objects.get(name="غزل ونسيج",owner=request.user)
    first_desire.students_count= first_students
    first_desire.save()
    second_students = User.objects.filter(result="ميكانيكا انتاج").count()
    second_desire = Desire.objects.get(name="ميكانيكا انتاج",owner=request.user)
    second_desire.students_count= second_students
    second_desire.save()
    third_students =User.objects.filter(result="ميكانيكا اجهزة").count()
    third_desire= Desire.objects.get(name="ميكانيكا اجهزة",owner=request.user)
    third_desire.students_count= third_students
    third_desire.save()
    fourth_students= User.objects.filter(result="كهرباء تحكم آلى").count()
    fourth_desire= Desire.objects.get(name="كهرباء تحكم آلى",owner=request.user)
    fourth_desire.students_count= fourth_students
    fourth_desire.save()
    fifth_students=User.objects.filter(result="كهرباء الكترونيات").count()    
    fifth_desire= Desire.objects.get(name="كهرباء الكترونيات",owner=request.user)
    fifth_desire.students_count= fifth_students
    fifth_desire.save()
    sixth_students= User.objects.filter(result="عمارة").count()
    sixth_desire= Desire.objects.get(name="عمارة",owner=request.user)
    sixth_desire.students_count= sixth_students
    sixth_desire.save()
    seventh_students= User.objects.filter(result="مدنى").count()
    seventh_desire= Desire.objects.get(name="مدنى",owner=request.user)
    seventh_desire.students_count= seventh_students
    seventh_desire.save()
    desires_list = Desire.objects.filter(owner=request.user)
    desires = StudentsCountSerializer(desires_list, many=True)
    return Response(desires.data, status= status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_threshold(request):
    # GET
    list=User.objects.filter(result="غزل ونسيج").order_by('grade')
    first_desire =Desire.objects.get(owner=request.user,uid=1)
    if list :
        first_desire.min_threshold=list[0].grade
        first_desire.save()

    list=User.objects.filter(result="ميكانيكا انتاج").order_by('grade')
    second_desire =Desire.objects.get(owner=request.user,uid=2)
    if list :
        second_desire.min_threshold=list[0].grade
        second_desire.save()
    
    list=User.objects.filter(result="ميكانيكا اجهزة").order_by('grade')
    third_desire =Desire.objects.get(owner=request.user,uid=3)
    if list :
        third_desire.min_threshold=list[0].grade
        third_desire.save()

    list=User.objects.filter(result="كهرباء تحكم آلى").order_by('grade')
    fourth_desire =Desire.objects.get(owner=request.user,uid=4)
    if list :
        fourth_desire.min_threshold=list[0].grade
        fourth_desire.save()

    list=User.objects.filter(result="كهرباء الكترونيات").order_by('grade')
    fifth_desire =Desire.objects.get(owner=request.user,uid=5)
    if list :    
        fifth_desire.min_threshold=list[0].grade
        fifth_desire.save()
    
    list=User.objects.filter(result="عمارة").order_by('grade')
    sixth_desire =Desire.objects.get(owner=request.user,uid=6)
    if list :
        sixth_desire.min_threshold=list[0].grade
        sixth_desire.save()

    list=User.objects.filter(result="مدنى").order_by('grade')
    seventh_desire =Desire.objects.get(owner=request.user,uid=7)
    if list :
        seventh_desire.min_threshold=list[0].grade
        seventh_desire.save()

    Desire_obj =Desire.objects.filter(owner=request.user).order_by('uid')
    desires = ThresholdSerializer(Desire_obj,many=True)
    return Response(desires.data)

@api_view(['GET'])
@permission_classes((IsAuthenticated,IsAdminUser))
def department_desires(request):
    
    first_desire = Desire.objects.get(name="غزل ونسيج",owner=request.user)
    
    first_desire1 = Desire.objects.filter(name="غزل ونسيج", order=1).count()

    first_desire2 = Desire.objects.filter(name="غزل ونسيج", order=2).count()
    
    first_desire3 = Desire.objects.filter(name="غزل ونسيج", order=3).count()
    
    first_desire4 = Desire.objects.filter(name="غزل ونسيج", order=4).count()
    
    first_desire5 = Desire.objects.filter(name="غزل ونسيج", order=5).count()
    
    first_desire6 = Desire.objects.filter(name="غزل ونسيج", order=6).count()
    
    first_desire7 = Desire.objects.filter(name="غزل ونسيج", order=7).count()

    first_desire.first_count= first_desire1
    first_desire.second_count= first_desire2
    first_desire.third_count= first_desire3
    first_desire.fourth_count= first_desire4
    first_desire.fifth_count= first_desire5
    first_desire.sixth_count= first_desire6
    first_desire.seventh_count= first_desire7
    first_desire.save()

    ########### Second Desire##############
    
    second_desire = Desire.objects.get(name="ميكانيكا انتاج", owner=request.user)

    second_desire1 = Desire.objects.filter(name="ميكانيكا انتاج", order=1).count()

    second_desire2 = Desire.objects.filter(name="ميكانيكا انتاج", order=2).count()
    
    second_desire3 = Desire.objects.filter(name="ميكانيكا انتاج", order=3).count()
    
    second_desire4 = Desire.objects.filter(name="ميكانيكا انتاج", order=4).count()
    
    second_desire5 = Desire.objects.filter(name="ميكانيكا انتاج", order=5).count()
    
    second_desire6 = Desire.objects.filter(name="ميكانيكا انتاج", order=6).count()
    
    second_desire7 = Desire.objects.filter(name="ميكانيكا انتاج", order=7).count()

    second_desire.first_count= second_desire1
    second_desire.second_count= second_desire2
    second_desire.third_count= second_desire3
    second_desire.fourth_count= second_desire4
    second_desire.fifth_count= second_desire5
    second_desire.sixth_count= second_desire6
    second_desire.seventh_count= second_desire7
    second_desire.save()

    ############# Third Desire ##########

    third_desire= Desire.objects.get(name="ميكانيكا اجهزة", owner=request.user)

    third_desire1 = Desire.objects.filter(name="ميكانيكا اجهزة", order=1).count()

    third_desire2 = Desire.objects.filter(name="ميكانيكا اجهزة", order=2).count()

    third_desire3 = Desire.objects.filter(name="ميكانيكا اجهزة", order=3).count()

    third_desire4 = Desire.objects.filter(name="ميكانيكا اجهزة", order=4).count()

    third_desire5 = Desire.objects.filter(name="ميكانيكا اجهزة", order=5).count()

    third_desire6 = Desire.objects.filter(name="ميكانيكا اجهزة", order=6).count()

    third_desire7 = Desire.objects.filter(name="ميكانيكا اجهزة", order=7).count()

    third_desire.first_count= third_desire1
    third_desire.second_count= third_desire2
    third_desire.third_count= third_desire3
    third_desire.fourth_count= third_desire4
    third_desire.fifth_count= third_desire5
    third_desire.sixth_count= third_desire6
    third_desire.seventh_count= third_desire7
    third_desire.save()

    ########### Fourth Desire ###############
    fourth_desire= Desire.objects.get(name="كهرباء تحكم آلى",owner=request.user)

    fourth_desire1= Desire.objects.filter(name="كهرباء تحكم آلى", order=1).count()

    fourth_desire2= Desire.objects.filter(name="كهرباء تحكم آلى", order=2).count()

    fourth_desire3= Desire.objects.filter(name="كهرباء تحكم آلى", order=3).count()

    fourth_desire4= Desire.objects.filter(name="كهرباء تحكم آلى", order=4).count()

    fourth_desire5= Desire.objects.filter(name="كهرباء تحكم آلى", order=5).count()

    fourth_desire6= Desire.objects.filter(name="كهرباء تحكم آلى", order=6).count()

    fourth_desire7= Desire.objects.filter(name="كهرباء تحكم آلى", order=7).count()
    
    fourth_desire.first_count = fourth_desire1
    fourth_desire.second_count = fourth_desire2
    fourth_desire.third_count = fourth_desire3
    fourth_desire.fourth_count = fourth_desire4
    fourth_desire.fifth_count = fourth_desire5
    fourth_desire.sixth_count = fourth_desire6
    fourth_desire.seventh_count = fourth_desire7
    fourth_desire.save()
    
    ############ fifth Desire ##########

    fifth_desire= Desire.objects.get(name="كهرباء الكترونيات", owner=request.user)

    fifth_desire1= Desire.objects.filter(name="كهرباء الكترونيات", order=1).count()

    fifth_desire2= Desire.objects.filter(name="كهرباء الكترونيات", order=2).count()

    fifth_desire3= Desire.objects.filter(name="كهرباء الكترونيات", order=3).count()

    fifth_desire4= Desire.objects.filter(name="كهرباء الكترونيات", order=4).count()

    fifth_desire5= Desire.objects.filter(name="كهرباء الكترونيات", order=5).count()

    fifth_desire6= Desire.objects.filter(name="كهرباء الكترونيات", order=6).count()

    fifth_desire7= Desire.objects.filter(name="كهرباء الكترونيات", order=7).count()

    fifth_desire.first_count= fifth_desire1
    fifth_desire.second_count= fifth_desire2
    fifth_desire.third_count= fifth_desire3
    fifth_desire.fourth_count= fifth_desire4
    fifth_desire.fifth_count= fifth_desire5
    fifth_desire.sixth_count = fifth_desire6
    fifth_desire.seventh_count = fifth_desire7
    fifth_desire.save()



    ########## Sixth Desire ############
    sixth_desire= Desire.objects.get(name="عمارة", owner=request.user)

    sixth_desire1= Desire.objects.filter(name="عمارة",order=1).count()

    sixth_desire2= Desire.objects.filter(name="عمارة",order=2).count()

    sixth_desire3= Desire.objects.filter(name="عمارة",order=3).count()

    sixth_desire4= Desire.objects.filter(name="عمارة",order=4).count()

    sixth_desire5= Desire.objects.filter(name="عمارة",order=5).count()

    sixth_desire6= Desire.objects.filter(name="عمارة",order=6).count()

    sixth_desire7= Desire.objects.filter(name="عمارة",order=7).count()

    sixth_desire.first_count= sixth_desire1
    sixth_desire.second_count= sixth_desire2
    sixth_desire.third_count= sixth_desire3
    sixth_desire.fourth_count= sixth_desire4
    sixth_desire.fifth_count= sixth_desire5
    sixth_desire.sixth_count= sixth_desire6
    sixth_desire.seventh_count= sixth_desire7
    sixth_desire.save()


    ########## Seventh Desire ################
    seventh_desire= Desire.objects.get(name="مدنى",owner=request.user)

    seventh_desire1= Desire.objects.filter(name="مدنى",order=1).count()

    seventh_desire2= Desire.objects.filter(name="مدنى",order=2).count()

    seventh_desire3= Desire.objects.filter(name="مدنى",order=3).count()

    seventh_desire4= Desire.objects.filter(name="مدنى",order=4).count()

    seventh_desire5= Desire.objects.filter(name="مدنى",order=5).count()

    seventh_desire6= Desire.objects.filter(name="مدنى",order=6).count()

    seventh_desire7= Desire.objects.filter(name="مدنى",order=7).count()

    seventh_desire.first_count= seventh_desire1
    seventh_desire.second_count= seventh_desire2
    seventh_desire.third_count= seventh_desire3
    seventh_desire.fourth_count= seventh_desire4
    seventh_desire.fifth_count= seventh_desire5
    seventh_desire.sixth_count= seventh_desire6
    seventh_desire.seventh_count= seventh_desire7
    seventh_desire.save()
    
    desires_list = Desire.objects.filter(owner=request.user)
    desires = DepartmentCountSerializer(desires_list, many=True)
    return Response(desires.data, status= status.HTTP_200_OK)