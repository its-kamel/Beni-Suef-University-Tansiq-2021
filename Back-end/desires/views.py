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
from project.permissions import check_permission
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import IsAuthenticated

# Create your views here.

@api_view(['GET'])
@permission_classes((IsAuthenticated,))

def desires_list(request):
    # GET
    desires_list = Desire.objects.all()
    desires = DesireSerializer(desires_list, many=True)
    return Response( desires.data)

# def uploadGrade(request):
#     '''
#     Class information is imported
#     :param request:
#     :return:
#     '''
#     if request.method == 'POST':
#         f = request.FILES.get('file')
#         excel_type = f.name.split('.')[1]
#         if excel_type in ['xlsx','xls']:
#                          # Start parsing excel spreadsheet upload
#             wb = xlrd.open_workbook(filename=None,file_contents=f.read())
#             table = wb.sheets()[0]
#                          total number of rows rows = table.nrows #
#             try:
#                 with transaction.atomic (): # database transaction transaction control
#                     for i in range(1,rows):
#                         rowVlaues = table.row_values(i)
#                         major = models.TMajor.objects.filter(majorid=rowVlaues[1]).first()
#                         models.TGrade.objects.create(gradeid=rowVlaues[0],major=major,gradename=rowVlaues[2],memo=rowVlaues[3])
#             except:
#                 logger.error ( 'parse excel file or data insertion error')
#                 return render (request, 'bg / success.html', { 'message': 'import success'})
#         else:
#             logger.error ( 'upload file type error!')
#             return render (request, 'bg / failed.html', { 'message': 'Import failed'})        