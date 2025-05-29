// script.js
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');

burger.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// Анимация при скролле
document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    fadeElements.forEach(el => observer.observe(el));
});

// Параллаксный эффект
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const y = window.scrollY;
        section.style.transform = `translateY(${y * 0.2}px)`;
    });
});

// Анимация курсора
let canvas, ctx, particles = [], mouse = { x: 0, y: 0 };

function initCanvas() {
    canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    ctx = canvas.getContext('2d');
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.draw();
        p.update(mouse);
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 2 + 1;
        this.alpha = 1;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 204, ${this.alpha})`;
        ctx.fill();
    }

    update(mouse) {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.01;

        if (this.alpha <= 0) {
            this.reset(mouse);
        }
    }

    reset(mouse) {
        this.x = mouse.x;
        this.y = mouse.y;
        this.alpha = 1;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
    }
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    for (let i = 0; i < 5; i++) {
        particles.push(new Particle(mouse.x, mouse.y));
    }
});

for (let i = 0; i < 50; i++) {
    particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
}

initCanvas();

// Звук
const audio = document.getElementById("background-audio");
audio.volume = 0.1;
audio.play();
