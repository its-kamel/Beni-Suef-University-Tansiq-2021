from django.urls import path
from .views import *


app_name = 'users'

urlpatterns = [
#sign user up
path('sign-up/', SignUpView.as_view(), name="signup"),

# #change user's password
# path('change-password/', ChangePassword.as_view(), name='change-password'),

# #change user's username
# path('change-username/', ChangeUsername.as_view(), name='change-username'),

# #change user's first/lastname
# path('change-name/', ChangeFirstLastName.as_view(), name='change-name'),

# #change user's email
# path('change-email/', ChangeEmail, name='change-email'),

# #resend's verify mail 
# path('resend-verify-mail/', ResendMailView.as_view(), name='resend-verify'),

# #verify user's mail
# path('email-verify/', VerifyEmail.as_view(), name="email-verify"),

# #reset users password
# path('password-reset-email', RequestPasswordResetEmail.as_view(),
#      name="reset=pass"),

# #log user in
# path('login/', LoginView.as_view(), name="login"),

# #reset user's password
# path('password-reset/<uidb64>/<token>/', PasswordTokenCheck.as_view(),
#      name="password-reset-confirm"),

# #setting new password after reset
# path('password-reset-complete/', SetNewPassword.as_view(),
#      name="password-reset-complete"),

# #refresh token api
# path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

# #delete user's account
# path('delete-account/', DeleteAccount, name='delete-account'),

# #change account type
# path('change-to-pro/', ChangeToPro.as_view(), name="change-to-pro"),

# #get account info
# path('user-info/', UserInfo.as_view(), name="user-info"),

]