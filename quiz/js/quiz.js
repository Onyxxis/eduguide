document.addEventListener('DOMContentLoaded', function() {
    // Questions du quiz
    const quizQuestions = [
            {
                question: "Qu'est-ce qu'un bilan comptable ?",
                options: [
                    "Un document qui présente les flux de trésorerie",
                    "Une photographie du patrimoine de l'entreprise à un instant donné",
                    "Un tableau des produits et charges de l'exercice",
                    "Un état des créances et dettes de l'entreprise"
                ],
                correctAnswer: 1
            },
            {
                question: "Lequel de ces éléments appartient au passif du bilan ?",
                options: [
                    "Les immobilisations",
                    "Le stock de marchandises",
                    "Le capital social",
                    "Les clients"
                ],
                correctAnswer: 2
            },
            {
                question: "Qu'est-ce que le principe de la partie double en comptabilité ?",
                options: [
                    "Chaque opération affecte deux comptes de même nature",
                    "Toute écriture doit être justifiée par deux pièces comptables",
                    "Toute opération est inscrite au débit d'un compte et au crédit d'un autre",
                    "Les comptes doivent être vérifiés par deux personnes différentes"
                ],
                correctAnswer: 2
            },
            {
                question: "Que représente un actif dans un bilan comptable ?",
                options: [
                    "Les dettes de l'entreprise",
                    "Les charges engagées durant l'exercice",
                    "Les ressources propres de l'entreprise",
                    "Les biens et droits possédés par l'entreprise"
                ],
                correctAnswer: 3
            },
            {
                question: "Quel document comptable résume les charges et les produits d’une entreprise ?",
                options: [
                    "Le journal",
                    "Le compte de résultat",
                    "Le bilan",
                    "Le livre d’inventaire"
                ],
                correctAnswer: 1
            },
            {
                question: "Que signifie le sigle TVA ?",
                options: [
                    "Taxe à Valeur Ajoutée",
                    "Taux de Vente Actuel",
                    "Tarif Variable Appliqué",
                    "Taxe sur la Valeur d’Acquisition"
                ],
                correctAnswer: 0
            },
            {
                question: "Quel logiciel est le plus couramment utilisé pour la comptabilité de base ?",
                options: [
                    "Photoshop",
                    "Excel",
                    "Word",
                    "Premiere Pro"
                ],
                correctAnswer: 1
            },
            {
                question: "Qu'est-ce qu'un compte de tiers ?",
                options: [
                    "Un compte bancaire externe",
                    "Un compte qui regroupe les clients et les fournisseurs",
                    "Un compte qui concerne les stocks",
                    "Un compte de charges"
                ],
                correctAnswer: 1
            },
            {
                question: "Comment appelle-t-on l’opération qui consiste à comparer les mouvements bancaires avec les comptes comptables ?",
                options: [
                    "Le lettrage",
                    "La ventilation",
                    "La saisie",
                    "Le rapprochement bancaire"
                ],
                correctAnswer: 3
            },
            {
                question: "Quelle écriture comptable faut-il passer pour une vente à crédit ?",
                options: [
                    "Débit : Banque / Crédit : Vente",
                    "Débit : Client / Crédit : Vente",
                    "Débit : Vente / Crédit : Client",
                    "Débit : Fournisseur / Crédit : Banque"
                ],
                correctAnswer: 1
            }
        ];
    

    // Éléments du DOM
    const quizForm = document.getElementById('quiz-form');
    const questionsContainer = document.getElementById('questions-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const progressBar = document.getElementById('quiz-progress');
    const progressText = document.getElementById('progress-text');

    // Variables d'état
    let currentQuestion = 0;
    const userAnswers = new Array(quizQuestions.length).fill(null);

    // Initialisation du quiz
    function initQuiz() {
        // Création des questions dans le DOM
        quizQuestions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = `question-container ${index === 0 ? 'active' : ''}`;
            questionDiv.dataset.questionIndex = index;

            let optionsHTML = '';
            question.options.forEach((option, i) => {
                optionsHTML += `
                    <div class="option" data-option-index="${i}">
                        <input type="radio" name="question-${index}" id="q${index}-option${i}" value="${i}">
                        <label for="q${index}-option${i}" class="option-label">
                            <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                            ${option}
                        </label>
                    </div>
                `;
            });

            questionDiv.innerHTML = `
                <h3 class="question-text">Question ${index + 1}: ${question.question}</h3>
                <div class="options-container">
                    ${optionsHTML}
                </div>
            `;
            questionsContainer.appendChild(questionDiv);
        });

        // Mise à jour de l'interface
        updateNavigation();
    }

    // Gestion des événements
    function setupEventListeners() {
        // Sélection des options
        document.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', function() {
                const questionIndex = parseInt(this.closest('.question-container').dataset.questionIndex);
                const optionIndex = parseInt(this.dataset.optionIndex);
                
                // Enregistrer la réponse
                userAnswers[questionIndex] = optionIndex;
                
                // Mettre à jour l'affichage
                document.querySelectorAll(`.question-container[data-question-index="${questionIndex}"] .option`).forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
                
                // Activer le bouton suivant si ce n'est pas la dernière question
                if (questionIndex !== quizQuestions.length - 1) {
                    nextBtn.disabled = false;
                } else {
                    submitBtn.style.display = 'inline-flex';
                    nextBtn.style.display = 'none';
                }
            });
        });

        // Navigation
        prevBtn.addEventListener('click', goToPreviousQuestion);
        nextBtn.addEventListener('click', goToNextQuestion);
        
        // Soumission du quiz
        quizForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showResults();
        });
    }

    // Navigation entre questions
    function goToPreviousQuestion() {
        if (currentQuestion > 0) {
            currentQuestion--;
            updateQuestionDisplay();
            updateNavigation();
        }
    }

    function goToNextQuestion() {
        if (currentQuestion < quizQuestions.length - 1) {
            currentQuestion++;
            updateQuestionDisplay();
            updateNavigation();
        }
    }

    // Mise à jour de l'affichage
    function updateQuestionDisplay() {
        document.querySelectorAll('.question-container').forEach((q, i) => {
            q.classList.toggle('active', i === currentQuestion);
        });
    }

    function updateNavigation() {
        // Bouton précédent
        prevBtn.disabled = currentQuestion === 0;
        
        // Bouton suivant
        nextBtn.disabled = currentQuestion === quizQuestions.length - 1 || userAnswers[currentQuestion] === null;
        
        // Progression
        const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `Question ${currentQuestion + 1}/${quizQuestions.length}`;
        
        // Affichage du bouton de soumission
        if (currentQuestion === quizQuestions.length - 1) {
            submitBtn.style.display = userAnswers[currentQuestion] !== null ? 'inline-flex' : 'none';
            nextBtn.style.display = 'none';
        } else {
            submitBtn.style.display = 'none';
            nextBtn.style.display = 'inline-flex';
        }
    }

    // Affichage des résultats
    function showResults() {
        // Calcul du score
        let score = 0;
        quizQuestions.forEach((question, index) => {
            if (userAnswers[index] === question.correctAnswer) {
                score++;
            }
        });

        // Affichage avec SweetAlert
        Swal.fire({
            title: 'Résultats du quiz',
            html: `
                <div style="font-size: 24px; margin: 20px 0;">
                    Votre score: <strong>${score}/${quizQuestions.length}</strong>
                </div>
                <div style="font-size: 16px; color: #666;">
                    ${getResultMessage(score, quizQuestions.length)}
                </div>
            `,
            icon: score >= quizQuestions.length / 2 ? 'success' : 'error',
            confirmButtonText: 'Terminer',
            confirmButtonColor: '#4a6bff',
            backdrop: `
                rgba(0,0,0,0.7)
                url("https://media.giphy.com/media/3o7TKUM3IgJBX2as9O/giphy.gif")
                center top
                no-repeat
            `
        });
    }

    // Message personnalisé selon le score
    function getResultMessage(score, total) {
        const percentage = (score / total) * 100;
        
        if (percentage >= 80) {
            return "Excellent travail ! Vous maîtrisez bien les bases de la comptabilité.";
        } else if (percentage >= 60) {
            return "Bon résultat ! Vous avez une bonne compréhension des concepts de base.";
        } else if (percentage >= 40) {
            return "Pas mal ! Revoyez quelques concepts pour améliorer votre score.";
        } else {
            return "Continuez à pratiquer ! Consultez les ressources pour mieux comprendre les bases.";
        }
    }

    // Démarrer le quiz
    initQuiz();
    setupEventListeners();
});