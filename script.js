import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js';

// Configuration
const CONFIG = {
    REFERRAL_CODE_LENGTH: 6,
    TESTIMONIALS: [
        {
            id: 'testimonial_1',
            name: 'Amit Kumar',
            experience: '5+ years trading experience',
            quote: "The Rhythmus Intraday indicator has transformed my trading. Clear signals, consistent wins, and the structured entry zones have made all the difference."
        },
        {
            id: 'testimonial_2',
            name: 'Priya Sharma',
            experience: 'Active swing trader',
            quote: "I was struggling with entry timing until I found Cosmathic. The price-time synchronization is incredibly accurate. Highly recommended!"
        },
        {
            id: 'testimonial_3',
            name: 'Rajesh Patel',
            experience: '3+ years retail trader',
            quote: "The cosmic mathematics approach seems unconventional at first, but the results speak for themselves. My win rate has improved significantly."
        },
        {
            id: 'testimonial_4',
            name: 'Deepak Verma',
            experience: 'Professional trader',
            quote: "Finally, a tool that combines discipline with precision. The Cosmic Axis Grid has become an essential part of my daily trading routine."
        },
        {
            id: 'testimonial_5',
            name: 'Neha Gupta',
            experience: '2+ years trading',
            quote: "The weekly swing indicator predictions are remarkable. I have never seen such consistency. This is the real deal for swing traders."
        },
        {
            id: 'testimonial_6',
            name: 'Vikram Singh',
            experience: 'Day trader',
            quote: "The vibration levels provided by Rhythmus are spot-on for intraday trading. My profit factor has nearly doubled since using this tool."
        },
        {
            id: 'testimonial_7',
            name: 'Anjali Desai',
            experience: '6+ years experience',
            quote: "What sets Cosmathic apart is the clarity and structure. No more confusion, just objective rules and disciplined execution. Worth every penny!"
        },
        {
            id: 'testimonial_8',
            name: 'Sanjay Nair',
            experience: 'Active market operator',
            quote: "The leading indicators actually lead. The preparation with clarity approach has completely changed how I approach market timing."
        }
    ],
       //for email attaching
    PDF_GUIDES: {
      MATH_TOOL: '',//file name of guide PDF
      ASTRO_TOOL: '',//file name of guide PDF
      VIBRATION_ADDON: ''//file name of guide PDF
    },
    EMAIL: {
      SENDER: 'admin@cosmathic.ai',
      SUBJECT: 'Welcome to Cosmathic - Your Trading Journey Begins!',
      SIGNATURE_LOGO: 'icon_cosmathic_sign.png',
      CONTACT: {
        PHONE: '+91 84 3141 3300',
        WEBSITE: 'https://cosmathic.ai',
        LINKEDIN: 'https://www.linkedin.com/in/cosmathic-ai-716026367'
      }
    },
    GST_RATE: 0.0, // 18%
  REFERRAL_DISCOUNT_PERCENTAGE: 0, // 0%
  INTRODUCTORY_DISCOUNT_PERCENTAGE: 0, // 0% discount given in decimal i.e 0.2 for 20%
  UPI_QR_CODE_URL:
    'https://sjvggeiqczywnilrarml.supabase.co/storage/v1/object/public/cosmathic-files//upi_qr_code.jpg',
  UPI_ID: 'your_upi_id@bank',
  /*PAYMENT_OPTIONS: [
    { id: 'upi', name: 'UPI Payment (Scan to Pay)', default: true, comingSoon: false },
    { id: 'bank_transfer', name: 'Bank Transfer', default: false, comingSoon: false },
    { id: 'credit_card', name: 'Credit Card', default: false, comingSoon: true },
    { id: 'debit_card', name: 'Debit Card', default: false, comingSoon: true },
    { id: 'paypal', name: 'PayPal', default: false, comingSoon: true },
  ],*/
  PAYMENT_OPTIONS: [
        {
      id: 'upi',
      name: 'UPI Payment (Scan to Pay)',
      default: true,
      comingSoon: false,
    },
    ],
    PRODUCTS: [
                {
          id: 'rhythmus_intraday',
          name: 'Rhythmus Intraday',
          img: 'https://sjvggeiqczywnilrarml.supabase.co/storage/v1/object/public/cosmathic-files/rhythmus_intraday.png',
          description:
            'Daily vibration levels, Structured entry & Threshold zones, Dynamic stop-loss management, Market bias',
          user_guide_pdf: '',//guide pdf filename
          min_price: 5000,
          subscription_plans: [
            { type: 'Monthly', duration_days: 30, usual_price: 5000 },
            { type: 'Half-Yearly', duration_days: 180, usual_price: 24000 },
            // { type: 'Annual', duration_days: 365, usual_price: 24000 },
          ],
        },
        {
          id: 'rhythmus_weekly',
          name: 'Rhythmus Weekly Swing',
          img: 'https://sjvggeiqczywnilrarml.supabase.co/storage/v1/object/public/cosmathic-files/rhythmus-weekly.png',
          description:
            'Weekly vibration levels, Structured swing targets and reaction zones, Control level for trade direction, Market bias',
          user_guide_pdf: '',
          min_price: 5000,
          subscription_plans: [
            { type: 'Monthly', duration_days: 30, usual_price: 5000 },
            { type: 'Half-Yearly', duration_days: 180, usual_price: 24000 },
            // { type: 'Annual', duration_days: 365, usual_price: 24000 },
          ],
        },
        {
          id: 'cosmic_axis_grid',
          name: 'Cosmic Axis Grid',
          img: 'https://sjvggeiqczywnilrarml.supabase.co/storage/v1/object/public/cosmathic-files/cosmic-axis-grid.png',
          description:
            'Astro based price mapping, Daily planetary grid levels, Volatility scaled cosmic levels, Market equilibrium signal',
          user_guide_pdf: '',
          min_price: 7000,
          subscription_plans: [
            { type: 'Monthly', duration_days: 30, usual_price: 7000 },
            { type: 'Half-Yearly', duration_days: 180, usual_price: 33600 },
            // { type: 'Annual', duration_days: 365, usual_price: 24000 },
          ],
        },
      ],
  };

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

// Check for referral code in URL
const urlParams = new URLSearchParams(window.location.search);
//const referralCode = urlParams.get('ref');
const referralCodeFromURL = urlParams.get('ref');

