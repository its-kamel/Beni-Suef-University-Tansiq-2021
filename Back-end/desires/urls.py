from .views import *
from django.urls import path, include
app_name = 'desires'
urlpatterns = [
    # get , edit and delete a specific gallery APIs
    path('', desires_list, name='desires_list'),
    path('edit', edit_desires, name='edit_desires'),
    path('form', form_info, name='form_info'),
    path('grades-upload', upload_grade, name='upload_grade'),
    path('students', department_students, name='department_students'),
    
]
