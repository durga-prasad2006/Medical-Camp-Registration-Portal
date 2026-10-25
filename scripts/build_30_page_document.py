# scripts/build_30_page_document.py
import os
import sys
import zipfile
import base64
import html
import re

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SCREENSHOTS_DIR = os.path.join(BASE_DIR, "documentation_assets", "screenshots")

DOCX_OUT = os.path.join(BASE_DIR, "Medical_Camp_Registration_Portal_Documentation.docx")
HTML_OUT = os.path.join(BASE_DIR, "DOCUMENTATION.html")
MD_OUT = os.path.join(BASE_DIR, "DOCUMENTATION.md")

# Load screenshots as base64 for self-contained HTML
def get_b64(filename):
    p = os.path.join(SCREENSHOTS_DIR, filename)
    if os.path.exists(p):
        with open(p, "rb") as f:
            return "data:image/png;base64," + base64.b64encode(f.read()).decode("utf-8")
    return ""

img_home = get_b64("01_home.png")
img_camps = get_b64("02_camps.png")
img_login = get_b64("03_login.png")
img_register = get_b64("04_register.png")
img_participant = get_b64("05_participant_dashboard.png")
img_my_regs = get_b64("06_my_registrations.png")
img_profile = get_b64("07_profile.png")
img_admin_dash = get_b64("08_admin_dashboard.png")
img_manage_camps = get_b64("09_manage_camps.png")
img_doctor_dash = get_b64("10_doctor_dashboard.png")

print(f"Loaded screenshots: Home ({bool(img_home)}), Camps ({bool(img_camps)}), Profile ({bool(img_profile)}), Admin ({bool(img_admin_dash)})")