if (referralCodeFromURL) {
    //UNWANTED REFERRAL COUNT LOGIC
    // Update referral count
  
                     
    // Pre-fill referral code in form
    const referralInput = document.getElementById('referral');
    if (referralInput) {
      referralInput.value = referralCodeFromURL; //Pre-fill referral code from URL if present and disable the field
      referralInput.disabled = true; // Disable Referral code editable
    }
  }

// Navigation functionality
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-toggle') && !e.target.closest('.nav-links')) {
        navLinks.classList.remove('active');
    }
});

// Change navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
    }
});

// Image Modal functionality
const imageModal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeImageModalButton = imageModal.querySelector('.close-button');

closeImageModalButton.addEventListener('click', (e) => {
    e.stopPropagation();
    imageModal.classList.remove('active');
  });

  imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
      imageModal.classList.remove('active');
    }
  });

// About Us Modal functionality
const aboutUsModal = document.getElementById('aboutUsModal');
const aboutUsLink = document.getElementById('aboutUsLink');
const closeAboutUsModalButton = aboutUsModal.querySelector('.close-button');

aboutUsLink.addEventListener('click', (e) => {
    e.preventDefault();
    aboutUsModal.classList.add('active');
    navLinks.classList.remove('active');
});

closeAboutUsModalButton.addEventListener('click', (e) => {
    e.stopPropagation();
    aboutUsModal.classList.remove('active');
});

aboutUsModal.addEventListener('click', (e) => {
    if (e.target === aboutUsModal) {
        aboutUsModal.classList.remove('active');
    }
});

// OLD Popup functionality BEGINS HERE
/*const popup = document.getElementById('customPopup');
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
});*/

//OLD POPUP FUNCTIONALITY ENDS HERE

// NEW Custom Popup functionality STARTS HERE
const customPopup = document.getElementById('customPopup');
const customPopupContent = customPopup.querySelector('.popup');
const customPopupCloseBtn = document.getElementById('popupCloseBtn');
const closeCustomPopupBtn = customPopup.querySelector('.popup-close');
const customPopupTitleElement = customPopup.querySelector('.popup-title');
const customPopupMessageElement = customPopup.querySelector('.popup-message');

function showCustomPopup(title, message, type = 'success') {
    if (!customPopup || !customPopupContent || !customPopupTitleElement || !customPopupMessageElement) {
        console.error('Popup elements not found');
        return;
    }

    // Set content
    customPopupTitleElement.textContent = title;
    customPopupMessageElement.textContent = message;
								
													
   

    // Reset and set type classes
															  
    customPopupContent.classList.remove('popup-success', 'popup-error');
    if (type === 'success' || type === 'error') {
        customPopupContent.classList.add(`popup-${type}`);
    }

    // Show popup
    customPopup.style.display = 'flex';
    requestAnimationFrame(() => {
        customPopup.classList.add('active');
        requestAnimationFrame(() => {
            customPopupContent.classList.add('active');
        });
    });
}

function hideCustomPopup() {
    if (!customPopup || !customPopupContent) {
        console.error('Popup elements not found');
        return;
    }

    customPopupContent.classList.remove('active');
																			   
    setTimeout(() => {
        customPopup.classList.remove('active');
        setTimeout(() => {
            customPopup.style.display = 'none';
        }, 300);
    }, 300);
}

// Event listeners for closing popup
[customPopupCloseBtn, closeCustomPopupBtn].forEach(btn => {
    if (btn) {
        btn.addEventListener('click', hideCustomPopup);
    }
});

// Close popup when clicking outside
customPopup.addEventListener('click', (e) => {
    if (e.target === customPopup) {
        hideCustomPopup();
    }
});

//NEW CUSTOM POPUP FUNCTIONALITY ENDS HERE

/* //START -- OLD CARDS Implementation
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

// END - OLD CARDS Implementation */

// START - NEW CARDS Implementation with Paid Subscription Logic

// --- New Subscription & Payment Logic ---

const subscriptionModal = document.getElementById('subscriptionModal');
const closeSubscriptionModalButton =
  subscriptionModal.querySelector('.close-button');
const subscriptionProductName = document.getElementById(
  'subscriptionProductName'
);
const subscriptionProductDesc = document.getElementById(
  'subscriptionProductDesc'
);
const plansList = document.getElementById('plansList');
const paymentDetailsSection = document.getElementById('paymentDetails');
const summaryPlan = document.getElementById('summaryPlan');
const summaryBasePrice = document.getElementById('summaryBasePrice');
const introDiscountRow = document.getElementById('introDiscountRow');
const summaryIntroDiscount = document.getElementById('summaryIntroDiscount');
const referralDiscountRow = document.getElementById('referralDiscountRow');
const summaryReferralDiscount = document.getElementById(
  'summaryReferralDiscount'
);
const summaryTotalPrice = document.getElementById('summaryTotalPrice');
const paymentOptionsContainer = document.getElementById('paymentOptions');
const upiPaymentSection = document.getElementById('upiPaymentSection');
const upiQrCode = document.getElementById('upiQrCode');
const upiAmountDisplay = document.getElementById('upiAmount');
const proceedToPaymentBtn = document.getElementById('proceedToPaymentBtn');
const shareWhatsappBtn = document.getElementById('shareWhatsapp');
const shareEmailBtn = document.getElementById('shareEmail');

// Multi-step modal elements
const planSelectionStep = document.getElementById('planSelectionStep');
const checkoutDetailsStep = document.getElementById('checkoutDetailsStep');
const backToPlansBtn = document.getElementById('backToPlansBtn');

// Modal form fields
const modalNameInput = document.getElementById('modalName');
const modalEmailInput = document.getElementById('modalEmail');
//const modalPhoneInput = document.getElementById('modalPhone');
const modalPhoneInput = document.getElementById('modalPhone');
const modalPhoneCountryCodeInput = document.getElementById(
  'modalPhoneCountryCode'
);

const modalTradingviewInput = document.getElementById('modalTradingview');
const modalReferralInput = document.getElementById('modalReferral');
//const upiIdDisplay = document.getElementById('upiIdDisplay');
const upiIdDisplay = document.querySelector('.upi-id-display'); // Select by class as it's a div
const upiIdTextElement = document.getElementById('upiIdText'); // New element for the text


let selectedProduct = null;
let selectedPlan = null;
let finalCalculatedPrice = 0;

// Helper function to format currency
const formatCurrency = (amount) => `₹${amount.toFixed(2)}`;

