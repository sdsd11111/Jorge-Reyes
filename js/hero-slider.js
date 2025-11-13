class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.hero-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.autoPlay = true;
        this.slideDuration = 4000; // 4 segundos
        
        this.init();
    }
    
    init() {
        // Mostrar el primer slide
        this.showSlide(0);
        
        // Iniciar autoplay
        this.startAutoPlay();
        
        // Agregar event listeners para los indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Agregar event listeners para las flechas de navegación
        const prevButton = document.querySelector('.slider-arrow.prev');
        const nextButton = document.querySelector('.slider-arrow.next');
        
        if (prevButton) {
            prevButton.addEventListener('click', () => this.prevSlide());
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => this.nextSlide());
        }
        
        // Pausar autoplay al hacer hover
        const slider = document.querySelector('.hero-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => this.pauseAutoPlay());
            slider.addEventListener('mouseleave', () => this.startAutoPlay());
            
            // Soporte para touch en dispositivos móviles
            let touchStartX = 0;
            let touchEndX = 0;
            
            slider.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                this.pauseAutoPlay();
            }, { passive: true });
            
            slider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
                this.startAutoPlay();
            }, { passive: true });
        }
    }
    
    handleSwipe() {
        const swipeThreshold = 50; // Mínimo píxeles para considerar un deslizamiento
        const difference = touchStartX - touchEndX;
        
        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                this.nextSlide(); // Deslizamiento hacia la izquierda
            } else {
                this.prevSlide(); // Deslizamiento hacia la derecha
            }
        }
    }
    
    showSlide(index) {
        // Ocultar todos los slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Actualizar indicadores
        this.indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Mostrar el slide actual
        this.slides[index].classList.add('active');
        this.indicators[index].classList.add('active');
        
        this.currentSlide = index;
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
    }
    
    goToSlide(index) {
        if (index >= 0 && index < this.slides.length) {
            this.showSlide(index);
        }
    }
    
    startAutoPlay() {
        if (!this.autoPlay) {
            this.autoPlay = true;
            this.slideInterval = setInterval(() => this.nextSlide(), this.slideDuration);
        }
    }
    
    pauseAutoPlay() {
        this.autoPlay = false;
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
}

// Inicializar el slider cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new HeroSlider();
});
