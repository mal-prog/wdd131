// Hat data array
const hats = [
  {
    id: 1,
    name: "Sunshine Bloom",
    color: "yellow",
    theme: "cheerful",
    size: "medium",
    img: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop",
    desc: "Bright yellow hat with cheerful sunflower pattern"
  },
  {
    id: 2,
    name: "Ocean Calm",
    color: "blue",
    theme: "calm",
    size: "large",
    img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop",
    desc: "Soft blue hat with gentle wave design"
  },
  {
    id: 3,
    name: "Rose Garden",
    color: "pink",
    theme: "cheerful",
    size: "small",
    img: "https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=400&h=400&fit=crop",
    desc: "Pink floral pattern for a gentle touch"
  },
  {
    id: 4,
    name: "Forest Zen",
    color: "green",
    theme: "calm",
    size: "medium",
    img: "https://images.unsplash.com/photo-1588850561347-9282f9f778f1?w=400&h=400&fit=crop",
    desc: "Peaceful green with nature motifs"
  },
  {
    id: 5,
    name: "Champion Spirit",
    color: "red",
    theme: "sporty",
    size: "large",
    img: "https://images.unsplash.com/photo-1588850561320-7d0c6e5b8b6c?w=400&h=400&fit=crop",
    desc: "Bold red with sporty energy"
  },
  {
    id: 6,
    name: "Lavender Dreams",
    color: "purple",
    theme: "calm",
    size: "small",
    img: "https://images.unsplash.com/photo-1588850561513-a8b7b0c13c7f?w=400&h=400&fit=crop",
    desc: "Soothing purple for restful moments"
  }
];

// Testimonials array
const testimonials = [
  {
    id: 1,
    text: "These hats brought so much comfort during my treatment. They made me feel like myself again.",
    author: "Sarah M., Patient"
  },
  {
    id: 2,
    text: "Being able to give my mom a soft, beautiful hat meant everything. Thank you for this wonderful project.",
    author: "James K., Family Member"
  },
  {
    id: 3,
    text: "Volunteering to sew these hats has been the most rewarding experience. Every stitch is made with love.",
    author: "Maria L., Volunteer"
  }
];

// App state object
const appState = {
  page: 'home',
  menuOpen: false,
  favs: [],
  filters: { color: 'all', theme: 'all', size: 'all' },
  donation: '',
  testimonialIndex: 0,
  form: { name: '', email: '', role: '', message: '' },
  errors: {}
};

// Get root element
const root = document.getElementById('root');

// Start app
function startApp() {
  renderPage();
  startTestimonialTimer();
}

// Auto-advance testimonials every 5 seconds
function startTestimonialTimer() {
  setInterval(() => {
    appState.testimonialIndex = (appState.testimonialIndex + 1) % testimonials.length;
    if (appState.page === 'home') {
      updateTestimonial();
    }
  }, 5000);
}

// Filter hats based on current filters
function getFilteredHats() {
  return hats.filter(hat => {
    if (appState.filters.color !== 'all' && hat.color !== appState.filters.color) {
      return false;
    }
    if (appState.filters.theme !== 'all' && hat.theme !== appState.filters.theme) {
      return false;
    }
    if (appState.filters.size !== 'all' && hat.size !== appState.filters.size) {
      return false;
    }
    return true;
  });
}

// Toggle favorite
function toggleFav(id) {
  if (appState.favs.includes(id)) {
    appState.favs = appState.favs.filter(favId => favId !== id);
  } else {
    appState.favs.push(id);
  }
  renderPage();
}

// Calculate donation impact
function calcImpact() {
  const amt = parseFloat(appState.donation);
  if (isNaN(amt) || amt <= 0) {
    return null;
  }
  
  const costPerHat = 15;
  const patientsHelped = Math.floor(amt / costPerHat);
  
  if (patientsHelped > 0) {
    return `Your donation of $${amt.toFixed(2)} could comfort ${patientsHelped} patient${patientsHelped !== 1 ? 's' : ''} this month!`;
  } else {
    return "Every donation helps! Consider $15 to comfort one patient.";
  }
}

