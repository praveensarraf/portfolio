"use strict";

// scrollTop
window.addEventListener('scroll', function (){
    const scrollTop = document.getElementById('scrollTop');

    if(window.scrollY >= 560){
        scrollTop.classList.add('showScrollTop');
    } else {
        scrollTop.classList.remove('showScrollTop');
    }

    scrollTop.addEventListener('click', function(){
        window.scrollTo({top: 0, behavior: 'smooth'});
    })
});

// Navbar

document.addEventListener('DOMContentLoaded', () => {
    const listItems = document.querySelectorAll('nav.navigation ul .list');
    const humburgerIcon = document.querySelector('nav.navigation .logo i.humburger');
    const menuLinks = document.querySelector('nav.navigation ul#menuLinks');
    const barIcon = document.querySelector('nav.navigation .logo i');
    const overlay = document.getElementById('overlay');

    function activateLink(event) {
        listItems.forEach(item => item.classList.remove('active'));
        event.currentTarget.classList.add('active');
    }

    function toggleMenu() {
        const isActive = menuLinks.classList.contains('active');
        
        menuLinks.classList.toggle('active', !isActive);
        overlay.classList.toggle('active', !isActive);
        document.body.classList.toggle('menu-open', !isActive);
        barIcon.classList.toggle('fa-bars', isActive);
        barIcon.classList.toggle('fa-xmark', !isActive);
    }

    function closeMenu() {
        menuLinks.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        barIcon.classList.remove('fa-xmark');
        barIcon.classList.add('fa-bars');
    }

    listItems.forEach(item => item.addEventListener('click', (event) => {
        activateLink(event);
        setTimeout(closeMenu, 700);
    }));

    humburgerIcon.addEventListener('click', toggleMenu);

    overlay.addEventListener('click', closeMenu);
});



// ---------------------------------------------------------------------------

// Main Banner Section

const span = document.querySelector('h1.designation span.gradientText');
const designations = ["MERN Stack Developer","Full Stack Web Developer", "Freelancer", "Software Developer"];
let currentIndex = 0;
let charIndex = 0;
let isDeleting = false;
let timeout

function type() {
    const currentDesignation = designations[currentIndex];

    if (isDeleting) {
        span.textContent = currentDesignation.substring(0, charIndex--);

        if (charIndex < 0) {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % designations.length;
            timeout = setTimeout(type, 1000);
        } else {
            timeout = setTimeout(type, 100);
        }
    } else {
        span.textContent = currentDesignation.substring(0, charIndex++);
        if (charIndex > currentDesignation.length) {
            isDeleting = true;
            timeout = setTimeout(type, 2000);
        } else {
            timeout = setTimeout(type, 100);
        }
    }
}
type();


// Main Banner Section for Canvas

let banner = document.querySelector('.banner');
let canvas = document.getElementById('dotsCanvas');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const ctx = canvas.getContext('2d');
let dots = [];
const arrayColors = ['#eee', '#545454', '#596d91', '#bb5a68', '#696541'];

for (let index = 0; index < 50; index++) {
    dots.push({
        x:  Math.floor(Math.random() * canvas.width),
        y:  Math.floor(Math.random() * canvas.height),
        size: Math.random() * 3 + 5,
        color: arrayColors[Math.floor(Math.random()* 5)]
    });
}

const drawDots = () => {
    dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI*2);
        ctx.fill();
    })
}
drawDots();

banner.addEventListener('mousemove', (event) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();

    let mouse = {
        x:  event.pageX - banner.getBoundingClientRect().left,
        y:  event.pageY - banner.getBoundingClientRect().top
    }

    dots.forEach(dot => {
        let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
        if(distance < 300){
            ctx.strokeStyle = dot.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    })
});

banner.addEventListener('mouseout', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
});

window.addEventListener('resize', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = banner.offsetWidth;
    canvas.height = banner.offsetHeight;

    dots = [];
    for (let index = 0; index < 50; index++) {
        dots.push({
            x:  Math.floor(Math.random() * canvas.width),
            y:  Math.floor(Math.random() * canvas.height),
            size: Math.random() * 3 + 5,
            color: arrayColors[Math.floor(Math.random()* 5)]
        });
    }
    drawDots();
});


// Contact Section (Form Validation)

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const fullName = document.getElementById('name');
    const email = document.getElementById('email');
    const country = document.getElementById('country'); //select tag
    const number = document.getElementById('number');
    const textarea = document.getElementById('message');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', e => {
        e.preventDefault();
        validateInputs();
    });

    const setError = (element, message) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    };

    const setSuccess = element => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    };

    const isValidEmail = email => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email.toLowerCase());
    };

    const validateInputs = () => {
        const nameValue = fullName.value.trim();
        const emailValue = email.value.trim();
        const countryValue = country.value;
        const numberValue = number.value.trim();
        const messageValue = textarea.value.trim();

        let isFormValid = true;

        if (nameValue === '') {
            setError(fullName, 'Name is required');
            isFormValid = false;
        } else {
            setSuccess(fullName);
        }

        if (emailValue === '') {
            setError(email, 'Email is required');
            isFormValid = false;
        } else if (!isValidEmail(emailValue)) {
            setError(email, 'Provide a valid email address');
            isFormValid = false;
        } else {
            setSuccess(email);
        }

        if (countryValue === '' || countryValue === 'Select Country') {
            setError(country, 'Country is required');
            isFormValid = false;
        } else {
            setSuccess(country);
        }

        if (numberValue === '') {
            setError(number, 'Mobile number is required');
            isFormValid = false;
        } else if (!/^\d{5,13}$/.test(numberValue)) {
            setError(number, 'Mobile number must be between 5 and 13 digits');
            isFormValid = false;
        } else if (/[^0-9]/.test(numberValue)) {
            setError(number, 'Mobile number must contain only digits');
            isFormValid = false;
        } else {
            setSuccess(number);
        }

        if (messageValue === '') {
            setError(textarea, 'Please provide your valuable message');
            isFormValid = false;
        } else {
            setSuccess(textarea);
        }

        if (isFormValid) {
            form.reset();
            successMessage.style.display = 'block';

            setTimeout(() => {
                successMessage.style.display = 'none';

                document.querySelectorAll('.input-control').forEach(control => {
                    control.classList.remove('success');
                });
            }, 3000);
        }
    };
});
