const navItems = [
    { id: 'index', label: '首页', url: 'index.html' },
    { id: 'about', label: '团队介绍', url: 'about.html' },
    { id: 'directions', label: '团队小组', url: 'directions.html' },
    { id: 'awards', label: '团队奖项', url: 'awards.html' },
    { id: 'members', label: '历届成员', url: 'members.html' },
    { id: 'wiki', label: '知识库WIKI', url: 'wiki.html' },
    { id: 'cyberascent', label: 'CyberAscent计划', url: 'cyberascent.html' },
    { id: 'join', label: '加入团队', url: 'join.html' }
];

function getCurrentPageId() {
    const pageFromBody = document.body.dataset.page;
    if (pageFromBody) {
        return pageFromBody;
    }

    const currentPagePath = window.location.pathname;
    const pageName = currentPagePath.split('/').pop()?.split('.')[0] || 'index';
    return pageName;
}

function createNavbarMarkup(currentPageId) {
    const linksMarkup = navItems
        .map((item) => {
            const isActive = currentPageId === item.id;
            return `<li><a class="nav-link${isActive ? ' active' : ''}" href="${item.url}">${item.label}</a></li>`;
        })
        .join('');

    return `
        <header class="site-header" id="site-header">
            <nav class="site-nav" aria-label="主导航">
                <a class="brand" href="index.html" aria-label="木鱼安全实验室首页">
                    <img class="brand-mark" src="img/logo.jpg" alt="木鱼安全实验室">
                    <span class="brand-text">木鱼安全实验室</span>
                </a>
                <button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="打开导航菜单">
                    <i class="fas fa-bars"></i>
                </button>
                <ul class="nav-links" id="nav-links">
                    ${linksMarkup}
                </ul>
            </nav>
        </header>
    `;
}

function bindNavbarEvents() {
    const header = document.getElementById('site-header');
    const toggleButton = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (!header || !toggleButton || !navLinks) {
        return;
    }

    const updateHeaderState = () => {
        if (window.scrollY > 6) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    };

    const closeMenu = () => {
        header.classList.remove('menu-open');
        toggleButton.setAttribute('aria-expanded', 'false');
        const icon = toggleButton.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    };

    toggleButton.addEventListener('click', () => {
        const menuIsOpen = header.classList.toggle('menu-open');
        toggleButton.setAttribute('aria-expanded', menuIsOpen ? 'true' : 'false');

        const icon = toggleButton.querySelector('i');
        if (!icon) {
            return;
        }

        if (menuIsOpen) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 920) {
            closeMenu();
        }
    });

    window.addEventListener('scroll', updateHeaderState);
    updateHeaderState();
}

document.addEventListener('DOMContentLoaded', () => {
    const navbarContainer = document.getElementById('navbar-container');
    if (!navbarContainer) {
        return;
    }

    const currentPageId = getCurrentPageId();
    navbarContainer.innerHTML = createNavbarMarkup(currentPageId);
    bindNavbarEvents();
});
