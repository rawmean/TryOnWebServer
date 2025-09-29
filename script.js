// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle')
  const navMenu = document.querySelector('.nav-menu')
  const navLinks = document.querySelectorAll('.nav-link')

  // Toggle mobile menu
  navToggle.addEventListener('click', function () {
    navMenu.classList.toggle('active')

    // Animate hamburger menu
    const bars = navToggle.querySelectorAll('.bar')
    bars.forEach((bar, index) => {
      if (navMenu.classList.contains('active')) {
        if (index === 0)
          bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)'
        if (index === 1) bar.style.opacity = '0'
        if (index === 2)
          bar.style.transform = 'rotate(45deg) translate(-5px, -6px)'
      } else {
        bar.style.transform = 'none'
        bar.style.opacity = '1'
      }
    })
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active')
      const bars = navToggle.querySelectorAll('.bar')
      bars.forEach(bar => {
        bar.style.transform = 'none'
        bar.style.opacity = '1'
      })
    })
  })

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (event) {
    if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
      navMenu.classList.remove('active')
      const bars = navToggle.querySelectorAll('.bar')
      bars.forEach(bar => {
        bar.style.transform = 'none'
        bar.style.opacity = '1'
      })
    }
  })
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  })
})

// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const name = formData.get('name')
  const email = formData.get('email')
  const subject = formData.get('subject')
  const message = formData.get('message')

  // Create mailto link
  const mailtoLink = `mailto:apps@maadotaa.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  )}`

  // Open email client
  window.location.href = mailtoLink

  // Show success message
  showNotification(
    'Email client opened! Please send your message to complete the contact process.',
    'success'
  )

  // Reset form
  this.reset()
})

// Notification System
function showNotification (message, type = 'info') {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification')
  if (existingNotification) {
    existingNotification.remove()
  }

  // Create notification element
  const notification = document.createElement('div')
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${
              type === 'success' ? 'check-circle' : 'info-circle'
            }"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `

  // Add to document
  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = 'slideOutRight 0.3s ease'
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove()
        }
      }, 300)
    }
  }, 5000)
}

// Scroll animations
function isElementInViewport (el) {
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

function handleScrollAnimations () {
  const elements = document.querySelectorAll(
    '.feature-card, .step, .screenshot-item, .privacy-section'
  )

  elements.forEach(element => {
    if (isElementInViewport(element)) {
      element.classList.add('fade-in', 'visible')
    }
  })
}

// Throttle scroll events
function throttle (func, wait) {
  let timeout
  return function executedFunction (...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Add scroll event listener
window.addEventListener('scroll', throttle(handleScrollAnimations, 100))

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function () {
  handleScrollAnimations()
})

// Add CSS for animations
const style = document.createElement('style')
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
`
document.head.appendChild(style)

// Navbar background change on scroll
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar')
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)'
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)'
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)'
    navbar.style.boxShadow = 'none'
  }
})

// Screenshot gallery functionality
document.addEventListener('DOMContentLoaded', function () {
  const screenshotItems = document.querySelectorAll('.screenshot-item')

  screenshotItems.forEach(item => {
    item.addEventListener('click', function () {
      const img = this.querySelector('img')
      const src = img.src
      const alt = img.alt

      // Create modal
      const modal = document.createElement('div')
      modal.className = 'screenshot-modal'
      modal.innerHTML = `
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <img src="${src}" alt="${alt}" class="modal-image">
                    <div class="modal-caption">${alt}</div>
                </div>
            `

      // Add modal styles
      modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            `

      const modalContent = modal.querySelector('.modal-content')
      modalContent.style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
                background: white;
                border-radius: 10px;
                overflow: hidden;
            `

      const modalImage = modal.querySelector('.modal-image')
      modalImage.style.cssText = `
                width: 100%;
                height: auto;
                display: block;
            `

      const modalClose = modal.querySelector('.modal-close')
      modalClose.style.cssText = `
                position: absolute;
                top: 10px;
                right: 15px;
                font-size: 2rem;
                color: white;
                cursor: pointer;
                background: rgba(0, 0, 0, 0.5);
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10001;
            `

      const modalCaption = modal.querySelector('.modal-caption')
      modalCaption.style.cssText = `
                padding: 1rem;
                text-align: center;
                font-weight: 500;
                color: #333;
            `

      // Add to document
      document.body.appendChild(modal)

      // Close modal functionality
      modalClose.addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease'
        setTimeout(() => modal.remove(), 300)
      })

      modal.addEventListener('click', e => {
        if (e.target === modal) {
          modal.style.animation = 'fadeOut 0.3s ease'
          setTimeout(() => modal.remove(), 300)
        }
      })

      // Escape key to close
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && document.body.contains(modal)) {
          modal.style.animation = 'fadeOut 0.3s ease'
          setTimeout(() => modal.remove(), 300)
        }
      })
    })
  })
})

// Add modal animation styles
const modalStyles = document.createElement('style')
modalStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`
document.head.appendChild(modalStyles)
