document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = link.getAttribute('data-tab');

        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });

        document.querySelectorAll('.nav-link').forEach(nav => {
            nav.classList.remove('active');
        });

        document.getElementById(tabId).classList.add('active');
        link.classList.add('active');

        if (window.innerWidth < 768) {
            const mobileNav = document.getElementById('mobileNav');
            const collapse = new bootstrap.Collapse(mobileNav, { toggle: false });
            collapse.hide();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

document.querySelector('.cta-btn').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.nav-link').forEach(nav => {
        nav.classList.remove('active');
    });
    document.getElementById('portfolio').classList.add('active');
    document.querySelector('.nav-link[data-tab="portfolio"]').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
