# scripts/capture_screens.py
import subprocess
import os

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
base_dir = r"E:\Medical Camp Registration"
out_dir = os.path.join(base_dir, "documentation_assets", "screenshots")
os.makedirs(out_dir, exist_ok=True)

targets = [
    ("01_home.png", "http://localhost:3000/"),
    ("02_camps.png", "http://localhost:3000/camps"),
    ("03_login.png", "http://localhost:3000/login"),
    ("04_register.png", "http://localhost:3000/register"),
    ("05_participant_dashboard.png", "http://localhost:3000/participant?demo=participant"),
    ("06_my_registrations.png", "http://localhost:3000/my-registrations?demo=participant"),
    ("07_profile.png", "http://localhost:3000/profile?demo=participant"),
    ("08_admin_dashboard.png", "http://localhost:3000/admin?demo=admin"),
    ("09_manage_camps.png", "http://localhost:3000/admin/camps?demo=admin"),
    ("10_doctor_dashboard.png", "http://localhost:3000/doctor?demo=doctor")
]

for i, (filename, url) in enumerate(targets):
    target_path = os.path.join(out_dir, filename)
    temp_profile = os.path.join(base_dir, f"temp_profile_{i}")
    cmd = [
        chrome_path,
        "--headless=new",
        f"--user-data-dir={temp_profile}",
        "--window-size=1280,800",
        f"--screenshot={target_path}",
        url
    ]
    print(f"[{i+1}/{len(targets)}] Capturing {filename}...")
    try:
        subprocess.run(cmd, check=True, timeout=12)
        if os.path.exists(target_path):
            print(f"  -> SUCCESS ({os.path.getsize(target_path)} bytes)")
        else:
            print("  -> File not found.")
    except Exception as e:
        print(f"  -> Error: {e}")

print("All screenshots capture completed!")