// Helper function to manage button loading state
function setButtonLoadingState(button, isLoading) {
  if (isLoading) {
    button.disabled = true;
    button.textContent = 'Processing...';
    button.classList.add('loading'); // Add a class for potential styling
  } else {
    button.disabled = false;
    button.textContent = 'Proceed to Payment'; // Restore original text
    button.classList.remove('loading');
  }
}

// Function to calculate final price with discounts and GST
function calculateFinalPrice(basePrice, hasReferral) {
  let priceAfterIntroDiscount =
    basePrice * (1 - CONFIG.INTRODUCTORY_DISCOUNT_PERCENTAGE);
  let priceAfterReferralDiscount = priceAfterIntroDiscount;

  if (hasReferral) {
    priceAfterReferralDiscount =
      priceAfterIntroDiscount * (1 - CONFIG.REFERRAL_DISCOUNT_PERCENTAGE);
  }

  const gstAmount = priceAfterReferralDiscount * CONFIG.GST_RATE;
  const finalPrice = priceAfterReferralDiscount + gstAmount;

  return {
    basePrice,
    priceAfterIntroDiscount,
    priceAfterReferralDiscount,
    gstAmount,
    finalPrice,
    introDiscountApplied: basePrice - priceAfterIntroDiscount,
    referralDiscountApplied: hasReferral
      ? priceAfterIntroDiscount - priceAfterReferralDiscount
      : 0,
  };
}
phoneCountryCode;

// Function to validate modal signup form
function validateModalSignupForm() {
  
  const name = modalNameInput?.value.trim() || '';
  const email = modalEmailInput?.value.trim() || '';
  // const phone = modalPhoneInput?.value.trim() || '';
  // const phone = (modalPhoneCountryCodeInput?.value || '') + (modalPhoneInput?.value.trim() || '');
  const phone = modalPhoneInput?.value.trim() || ''; // Check only the phone number input

  const tradingview = modalTradingviewInput?.value.trim() || '';

  return name !== '' && email !== '' && phone !== '' && tradingview !== '';
}

// Function to update the state of the "Proceed to Payment" button and UPI section
function updateProceedToPaymentButtonState() {
  const isFormValid = validateModalSignupForm();
  const isPlanSelected = selectedPlan !== null;
  const isUpiSelected =
    document.getElementById('payment-upi') &&
    document.getElementById('payment-upi').checked;

  proceedToPaymentBtn.disabled = !(isPlanSelected && isFormValid);
 
  if (isUpiSelected) {
    shareWhatsappBtn.disabled = !isFormValid;
    shareEmailBtn.disabled = !isFormValid;
    //Removes the commented-out lines and ensures the updateProceedToPaymentButtonState function doesn't prematurely unblur the QR code or show the UPI ID.
    // if (isFormValid) {
    //   //upiQrCode.classList.remove('blurred');
    //  // if (upiIdDisplay) upiIdDisplay.classList.remove('hidden');
    // } else {
    //   upiQrCode.classList.add('blurred');
    //  // if (upiIdDisplay) upiIdDisplay.classList.add('hidden');
    // }
  } else {
    shareWhatsappBtn.disabled = true;
    shareEmailBtn.disabled = true;
    upiQrCode.classList.add('blurred');
    if (upiIdDisplay) upiIdDisplay.classList.add('hidden');
  }
}

// Event listeners for modal form fields
if (modalNameInput)
  modalNameInput.addEventListener('input', updateProceedToPaymentButtonState);
if (modalEmailInput)
  modalEmailInput.addEventListener('input', updateProceedToPaymentButtonState);
if (modalPhoneInput)
  modalPhoneInput.addEventListener('input', updateProceedToPaymentButtonState);
if (modalTradingviewInput)
  modalTradingviewInput.addEventListener(
    'input',
    updateProceedToPaymentButtonState
  );
if (modalReferralInput)
  modalReferralInput.addEventListener(
    'input',
    updateProceedToPaymentButtonState
  );

  // Add input filtering for phone number fields
  const filterNumericInput = (event) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
  };
  
  if (document.getElementById('phone')) {
    document.getElementById('phone').addEventListener('input', filterNumericInput);
  }
  
  if (modalPhoneInput) {
    modalPhoneInput.addEventListener('input', filterNumericInput);
  }

// Function to render testimonials
function renderTestimonials() {
  const testimonialsCarousel = document.getElementById('testimonialsCarousel');
  if (!testimonialsCarousel) return;

  testimonialsCarousel.innerHTML = '';

  CONFIG.TESTIMONIALS.forEach((testimonial) => {
    const card = document.createElement('div');
    card.className = 'testimonial-card-carousel';
    card.setAttribute('data-testimonial-id', testimonial.id);

    card.innerHTML = `
        <blockquote>
            <p>"${testimonial.quote}"</p>
            <footer>
                <span class="testimonial-name">${testimonial.name}</span>
            </footer>
            <span class="testimonial-experience">${testimonial.experience}</span>
        </blockquote>
    `;

    testimonialsCarousel.appendChild(card);
  });
}

