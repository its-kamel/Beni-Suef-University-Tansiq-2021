import random
import string

def password_generator():
    #input the length of password
    length = 8                     

    #define data
    lower = string.ascii_lowercase
    upper = string.ascii_uppercase
    num = string.digits
    # symbols = string.punctuation
    #string.ascii_letters

    #combine the data
    all = lower + upper + num

    #use random 
    temp = random.sample(all,length)

    #create the password 
    password = "".join(temp)

    #print the password
    return password

def prepare_password_email(password,user):
    email_body = 'Hi ' + str(user.national_id) + ' Here is your test password \n' + password
    data = {'email_body': email_body,
            'to_email': user.email,
            'email_subject': 'Password Test'}
    return data