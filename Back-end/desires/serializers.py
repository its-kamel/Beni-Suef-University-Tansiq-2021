from rest_framework import serializers
from .models import *
# from users.serializers import *

# Serializers define the API representation.
class DesireSerializer(serializers.ModelSerializer):
    # owner = OwnerSerializer(read_only=True)
    class Meta:
        model = Desire
        # total info for a comment on a gallery
        fields = '__all__'
        extra_kwargs = {'owner': {'read_only': True}}


class FormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Form
        # total info for a comment on a gallery
        fields = '__all__'