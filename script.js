// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Modal functionality (Assuming there's a modal in your HTML)
const modal = document.getElementById('signup-modal');
const openModalBtn = document.getElementById('signup-button');
const closeModalBtn = document.getElementsByClassName('close-modal')[0];

openModalBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Form submission handling with validation and AJAX
document.getElementById('signup-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Get the form data
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  // Simple validation
  if (name === '' || email === '') {
    alert('Please fill in all fields.');
    return;
  }

  if (!validateEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Prepare data to send
  const formData = {
    name: name,
    email: email
  };

  // Send the data using AJAX
  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Thank you for signing up, ' + name + '!');
      // Reset the form after successful submission
      document.getElementById('signup-form').reset();
    } else {
      alert('There was an issue with your sign-up. Please try again.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

// Email validation function
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Testimonials Carousel
let currentTestimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial-item');
const nextTestimonialBtn = document.getElementById('next-testimonial');
const prevTestimonialBtn = document.getElementById('prev-testimonial');

function showTestimonial(index) {
  testimonials.forEach((testimonial, idx) => {
    testimonial.style.display = 'none';
    if (idx === index) {
      testimonial.style.display = 'block';
    }
  });
}

nextTestimonialBtn.addEventListener('click', () => {
  currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
  showTestimonial(currentTestimonialIndex);
});

prevTestimonialBtn.addEventListener('click', () => {
  currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonialIndex);
});

// Initialize the first testimonial
showTestimonial(currentTestimonialIndex);

// Ensure the DOM is loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
  showTestimonial(currentTestimonialIndex);
});
