from django.contrib import admin
from .models import Syllabus
# Register your models here.


@admin.register(Syllabus)
class SyllabusAdmin(admin.ModelAdmin):
    list_display = ('title', 'uploaded_at')