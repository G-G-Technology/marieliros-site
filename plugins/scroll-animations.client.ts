export default defineNuxtPlugin(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );

  const observe = () => {
    document.querySelectorAll('.fade-section').forEach((el) => observer.observe(el));
  };

  // Observe on initial load and after each navigation
  if (document.readyState === 'complete') {
    observe();
  } else {
    window.addEventListener('load', observe, { once: true });
  }
});
