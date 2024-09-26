from django.urls import path, include
from .views import register, user_login

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', user_login, name='login'),
    path('oauth/', include('allauth.urls'))
]