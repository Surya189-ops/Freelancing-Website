document.addEventListener('DOMContentLoaded', () => {
  // === DARK MODE TOGGLE ===
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  const isDark = theme === 'dark';

  document.body.classList.toggle('dark', isDark);
  document.querySelectorAll('header, footer, .job-card, .freelancer-card, .hero')
    .forEach(el => el.classList.toggle('dark', isDark));
}

// Load saved theme on page load
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// Toggle and save theme on button click
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  });
}

  // ======== POST A JOB PAGE ========
  const jobForm = document.getElementById('jobForm');
  const confirmation = document.getElementById('confirmation');

  if (jobForm) {
    jobForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const jobTitle = document.getElementById('jobTitle').value;
      const description = document.getElementById('description').value;

      const job = {
        name,
        email,
        jobTitle,
        description,
        date: new Date().toLocaleString()
      };

      const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
      jobs.push(job);
      localStorage.setItem('jobs', JSON.stringify(jobs));

      confirmation.style.display = 'block';
      jobForm.reset();
    });
  }

  // ======== JOBS PAGE ========
  const jobsContainer = document.getElementById('jobsContainer');

  if (jobsContainer) {
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];

    const searchInput = document.getElementById('searchInput');

    const renderJobs = (filteredJobs) => {
      jobsContainer.innerHTML = '';
      if (filteredJobs.length === 0) {
        jobsContainer.innerHTML = '<p>No jobs found.</p>';
        return;
      }

      filteredJobs.forEach((job, index) => {
        const card = document.createElement('div');
        card.className = 'job-card';

        card.innerHTML = `
          <h3>${job.jobTitle}</h3>
          <div class="job-meta">
            <strong>Posted by:</strong> ${job.name} (${job.email})
          </div>
          <div class="job-description">
            <strong>Description:</strong> ${job.description}
          </div>
          <div class="job-date">
            <strong>Date:</strong> ${job.date}
          </div>
          <button class="delete-btn" data-index="${index}">
            <i class="fas fa-trash-alt"></i> Delete
          </button>
        `;

        jobsContainer.appendChild(card);
      });
    };

    renderJobs(jobs); // initial render

    // === SEARCH FILTER ===
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filtered = jobs.filter(job =>
          job.jobTitle.toLowerCase().includes(searchTerm) ||
          job.name.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm)
        );
        renderJobs(filtered);
      });
    }

    // === DELETE FUNCTION ===
    jobsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.delete-btn');
      if (btn) {
        const index = btn.dataset.index;
        jobs.splice(index, 1);
        localStorage.setItem('jobs', JSON.stringify(jobs));
        renderJobs(jobs); // re-render updated list
      }
    });
  }

  // ======== CONTACT PAGE ========
  const contactForm = document.getElementById('contactForm');
  const contactConfirmation = document.getElementById('contactConfirmation');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactConfirmation.style.display = 'block';
      contactForm.reset();
    });
  }

  // ======== FREELANCERS PAGE ========
  const contactButtons = document.querySelectorAll('.freelancer-card button');
  if (contactButtons.length) {
    contactButtons.forEach(button => {
      button.addEventListener('click', () => {
        alert("Contact functionality coming soon!");
      });
    });
  }
});
