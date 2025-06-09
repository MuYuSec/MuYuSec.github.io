/**
 * 木鱼安全实验室网站通用组件库
 * 包含导航栏、页脚等可复用组件
 */

/**
 * 渲染导航栏
 * @param {string} currentPage 当前页面的标识，用于高亮对应的导航项
 */
function renderNavbar(currentPage) {
    const navbarContainer = document.getElementById('navbar-container');
    if (!navbarContainer) return;
    
    // 导航项配置
    const navItems = [
        { id: 'index', label: '首页', url: 'index.html' },
        { id: 'about', label: '团队介绍', url: 'about.html' },
        { id: 'directions', label: '团队小组', url: 'directions.html' },
        { id: 'awards', label: '团队奖项', url: 'awards.html' },
        { id: 'members', label: '历届成员', url: 'members.html' },
        { id: 'wiki', label: '知识库WIKI', url: 'wiki.html' },
        { id: 'join', label: '加入团队', url: 'join.html' },
    ];
    
    // 生成导航栏HTML
    const navbarHTML = `
    <header>
        <div class="container">
            <div class="logo">
                <a href="index.html">
                    <img src="img/logo.jpg" alt="木鱼安全实验室">
                    <span>木鱼安全实验室</span>
                </a>
            </div>
            <ul class="nav-links">
                ${navItems.map(item => `
                    <li><a href="${item.url}"${currentPage === item.id ? ' class="active"' : ''}>${item.label}</a></li>
                `).join('')}
            </ul>
            <div class="menu-toggle">
                <i class="fas fa-bars"></i>
            </div>
        </div>
    </header>
    `;
    
    // 插入导航栏
    navbarContainer.innerHTML = navbarHTML;
    
    // 添加移动端菜单切换功能
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // 切换菜单图标
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
}

/**
 * 页面加载完成后自动初始化组件
 */
document.addEventListener('DOMContentLoaded', function() {
    // 获取当前页面名称
    const currentPagePath = window.location.pathname;
    const pageName = currentPagePath.split('/').pop().split('.')[0] || 'index';
    
    // 渲染导航栏
    renderNavbar(pageName);
}); 