// Function to render product cards
function renderProductCards() {
  const indicatorGrid = document.querySelector('.indicator-grid');
  indicatorGrid.innerHTML = '';

  CONFIG.PRODUCTS.forEach((product) => {
    const card = document.createElement('div');
    card.className = 'indicator-card';
    card.setAttribute('data-product-id', product.id);

    let productFeatures = '';
    if (product.description) {
      productFeatures = `<ul>${product.description
        .split(', ')
        .map((item) => `<li>✓ ${item}</li>`)
        .join('')}</ul>`;
    }

    let actionButtonsHtml = '';
    let minPriceHtml = '';
    let bundleInfoHtml = '';
    let freeLabelHtml = '';
    let productTitleHtml = `<h3>${product.name}</h3>`; // Default title

    /*if (product.id === 'cosmic_vibration_addon') {
      actionButtonsHtml = `
                <a href="https://sjvggeiqczywnilrarml.supabase.co/storage/v1/object/public/cosmathic-files/${CONFIG.PDF_GUIDES.VIBRATION_ADDON}?download=CosMathic_Guide-CosmicVibration.pdf" class="download-button" target="_blank">
                    <i data-lucide="file-text" class="button-icon"></i>
                    User Guide
                </a>
            `;
      //bundleInfoHtml = `<p class="bundle-text">FREE with any paid subscription!</p>`;
      freeLabelHtml = `<span class="free-product-label">FREE</span>`; // Set the FREE label
      productTitleHtml = `<h3>${product.name} ${freeLabelHtml}</h3>`; // Title with FREE label
    } else {*/ //Commented the condition to remove FREEBIES
      const lowestPlan = product.subscription_plans.reduce(
        (min, p) => (p.usual_price < min.usual_price ? p : min),
        product.subscription_plans[0]
      );
      //Change starts from price, depending on Referral Code in URL
      /*const { finalPrice } = calculateFinalPrice(lowestPlan.usual_price, false);
      minPriceHtml = `<p class="min-price-display">[Launch Offer] Starts from ${formatCurrency(
        finalPrice
      )}</p>`;*/

      actionButtonsHtml = `
                <button class="view-plans-button" data-product-id="${product.id}">
                    <i data-lucide="dollar-sign" class="button-icon"></i> View Pricing Plans
                </button>
                <a href="https://sjvggeiqczywnilrarml.supabase.co/storage/v1/object/public/cosmathic-files/${product.user_guide_pdf}?download=${product.user_guide_pdf}" class="download-button" target="_blank">
                    <i data-lucide="file-text" class="button-icon"></i> User Guide
                </a>
            `;
      //bundleInfoHtml = `<p class="bundle-text">Cosmic Vibration [Add-on] FREE!</p>`;
    //}

    card.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <!-- <h3>${product.name}</h3>
            ${freeLabelHtml} Insert the FREE label here -->
            ${productTitleHtml} <!-- Use the dynamically generated title -->
            ${productFeatures}
            ${minPriceHtml}
            ${bundleInfoHtml}
            <div class="card-actions">
                ${actionButtonsHtml}
            </div>
        `;
    indicatorGrid.appendChild(card);

    // Attach event listener for image modal
    const cardImage = card.querySelector('img');
    if (cardImage) {
      cardImage.addEventListener('click', () => {
        modalImg.src = cardImage.src;
        imageModal.classList.add('active');
      });
    }
  });

  lucide.createIcons();

  document.querySelectorAll('.view-plans-button').forEach((button) => {
    button.addEventListener('click', (e) => {
      const productId = e.currentTarget.getAttribute('data-product-id');
      showSubscriptionModal(productId);
    });
  });
}

// Function to show the subscription modal
function showSubscriptionModal(productId) {
  selectedProduct = CONFIG.PRODUCTS.find((p) => p.id === productId);
  if (!selectedProduct) return;

  subscriptionProductName.textContent = selectedProduct.name;
  subscriptionProductDesc.textContent = selectedProduct.description.replace(
    /, /g,
    '. '
  );

  plansList.innerHTML = '';
  paymentDetailsSection.style.display = 'none';
  selectedPlan = null;

  // Show plan selection step, hide checkout details step
  if (planSelectionStep) planSelectionStep.style.display = 'block';
  if (checkoutDetailsStep) checkoutDetailsStep.style.display = 'none';

  const mainReferralInput = document.getElementById('referral');
  // Pre-fill referral code from main form if present
  //if (mainReferralInput && modalReferralInput) {
    //modalReferralInput.value = mainReferralInput.value;

  // Pre-fill referral code from URL if present and disable the field
    if (referralCodeFromURL && modalReferralInput) {
    modalReferralInput.value = referralCodeFromURL;
    modalReferralInput.disabled = true; // Disable the field
    } else if (modalReferralInput) {
    modalReferralInput.disabled = false;
    }// Ensure it's enabled if no URL referral
  //}

  const hasReferralCode = modalReferralInput?.value.trim() !== '';

 // Defensive check for subscription_plans
  if (!selectedProduct.subscription_plans || !Array.isArray(selectedProduct.subscription_plans)) {
    console.error(`Product ${selectedProduct.id} has invalid or missing subscription plans.`);
    window.showCustomPopup('Error', 'Subscription plans not available for this product. Please contact support.', 'error');
    return;
  }
  
  selectedProduct.subscription_plans.forEach((plan) => {
    const {
      finalPrice,
      basePrice,
      introDiscountApplied,
      referralDiscountApplied,
    } = calculateFinalPrice(plan.usual_price, hasReferralCode);

    let extraDaysForDisplay = 0;
    let extraOfferDays = 0;
    if (plan.type === 'Half-Yearly') {
      // extraDaysForDisplay = 15;
      extraOfferDays = 30;
      extraDaysForDisplay = '1 month';
      // finalPrice = finalPrice * 0.80;
    } else if (plan.type === 'Annual') {
      // extraDaysForDisplay = 30;
      extraOfferDays = 60;
      extraDaysForDisplay = '2 months';
    }
    
    const perDayPrice = finalPrice / (plan.duration_days+extraOfferDays); // Calculate per-day price


    const planCard = document.createElement('div');
    planCard.className = 'plan-card';
    planCard.setAttribute('data-plan-type', plan.type);
    planCard.setAttribute('data-plan-price', finalPrice);

    planCard.innerHTML = `
            <h4>${plan.type}</h4>
            <div class="price-details">
                <!-- <span class="usual-price">${formatCurrency(
                  plan.usual_price
                )}</span> -->
                <!-- <span class="intro-price">${formatCurrency(
                  plan.usual_price *
                    (1 - CONFIG.INTRODUCTORY_DISCOUNT_PERCENTAGE)
                )}</span> -->
            </div>
            <div class="final-price">${formatCurrency(finalPrice)}</div>
            <!-- ${extraDaysForDisplay ? `<div class="extra-days-info">Includes ${extraDaysForDisplay} extra!</div>` : ''} -->
            <!-- <div class="per-day-price">Per day: ${formatCurrency(perDayPrice)}</div> -->
             <!-- <div class="gst-info">(incl. 18% GST)</div> -->
            <!--${
              selectedProduct.id !== 'cosmic_vibration_addon'
                ? '<div class="bundle-info">Cosmic Vibration [Add-on] FREE!</div>'
                : ''
            } -->
        `;
    plansList.appendChild(planCard);

    planCard.addEventListener('click', () => {
      document
        .querySelectorAll('.plan-card')
        .forEach((card) => card.classList.remove('selected'));
      planCard.classList.add('selected');
      selectedPlan = plan;
      finalCalculatedPrice = finalPrice;
      displayPaymentSummary(
        plan,
        finalPrice,
        basePrice,
        introDiscountApplied,
        referralDiscountApplied
      );
      if (planSelectionStep) planSelectionStep.style.display = 'none';
      if (checkoutDetailsStep) checkoutDetailsStep.style.display = 'block';
      paymentDetailsSection.style.display = 'block';
      updateProceedToPaymentButtonState();
    });
  });

  subscriptionModal.classList.add('active');
  updateProceedToPaymentButtonState();
}

// Back to plans button functionality
if (backToPlansBtn) {

  //New logic to reset fields and buttons
  backToPlansBtn.addEventListener('click', resetSubscriptionModal);
  
  //Old logic to reset fields and buttons is below. Doesn't work.
  // backToPlansBtn.addEventListener('click', () => {
  //   if (checkoutDetailsStep) checkoutDetailsStep.style.display = 'none';
  //   if (planSelectionStep) planSelectionStep.style.display = 'block';
  //   selectedPlan = null;
  //   paymentDetailsSection.style.display = 'none';
  //   updateProceedToPaymentButtonState();
  // });
}

// Function to display payment summary
function displayPaymentSummary(
  plan,
  finalPrice,
  basePrice,
  introDiscount,
  referralDiscount
) {
  summaryPlan.textContent = `${selectedProduct.name} - ${plan.type}`;
  summaryBasePrice.textContent = formatCurrency(basePrice);

  if (introDiscount > 0) {
    introDiscountRow.style.display = 'flex';
    summaryIntroDiscount.textContent = `- ${formatCurrency(introDiscount)}`;
  } else {
    introDiscountRow.style.display = 'none';
  }

  if (referralDiscount > 0) {
    referralDiscountRow.style.display = 'flex';
    summaryReferralDiscount.textContent = `- ${formatCurrency(
      referralDiscount
    )}`;
  } else {
    referralDiscountRow.style.display = 'none';
  }

  summaryTotalPrice.textContent = formatCurrency(finalPrice);

  paymentOptionsContainer.innerHTML = '';
  CONFIG.PAYMENT_OPTIONS.forEach((option) => {
    const optionCard = document.createElement('div');
    optionCard.className = 'payment-option-card';
    if (option.comingSoon) {
      optionCard.classList.add('coming-soon');
    }
    optionCard.innerHTML = `
            <input type="radio" id="payment-${
              option.id
            }" name="paymentMethod" value="${option.id}" ${
      option.default ? 'checked' : ''
    } ${option.comingSoon ? 'disabled' : ''}>
            <label for="payment-${option.id}">${option.name} ${
      option.comingSoon
        ? '<span class="coming-soon-tag-small">Coming Soon</span>'
        : ''
    }</label>
        `;
    paymentOptionsContainer.appendChild(optionCard);

    optionCard.addEventListener('click', () => {
      if (option.comingSoon) {
        return;
      }
      document.getElementById(`payment-${option.id}`).checked = true;
      document
        .querySelectorAll('.payment-option-card')
        .forEach((card) => card.classList.remove('selected'));
      optionCard.classList.add('selected');

      if (option.id === 'upi') {
        upiPaymentSection.style.display = 'block';
        upiQrCode.src = CONFIG.UPI_QR_CODE_URL;
        upiAmountDisplay.textContent = formatCurrency(finalPrice);
        const upiIdText = CONFIG.UPI_ID;
        if (upiIdDisplay)
          upiIdDisplay.querySelector('.upi-id-text').textContent = upiIdText;
      } else {
        upiPaymentSection.style.display = 'none';
      }
      updateProceedToPaymentButtonState();
    });

    if (option.default && !option.comingSoon) {
      optionCard.click();
    }
  });
}

// Event listener for "Proceed to Payment" button
proceedToPaymentBtn.addEventListener('click', async () => {
  
  if (!validateModalSignupForm()) {
    showCustomPopup(
      'Missing Information',
      'Please fill in all mandatory fields (Name, Email, Phone, TradingView Username) before proceeding.',
      'error'
    );
    return;
  }

  if (!selectedProduct || !selectedPlan) {
    showCustomPopup(
      'No Plan Selected',
      'Please select a subscription plan.',
      'error'
    );
    return;
  }

  let extraDays = 0; //Declare and initialize extraDays here
  if (selectedPlan.type === 'Half-Yearly') {
      extraDays = 30;
  } else if (selectedPlan.type === 'Annual') {
      extraDays = 60;
  }

  setButtonLoadingState(proceedToPaymentBtn, true); // Set loading state


  const userName = modalNameInput.value.trim();
  const userEmail = modalEmailInput.value.trim();
  // const userPhone = modalPhoneInput.value.trim();
  const userPhone = modalPhoneCountryCodeInput.value + modalPhoneInput.value.trim(); //concatenate country code
  const userTradingViewId = modalTradingviewInput.value.trim();
  const userReferralCode = modalReferralInput.value.trim();

  let applyReferralDiscount = false;
    if (userReferralCode) {
      const referringUser = await fetchCustMstByReferralCode(userReferralCode);
      if (!referringUser) {
        setButtonLoadingState(proceedToPaymentBtn, false);
        showCustomPopup('Invalid Referral Code',
        'The referral code you entered is not valid. Please check it and try again.','error');
          return;
      }
      if (referringUser.cust_tvid === userTradingViewId) {
      setButtonLoadingState(proceedToPaymentBtn, false);
      showCustomPopup('Invalid Referral Code','You cannot use your own referral code.','error');
      return;
      }
      applyReferralDiscount = true;
    }

// Recalculate final price based on referral discount
    const { finalPrice, basePrice, introDiscountApplied, referralDiscountApplied } = calculateFinalPrice(selectedPlan.usual_price, applyReferralDiscount);
    finalCalculatedPrice = finalPrice; // Update the global final calculated price
  
  const newReferralCode = nanoid(CONFIG.REFERRAL_CODE_LENGTH);

  // Validate if user exists in customer master
  const resdata = await fetchCustMstByTvid(userTradingViewId);
  let custData = resdata;
  if (custData) {
    // Existing user: Check if they've already used a referral code for a paid subscription
    if (userReferralCode) { // Only perform this check if a referral code is being applied in the current transaction
      const { data: existingPaidSubs, error: subsError } = await supabase
        .from('paid_subscriptions')
        .select('id') // We only need to know if any exist, so 'id' is sufficient
        .eq('cust_id', custData.id)
        .not('referred_by', 'is', null) // Check if referred_by is not null
        .eq('payment_status', 'received'); // Check for received payment status

      if (subsError) {
        console.error('Error checking existing paid subscriptions:', subsError);
        setButtonLoadingState(proceedToPaymentBtn, false);
        showCustomPopup('Error', 'An error occurred while checking your subscription history. Please try again.', 'error');
        return; // Stop execution
      }

      if (existingPaidSubs && existingPaidSubs.length > 0) {
        setButtonLoadingState(proceedToPaymentBtn, false);
        showCustomPopup('Referral Code Already Used', 'You have already used a referral code for a previous paid subscription. Only one referral code can be applied per user.', 'error');
        return; // Stop execution
      }
    }
  } else {
    //insert new paid user into customer master
    const { data, error } = await supabase.from('cust_master').insert({
      cust_email: userEmail,
      cust_phone: userPhone,
      cust_tvid: userTradingViewId,
      cust_name: userName,
      referral_code: newReferralCode,
      referred_by: userReferralCode || null,
    });
    custData = await fetchCustMstByTvid(userTradingViewId);

    if (error) {
      console.error('Supabase insert error:', error);
      let popupTitle = 'Error!';
      let popupMessage =
        'An unexpected error occurred during signup. Please try again.';
      if (error.code === '23505') {
        if (error.message.includes('mst_trial_cust_cust_email_key')) {
          popupTitle = 'Already Registered!';
          popupMessage =
            "It looks like you've already signed up with this email. Please check your email for activation instructions or contact support.";
        } else if (error.message.includes('mst_trial_cust_cust_tvid_key')) {
          popupTitle = 'Already Registered!';
          popupMessage =
            'This TradingView user is already registered. Please use a different one or contact support.';
        }
      } else if (error.code === '23503'){
            if(error.message.includes('mst_trial_cust_referred_by_fkey')){
              popupTitle = 'Invalid Referral Code';
              popupMessage = 'This referral code is invalid. Please use a different one or contact support.';
        }
      }
            setButtonLoadingState(proceedToPaymentBtn, false); // Remove loading state on error

      showCustomPopup(popupTitle, popupMessage, 'error');
      return;
    }
    // insert ends here
  }

  const { data: subscriptionData, error: subscriptionError } = await supabase
    .from('paid_subscriptions')
    .insert({
      cust_id: custData.id,
      cust_tvid: userTradingViewId,
      product_id: selectedProduct.id,
      plan_type: selectedPlan.type,
      amount_paid: finalCalculatedPrice,
      referral_code: newReferralCode,
      referred_by: userReferralCode || null,
      payment_status: 'pending',
      subscription_start_date: new Date().toISOString(),
      subscription_end_date: new Date(
      // Date.now() + (selectedPlan.duration_days + 15) * 24 * 60 * 60 * 1000
      Date.now() + (selectedPlan.duration_days + extraDays) * 24 * 60 * 60 * 1000
      ).toISOString(),
    });

  if (subscriptionError) {
    console.error('Supabase insert error:', subscriptionError);
    let popupTitle = 'Error!';
    let popupMessage =
      'An unexpected error occurred during subscription. Please try again.';
    if (subscriptionError.code === '23505') {
      if (
        subscriptionError.message.includes('paid_subscriptions_cust_email_key')
      ) {
        popupTitle = 'Already Subscribed!';
        popupMessage =
          "It looks like you've already subscribed with this email ID. Please check your email for activation instructions or contact support.";
      } else if (
        subscriptionError.message.includes('paid_subscriptions_cust_tvid_key')
      ) {
        popupTitle = 'Already Subscribed!';
        popupMessage =
          'The TradingView ID you entered is already registered for a subscription. Please use a different one or contact support.';
      }
    } else if (error.code === '23503'){
            if(error.message.includes('mst_trial_cust_referred_by_fkey')){
              popupTitle = 'Invalid Referral Code';
              popupMessage = 'This referral code is invalid. Please use a different one or contact support.';
        }
      }
        setButtonLoadingState(proceedToPaymentBtn, false); // Remove loading state on error
    showCustomPopup(popupTitle, popupMessage, 'error');
    //return;
  }
displayPaymentSummary(selectedPlan, finalPrice, basePrice, introDiscountApplied, referralDiscountApplied);
 
  //Show UPI QR Code and ID after submit is successfully saved in DB
  upiQrCode.classList.remove('blurred');
  if (upiIdDisplay) upiIdDisplay.classList.remove('hidden');
  // Scroll to the UPI payment section
    //   if (upiPaymentSection) {
    //   upiPaymentSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // }
// Scroll to the Payment Summary section
if (paymentDetailsSection) {
  paymentDetailsSection.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Changed block 'center' to 'start'
}

//UNWANTED REFERRAL COUNT LOGIC
  // if (userReferralCode) {
  //   const { error: updateError } = await supabase.rpc(
  //     'increment_referral_signup_count',
  //     { p_referral_code: userReferralCode }
  //   );
  //   if (updateError) {
  //     console.error('Error updating referral signup count:', updateError);
  //   }
  // }

  //subscriptionModal.classList.remove('active');
    setButtonLoadingState(proceedToPaymentBtn, false); // Remove loading state on success
  showCustomPopup(
    'Payment Initiated!',
    'Please complete your payment by scanning the UPI QR Code. After payment, use the Share Payment Confirmation button to share the confirmation screenshot along with transaction (Txn) ID and your details for quick activation.',
    'success'
  );

  // document.getElementById('modalSignupForm').reset();
  // selectedProduct = null;
  // selectedPlan = null;
  // finalCalculatedPrice = 0;
  // updateProceedToPaymentButtonState();
  //subscriptionModal.classList.remove('active'); // Close the subscription modal
  
  //Resetting form fields after successful submission and insert into DB
      // if (document.getElementById('modalSignupForm')) {
      //   document.getElementById('modalSignupForm').reset(); // Reset the form fields
      // }
      // selectedProduct = null; // Clear selected product
      // selectedPlan = null; // Clear selected plan
      // finalCalculatedPrice = 0; // Reset calculated price
  // updateProceedToPaymentButtonState(); // Update button state based on new empty form
  // Reset form fields ends here
  
 // if (planSelectionStep) planSelectionStep.style.display = 'block'; // Reset to plan selection step
 // if (checkoutDetailsStep) checkoutDetailsStep.style.display = 'none'; // Hide checkout details step
													 
//  paymentDetailsSection.style.display = 'none'; // Hide payment details section

  // Make form fields non-editable
  if (modalNameInput) modalNameInput.disabled = true;
  if (modalEmailInput) modalEmailInput.disabled = true;
  if (modalPhoneInput) modalPhoneInput.disabled = true;
  if (modalPhoneCountryCodeInput) modalPhoneCountryCodeInput.disabled = true;
  if (modalTradingviewInput) modalTradingviewInput.disabled = true;
  if (modalReferralInput) modalReferralInput.disabled = true;

  // Keep the "Proceed to Payment" button disabled
  proceedToPaymentBtn.disabled = true;
  
});

// New function to fetch customer by referral code
  async function fetchCustMstByReferralCode(referralCode) {
  try {
    const { data, error } = await supabase
    .from('cust_master')
      .select('id, cust_tvid, referral_code')
      .eq('referral_code', referralCode)
      .single(); // Expecting a single result or null

    if (error && error.code === 'PGRST116') { // PGRST116 is "No rows found"
    return null;
    }
    if (error) throw error;
    return data; // Will be null if no rows found
  } catch (error) {
  console.error('Error in fetching user by referral code:', error);
  return null;
  }
}
  
// Function to share payment confirmation
function sharePaymentConfirmation(method) {
  const userName = modalNameInput?.value.trim() || '';
  const userEmail = modalEmailInput?.value.trim() || '';
  const userPhone = modalPhoneCountryCodeInput.value + modalPhoneInput?.value.trim() || '';
  const userTradingViewId = modalTradingviewInput?.value.trim() || '';
  const selectedProductName = selectedProduct ? selectedProduct.name : 'N/A';
  const selectedPlanType = selectedPlan ? selectedPlan.type : 'N/A';
  const amountPaid = formatCurrency(finalCalculatedPrice);

  const message = `
Hello Cosmathic Team,

I have completed my payment for the ${selectedProductName} - ${selectedPlanType} plan.

Amount Paid: ${amountPaid}

My Details:
Name: ${userName}
Email: ${userEmail}
Phone: ${userPhone}
TradingView ID: ${userTradingViewId}

Please find the payment confirmation screenshot attached. Kindly activate my subscription.
											
Thank you!
    `.trim();
																																			   

  if (method === 'whatsapp') {
    const whatsappUrl = `https://wa.me/${CONFIG.EMAIL.CONTACT.PHONE.replace(
      /\s/g,
      ''
    )}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  } else if (method === 'email') {
    const emailSubject = encodeURIComponent(
      `Payment Confirmation for ${selectedProductName} - ${selectedPlanType} Plan`
    );
    const emailBody = encodeURIComponent(message);
    const mailtoUrl = `mailto:${CONFIG.EMAIL.SENDER}?subject=${emailSubject}&body=${emailBody}`;
    window.open(mailtoUrl, '_blank');
  }
}

