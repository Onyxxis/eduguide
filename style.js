document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.nav-slider');
    const pages = document.querySelectorAll('.nav-page');
    const dots = document.querySelectorAll('.nav-dot');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    
    let currentPage = 0;
    
    function updateNavigation() {
        slider.style.transform = `translateX(-${currentPage * 100}%)`;
        
        // Mettre à jour les points
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPage);
        });
        
        // Gérer la visibilité des flèches
        leftArrow.style.visibility = currentPage === 0 ? 'hidden' : 'visible';
        rightArrow.style.visibility = currentPage === pages.length - 1 ? 'hidden' : 'visible';
    }
    
    // Navigation avec flèches
    leftArrow.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updateNavigation();
        }
    });
    
    rightArrow.addEventListener('click', () => {
        if (currentPage < pages.length - 1) {
            currentPage++;
            updateNavigation();
        }
    });
    
    // Navigation avec points
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentPage = parseInt(dot.dataset.page);
            updateNavigation();
        });
    });
    
    // Initialisation
    updateNavigation();
});