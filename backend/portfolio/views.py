from rest_framework import viewsets
from .models import Profile, Project, Skill, Experience
from .serializers import ProfileSerializer, ProjectSerializer, SkillSerializer, ExperienceSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('-id')
    serializer_class = ProjectSerializer

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all().order_by('-id')
    serializer_class = ExperienceSerializer
