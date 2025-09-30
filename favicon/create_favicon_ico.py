#!/usr/bin/env python3
"""
Create favicon.ico file from PNG
"""

try:
    from PIL import Image
    import os
    
    def create_favicon_ico():
        """Create favicon.ico from the 32x32 PNG"""
        try:
            # Open the 32x32 PNG favicon
            img = Image.open('favicon-32x32.png')
            
            # Convert to ICO format
            img.save('favicon.ico', format='ICO', sizes=[(16,16), (32,32)])
            
            print("✅ Created favicon.ico")
            return True
        except Exception as e:
            print(f"❌ Error creating favicon.ico: {e}")
            return False
    
    if __name__ == "__main__":
        create_favicon_ico()
        
except ImportError:
    print("❌ PIL (Pillow) not available for ICO creation")
    print("   The SVG favicon will work in modern browsers")

