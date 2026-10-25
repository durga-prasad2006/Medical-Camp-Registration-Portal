# scripts/build_all_documents.py
import os
import sys
import zipfile
import re
import html

# Import the 3 parts
from pages_part1 import PAGES_PART1
from pages_part2 import PAGES_PART2
from pages_part3 import PAGES_PART3

ALL_PAGES = PAGES_PART1 + PAGES_PART2 + PAGES_PART3

print(f"Total pages loaded: {len(ALL_PAGES)}")
assert len(ALL_PAGES) == 30, f"Expected exactly 30 pages, got {len(ALL_PAGES)}"

OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
HTML_OUT = os.path.join(OUTPUT_DIR, "DOCUMENTATION.html")
MD_OUT = os.path.join(OUTPUT_DIR, "DOCUMENTATION.md")
DOCX_OUT = os.path.join(OUTPUT_DIR, "Medical_Camp_Registration_Portal_Documentation.docx")

# =========================================================================
# 1. BUILD DOCUMENTATION.HTML (Print-Ready 30-Page Layout)
# =========================================================================
html_header = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Medical Camp Registration Portal - 30-Page Technical Documentation</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap');

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
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            border-bottom: 2px solid #0d9488;
        }

        .no-print-bar .btn-print {
            background: #0d9488;
            color: #ffffff;
            border: none;
            padding: 8px 18px;
            font-size: 13px;
            font-weight: 700;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.2s;
        }

        .no-print-bar .btn-print:hover {
            background: #0f766e;
        }

        .doc-container {
            max-width: 850px;
            margin: 30px auto;
            padding: 0;
        }

        /* Each individual A4 page */
        .page {
            background: #ffffff;
            width: 100%;
            min-height: 1120px;
            margin-bottom: 30px;
            padding: 40px 48px;
            border-radius: 8px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
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
            margin-bottom: 18px;
            font-size: 11px;
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
            font-size: 12.5px;
            font-weight: 600;
            color: #64748b;
            margin-bottom: 16px;
        }

        .page-footer {
            border-top: 1.5px solid #e2e8f0;
            padding-top: 8px;
            margin-top: 18px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 11px;
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

        /* Print media styling */
        @media print {
            @page {
                size: A4 portrait;
                margin: 12mm 15mm 12mm 15mm;
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
                min-height: 270mm;
                page-break-after: always;
                break-after: page;
            }
        }
    </style>
</head>
<body>

<div class="no-print-bar">
    <div>
        <strong style="color: #2dd4bf; font-size: 15px;">Medical Camp Registration Portal &bull; Full Project Documentation</strong>
        <span style="font-size: 12px; color: #94a3b8; margin-left: 10px;">(Exact 30-Page Academic Standard Format)</span>
    </div>
    <div>
        <button class="btn-print" onclick="window.print()">Print / Save as PDF (Ctrl + P)</button>
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
print(f"Generated DOCUMENTATION.html -> {HTML_OUT}")


# =========================================================================
# 2. BUILD DOCUMENTATION.MD (GitHub Flavored Markdown Format)
# =========================================================================
def html_to_markdown(html_snippet):
    # Lightweight clean markdown converter for tags
    text = html_snippet
    # Replace headers
    text = re.sub(r'<h1[^>]*>(.*?)</h1>', r'# \1\n\n', text, flags=re.DOTALL)
    text = re.sub(r'<h2[^>]*>(.*?)</h2>', r'## \1\n\n', text, flags=re.DOTALL)
    text = re.sub(r'<h3[^>]*>(.*?)</h3>', r'### \1\n\n', text, flags=re.DOTALL)
    text = re.sub(r'<h4[^>]*>(.*?)</h4>', r'#### \1\n\n', text, flags=re.DOTALL)
    
    # Replace tables
    # Find table blocks
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
    
    # Replace list items
    text = re.sub(r'<li[^>]*>(.*?)</li>', r'- \1\n', text, flags=re.DOTALL)
    text = re.sub(r'<ul[^>]*>', r'\n', text, flags=re.DOTALL)
    text = re.sub(r'</ul>', r'\n', text, flags=re.DOTALL)
    text = re.sub(r'<ol[^>]*>', r'\n', text, flags=re.DOTALL)
    text = re.sub(r'</ol>', r'\n', text, flags=re.DOTALL)

    # Paragraphs and breaks
    text = re.sub(r'<p[^>]*>(.*?)</p>', r'\1\n\n', text, flags=re.DOTALL)
    text = re.sub(r'<br\s*/?>', r'\n', text)
    text = re.sub(r'<strong[^>]*>(.*?)</strong>', r'**\1**', text, flags=re.DOTALL)
    text = re.sub(r'<em[^>]*>(.*?)</em>', r'*\1*', text, flags=re.DOTALL)
    text = re.sub(r'<code[^>]*>(.*?)</code>', r'`\1`', text, flags=re.DOTALL)
    
    # Strip remaining tags
    text = re.sub(r'<[^>]+>', '', text)
    text = html.unescape(text)
    # Clean redundant blank lines
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

# {p_title}
### {p_sub}
*Chapter: {p_chap} &bull; Page {p_num} of 30*

{clean_body}

---
*Medical Camp Registration Portal &bull; Page {p_num} of 30*
"""
    md_pages.append(md_page.strip())

full_md = f"""# Medical Camp Registration Portal - Full Technical Project Documentation
> **Comprehensive 30-Page Technical Project Report**  
> **Inspired by Smart India Hackathon (SIH 2025) – Healthcare & Medical Camp Management**  
> **Author:** Durga Prasad (`durga-prasad2006`)  
> **Production Live URL:** https://medical-camp-registration-portal-tawny.vercel.app/  

{"\n\n" + ("=" * 80) + "\n\n".join(md_pages)}

<!-- FINAL PRODUCTION URL REQUIREMENT -->
# Official Live Project Deployment
- **Live Vercel Application:** https://medical-camp-registration-portal-tawny.vercel.app/
- **GitHub Repository:** https://github.com/durga-prasad2006/Medical-Camp-Registration-Portal
"""

with open(MD_OUT, "w", encoding="utf-8") as f:
    f.write(full_md)
print(f"Generated DOCUMENTATION.md -> {MD_OUT}")


# =========================================================================
# 3. BUILD WORD DOCUMENT (DOCX)
# =========================================================================
def generate_docx(all_pages, docx_path):
    # Minimal standard OpenXML files
    content_types = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>"""

    rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>"""

    doc_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>"""

    styles_xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
        <w:sz w:val="24"/>
        <w:color w:val="1E293B"/>
      </w:rPr>
    </w:rPrDefault>
  </w:docDefaults>
</w:styles>"""

    # Build document.xml paragraphs
    doc_body = []
    for i, p in enumerate(all_pages):
        p_num = p["page_num"]
        p_title = p["title"]
        p_sub = p["subtitle"]
        p_chap = p["chapter"]
        clean_text = html_to_markdown(p["content_html"])

        # Page Header Banner
        doc_body.append(f"""
        <w:p>
          <w:pPr><w:jc w:val="right"/></w:pPr>
          <w:r><w:rPr><w:color w:val="0D9488"/><w:b/><w:sz w:val="18"/></w:rPr><w:t>MEDICAL CAMP REGISTRATION PORTAL &bull; {p_chap} (PAGE {p_num} OF 30)</w:t></w:r>
        </w:p>
        """)

        # Title
        doc_body.append(f"""
        <w:p>
          <w:pPr><w:spacing w:before="120" w:after="60"/></w:pPr>
          <w:r><w:rPr><w:color w:val="0F172A"/><w:b/><w:sz w:val="32"/></w:rPr><w:t>{html.escape(p_title)}</w:t></w:r>
        </w:p>
        """)

        # Subtitle
        doc_body.append(f"""
        <w:p>
          <w:pPr><w:spacing w:before="0" w:after="160"/></w:pPr>
          <w:r><w:rPr><w:color w:val="475569"/><w:i/><w:sz w:val="22"/></w:rPr><w:t>{html.escape(p_sub)}</w:t></w:r>
        </w:p>
        """)

        # Paragraphs from clean_text
        paragraphs = clean_text.split("\n\n")
        for para in paragraphs:
            para = para.strip()
            if not para:
                continue
            
            # Check if list item or heading
            if para.startswith("#"):
                heading_level = para.count("#")
                h_text = para.lstrip("#").strip()
                doc_body.append(f"""
                <w:p>
                  <w:pPr><w:spacing w:before="180" w:after="80"/></w:pPr>
                  <w:r><w:rPr><w:b/><w:sz w:val="26"/><w:color w:val="0D9488"/></w:rPr><w:t>{html.escape(h_text)}</w:t></w:r>
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
                  <w:pPr><w:spacing w:before="60" w:after="120"/></w:pPr>
                  {"<w:r><w:br/></w:r>".join(doc_p_runs)}
                </w:p>
                """)

        # Page Break after every page except the last
        if i < len(all_pages) - 1:
            doc_body.append("""
            <w:p>
              <w:r><w:br w:type="page"/></w:r>
            </w:p>
            """)

    document_xml = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    {"".join(doc_body)}
  </w:body>
</w:document>"""

    with zipfile.ZipFile(docx_path, "w", zipfile.ZIP_DEFLATED) as docx:
        docx.writestr("[Content_Types].xml", content_types)
        docx.writestr("_rels/.rels", rels)
        docx.writestr("word/_rels/document.xml.rels", doc_rels)
        docx.writestr("word/document.xml", document_xml)
        docx.writestr("word/styles.xml", styles_xml)
    print(f"Generated DOCX -> {docx_path}")

generate_docx(ALL_PAGES, DOCX_OUT)
print("All 3 documentation formats generated successfully!")