shareWhatsappBtn.addEventListener('click', () =>
  sharePaymentConfirmation('whatsapp')
);
shareEmailBtn.addEventListener('click', () =>
  sharePaymentConfirmation('email')
);

function resetSubscriptionModal() {
  subscriptionModal.classList.remove('active');
  paymentDetailsSection.style.display = 'none';
  upiPaymentSection.style.display = 'none'; // Hide UPI section
  upiQrCode.classList.add('blurred'); // Re-blur QR code
  if (upiIdDisplay) upiIdDisplay.classList.add('hidden'); // Hide UPI ID display
																										  
		

  selectedProduct = null;
  selectedPlan = null;
  finalCalculatedPrice = 0;

  if (document.getElementById('modalSignupForm')) {
    document.getElementById('modalSignupForm').reset(); // Reset the form fields
  }

  // Re-enable form fields
  if (modalNameInput) modalNameInput.disabled = false;
  if (modalEmailInput) modalEmailInput.disabled = false;
  if (modalPhoneInput) modalPhoneInput.disabled = false;
  if (modalPhoneCountryCodeInput) modalPhoneCountryCodeInput.disabled = false;
  if (modalTradingviewInput) modalTradingviewInput.disabled = false;
  if (modalReferralInput) modalReferralInput.disabled = false;

  // Ensure "Proceed to Payment" button is enabled if form is valid, otherwise disabled
  setButtonLoadingState(proceedToPaymentBtn, false); // Reset loading state
  updateProceedToPaymentButtonState(); // Update button state based on new empty form

  // Reset to plan selection step
  if (planSelectionStep) planSelectionStep.style.display = 'block';
  if (checkoutDetailsStep) checkoutDetailsStep.style.display = 'none';
}

