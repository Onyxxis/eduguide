// Script principal pour la page d'accueil
document.addEventListener('DOMContentLoaded', function() {

    // Gestion des modales
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const closeModals = document.querySelectorAll('.close-modal');
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    const heroCta = document.getElementById('hero-cta');
    const bottomCta = document.getElementById('bottom-cta');

    // Ouvrir modale de connexion
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            loginModal.classList.add('active');
        });
    }

    // Ouvrir modale d'inscription
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            registerModal.classList.add('active');
        });
    }

    // CTA de la page
    if (heroCta) {
        heroCta.addEventListener('click', function() {
            registerModal.classList.add('active');
        });
    }

    if (bottomCta) {
        bottomCta.addEventListener('click', function() {
            registerModal.classList.add('active');
        });
    }

    // Fermer les modales
    closeModals.forEach(btn => {
        btn.addEventListener('click', function() {
            loginModal.classList.remove('active');
            registerModal.classList.remove('active');
        });
    });

    // Basculer entre connexion et inscription
    if (switchToRegister) {
        switchToRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.remove('active');
            registerModal.classList.add('active');
        });
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            registerModal.classList.remove('active');
            loginModal.classList.add('active');
        });
    }

    // Fermer la modale en cliquant à l'extérieur
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
        if (e.target === registerModal) {
            registerModal.classList.remove('active');
        }
    });

    // Animation des cercles de progression
    const progressCircles = document.querySelectorAll('.progress-circle');
    progressCircles.forEach(circle => {
        const percent = circle.getAttribute('data-percent');
        const fill = circle.querySelector('.progress-fill');
        const radius = fill.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        
        fill.style.strokeDasharray = circumference;
        fill.style.strokeDashoffset = circumference - (percent / 100) * circumference;
    });

    // Smooth scrolling pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Vérification de la connexion
    checkAuthStatus();
});

// Fonction pour vérifier l'état d'authentification
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn && window.location.pathname.endsWith('index.html')) {
        window.location.href = 'dashboard.html';
    } else if (!isLoggedIn && window.location.pathname.endsWith('dashboard.html')) {
        window.location.href = 'index.html';
    }
}

// Gestion du chargement des données du tableau de bord
function loadDashboardData() {
    // Simuler le chargement des données
    setTimeout(() => {
        // Mettre à jour les données de progression
        updateProgressData();
        
        // Charger les cours recommandés
        loadRecommendedCourses();
        
        // Charger les événements à venir
        loadUpcomingEvents();
        
        // Charger les opportunités d'emploi
        loadJobOpportunities();
    }, 1000);
}

function updateProgressData() {
    // Simuler des données de progression
    const progressData = {
        profileCompletion: 55,
        testsCompleted: 0,
        coursesCompleted: 0
    };
    
    // Mettre à jour les cercles de progression
    document.querySelectorAll('.progress-circle').forEach(circle => {
        const type = circle.closest('.progress-item').querySelector('p').textContent;
        let percent = 0;
        
        if (type.includes('Profil')) percent = progressData.profileCompletion;
        if (type.includes('Tests')) percent = progressData.testsCompleted;
        if (type.includes('Formations')) percent = progressData.coursesCompleted;
        
        circle.setAttribute('data-percent', percent);
        circle.querySelector('.progress-text').textContent = `${percent}%`;
        
        const fill = circle.querySelector('.progress-fill');
        const radius = fill.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        
        fill.style.strokeDasharray = circumference;
        fill.style.strokeDashoffset = circumference - (percent / 100) * circumference;
    });
}

function loadRecommendedCourses() {
    // Simuler des données de cours
    const courses = [
        {
            title: "Comptabilité Générale",
            description: "Maîtrisez les bases de la comptabilité : bilans, journaux, comptes et écritures.",
            modules: 10,
            duration: 25,
            image: "assets/compta1.jpg"
        },
        {
            title: "Gestion Financière",
            description: "Apprenez à gérer les budgets, analyser les coûts et piloter la performance financière.",
            modules: 9,
            duration: 22,
            image: "assets/compta2.jpg"
        }        
    ];
    
    const container = document.querySelector('.courses-grid');
    if (container) {
        container.innerHTML = courses.map(course => `
            <div class="course-card">
                <div class="course-image" style="background-image: url('${course.image}')"></div>
                <div class="course-info">
                    <h4>${course.title}</h4>
                    <p>${course.description}</p>
                    <div class="course-meta">
                        <span><i class="fas fa-play-circle"></i> ${course.modules} modules</span>
                        <span><i class="fas fa-clock"></i> ${course.duration}h</span>
                    </div>
                    <button class="btn small">Commencer</button>
                </div>
            </div>
        `).join('');
    }
}

function loadUpcomingEvents() {
    // Simuler des données d'événements
    const events = [
        {
            title: "Webinaire: Orientation professionnelle",
            date: "15",
            month: "Juin",
            time: "10:00 - 12:00"
        },
        {
            title: "Atelier: Création de CV",
            date: "20",
            month: "Juin",
            time: "14:00 - 16:00"
        }
    ];
    
    const container = document.querySelector('.events-list');
    if (container) {
        container.innerHTML = events.map(event => `
            <div class="event-item">
                <div class="event-date">
                    <span class="day">${event.date}</span>
                    <span class="month">${event.month}</span>
                </div>
                <div class="event-info">
                    <h4>${event.title}</h4>
                    <p><i class="fas fa-clock"></i> ${event.time}</p>
                    <button class="btn small">S'inscrire</button>
                </div>
            </div>
        `).join('');
    }
}

function loadJobOpportunities() {
    // Simuler des données d'emploi
    const jobs = [
        {
            title: "Développeur Frontend",
            company: "Digital Solutions Togo",
            location: "Lomé",
            type: "Stage",
            logo: "assets/company1.png"
        },
        {
            title: "Assistant Marketing",
            company: "AfriMarket",
            location: "Kara",
            type: "Temps partiel",
            logo: "assets/company2.png"
        }
    ];
    
    const container = document.querySelector('.jobs-list');
    if (container) {
        container.innerHTML = jobs.map(job => `
            <div class="job-item">
                <div class="job-logo">
                    <img src="${job.logo}" alt="${job.company}">
                </div>
                <div class="job-info">
                    <h4>${job.title}</h4>
                    <p class="company">${job.company}</p>
                    <p class="location"><i class="fas fa-map-marker-alt"></i> ${job.location}</p>
                    <div class="job-type">${job.type}</div>
                </div>
            </div>
        `).join('');
    }
}

// Appeler cette fonction lorsque le tableau de bord est chargé
document.addEventListener('DOMContentLoaded', function() {
    if (document.body.classList.contains('dashboard')) {
        loadDashboardData();
    }
});