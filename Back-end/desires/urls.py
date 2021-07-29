from .views import *
from django.urls import path, include
app_name = 'desires'
urlpatterns = [
    # get , edit and delete a specific gallery APIs
    path('', desires_list, name='desires_list'),
    path('edit', edit_desires, name='edit_desires'),
    path('groups', edit_groups, name='edit_groups'),
    path('<int:id>/capacity', edit_capacity , name='edit_capacity'),
    path('form', form_info, name='form_info'),
    path('enable', form_enable, name='form_enable'),
    path('set-dates', edit_dates, name='edit_dates'),
    path('dates', get_dates, name='get_dates'),
    path('grades-upload', upload_grade, name='upload_grade'),
    path('department-students', department_students, name='department_students'),
    path('departments', department_desires, name='department_desires'),
    path('<int:id>/students-list', students_list, name='students_list'),   

]
