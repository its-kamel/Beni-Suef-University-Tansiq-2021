from typing import List
from django.shortcuts import render
from django.core import paginator
from django.db.models import fields
from django.http import response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import *
from users.models import *
from .serializers import *
# from project.permissions import check_permission
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import IsAuthenticated
import openpyxl
from rest_framework import exceptions

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
@permission_classes((IsAuthenticated,))

def uploadGrade(request):
    if request.method == 'POST':
        
        excel_file = request.FILES["excel_file"]
        wb = openpyxl.load_workbook(excel_file)
        worksheet = wb["Sheet1"]
        
        for row in worksheet.iter_rows():
            national_id = row.__getitem__(0).value
            grade = row.__getitem__(1).value
            user = User.objects.filter(national_id= national_id)

            if not user.exists():
                raise exceptions.NotFound("User with national_id {id} not found in database".format(id = national_id), 404)
            else:
                user = User.objects.get(national_id= national_id)
                user.grade = grade
                user.save()
                return Response("Grades uploaded successfully")

            
