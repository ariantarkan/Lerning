document.addEventListener('DOMContentLoaded', function() {

    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15 
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {

        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');

          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);


    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
});