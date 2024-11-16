from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
import json
from allauth.socialaccount.providers.google.views import OAuth2LoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.conf import settings

SECRET_KEY = settings.SECRET_KEY

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        if not username or not password:
            return JsonResponse({'error': 'Username and password are required.'}, status=400)
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username is already taken.'}, status=400)
        user = User.objects.create_user(username=username, password=password)
        return JsonResponse({'message': 'User created successfully', 'username': username}, status=201)

@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful', 'username': username}, status=200)
        return JsonResponse({'error': 'Invalid credentials'}, status=400)





@csrf_exempt
def get_user_token(request):
    if request.method == "GET":
        if request.user.is_authenticated:
            token = jwt.encode({'username': request.user.username})

@csrf_exempt
def social_login_token(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            social_account = SocialAccount.objects.filter(user = request.user).first()
            if social_account:
                token = jwt.encode({'username': request.user.username}, SECRET_KEY, algorithm='HS256')
                return JsonResponse({'token': token})
            else:
                return JsonResponse({'error': 'No social account found'}, status=400)
        else:
            return JsonResponse({'error': 'User not authenticated'}, status=401)
