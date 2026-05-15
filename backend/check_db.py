import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from portfolio.models import Project

print("--- PROJECTS IN DATABASE ---")
for p in Project.objects.all():
    print(f"Title: {p.title}")
    print(f"Category: {p.category}")
    print(f"Company: {p.company}")
    print(f"Live Link: {p.live_link}")
    print(f"GitHub: {p.github_link}")
    print("-" * 20)
