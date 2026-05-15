from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet, ProjectViewSet, SkillViewSet, ExperienceViewSet

router = DefaultRouter()
router.register(r'profile', ProfileViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'skills', SkillViewSet)
router.register(r'experience', ExperienceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
