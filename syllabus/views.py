from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from .models import Syllabus
from .serializers import SyllabusSerializer
from django.views import View
from django.contrib.auth.decorators import login_required

# Create your views here.


class SyllabusUploadView(View):
    @login_required
    def post(self, request, format = None):
        serializer = SyllabusSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