// Validate form
function validateForm() {
  const errors = {};
  
  if (!appState.form.name.trim()) {
    errors.name = "Name is required";
  }
  
  if (!appState.form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(appState.form.email)) {
    errors.email = "Please enter a valid email";
  }
  
  if (!appState.form.role) {
    errors.role = "Please select a role";
  }
  
  if (!appState.form.message.trim()) {
    errors.message = "Message is required";
  } else if (appState.form.message.length > 500) {
    errors.message = "Message must be 500 characters or less";
  }
  
  return errors;
}

// Handle form submit
function submitForm(e) {
  e.preventDefault();
  const errors = validateForm();
  
  if (Object.keys(errors).length === 0) {
    alert(`Thank you, ${appState.form.name}! We'll be in touch soon.`);
    appState.form = { name: '', email: '', role: '', message: '' };
    appState.errors = {};
    renderPage();
  } else {
    appState.errors = errors;
    renderPage();
  }
}

// Navigation
function goToPage(page) {
  appState.page = page;
  appState.menuOpen = false;
  renderPage();
  window.scrollTo(0, 0);
}

function toggleMenu() {
  appState.menuOpen = !appState.menuOpen;
  renderPage();
}

// Update filter
function setFilter(type, val) {
  appState.filters[type] = val;
  renderPage();
}

// Update donation amount
function setDonation(val) {
  appState.donation = val;
  renderPage();
}

// Update form field
function setFormField(field, val) {
  appState.form[field] = val;
  renderPage();
}

// Change testimonial
function changeTestimonial(dir) {
  if (dir === 'next') {
    appState.testimonialIndex = (appState.testimonialIndex + 1) % testimonials.length;
  } else {
    appState.testimonialIndex = (appState.testimonialIndex - 1 + testimonials.length) % testimonials.length;
  }
  renderPage();
}

function jumpToTestimonial(idx) {
  appState.testimonialIndex = idx;
  renderPage();
}

