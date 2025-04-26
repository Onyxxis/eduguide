document.addEventListener('DOMContentLoaded', function() {
    // Gestion de la sidebar mobile
    const sidebarToggles = document.querySelectorAll('.sidebar-toggle');
    const sidebar = document.querySelector('.module-sidebar');
    
    if (sidebarToggles.length > 0) {
        sidebarToggles.forEach(btn => {
            btn.addEventListener('click', () => {
                sidebar.classList.toggle('open');
            });
        });
    }
    
    // Simulation du chargement du module selon l'ID dans l'URL
    if (window.location.pathname.includes('module.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const moduleId = urlParams.get('id') || 1;
        
        // Charger le module correspondant
        loadModule(moduleId);
        
        // Gestion des liens des modules
        const moduleLinks = document.querySelectorAll('.module-link');
        moduleLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const id = this.getAttribute('data-id');
                loadModule(id);
                history.pushState(null, null, `module.html?id=${id}`);
                
                // Mettre à jour l'état actif
                moduleLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Navigation entre modules
        document.querySelector('.prev-module')?.addEventListener('click', function(e) {
            e.preventDefault();
            const prevId = parseInt(moduleId) - 1;
            if (prevId >= 1) {
                loadModule(prevId);
                history.pushState(null, null, `module.html?id=${prevId}`);
                updateActiveLink(prevId);
            }
        });
        
        document.querySelector('.next-module')?.addEventListener('click', function(e) {
            e.preventDefault();
            const nextId = parseInt(moduleId) + 1;
            if (nextId <= 9) { // 9 modules au total
                loadModule(nextId);
                history.pushState(null, null, `module.html?id=${nextId}`);
                updateActiveLink(nextId);
            }
        });
    }
    
    function loadModule(id) {
        // Ici, vous devriez faire une requête AJAX pour charger le vrai contenu
        console.log(`Chargement du module ${id}`);
        document.title = `Module ${id} - Marketing Digital`;
        document.querySelector('.module-header h2').textContent = `Module ${id}: ${getModuleTitle(id)}`;
        document.querySelector('.module-pdf-viewer iframe').src = `assets/module/module${id}.pdf`;
    }
    
    function updateActiveLink(id) {
        const links = document.querySelectorAll('.module-link');
        links.forEach(link => link.classList.remove('active'));
        document.querySelector(`.module-link[data-id="${id}"]`).classList.add('active');
    }
    
    function getModuleTitle(id) {
        const titles = {
            1: "Introduction au Marketing Digital",
            2: "Stratégie de Contenu",
            3: "SEO et Référencement Naturel",
            4: "Publicité sur les Réseaux Sociaux",
            5: "Email Marketing",
            6: "Analyse des Données",
            7: "Marketing d'Influence",
            8: "Automatisation du Marketing",
            9: "Stratégie Intégrée"
        };
        return titles[id] || "Module inconnu";
    }
});