closeSubscriptionModalButton.addEventListener('click',resetSubscriptionModal);

//Old form fields and button reset logic below disabled as it's not working
// closeSubscriptionModalButton.addEventListener('click', () => {
//   subscriptionModal.classList.remove('active');
//   paymentDetailsSection.style.display = 'none';
//   selectedPlan = null;
//   if (planSelectionStep) planSelectionStep.style.display = 'block';
//   if (checkoutDetailsStep) checkoutDetailsStep.style.display = 'none';
//   if (document.getElementById('modalSignupForm'))
//     document.getElementById('modalSignupForm').reset();
//   updateProceedToPaymentButtonState();
// });

subscriptionModal.addEventListener('click', (e) => {
  if (e.target === subscriptionModal) {
    //Call reset function to consistently reset all relevant fields and buttons
    resetSubscriptionModal();
    
//Old reset logic below disabled
    // subscriptionModal.classList.remove('active');
    // paymentDetailsSection.style.display = 'none';
    // selectedPlan = null;
    // if (planSelectionStep) planSelectionStep.style.display = 'block';
    // if (checkoutDetailsStep) checkoutDetailsStep.style.display = 'none';
    // if (document.getElementById('modalSignupForm'))
    //   document.getElementById('modalSignupForm').reset();
    // updateProceedToPaymentButtonState();
  }
}); 

