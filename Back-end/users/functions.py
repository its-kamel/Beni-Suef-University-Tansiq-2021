def prepare_verify_email(current_site,user,token):
    relative_link = reverse('accounts:email-verify')
    absurl = 'http://'+current_site+relative_link+"?token="+str(token)
    email_body = 'Hi ' + user.username + ' Use link to verify \n' + absurl
    data = {'email_body': email_body,
            'to_email': user.email,
            'email_subject': 'Verify Your Email'}
    return data

def validate_password(password):
    
    if len(password)<6:
        pwreason = ('password must be greater than or equal to 6 characters')
        return '',pwreason
    
    if len(password)>16:
        pwreason = ('password must be less than or equal to 16 characters')
        return '',pwreason
    return password,''
    