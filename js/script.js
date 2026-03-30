// Load section partials
document.querySelectorAll('[data-section]').forEach(async (el) => {
  const res = await fetch(el.dataset.section);
  if (res.ok) el.innerHTML = await res.text();
});

// Page navigation
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.dataset.page;

    document.querySelectorAll('.nav-link').forEach((l) => l.classList.remove('active'));
    link.classList.add('active');

    document.querySelectorAll('.page').forEach((p) => {
      p.classList.toggle('active', p.dataset.page === target);
    });
  });
});