// END -- NEW CARDS Implementation

// OLD Function to process signup FREE TRIAL STARTS HERE

// async function processSignup(email, phone, tradingview, referredByCode) {
//     // Generate unique referral code
//     const newReferralCode = nanoid(CONFIG.REFERRAL_CODE_LENGTH);
    
//     //Use TV ID as new referral code
//     //const newReferralCode = tradingview;

//     // Insert new user data
//     const { data, error: insertError } = await supabase
//       .from('cust_master')
//       .insert({
//         cust_email: email,
//         cust_phone: phone,
//         cust_tvid: tradingview,
//         referral_code: newReferralCode,
//         referred_by: referredByCode || null
//       }); // Use .select() to return the inserted data
  
//   if (insertError) {
//     console.error('Error inserting new user:', insertError);
//     gtag('event', 'sign_up_error', {
//       'event_category': 'error',
//       'event_label': insertError.message
//     });
//     return { success: false, error: insertError };
//   }


//   return { success: true, email, tradingview, newReferralCode };
// }


// Function to send email implemented here

//------Send email function ends here

// document.getElementById('signupForm').addEventListener('submit', async(e) => {
//     e.preventDefault();
    
//     const email = document.getElementById('email').value;
//     const phone = document.getElementById('phone').value;
//     const tradingview = document.getElementById('tradingview').value;
//     const referredByCode = document.getElementById('referral')?.value;

