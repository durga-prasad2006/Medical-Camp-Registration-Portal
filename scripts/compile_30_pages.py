# scripts/compile_30_pages.py
# Compiles the 30-page documentation into HTML, Markdown, and native DOCX with real screenshots embedded.

import os
import sys
import base64
import html
import re
import zipfile

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SCREENSHOTS_DIR = os.path.join(BASE_DIR, "documentation_assets", "screenshots")

HTML_OUT = os.path.join(BASE_DIR, "DOCUMENTATION.html")
MD_OUT = os.path.join(BASE_DIR, "DOCUMENTATION.md")
DOCX_OUT = os.path.join(BASE_DIR, "Medical_Camp_Registration_Portal_Documentation.docx")

# Add scripts directory to sys.path
sys.path.insert(0, os.path.dirname(__file__))

# Import the 30 pages
from define_pages_1_to_15 import P1_15
from define_pages_16_to_30 import P16_30

ALL_PAGES = P1_15 + P16_30
print(f"Loaded {len(ALL_PAGES)} pages (P1_15: {len(P1_15)}, P16_30: {len(P16_30)})")
assert len(ALL_PAGES) == 30, f"Expected exactly 30 pages, got {len(ALL_PAGES)}"

# =========================================================================
# 1. BUILD DOCUMENTATION.HTML (Print-Ready, Self-Contained 30-Page Layout)
# =========================================================================
print("Generating DOCUMENTATION.html...")

