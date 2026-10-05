const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  {
    threshold: 0.2,
  }
);

document.querySelectorAll('.card').forEach((card) => observer.observe(card));

const orbs = document.querySelectorAll('.bg-orb');
window.addEventListener('pointermove', (event) => {
  const x = (event.clientX / window.innerWidth - 0.5) * 14;
  const y = (event.clientY / window.innerHeight - 0.5) * 14;

  orbs.forEach((orb, index) => {
    const depth = index + 1;
    orb.style.transform = `translate(${x / depth}px, ${y / depth}px)`;
  });
});
