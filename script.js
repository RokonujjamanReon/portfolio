const portfolioData = {
  skills: [
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'Python',
    'SQL',
    'Data Visualization',
    'API Design',
    'Git',
  ],
  projects: [
    {
      title: 'Portfolio Starter',
      description: 'A customizable personal portfolio template focused on clean structure and accessibility.',
      category: 'Web',
      tags: ['HTML', 'CSS', 'JavaScript'],
      link: '#',
    },
    {
      title: 'Data Dashboard Concept',
      description: 'A placeholder concept for presenting data insights through modern charts and summaries.',
      category: 'Data',
      tags: ['Analytics', 'Dashboard'],
      link: '#',
    },
    {
      title: 'Automation Utility',
      description: 'An example productivity tool that automates repetitive workflows and reporting tasks.',
      category: 'Tooling',
      tags: ['Scripting', 'Automation'],
      link: '#',
    },
  ],
  timeline: [
    {
      title: 'Current Focus',
      date: 'Present',
      description: 'Add your current role, studies, or key learning goals here.',
    },
    {
      title: 'Recent Milestone',
      date: 'Recent',
      description: 'Describe a project, internship, or meaningful contribution you completed.',
    },
    {
      title: 'Foundation',
      date: 'Earlier',
      description: 'Share how you started your developer/data/technology journey.',
    },
  ],
  socialLinks: [
    { label: 'GitHub', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Email', href: 'mailto:you@example.com' },
  ],
};

const skillsGrid = document.getElementById('skills-grid');
const projectsGrid = document.getElementById('projects-grid');
const projectFilters = document.getElementById('project-filters');
const timeline = document.getElementById('timeline');
const socialLinks = document.getElementById('social-links');
const currentYear = document.getElementById('current-year');

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const navAnchors = [...navLinks.querySelectorAll('a')];
const themeToggle = document.getElementById('theme-toggle');

const form = document.getElementById('contact-form');
const statusText = document.getElementById('form-status');

function renderSkills() {
  skillsGrid.innerHTML = portfolioData.skills.map((skill) => `<span class="chip">${skill}</span>`).join('');
}

function renderProjects(category = 'All') {
  const filtered =
    category === 'All'
      ? portfolioData.projects
      : portfolioData.projects.filter((project) => project.category === category);

  projectsGrid.innerHTML = filtered
    .map(
      (project) => `
        <article class="project-card" tabindex="0">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="tags">${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}</div>
          <p><a class="btn btn-secondary" href="${project.link}" aria-label="Open ${project.title}">View project</a></p>
        </article>
      `,
    )
    .join('');
}

function renderFilters() {
  const categories = ['All', ...new Set(portfolioData.projects.map((project) => project.category))];

  projectFilters.innerHTML = categories
    .map(
      (category, index) =>
        `<button class="filter-btn ${index === 0 ? 'active' : ''}" data-category="${category}">${category}</button>`,
    )
    .join('');

  projectFilters.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      projectFilters.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
      button.classList.add('active');
      renderProjects(button.dataset.category);
    });
  });
}

function renderTimeline() {
  timeline.innerHTML = portfolioData.timeline
    .map(
      (item) => `
      <li>
        <p class="meta">${item.date}</p>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </li>
    `,
    )
    .join('');
}

function renderSocialLinks() {
  socialLinks.innerHTML = portfolioData.socialLinks
    .map(
      (item) =>
        `<li><a href="${item.href}" ${item.href.startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''}>${item.label}</a></li>`,
    )
    .join('');
}

function handleMobileMenu() {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navAnchors.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function handleActiveNav() {
  const sections = [...document.querySelectorAll('main section[id]')];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        const id = entry.target.id;
        navAnchors.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
      });
    },
    { threshold: 0.4 },
  );

  sections.forEach((section) => observer.observe(section));
}

function handleTheme() {
  const stored = localStorage.getItem('theme');
  if (stored) {
    document.documentElement.setAttribute('data-theme', stored);
    themeToggle.textContent = stored === 'dark' ? '☀️' : '🌙';
  }

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', current);
    localStorage.setItem('theme', current);
    themeToggle.textContent = current === 'dark' ? '☀️' : '🌙';
  });
}

function handleRevealAnimations() {
  const targets = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  targets.forEach((target) => observer.observe(target));
}

function handleContactForm() {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (name.length < 2) {
      statusText.textContent = 'Please enter a name with at least 2 characters.';
      return;
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!validEmail) {
      statusText.textContent = 'Please enter a valid email address.';
      return;
    }

    if (message.length < 10) {
      statusText.textContent = 'Please add a message with at least 10 characters.';
      return;
    }

    statusText.textContent = 'Thanks! This demo form does not send to a backend yet.';
    form.reset();
  });
}

function init() {
  renderSkills();
  renderFilters();
  renderProjects();
  renderTimeline();
  renderSocialLinks();
  handleMobileMenu();
  handleActiveNav();
  handleTheme();
  handleRevealAnimations();
  handleContactForm();
  currentYear.textContent = String(new Date().getFullYear());
}

init();