html_header = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Medical Camp Registration Portal - 30-Page Technical Documentation</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: #0f172a;
            color: #1e293b;
            line-height: 1.5;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }

        /* Top sticky print navigation bar (screen only) */
        .no-print-bar {
            position: sticky;
            top: 0;
            z-index: 1000;
            background: #1e293b;
            color: #f8fafc;
            padding: 12px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
            border-bottom: 2px solid #0d9488;
        }

        .no-print-bar .title-bar {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .no-print-bar .btn-print {
            background: #0d9488;
            color: #ffffff;
            border: none;
            padding: 9px 20px;
            font-size: 13.5px;
            font-weight: 700;
            border-radius: 8px;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(13, 148, 136, 0.4);
            transition: all 0.2s;
        }

        .no-print-bar .btn-print:hover {
            background: #0f766e;
            transform: translateY(-1px);
        }

        .doc-container {
            max-width: 850px;
            margin: 28px auto;
            padding: 0;
        }

        /* Each individual A4 page */
        .page {
            background: #ffffff;
            width: 100%;
            min-height: 1120px;
            margin-bottom: 28px;
            padding: 38px 46px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1.5px solid #e2e8f0;
            padding-bottom: 8px;
            margin-bottom: 16px;
            font-size: 10.5px;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .page-header .brand {
            color: #0d9488;
        }

        .page-body {
            flex-grow: 1;
        }

        .page-title {
            font-size: 18px;
            font-weight: 900;
            color: #0f172a;
            margin-bottom: 3px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .page-subtitle {
            font-size: 12px;
            font-weight: 600;
            color: #64748b;
            margin-bottom: 14px;
        }

        .page-footer {
            border-top: 1.5px solid #e2e8f0;
            padding-top: 8px;
            margin-top: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 10.5px;
            font-weight: 600;
            color: #94a3b8;
        }

        .page-footer .page-number {
            font-weight: 800;
            color: #0d9488;
            background: #f0fdfa;
            padding: 2px 8px;
            border-radius: 4px;
            border: 1px solid #ccfbf1;
        }

        table {
            border-collapse: collapse;
        }

        code {
            font-family: 'JetBrains Mono', monospace;
        }

        /* Print media styling */
        @media print {
            @page {
                size: A4 portrait;
                margin: 10mm 14mm 10mm 14mm;
            }

            body {
                background: #ffffff;
                color: #000000;
            }

            .no-print-bar {
                display: none !important;
            }

            .doc-container {
                max-width: 100%;
                margin: 0;
            }

            .page {
                box-shadow: none;
                border-radius: 0;
                margin: 0;
                padding: 0;
                min-height: 275mm;
                max-height: 275mm;
                page-break-after: always;
                break-after: page;
            }
        }
    </style>
</head>
<body>

<div class="no-print-bar">
    <div class="title-bar">
        <strong style="color: #2dd4bf; font-size: 15px;">Medical Camp Registration Portal &bull; 30-Page Technical Project Documentation</strong>
        <span style="font-size: 12px; color: #94a3b8;">(MERN Stack Mini Project &bull; Exact 30 Pages)</span>
    </div>
    <div>
        <button class="btn-print" onclick="window.print()">🖨️ Print / Save as PDF (Ctrl + P)</button>
    </div>
</div>

<div class="doc-container">
"""

html_pages_content = []
for p in ALL_PAGES:
    p_num = p["page_num"]
    p_title = p["title"]
    p_sub = p["subtitle"]
    p_chap = p["chapter"]
    p_content = p["content_html"]

    page_block = f"""
    <div class="page" id="page-{p_num}">
        <div class="page-header">
            <span class="brand">Medical Camp Registration Portal &bull; SIH 2025</span>
            <span>{p_chap}</span>
        </div>
        <div class="page-body">
            <h2 class="page-title">{p_title}</h2>
            <div class="page-subtitle">{p_sub}</div>
            {p_content}
        </div>
        <div class="page-footer">
            <span>MERN Stack Mini Project &bull; Academic Session 2026</span>
            <span class="page-number">Page {p_num} of 30</span>
        </div>
    </div>
    """
    html_pages_content.append(page_block)

html_footer = """
</div>

</body>
</html>
"""

full_html = html_header + "\n".join(html_pages_content) + html_footer
with open(HTML_OUT, "w", encoding="utf-8") as f:
    f.write(full_html)
print(f"Generated DOCUMENTATION.html -> {HTML_OUT} ({len(full_html)} bytes)")


# =========================================================================
# 2. BUILD DOCUMENTATION.MD (GitHub Flavored Markdown Format)
# =========================================================================
print("Generating DOCUMENTATION.md...")

def html_to_markdown(html_snippet):
    text = html_snippet
    # Headings
    text = re.sub(r'<h1[^>]*>(.*?)</h1>', r'# \1\n\n', text, flags=re.DOTALL)
    text = re.sub(r'<h2[^>]*>(.*?)</h2>', r'## \1\n\n', text, flags=re.DOTALL)
    text = re.sub(r'<h3[^>]*>(.*?)</h3>', r'### \1\n\n', text, flags=re.DOTALL)
    text = re.sub(r'<h4[^>]*>(.*?)</h4>', r'#### \1\n\n', text, flags=re.DOTALL)

    # Tables
    def table_repl(match):
        t_content = match.group(0)
        rows = re.findall(r'<tr[^>]*>(.*?)</tr>', t_content, flags=re.DOTALL)
        md_table = []
        is_first = True
        for row in rows:
            cells = re.findall(r'<t[hd][^>]*>(.*?)</t[hd]>', row, flags=re.DOTALL)
            clean_cells = [re.sub(r'<[^>]+>', '', c).strip().replace('\n', ' ') for c in cells]
            if clean_cells:
                md_table.append("| " + " | ".join(clean_cells) + " |")
                if is_first:
                    md_table.append("| " + " | ".join(["---"] * len(clean_cells)) + " |")
                    is_first = False
        return "\n" + "\n".join(md_table) + "\n\n"

    text = re.sub(r'<table[^>]*>.*?</table>', table_repl, text, flags=re.DOTALL)

    # Lists
    text = re.sub(r'<li[^>]*>(.*?)</li>', r'- \1\n', text, flags=re.DOTALL)
    text = re.sub(r'<ul[^>]*>', r'\n', text, flags=re.DOTALL)
    text = re.sub(r'</ul>', r'\n', text, flags=re.DOTALL)
    text = re.sub(r'<ol[^>]*>', r'\n', text, flags=re.DOTALL)
    text = re.sub(r'</ol>', r'\n', text, flags=re.DOTALL)

    # Inline tags
    text = re.sub(r'<p[^>]*>(.*?)</p>', r'\1\n\n', text, flags=re.DOTALL)
    text = re.sub(r'<br\s*/?>', r'\n', text)
    text = re.sub(r'<strong[^>]*>(.*?)</strong>', r'**\1**', text, flags=re.DOTALL)
    text = re.sub(r'<em[^>]*>(.*?)</em>', r'*\1*', text, flags=re.DOTALL)
    text = re.sub(r'<code[^>]*>(.*?)</code>', r'`\1`', text, flags=re.DOTALL)

    # Images - replace data URIs with markdown placeholder
    text = re.sub(r'<img[^>]*alt="([^"]*)"[^>]*>', r'**[Screenshot: \1]**\n\n', text)

    # Strip remaining tags
    text = re.sub(r'<[^>]+>', '', text)
    text = html.unescape(text)
    text = re.sub(r'\n{3,}', '\n\n', text).strip()
    return text

md_pages = []
for p in ALL_PAGES:
    p_num = p["page_num"]
    p_title = p["title"]
    p_sub = p["subtitle"]
    p_chap = p["chapter"]
    clean_body = html_to_markdown(p["content_html"])

    md_page = f"""
<!-- ========================================================================= -->
<!-- PAGE {p_num} OF 30 | {p_chap} -->
<!-- ========================================================================= -->

## Page {p_num}: {p_title}
*{p_sub}*  
*Chapter: {p_chap}*

{clean_body}

---
*Medical Camp Registration Portal &bull; Page {p_num} of 30*
"""
    md_pages.append(md_page.strip())

full_md = f"""# Medical Camp Registration Portal - 30-Page Technical Documentation
> **Comprehensive 30-Page Technical Project Report**  
> **Inspired by Smart India Hackathon (SIH 2025) – Healthcare & Medical Camp Management**  
> **Student Developer:** Durga Prasad (`durga-prasad2006`)  
> **GitHub Repository:** https://github.com/durga-prasad2006/Medical-Camp-Registration-Portal  
> **Official Live Production URL:** https://medical-camp-registration-portal-tawny.vercel.app/  

{"\n\n" + ("=" * 80) + "\n\n".join(md_pages)}

<!-- FINAL PRODUCTION URL REQUIREMENT -->
# Official Project Deployment & Verification Links
- **Live Vercel Application:** https://medical-camp-registration-portal-tawny.vercel.app/
- **GitHub Repository:** https://github.com/durga-prasad2006/Medical-Camp-Registration-Portal
"""

with open(MD_OUT, "w", encoding="utf-8") as f:
    f.write(full_md)
print(f"Generated DOCUMENTATION.md -> {MD_OUT} ({len(full_md)} bytes)")


# =========================================================================
# 3. BUILD WORD DOCUMENT (DOCX) WITH NATIVE EMBEDDED SCREENSHOTS
# =========================================================================
print("Generating Medical_Camp_Registration_Portal_Documentation.docx...")

# Map of screenshots to embed in docx
screenshot_files = [
    ("img_home", "01_home.png", "Figure 9.1: Home Landing Page"),
    ("img_camps", "02_camps.png", "Figure 9.2: Medical Camps Directory"),
    ("img_login", "03_login.png", "Figure 9.3: Login Page"),
    ("img_register", "04_register.png", "Figure 9.4: Registration Page"),
    ("img_participant", "05_participant_dashboard.png", "Figure 9.5: Participant Dashboard"),
    ("img_my_regs", "06_my_registrations.png", "Figure 9.6: My Registrations"),
    ("img_profile", "07_profile.png", "Figure 9.7: User Health Profile"),
    ("img_admin_dash", "08_admin_dashboard.png", "Figure 9.8: Admin Dashboard"),
    ("img_manage_camps", "09_manage_camps.png", "Figure 9.9: Manage Camps"),
    ("img_doctor_dash", "10_doctor_dashboard.png", "Figure 9.10: Doctor Dashboard")
]

# Read binary images
img_binaries = {}
for var_name, fname, cap in screenshot_files:
    fpath = os.path.join(SCREENSHOTS_DIR, fname)
    if os.path.exists(fpath):
        with open(fpath, "rb") as f:
            img_binaries[fname] = f.read()

# Build Content_Types.xml
content_types = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Default Extension="png" ContentType="image/png"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>"""

rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>"""

# Relationships for images in word/_rels/document.xml.rels
doc_rels_items = [
    '<Relationship Id="rIdStyles" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>'
]

# rId mapping
img_rids = {}
for i, (var_name, fname, cap) in enumerate(screenshot_files, start=1):
    rid = f"rIdImg{i}"
    img_rids[fname] = rid
    doc_rels_items.append(
        f'<Relationship Id="{rid}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/{fname}"/>'
    )

doc_rels = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  {"".join(doc_rels_items)}
</Relationships>"""

styles_xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
        <w:sz w:val="23"/>
        <w:color w:val="1E293B"/>
      </w:rPr>
    </w:rPrDefault>
  </w:docDefaults>
</w:styles>"""

# Function to generate an OpenXML drawing element for an image
def generate_image_xml(fname, caption, doc_pr_id, cx=5486400, cy=2800000):
    rid = img_rids.get(fname)
    if not rid:
        return ""
    
    xml = f"""
    <w:p>
      <w:pPr>
        <w:jc w:val="center"/>
        <w:spacing w:before="120" w:after="60"/>
      </w:pPr>
      <w:r>
        <w:drawing>
          <wp:inline distT="0" distB="0" distL="0" distR="0" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing">
            <wp:extent cx="{cx}" cy="{cy}"/>
            <wp:effectExtent l="0" t="0" r="0" b="0"/>
            <wp:docPr id="{doc_pr_id}" name="{html.escape(fname)}"/>
            <wp:cNvGraphicFramePr>
              <a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/>
            </wp:cNvGraphicFramePr>
            <a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
              <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
                <pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
                  <pic:nvPicPr>
                    <pic:cNvPr id="{doc_pr_id}" name="{html.escape(fname)}"/>
                    <pic:cNvPicPr/>
                  </pic:nvPicPr>
                  <pic:blipFill>
                    <a:blip r:embed="{rid}" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"/>
                    <a:stretch>
                      <a:fillRect/>
                    </a:stretch>
                  </pic:blipFill>
                  <pic:spPr>
                    <a:xfrm>
                      <a:off x="0" y="0"/>
                      <a:ext cx="{cx}" cy="{cy}"/>
                    </a:xfrm>
                    <a:prstGeom prst="rect">
                      <a:avLst/>
                    </a:prstGeom>
                  </pic:spPr>
                </pic:pic>
              </a:graphicData>
            </a:graphic>
          </wp:inline>
        </w:drawing>
      </w:r>
    </w:p>
    <w:p>
      <w:pPr>
        <w:jc w:val="center"/>
        <w:spacing w:before="30" w:after="160"/>
      </w:pPr>
      <w:r>
        <w:rPr><w:i/><w:b/><w:sz w:val="18"/><w:color w:val="64748B"/></w:rPr>
        <w:t>{html.escape(caption)}</w:t>
      </w:r>
    </w:p>
    """
    return xml

# Build document.xml paragraphs
doc_body = []
drawing_counter = 100

for i, p in enumerate(ALL_PAGES):
    p_num = p["page_num"]
    p_title = p["title"]
    p_sub = p["subtitle"]
    p_chap = p["chapter"]
    
    # Running Page Header in body
    doc_body.append(f"""
    <w:p>
      <w:pPr><w:jc w:val="right"/><w:spacing w:before="0" w:after="100"/></w:pPr>
      <w:r><w:rPr><w:color w:val="0D9488"/><w:b/><w:sz w:val="16"/></w:rPr><w:t>MEDICAL CAMP REGISTRATION PORTAL &bull; {p_chap} (PAGE {p_num} OF 30)</w:t></w:r>
    </w:p>
    """)

    # Title
    doc_body.append(f"""
    <w:p>
      <w:pPr><w:spacing w:before="100" w:after="60"/></w:pPr>
      <w:r><w:rPr><w:color w:val="0F172A"/><w:b/><w:sz w:val="30"/></w:rPr><w:t>{html.escape(p_title)}</w:t></w:r>
    </w:p>
    """)

    # Subtitle
    doc_body.append(f"""
    <w:p>
      <w:pPr><w:spacing w:before="0" w:after="140"/></w:pPr>
      <w:r><w:rPr><w:color w:val="475569"/><w:i/><w:sz w:val="21"/></w:rPr><w:t>{html.escape(p_sub)}</w:t></w:r>
    </w:p>
    """)

    # Check if this page has screenshots to insert
    if p_num == 20:
        drawing_counter += 1
        doc_body.append(generate_image_xml("01_home.png", "Figure 9.1: Home Landing Page (Hero section & quick statistics)", drawing_counter, 5200000, 2400000))
        drawing_counter += 1
        doc_body.append(generate_image_xml("02_camps.png", "Figure 9.2: Medical Camps Directory (Search filtering & remaining quota badges)", drawing_counter, 5200000, 2400000))
    elif p_num == 21:
        drawing_counter += 1
        doc_body.append(generate_image_xml("03_login.png", "Figure 9.3: Login Page (Credential inputs & role routing)", drawing_counter, 5200000, 2400000))
        drawing_counter += 1
        doc_body.append(generate_image_xml("04_register.png", "Figure 9.4: Registration Page (Participant vs. Doctor role selector)", drawing_counter, 5200000, 2400000))
    elif p_num == 22:
        drawing_counter += 1
        doc_body.append(generate_image_xml("05_participant_dashboard.png", "Figure 9.5: Participant Dashboard (Appointment summary & tokens)", drawing_counter, 5200000, 2400000))
        drawing_counter += 1
        doc_body.append(generate_image_xml("06_my_registrations.png", "Figure 9.6: My Registrations (Confirmed bookings & printable passes)", drawing_counter, 5200000, 2400000))
    elif p_num == 23:
        drawing_counter += 1
        doc_body.append(generate_image_xml("07_profile.png", "Figure 9.7: User Health Profile (Live persistence of blood group, emergency contact & address)", drawing_counter, 5200000, 2600000))
    elif p_num == 24:
        drawing_counter += 1
        doc_body.append(generate_image_xml("08_admin_dashboard.png", "Figure 9.8: Admin Dashboard (System metrics & attendee roster)", drawing_counter, 5200000, 1800000))
        drawing_counter += 1
        doc_body.append(generate_image_xml("09_manage_camps.png", "Figure 9.9: Manage Camps (Camp creation with verified doctor dropdown)", drawing_counter, 5200000, 1800000))
        drawing_counter += 1
        doc_body.append(generate_image_xml("10_doctor_dashboard.png", "Figure 9.10: Doctor Dashboard (Assigned camps & patient checkup roster)", drawing_counter, 5200000, 1800000))

    # Add text paragraphs
    clean_text = html_to_markdown(p["content_html"])
    paragraphs = clean_text.split("\n\n")
    for para in paragraphs:
        para = para.strip()
        if not para:
            continue
        if para.startswith("**[Screenshot:"):
            continue # Already handled via native drawings
        
        # Check if heading
        if para.startswith("#"):
            h_text = para.lstrip("#").strip()
            doc_body.append(f"""
            <w:p>
              <w:pPr><w:spacing w:before="160" w:after="70"/></w:pPr>
              <w:r><w:rPr><w:b/><w:sz w:val="24"/><w:color w:val="0D9488"/></w:rPr><w:t>{html.escape(h_text)}</w:t></w:r>
            </w:p>
            """)
        else:
            lines = para.split("\n")
            doc_p_runs = []
            for line in lines:
                line_esc = html.escape(line.strip())
                doc_p_runs.append(f"<w:r><w:t>{line_esc}</w:t></w:r>")
            
            doc_body.append(f"""
            <w:p>
              <w:pPr><w:spacing w:before="50" w:after="100"/></w:pPr>
              {"<w:r><w:br/></w:r>".join(doc_p_runs)}
            </w:p>
            """)

    # Footer note for current page
    doc_body.append(f"""
    <w:p>
      <w:pPr><w:jc w:val="center"/><w:spacing w:before="120" w:after="60"/></w:pPr>
      <w:r><w:rPr><w:color w:val="94A3B8"/><w:sz w:val="18"/><w:i/></w:rPr><w:t>-- Page {p_num} of 30 --</w:t></w:r>
    </w:p>
    """)

    # Page Break after every page except the last
    if i < len(ALL_PAGES) - 1:
        doc_body.append("""
        <w:p>
          <w:r><w:br w:type="page"/></w:r>
        </w:p>
        """)

document_xml = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
            xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
            xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"
            xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
            xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
  <w:body>
    {"".join(doc_body)}
  </w:body>
</w:document>"""

with zipfile.ZipFile(DOCX_OUT, "w", zipfile.ZIP_DEFLATED) as docx:
    docx.writestr("[Content_Types].xml", content_types)
    docx.writestr("_rels/.rels", rels)
    docx.writestr("word/_rels/document.xml.rels", doc_rels)
    docx.writestr("word/document.xml", document_xml)
    docx.writestr("word/styles.xml", styles_xml)
    
    # Store binary images in word/media/
    for fname, data in img_binaries.items():
        docx.writestr(f"word/media/{fname}", data)

print(f"Generated DOCX -> {DOCX_OUT} ({os.path.getsize(DOCX_OUT)} bytes)")
print("ALL 3 DOCUMENTATION ARTIFACTS GENERATED SUCCESSFULLY!")
