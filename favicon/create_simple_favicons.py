#!/usr/bin/env python3
"""
Create simple favicon files using basic methods
"""

from PIL import Image, ImageDraw
import os

def create_simple_favicon():
    """Create a simple 32x32 favicon"""
    # Create a 32x32 image with purple background
    size = 32
    img = Image.new('RGBA', (size, size), (99, 102, 241, 255))  # #6366f1
    draw = ImageDraw.Draw(img)
    
    # Draw a simple "T" for TryOn
    # Horizontal bar
    draw.rectangle([8, 8, 24, 11], fill=(255, 255, 255, 255))
    # Vertical bar
    draw.rectangle([14, 8, 17, 24], fill=(255, 255, 255, 255))
    
    # Add a small reflection effect (mirror concept)
    draw.rectangle([20, 12, 28, 20], fill=(255, 255, 255, 80))
    
    return img

def main():
    try:
        # Create the favicon
        favicon = create_simple_favicon()
        
        # Save as PNG files
        favicon.save('favicon-32x32.png', 'PNG')
        
        # Create 16x16 version
        favicon_16 = favicon.resize((16, 16), Image.Resampling.LANCZOS)
        favicon_16.save('favicon-16x16.png', 'PNG')
        
        # Create 180x180 for Apple touch icon
        favicon_180 = favicon.resize((180, 180), Image.Resampling.LANCZOS)
        favicon_180.save('apple-touch-icon.png', 'PNG')
        
        print("✅ Created favicon files:")
        print("  ✅ favicon-32x32.png")
        print("  ✅ favicon-16x16.png") 
        print("  ✅ apple-touch-icon.png")
        
    except ImportError:
        print("❌ PIL (Pillow) not available. Please install it with:")
        print("   pip3 install Pillow")
        print("\nAlternatively, you can use the SVG favicon which works in modern browsers.")
        return False
    
    return True

if __name__ == "__main__":
    main()

