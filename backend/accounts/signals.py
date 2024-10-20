import jwt
from django.dispatch import receiver
from allauth.socialaccount.signals import social_account_added
from django.conf import settings
from django.shortcuts import redirect

@receiver(social_account_added)
def generate_jwt_on_google_login(sender, request, sociallogin, **kwargs):
    user = sociallogin.user
    token = jwt.encode({'user_id': user.id}, settings.SECRET_KEY, algorithm='HS256')
    frontend_url = f'http://localhost:3000/login/success?token={token}'
    return redirect(frontend_url)