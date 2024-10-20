from allauth.account.adapter import DefaultAccountAdapter
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.forms import ValidationError

class SocialLoginAdapter(DefaultSocialAccountAdapter):
    def pre_social_login(self, request, sociallogin):
        """
        Automatically log in users who sign up via Google, bypassing the signup form.
        """
        if sociallogin.is_existing:
            return None  # Skip the signup form for existing users
        else:
            # Automatically complete the signup
            user = sociallogin.user
            user.email = sociallogin.account.extra_data.get('email', '')  # Set email from Google
            user.save()

    def get_login_redirect_url(self, request):
        """
        Redirect to the frontend after login
        """
        return 'http://localhost:3000/dashboard' 