//     // Track form submission attempt
//     gtag('event', 'sign_up_attempt', {
//         'event_category': 'engagement',
//         'event_label': 'trial_signup'
//     });

//     // Process signup (database operations)
//     const signupResult = await processSignup(email, phone, tradingview, referredByCode);

//     if (signupResult.success) {
//         console.log('User signed up successfully:', signupResult);

//         // Asynchronously send welcome email (does not block the main thread)
//         //sendWelcomeEmail(signupResult.email, signupResult.tradingview, signupResult.newReferralCode)
//         //.catch(emailError => console.error('Failed to send welcome email:', emailError)); // Catch any unhandled errors from email sending


//         showPopup(); // Show success popup
//         e.target.reset(); // Reset form

//         // Track successful form submission
//         gtag('event', 'sign_up_success', {
//             'event_category': 'conversion',
//             'event_label': 'trial_signup'
//         });
//     } else {
//         alert('An error occurred during signup. Please try again.'); // Alert user about signup failure
//     }

// OLD function to process signup FREE TRIAL

// NEW Free Trial Signup Form Submission
/*const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phoneCountryCode = document.getElementById('phoneCountryCode').value;
    const phone =
      phoneCountryCode + document.getElementById('phone').value.trim();

    // const phone = document.getElementById('phone').value.trim();
    const tradingview = document.getElementById('tradingview').value.trim();
    const referral = document.getElementById('referral').value.trim();

    const newReferralCode = nanoid(CONFIG.REFERRAL_CODE_LENGTH);

    const { data, error } = await supabase.from('cust_master').insert({
      cust_email: email,
      cust_phone: phone,
      cust_tvid: tradingview,
      cust_name: name,
      referral_code: newReferralCode,
      referred_by: referral || null,
    });

    if (error) {
      console.error('Supabase insert error:', error);
      console.log('Full error object:', error); // Add this line
      let popupTitle = 'Error!';
      let popupMessage =
        'An unexpected error occurred during signup. Please try again.';
      if (error.code === '23505') {
        if (error.message.includes('mst_trial_cust_cust_email_key')) {
          popupTitle = 'Already Registered!';
          popupMessage =
            "It looks like you've already signed up with this email. Please check your email for activation instructions or contact support.";
        } else if (error.message.includes('mst_trial_cust_cust_tvid_key')) {
          popupTitle = 'Already Registered!';
          popupMessage =
            'The TradingView ID you entered is already registered. Please use a different one or contact support.';
        }
      } else if (error.code === '23503'){
            if(error.message.includes('mst_trial_cust_referred_by_fkey')){
              popupTitle = 'Invalid Referral Code';
              popupMessage = 'This referral code is invalid. Please use a different one or contact support.';
        }
      }
      showCustomPopup(popupTitle, popupMessage, 'error');
      return;
    }

    //UNWANTED REFERRAL COUNT LOGIC
    // if (referral) {
    //   const { error: updateError } = await supabase.rpc(
    //     'increment_referral_signup_count',
    //     { p_referral_code: referral }
    //   );
    //   if (updateError) {
    //     console.error('Error updating referral signup count:', updateError);
    //   }
    // }

    // sendWelcomeEmail(email, tradingview, newReferralCode);

    showCustomPopup(
      'Thank You!',
      "We've received your request. Please check your email within 24 hours for activation instructions.",
      'success'
    );
    signupForm.reset();
  });
} */


//REMOVE AFTER TESTING NEW CODE

    // // Track form submission attempt
    // gtag('event', 'sign_up_attempt', {
    //     'event_category': 'engagement',
    //     'event_label': 'trial_signup'
    // });
    
    // const { data, error } = await supabase
    //   .from('cust_master')
    //   .insert({ cust_email: email, cust_phone: phone, cust_tvid: tradingview });
    
    // if (error) {
    //     console.error(error);
    //     alert('An error occurred. Please try again.');
        
    //     // Track form submission error
    //     gtag('event', 'sign_up_error', {
    //         'event_category': 'error',
    //         'event_label': error.message
    //     });
    // } else {
    //     console.log(data);
    //     showPopup();
    //     //alert('Thank you for subscribing! Please check your email in 24 hours for activation instructions.');
        
    //     // Track successful form submission
    //     gtag('event', 'sign_up_success', {
    //         'event_category': 'conversion',
    //         'event_label': 'trial_signup'
    //     });
        
    //     // Reset form
    //     e.target.reset();
    // }

//REMOVE AFTER TESTING NEW CODE

// });

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
function setupProductCardObservation() {
  document.querySelectorAll('.indicator-card').forEach((card) => {
    observer.observe(card);
  });
}



// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        //document.querySelector(this.getAttribute('href')).scrollIntoView({
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + (window.pageYOffset || window.scrollY)  - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                    
            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
            }
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
    "Intuitive & Configurable",
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


// Initialize Lucide icons after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    renderTestimonials();
    renderProductCards();
    setupProductCardObservation();
});


async function fetchCustMstByTvid(tid) {
  try {
    const { data, error } = await supabase
      .from('cust_master')
      .select('*')
      .eq('cust_tvid', tid);

    if (error) throw error;

    if (data && data.length > 0) {
      console.log('User Fetched: ', data[0]);
      return data[0];
    } else {
      console.log('No user found with cust_tvid:', tid);
      return null;
    }
  } catch (error) {
    console.log('Error in fetching user:', error);
    return null;
  }
}

// Insert paid subscription plan of customer

const modalSignupForm = document.getElementById('modalSignupForm');
if (modalSignupForm) {
  modalSignupForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default submission of the modal form
  });
}