from . import views
from django.urls import path, include
app_name = 'desires'
urlpatterns = [
    # get , edit and delete a specific gallery APIs
    path('', views.desires_list, name='desires_list'),

    path('form', views.form_info, name='form_info'),
]
