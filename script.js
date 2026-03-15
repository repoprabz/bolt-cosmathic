import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Log environment variables in development to help with debugging
if (import.meta.env.DEV) {
  console.log('Environment variables:', {
    SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    // Don't log the actual key value for security
    SUPABASE_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? '[PRESENT]' : '[MISSING]'
  });
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing required environment variables for Supabase configuration');
  throw new Error('Missing required environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Track page view
gtag('event', 'page_view');

// Modal functionality
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeButton = document.querySelector('.close-button');

// Popup functionality
const popup = document.getElementById('customPopup');
const popupContent = popup.querySelector('.popup');
const popupCloseBtn = document.getElementById('popupCloseBtn');
const closePopupBtn = document.querySelector('.popup-close');

function showPopup() {
    popup.classList.add('active');
    setTimeout(() => {
        popupContent.classList.add('active');
    }, 10);
}

function hidePopup() {
    popupContent.classList.remove('active');
    setTimeout(() => {
        popup.classList.remove('active');
    }, 300);
}

[popupCloseBtn, closePopupBtn].forEach(btn => {
    btn.addEventListener('click', hidePopup);
});

popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        hidePopup();
    }
});

document.querySelectorAll('.indicator-card').forEach(card => {
    const img = card.querySelector('img');
    card.addEventListener('click', () => {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modal.classList.add('active');
        
        // Track indicator view
        gtag('event', 'indicator_view', {
            'event_category': 'engagement',
            'event_label': img.alt
        });
    });
});

closeButton.addEventListener('click', (e) => {
    e.stopPropagation();
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

document.getElementById('signupForm').addEventListener('submit', async(e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const tradingview = document.getElementById('tradingview').value;
    
    // Track form submission attempt
    gtag('event', 'sign_up_attempt', {
        'event_category': 'engagement',
        'event_label': 'trial_signup'
    });
    
    const { data, error } = await supabase
      .from('mst_trial_cust')
      .insert({ cust_email: email, cust_phone: phone, cust_tvid: tradingview });
    
    if (error) {
        console.error(error);
        alert('An error occurred. Please try again.');
        
        // Track form submission error
        gtag('event', 'sign_up_error', {
            'event_category': 'error',
            'event_label': error.message
        });
    } else {
        console.log(data);
        showPopup();
        //alert('Thank you for subscribing! Please check your email in 24 hours for activation instructions.');
        
        // Track successful form submission
        gtag('event', 'sign_up_success', {
            'event_category': 'conversion',
            'event_label': 'trial_signup'
        });
        
        // Reset form
        e.target.reset();
    }
});

// Track clicks on CTA buttons
document.querySelectorAll('.hero-cta, .cta-button').forEach(button => {
    button.addEventListener('click', () => {
        gtag('event', 'cta_click', {
            'event_category': 'engagement',
            'event_label': button.textContent.trim()
        });
    });
});

// Track indicator card views
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const productName = card.querySelector('h3').textContent;
            
            gtag('event', 'product_view', {
                'event_category': 'engagement',
                'event_label': productName
            });
            
            // Unobserve after first view
            observer.unobserve(card);
        }
    });
}, observerOptions);

