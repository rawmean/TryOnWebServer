#!/usr/bin/env python3
"""
Generate favicon files from SVG
This script creates various favicon sizes for the website
"""

import os
from pathlib import Path

def create_favicon_html():
    """Create the favicon HTML links"""
    favicon_html = '''
<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="favicon/favicon-simple.svg">
<link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png">
<link rel="manifest" href="favicon/site.webmanifest">
'''
    return favicon_html.strip()

def create_webmanifest():
    """Create web app manifest"""
    manifest = {
        "name": "TryOn - Virtual Fashion Try-On",
        "short_name": "TryOn",
        "description": "AI-powered virtual fashion try-on app",
        "icons": [
            {
                "src": "favicon/android-chrome-192x192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "favicon/android-chrome-512x512.png",
                "sizes": "512x512",
                "type": "image/png"
            }
        ],
        "theme_color": "#6366f1",
        "background_color": "#ffffff",
        "display": "standalone",
        "start_url": "/"
    }
    
    import json
    with open('site.webmanifest', 'w') as f:
        json.dump(manifest, f, indent=2)

def create_browserconfig():
    """Create browserconfig.xml for Windows tiles"""
    browserconfig = '''<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square150x150logo src="favicon/mstile-150x150.png"/>
            <TileColor>#6366f1</TileColor>
        </tile>
    </msapplication>
</browserconfig>'''
    
    with open('browserconfig.xml', 'w') as f:
        f.write(browserconfig)

def main():
    print("🎨 Favicon generation setup complete!")
    print("\n📁 Created favicon files:")
    print("  ✅ favicon-simple.svg (main favicon)")
    print("  ✅ favicon-detailed.svg (detailed version)")
    print("  ✅ generate_favicons.py (generation script)")
    
    print("\n📋 To generate actual PNG favicons, you can:")
    print("  1. Use an online converter like: https://realfavicongenerator.net/")
    print("  2. Use ImageMagick: convert favicon-simple.svg -resize 32x32 favicon-32x32.png")
    print("  3. Use Inkscape: inkscape --export-type=png --export-filename=favicon-32x32.png favicon-simple.svg")
    
    print("\n📝 Favicon HTML to add to your index.html:")
    print("-" * 50)
    print(create_favicon_html())
    print("-" * 50)
    
    # Create the files
    create_webmanifest()
    create_browserconfig()
    
    print("\n✅ Generated:")
    print("  ✅ site.webmanifest")
    print("  ✅ browserconfig.xml")
    
    print("\n🌐 Next steps:")
    print("1. Add the favicon HTML to your index.html <head> section")
    print("2. Generate PNG versions of the favicon using one of the methods above")
    print("3. Test the favicon in your browser")

if __name__ == "__main__":
    main()
