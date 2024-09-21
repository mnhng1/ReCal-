from django.db import models

# Create your models here.


class Syllabus(models.Model):
    title = models.CharField(max_length=200)  # Title of the syllabus (e.g., "CS101 - Fall 2023")
    file = models.FileField(upload_to='syllabi/')  # Uploads the file to the 'syllabi/' directory
    uploaded_at = models.DateTimeField(auto_now_add=True)  # Automatically set the upload timestamp

    def __str__(self):
        return self.title