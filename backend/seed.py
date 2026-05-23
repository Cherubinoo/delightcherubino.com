import os
import django
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from portfolio.models import Profile, Project, Skill, Experience

def seed_data():
    # Profile
    Profile.objects.update_or_create(
        name="Delight Cherubino",
        defaults={
            "role": "Artificial Intelligence and Data Science student at Ramco Institute of Technology",
            "bio": "I’m Delight Cherubino, an Artificial Intelligence and Data Science student at Ramco Institute of Technology, with a strong focus on building real-world, scalable AI solutions. I currently serve as the Vice President of the AI & Data Science department, where I actively contribute to technical initiatives, student development, and collaborative innovation.\n\nMy core interest lies in transforming theoretical concepts into practical systems. I don’t just focus on learning algorithms — I focus on how they can be applied effectively in real environments to solve meaningful problems.",
            "vision": "My long-term goal is to build impactful technology solutions that solve real problems at scale. I aim to contribute to the development of intelligent systems that make processes smarter, faster, and more efficient.",
            "approach": "I believe in:\n* Building solutions that are practical and usable\n* Focusing on real-world impact over theoretical perfection\n* Learning by building and experimenting\n* Continuously improving systems through iteration and feedback",
            "leadership": "As Vice President of my department, I actively:\n* Lead and coordinate technical initiatives\n* Work closely with teams on project development\n* Encourage collaborative problem-solving\n* Help create opportunities for students to build and innovate",
            "current_focus": "Right now, I am focused on:\n* Building scalable AI-driven platforms\n* Developing student-centric tools and applications\n* Improving real-time system performance\n* Exploring advanced system design and architecture",
            "resume": "resumes/delight_resume.pdf",
        }
    )

    # Skills
    skills = [
        ("Python", "Backend"),
        ("Computer Vision (YOLOv8)", "AI"),
        ("Machine Learning", "AI"),
        ("FastAPI", "Backend"),
        ("OCR", "AI"),
        ("Frontend Development", "Web"),
        ("Real-time data systems", "System Design"),
    ]
    for name, cat in skills:
        Skill.objects.update_or_create(name=name, defaults={"category": cat, "proficiency": 90})

    # Experience
    experiences = [
        {
            "title": "Vice President – AI & Data Science Department",
            "company": "Ramco Institute of Technology",
            "duration": "Aug 2025 – Present",
            "description": "• Leading technical initiatives and coordinating activities within the AI & Data Science department\n• Mentoring students in project development, AI concepts, and implementation strategies\n• Organizing workshops, technical events, and collaborative sessions\n• Driving innovation by encouraging real-world problem-solving among peers\n• Managing team coordination and ensuring smooth execution of departmental activities",
            "is_academic": False
        },
        {
            "title": "AI & ML Lead",
            "company": "Google Developer Groups on Campus - RIT",
            "duration": "Oct 2025 – Present",
            "description": "Leading AI & ML initiatives, organizing technical sessions, and building a community of developers on campus.",
            "is_academic": False
        },
        {
            "title": "Intern",
            "company": "The Ramco Cements Limited",
            "duration": "May 2024 – Aug 2024",
            "description": "• Developed human detection project using AI with Python and libraries.\n• Contributed to data cleaning process in water analysis project.\n• Assisted in setting up a system to track water extraction and consumption.",
            "is_academic": False
        },
        {
            "title": "Project Intern",
            "company": "Igress Solutions LLP",
            "duration": "Nov 2023 – Dec 2023",
            "description": "• Collaborated with team members to analyze AWS data.\n• Assisted in project management tasks.\n• Implemented data visualization techniques.",
            "is_academic": False
        },
        {
            "title": "AI Developer",
            "company": "Independent / Academic Projects",
            "duration": "Ongoing",
            "description": "• Designed and developed multiple AI-based systems focused on real-world applications.\n• Built computer vision solutions using YOLOv8.\n• Developed backend systems using FastAPI.\n• Implemented OCR-based document extraction pipelines.",
            "is_academic": True
        }
    ]
    for exp in experiences:
        Experience.objects.update_or_create(title=exp["title"], company=exp["company"], defaults=exp)

    # Projects
    projects = [
        {
            "title": "Safety Gear Monitoring",
            "company": "The Ramco Cements Limited",
            "category": "work",
            "award_name": "1st Prize - INNOVANZA 2025 Hackathon",
            "award_link": "https://www.linkedin.com/posts/delight-cherubino-bb8456291_hackathon-ai-ml-activity-7371875149031198721-Cx8f?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEa5RDwBJ2shQyWaFIE2i-f0abEUDTNFY_Y",
            "description": "Awarded 1st Prize at INNOVANZA 2025 Hackathon! This project is a comprehensive CV + ML + Microcontroller Industry Safety System designed for real-time monitoring and hazard prevention. Developed in collaboration with Subbhra Yashwanth kanth P, it features YOLOv8-powered object detection integrated with industrial hardware for instant safety compliance alerts.",
            "tech_stack": ["Python", "YOLOv8", "OpenCV", "Microcontrollers", "ML"],
            "live_link": "https://www.linkedin.com/posts/delight-cherubino-bb8456291_ai-computervision-yolov8-activity-7358112735206821888-AYKt?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEa5RDwBJ2shQyWaFIE2i-f0abEUDTNFY_Y",
            "github_link": "https://github.com/Cherubinoo/kamarajar-college",
            "is_ongoing": False
        },
        {
            "title": "AI Question Generator",
            "company": "Ramco Vidya Mandir School",
            "category": "work",
            "description": "Developed specifically for Ramco Vidya Mandir Senior Secondary School (Ariyalur), this automated tool leverages NLP to generate structured CBSE examination papers from textbook content. The system uses LLM-based text analysis to identify key concepts and generate diverse question types, maintaining high academic standards while reducing administrative workload.",
            "tech_stack": ["FastAPI", "OpenAI API", "React", "PDFMiner"],
            "github_link": "https://github.com/Cherubinoo/CBSE_GENERATION",
            "is_ongoing": False
        },
        {
            "title": "Code2Day",
            "company": "Replica Ecosystem",
            "category": "personal",
            "description": "A collaborative coding platform designed for daily practice and skill building. Part of the Replica ecosystem, Code2Day focuses on providing students with real-world coding challenges and a streamlined environment to showcase their progress.",
            "tech_stack": ["React", "Node.js", "Socket.io", "PostgreSQL"],
            "live_link": "https://code2day.ramcoad.com",
            "github_link": "http://github.com/Cherubinoo/code2day/tree/main",
            "is_ongoing": True
        },
        {
            "title": "Student Project Hosting",
            "company": "Replica Ecosystem",
            "category": "personal",
            "description": "An automated hosting solution specifically designed for student developers. It simplifies the deployment process for web applications and provides a centralized platform for academic projects to be live and accessible.",
            "tech_stack": ["Docker", "Nginx", "Python", "Cloudflare"],
            "is_ongoing": True
        },
        {
            "title": "Document Extraction",
            "company": "Igress Solutions LLP",
            "category": "personal",
            "description": "A sophisticated OCR-based pipeline integrated with language models to extract structured data from unstructured business documents (invoices, forms, receipts). The system handles various document formats and uses post-processing logic to ensure high data accuracy, enabling businesses to automate their data entry workflows seamlessly.",
            "tech_stack": ["FastAPI", "Tesseract", "Transformers", "Python"],
            "is_ongoing": False
        },
        {
            "title": "Sentiment Analysis",
            "company": "Academic Project",
            "category": "personal",
            "description": "A machine learning based sentiment analysis system designed to process and categorize emotional tones in large-scale text data. The project utilizes natural language processing (NLP) techniques to identify positive, negative, and neutral sentiments with high accuracy, enabling automated feedback analysis for businesses and research.",
            "tech_stack": ["Python", "NLTK", "Scikit-learn", "Flask"],
            "is_ongoing": False
        },
        {
            "title": "Cement Bag Detection",
            "company": "The Ramco Cements Limited",
            "category": "work",
            "description": "Developed specifically for industrial logistics, this system automates the counting and detection of cement bags on conveyor belts and in warehouses. Using a custom-trained YOLOv8 model, it achieves high precision even in dusty and low-light environments, significantly improving inventory accuracy and reducing manual labor requirements.",
            "tech_stack": ["Python", "YOLOv8", "OpenCV", "FastAPI"],
            "is_ongoing": False
        }
    ]
    for p in projects:
        Project.objects.update_or_create(title=p["title"], defaults=p)

    print("Data seeded successfully!")

if __name__ == "__main__":
    seed_data()
