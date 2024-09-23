from django.urls import path
from .views import SyllabusUploadView

urlpatterns = [
    path('upload/', SyllabusUploadView.as_view(), name='syllabus-upload'),
]