from .views import *
from django.urls import path, include
app_name = 'desires'
urlpatterns = [
    # get , edit and delete a specific gallery APIs
    path('', desires_list, name='desires_list'),
    path('form', form_info, name='form_info'),
    path('grades_upload', uploadGrade, name='upload_grade'),
    
]