// Update testimonial without full render
function updateTestimonial() {
  const testimonialEl = document.querySelector('.testimonial');
  if (testimonialEl) {
    testimonialEl.innerHTML = `
      <p class="quote">"${testimonials[appState.testimonialIndex].text}"</p>
      <p class="author">— ${testimonials[appState.testimonialIndex].author}</p>
    `;
  }
  
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    if (i === appState.testimonialIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Render navigation
function renderNav() {
  return `
    <nav class="nav">
      <div class="nav-container">
        <div class="logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span>Soft Hats for Patients</span>
        </div>
        <button class="menu-toggle" onclick="toggleMenu()">
          ${appState.menuOpen ? `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ` : `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          `}
        </button>
        <ul class="nav-links ${appState.menuOpen ? 'active' : ''}">
          <li><button onclick="goToPage('home')">Home</button></li>
          <li><button onclick="goToPage('gallery')">Hat Gallery</button></li>
          <li><button onclick="goToPage('involved')">Get Involved</button></li>
        </ul>
      </div>
    </nav>
  `;
}

// Render home page
function renderHome() {
  return `
    <div class="page">
      <section class="hero">
        <h1>Bringing Comfort Through Soft Hats</h1>
        <p>We create comfortable, customized hats for patients going through medical treatments</p>
        <button class="cta-btn" onclick="goToPage('gallery')">See the Hats</button>
      </section>

      <section class="mission">
        <p>Soft Hats for Patients began with a simple idea: every patient deserves comfort and dignity. Our handmade hats provide warmth and confidence to those facing challenging times.</p>
      </section>

      <section class="features">
        <div class="feature-card">
          <h3>Comfort</h3>
          <p>Soft, gentle materials that feel good on sensitive skin</p>
        </div>
        <div class="feature-card">
          <h3>Confidence</h3>
          <p>Beautiful designs that help patients feel like themselves</p>
        </div>
        <div class="feature-card">
          <h3>Connection</h3>
          <p>Each hat is made with care, bringing the community together</p>
        </div>
      </section>

      <section class="preview">
        <h2>Featured Hats</h2>
        <div class="hat-grid">
          ${hats.slice(0, 3).map(hat => `
            <div class="hat-card-small">
              <img src="${hat.img}" alt="${hat.name}">
              <h3>${hat.name}</h3>
              <p>${hat.desc}</p>
            </div>
          `).join('')}
        </div>
        <button class="view-all" onclick="goToPage('gallery')">View All Hats</button>
      </section>

      <section class="testimonials">
        <h2>Stories from Our Community</h2>
        <div class="slider">
          <button class="slider-btn" onclick="changeTestimonial('prev')">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <div class="testimonial">
            <p class="quote">"${testimonials[appState.testimonialIndex].text}"</p>
            <p class="author">— ${testimonials[appState.testimonialIndex].author}</p>
          </div>
          <button class="slider-btn" onclick="changeTestimonial('next')">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
        <div class="dots">
          ${testimonials.map((t, i) => `
            <button class="dot ${i === appState.testimonialIndex ? 'active' : ''}" onclick="jumpToTestimonial(${i})"></button>
          `).join('')}
        </div>
      </section>
    </div>
  `;
}

// Render gallery page
function renderGallery() {
  const filtered = getFilteredHats();
  
  return `
    <div class="page">
      <h1>Our Hat Collection</h1>
      
      <section class="filters">
        <div class="filter">
          <label>Color:</label>
          <select onchange="setFilter('color', this.value)">
            <option value="all" ${appState.filters.color === 'all' ? 'selected' : ''}>All Colors</option>
            <option value="yellow" ${appState.filters.color === 'yellow' ? 'selected' : ''}>Yellow</option>
            <option value="blue" ${appState.filters.color === 'blue' ? 'selected' : ''}>Blue</option>
            <option value="pink" ${appState.filters.color === 'pink' ? 'selected' : ''}>Pink</option>
            <option value="green" ${appState.filters.color === 'green' ? 'selected' : ''}>Green</option>
            <option value="red" ${appState.filters.color === 'red' ? 'selected' : ''}>Red</option>
            <option value="purple" ${appState.filters.color === 'purple' ? 'selected' : ''}>Purple</option>
          </select>
        </div>
        
        <div class="filter">
          <label>Theme:</label>
          <select onchange="setFilter('theme', this.value)">
            <option value="all" ${appState.filters.theme === 'all' ? 'selected' : ''}>All Themes</option>
            <option value="cheerful" ${appState.filters.theme === 'cheerful' ? 'selected' : ''}>Cheerful</option>
            <option value="calm" ${appState.filters.theme === 'calm' ? 'selected' : ''}>Calm</option>
            <option value="sporty" ${appState.filters.theme === 'sporty' ? 'selected' : ''}>Sporty</option>
          </select>
        </div>
        
        <div class="filter">
          <label>Size:</label>
          <select onchange="setFilter('size', this.value)">
            <option value="all" ${appState.filters.size === 'all' ? 'selected' : ''}>All Sizes</option>
            <option value="small" ${appState.filters.size === 'small' ? 'selected' : ''}>Small</option>
            <option value="medium" ${appState.filters.size === 'medium' ? 'selected' : ''}>Medium</option>
            <option value="large" ${appState.filters.size === 'large' ? 'selected' : ''}>Large</option>
          </select>
        </div>
      </section>

      <p class="results">Showing ${filtered.length} of ${hats.length} hats</p>
      
      <div class="hat-grid">
        ${filtered.map(hat => `
          <div class="hat-card">
            <div class="img-wrap">
              <img src="${hat.img}" alt="${hat.name}">
              <button class="fav-btn ${appState.favs.includes(hat.id) ? 'active' : ''}" onclick="toggleFav(${hat.id})">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="${appState.favs.includes(hat.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>
            <div class="info">
              <h3>${hat.name}</h3>
              <p>${hat.desc}</p>
              <div class="tags">
                <span>${hat.theme}</span>
                <span>${hat.size}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      
      ${filtered.length === 0 ? '<p class="no-results">No hats match your filters. Try adjusting your selection!</p>' : ''}
      
      ${appState.favs.length > 0 ? `
        <section class="fav-summary">
          <h2>Your Favorites (${appState.favs.length})</h2>
          <p>You've marked ${appState.favs.length} hat${appState.favs.length !== 1 ? 's' : ''} as favorite!</p>
        </section>
      ` : ''}
    </div>
  `;
}

// Render get involved page
function renderInvolved() {
  const impact = calcImpact();
  
  return `
    <div class="page">
      <h1>Get Involved</h1>
      
      <section class="calculator">
        <h2>Donation Impact Calculator</h2>
        <p>See how your donation can make a difference!</p>
        <div class="calc-form">
          <label>Enter donation amount ($):</label>
          <input type="number" min="0" value="${appState.donation}" oninput="setDonation(this.value)" placeholder="0">
          ${impact ? `<div class="impact">${impact}</div>` : ''}
        </div>
      </section>

      <section class="ways">
        <h2>Ways to Help</h2>
        <div class="help-grid">
          <div class="help-card">
            <h3>Donate Materials</h3>
            <p>Soft fabrics, threads, and supplies help us create more hats</p>
          </div>
          <div class="help-card">
            <h3>Sew Hats</h3>
            <p>Join our volunteer sewing team and create comfort with your own hands</p>
          </div>
          <div class="help-card">
            <h3>Deliver Hats</h3>
            <p>Help us bring finished hats to hospitals and treatment centers</p>
          </div>
          <div class="help-card">
            <h3>Share Our Mission</h3>
            <p>Spread the word on social media and in your community</p>
          </div>
        </div>
      </section>

      <section class="contact">
        <h2>Contact Us</h2>
        <form onsubmit="submitForm(event)">
          <div class="form-group">
            <label>Name *</label>
            <input type="text" value="${appState.form.name}" oninput="setFormField('name', this.value)" class="${appState.errors.name ? 'error' : ''}">
            ${appState.errors.name ? `<span class="err-msg">${appState.errors.name}</span>` : ''}
          </div>
          
          <div class="form-group">
            <label>Email *</label>
            <input type="email" value="${appState.form.email}" oninput="setFormField('email', this.value)" class="${appState.errors.email ? 'error' : ''}">
            ${appState.errors.email ? `<span class="err-msg">${appState.errors.email}</span>` : ''}
          </div>
          
          <div class="form-group">
            <label>I am a... *</label>
            <select onchange="setFormField('role', this.value)" class="${appState.errors.role ? 'error' : ''}">
              <option value="" ${appState.form.role === '' ? 'selected' : ''}>Select...</option>
              <option value="patient" ${appState.form.role === 'patient' ? 'selected' : ''}>Patient</option>
              <option value="family" ${appState.form.role === 'family' ? 'selected' : ''}>Family Member</option>
              <option value="volunteer" ${appState.form.role === 'volunteer' ? 'selected' : ''}>Volunteer</option>
              <option value="donor" ${appState.form.role === 'donor' ? 'selected' : ''}>Donor</option>
            </select>
            ${appState.errors.role ? `<span class="err-msg">${appState.errors.role}</span>` : ''}
          </div>
          
          <div class="form-group">
            <label>Message * (max 500 characters)</label>
            <textarea rows="5" oninput="setFormField('message', this.value)" class="${appState.errors.message ? 'error' : ''}">${appState.form.message}</textarea>
            <span class="char-count">${appState.form.message.length}/500</span>
            ${appState.errors.message ? `<span class="err-msg">${appState.errors.message}</span>` : ''}
          </div>
          
          <button type="submit" class="submit-btn">Send Message</button>
        </form>
      </section>
    </div>
  `;
}

// Main render function
function renderPage() {
  let content = '';
  
  if (appState.page === 'home') {
    content = renderHome();
  } else if (appState.page === 'gallery') {
    content = renderGallery();
  } else if (appState.page === 'involved') {
    content = renderInvolved();
  }
  
  root.innerHTML = `
    ${renderNav()}
    <main class="main">
      ${content}
    </main>
    <footer>
      <p>&copy; ${new Date().getFullYear()} Soft Hats for Patients | Bringing Comfort & Hope</p>
    </footer>
  `;
}

// Start the application
startApp();