// Observe all indicator cards
document.querySelectorAll('.indicator-card').forEach(card => {
    observer.observe(card);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add SVG gradient definition for icons
const gradient = document.createElementNS("http://www.w3.org/2000/svg", "svg");
gradient.innerHTML = `
    <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color: var(--color-stop-1)" />
            <stop offset="100%" style="stop-color: var(--color-stop-2)" />
        </linearGradient>
    </defs>
`;
document.body.appendChild(gradient);

// Add subtitle carousel functionality
const subtitles = [
    "Unlock Consistent Trading Wins",
    "A-I Powered Trading Signals",
    "70%+ Win Rate Strategy",
    "Real-Time Market Trends"
];


// START ---- Subtitle carousell implementation 1
/*
let currentSubtitleIndex = 0;
const subtitleContainer = document.querySelector('.subtitle-container');

function updateSubtitle() {
    const currentSubtitle = subtitleContainer.querySelector('.subtitle');
    const newSubtitle = document.createElement('p');
    newSubtitle.className = 'subtitle subtitle-enter';
    newSubtitle.textContent = subtitles[currentSubtitleIndex];
    
    if (currentSubtitle) {
        currentSubtitle.classList.add('subtitle-exit');
        setTimeout(() => {
            currentSubtitle.remove();
        }, 500);
    }
    
    subtitleContainer.appendChild(newSubtitle);
    currentSubtitleIndex = (currentSubtitleIndex + 1) % subtitles.length;
}
// Initial update and start the interval
updateSubtitle();
setInterval(updateSubtitle, 4000);
*/
// END ---- Subtitle carousell implementation 1

// START ---- Subtitle carousell implementation 2
/*
let currentSubtitleIndex = 0;
let subtitleInterval;
const subtitleContainer = document.querySelector('.subtitle-container');

function updateSubtitle() {
  const existingSubtitles = subtitleContainer.querySelectorAll('.subtitle');
    existingSubtitles.forEach(subtitle => subtitle.remove());  
  const newSubtitle = document.createElement('p');
    newSubtitle.className = 'subtitle subtitle-enter';
    newSubtitle.textContent = subtitles[currentSubtitleIndex];
    
    subtitleContainer.appendChild(newSubtitle);
    currentSubtitleIndex = (currentSubtitleIndex + 1) % subtitles.length;
}

//Smoothening the transition of subtitles
//function updateSubtitle() {
//requestAnimationFrame(() => {
//      const existingSubtitles = subtitleContainer.querySelectorAll('.subtitle');
//      existingSubtitles.forEach(subtitle => subtitle.remove());
//      
//      const newSubtitle = document.createElement('p');
//      newSubtitle.className = 'subtitle subtitle-enter';
//      newSubtitle.textContent = subtitles[currentSubtitleIndex];
//      
//      subtitleContainer.appendChild(newSubtitle);
//      currentSubtitleIndex = (currentSubtitleIndex + 1) % subtitles.length;
//  });
//}

// Handle visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Clear interval when tab is hidden
        clearInterval(subtitleInterval);
    } else {
        // Restart interval when tab becomes visible
        updateSubtitle(); // Update immediately
        subtitleInterval = setInterval(updateSubtitle, 4000);
    }
});
// Initial update and start the interval
updateSubtitle();
subtitleInterval = setInterval(updateSubtitle, 4000);
setInterval(updateSubtitle, 4000);
*/
// END ---- Subtitle carousell implementation 2

// START ---- Subtitle carousell implementation 3

let currentSubtitleIndex = 0;
let subtitleInterval;
const subtitleContainer = document.querySelector('.subtitle-container');

function updateSubtitle() {
    // Remove all existing subtitles first
    const existingSubtitles = subtitleContainer.querySelectorAll('.subtitle');
    existingSubtitles.forEach(subtitle => subtitle.remove());
    
    // Create and add new subtitle
    const newSubtitle = document.createElement('p');
    newSubtitle.className = 'subtitle subtitle-enter';
    newSubtitle.textContent = subtitles[currentSubtitleIndex];
    
    subtitleContainer.appendChild(newSubtitle);
    currentSubtitleIndex = (currentSubtitleIndex + 1) % subtitles.length;
}

// Handle visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Clear interval when tab is hidden
        clearInterval(subtitleInterval);
    } else {
        // Restart interval when tab becomes visible
        clearInterval(subtitleInterval); // Clear any existing interval
        updateSubtitle(); // Update immediately
        subtitleInterval = setInterval(updateSubtitle, 4000);
    }
});

// Initial update and start the interval
updateSubtitle();
subtitleInterval = setInterval(updateSubtitle, 4000);

// END ---- Subtitle carousell implementation 3