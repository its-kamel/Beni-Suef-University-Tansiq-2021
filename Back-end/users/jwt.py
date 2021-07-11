from rest_framework.authentication import get_authorization_header, BaseAuthentication
from rest_framework import exceptions
import jwt
from django.conf import settings
from users.models import User
class JWTAuthentication(BaseAuthentication):

    def authenticate(self, request):
        auth_header = get_authorization_header(request)
        print('EEEEEEEEEEEEEEEEE')
        auth_data = auth_header.decode('utf-8')

        auth_token = auth_data.split(" ")

        if len(auth_token) != 2:
            raise exceptions.AuthenticationFailed('Token not valid')

        token = auth_token[1]
        try:
            print('OOOOOOOOOO')
            payload = jwt.decode(token,settings.SECRET_KEY, algorithms='HS256')
            print(payload)

            national_id = payload['national_id']

            user = User.objects.get(national_id = national_id)

            return (user,token)
        except jwt.ExpiredSignatureError as ex:
            raise exceptions.AuthenticationFailed('Token not valid, login again')


        except jwt.DecodeError as ex:
            raise exceptions.AuthenticationFailed('Token is invalid')


        except User.DoesNotExist as no_user:
            raise exceptions.AuthenticationFailed('No such user')
        
        