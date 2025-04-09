// Gestion de l'authentification
document.addEventListener('DOMContentLoaded', function() {
    // Sélection des formulaires
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const logoutBtn = document.getElementById('logout-btn');

    // Soumission du formulaire de connexion
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Validation simple
            if (!email || !password) {
                alert('Veuillez remplir tous les champs');
                return;
            }
            
            // Simuler une connexion réussie
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            
            // Rediriger vers le tableau de bord
            window.location.href = 'dashboard.html';
        });
    }

    // Soumission du formulaire d'inscription
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            const role = document.getElementById('register-role').value;
            
            // Validation
            if (!name || !email || !password || !confirmPassword || !role) {
                alert('Veuillez remplir tous les champs');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Les mots de passe ne correspondent pas');
                return;
            }
            
            if (password.length < 6) {
                alert('Le mot de passe doit contenir au moins 6 caractères');
                return;
            }
            
            // Simuler une inscription réussie
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', name);
            localStorage.setItem('userRole', role);
            
            // Rediriger vers le tableau de bord
            window.location.href = 'dashboard.html';
        });
    }

    // Déconnexion
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            localStorage.removeItem('userRole');
            window.location.href = 'index.html';
        });
    }

    // Afficher les informations utilisateur dans le tableau de bord
    displayUserInfo();
});

// Afficher les informations de l'utilisateur connecté
function displayUserInfo() {
    const userNameElement = document.getElementById('username');
    const userRoleElement = document.getElementById('user-role');
    const userGreetingElement = document.getElementById('user-greeting');
    
    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');
    
    if (userNameElement && userName) {
        userNameElement.textContent = userName;
    }
    
    if (userRoleElement && userRole) {
        userRoleElement.textContent = userRole === 'student' ? 'Étudiant' : 'Professionnel';
    }
    
    if (userGreetingElement && userName) {
        userGreetingElement.textContent = userName.split(' ')[0]; // Afficher seulement le prénom
    }
}