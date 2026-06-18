  // smooth scroll + active tab highlight
  const tabs = Array.from(document.querySelectorAll('.tabs a'));
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const id = tab.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tabs.forEach(t => t.classList.remove('active'));
        const match = tabs.find(t => t.getAttribute('href') === '#' + entry.target.id);
        if (match) match.classList.add('active');
      }
    });
  }, { rootMargin: '-35% 0px -50% 0px', threshold: 0 });
  sections.forEach(s => navObserver.observe(s));
  if (tabs[0]) tabs[0].classList.add('active');

  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  if (window.IntersectionObserver && !reduceMotion) {
    revealEls.forEach(el => el.classList.add('pre-reveal'));
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealObserver.observe(el));
  }
