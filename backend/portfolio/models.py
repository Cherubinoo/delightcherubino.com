from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    bio = models.TextField()
    vision = models.TextField()
    approach = models.TextField()
    leadership = models.TextField()
    current_focus = models.TextField()
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    resume = models.FileField(upload_to='resumes/', blank=True, null=True)

    def __str__(self):
        return self.name

class Project(models.Model):
    CATEGORY_CHOICES = [
        ('work', 'Work'),
        ('personal', 'Personal'),
    ]
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255, blank=True, null=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='personal')
    description = models.TextField()
    award_name = models.CharField(max_length=255, blank=True, null=True)
    award_link = models.URLField(max_length=500, blank=True, null=True)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    tech_stack = models.JSONField(default=list) # List of technologies
    live_link = models.URLField(max_length=500, blank=True, null=True)
    github_link = models.URLField(max_length=500, blank=True, null=True)
    is_ongoing = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class Skill(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100) # e.g., AI, Computer Vision, Backend
    proficiency = models.IntegerField(default=0) # 0-100

    def __str__(self):
        return self.name

class Experience(models.Model):
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    duration = models.CharField(max_length=100)
    description = models.TextField()
    is_academic = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title} at {self.company}"
