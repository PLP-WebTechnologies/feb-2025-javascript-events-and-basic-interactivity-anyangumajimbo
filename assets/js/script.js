// Select the navbar element
const navbar = document.querySelector('.navbar-wrapper');

// Add a scroll event listener to the window
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled'); // Add the 'scrolled' class when scrolling down
    } else {
        navbar.classList.remove('scrolled'); // Remove the 'scrolled' class when at the top
    }
});

//Close the mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('nav-toggle').checked = false;
    });
});

// Select form elements
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitBtn = form.querySelector('button[type="submit"]');
const formMessage = document.getElementById('form-message');

// Add real-time validation
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);

messageInput.addEventListener('blur', validateMessage);

// Main form submission handler
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (!isNameValid || !isEmailValid || !isMessageValid) {
        return;
    }

    // Update UI for submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    formMessage.classList.add('hidden');

    try {
        // Using Formspree as example backend
        const response = await fetch('https://formspree.io/f/mbloagnd', {
    method: 'POST',
    body: new FormData(form),
    headers: {
        'Accept': 'application/json'
    }
});

        if (!response.ok) {
            throw new Error(await response.text());
        }

        // Success handling
        showMessage('Message sent successfully!', 'success');
        form.reset();
    } catch (error) {
        console.error('Submission error:', error);
        showMessage('Failed to send message. Please try again later.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
});

// Validation functions
function validateName() {
    const value = nameInput.value.trim();
    if (value === '') {
        showError(nameInput, 'Name is required');
        return false;
    }
    clearError(nameInput);
    return true;
}

function validateEmail() {
    const value = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailPattern.test(value)) {
        showError(emailInput, 'Please enter a valid email');
        return false;
    }
    clearError(emailInput);
    return true;
}



function validateMessage() {
    const value = messageInput.value.trim();
    if (value === '') {
        showError(messageInput, 'Message is required');
        return false;
    }
    clearError(messageInput);
    return true;
}

// UI helper functions
function showError(input, message) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = message;
    } else {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        input.insertAdjacentElement('afterend', errorDiv);
    }
    input.classList.add('is-invalid');
}

function clearError(input) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
    input.classList.remove('is-invalid');
}

function showMessage(message, type) {
    formMessage.textContent = message;
    
    // Remove any previous type classes
    formMessage.classList.remove('success', 'error');

    // Add the new type (either 'success' or 'error')
    formMessage.classList.add(type);

    // Make sure the message is visible
    formMessage.classList.remove('hidden');

    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 5000);
}


//Uopdate the active nav bar item w
// Get all sections and nav links
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

// Function to update active nav item
function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === current) {
            link.classList.add('active');
        }
    });
}


// Event listeners
window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

    //Smooth Scrolling navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

//back to top button
// Show or hide the "Back to Top" button based on scroll position
window.onscroll = () => {
    document.getElementById("topBtn").style.display =
        window.scrollY > 300 ? "block" : "none";
};

// Smooth scroll to top when the button is clicked
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling effect
    });
}

// Scroll-based Active Nav Link Highlighting
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveLink() {
    let scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop - 150 && scrollY < sectionTop + sectionHeight - 150) {
 
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.dataset.section === sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  window.addEventListener("load", updateActiveLink);
});


document.querySelector('.btn-hire-me').addEventListener('click', (e) => {
    // Trigger confetti library or CSS ripple
});

//Dynamic Counter Animation
const counters = document.querySelectorAll('.counter h2');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = +entry.target.innerText;
            let count = 0;
            const interval = setInterval(() => {
                entry.target.innerText = count;
                if (count >= target) clearInterval(interval);
                count += Math.ceil(target / 100);
            }, 20);
            observer.unobserve(entry.target);
        }
    });
});
counters.forEach(counter => observer.observe(counter));

