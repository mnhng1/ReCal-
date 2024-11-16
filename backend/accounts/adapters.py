from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from allauth.account.adapter import DefaultAccountAdapter
from django.contrib.auth import get_user_model
from django.core.exceptions import MultipleObjectsReturned  # Import the exception

class SocialLoginAdapter(DefaultSocialAccountAdapter):
    def pre_social_login(self, request, sociallogin):
        """Handle user creation/login via Google"""
        # Get email from Google
        email = sociallogin.account.extra_data.get('email')
        User = get_user_model()
        
        if sociallogin.is_existing:
            return
            
        try:
            # Check if user exists with this email
            user = User.objects.get(email=email)
            # Connect social account to existing user
            sociallogin.connect(request, user)
        except MultipleObjectsReturned:
            # Handle multiple users with the same email
            users = User.objects.filter(email=email)
            user = users.first()  # Choose the first user (or implement your own logic)
            sociallogin.connect(request, user)
        except User.DoesNotExist:
            # Create new user
            user = sociallogin.user
            user.email = email
            # Generate username from email
            username = email.split('@')[0]
            counter = 1
            while User.objects.filter(username=username).exists():
                username = f"{email.split('@')[0]}_{counter}"
                counter += 1
            user.username = username
            user.save()

    def get_login_redirect_url(self, request):
        """Redirect after successful login"""
        return 'http://localhost:5173/dashboard'