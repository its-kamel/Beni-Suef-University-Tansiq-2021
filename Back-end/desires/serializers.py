from rest_framework import serializers
from .models import *
from users.serializers import *

# Serializers define the API representation.
class DesireSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    class Meta:
        model = Desire
        fields = '__all__'
        extra_kwargs = {'owner': {'read_only': True}}


class FormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Form
        fields = '__all__'

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Form
        fields = ['groups_count']

class EnableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Form
        fields = ['is_enabled']        

class DateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Form
        fields = ['start_date','end_date']        

class StudentsCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Desire
        fields = ['uid','name','students_count']       

class CapacitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Desire
        fields = ['uid','name','Capacity']   

class EditCapacitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Desire
        fields = ['Capacity']   

class DepartmentCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Desire
        fields = ['uid','name','first_count','second_count','third_count','fourth_count', 'fifth_count' ,'sixth_count','seventh_count']

class ThresholdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Desire
        fields = ['uid','name','min_threshold']