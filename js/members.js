/**
 * 木鱼安全实验室历届成员页面逻辑
 * 处理成员展示、翻页和动画效果
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化成员展示区域
    initMembersDisplay();
    
    // 成员卡片动画
    window.addEventListener('scroll', function() {
        // 成员卡片动画
        const members = document.querySelectorAll('.team-member');
        
        members.forEach(member => {
            const memberTop = member.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (memberTop < windowHeight - 100) {
                setTimeout(() => {
                    member.classList.add('visible');
                }, parseInt(member.dataset.delay) || 0);
            }
        });
    });
    
    // 点击向下滚动按钮
    document.getElementById('scroll-down').addEventListener('click', function() {
        const membersContent = document.getElementById('members-content');
        membersContent.scrollIntoView({ behavior: 'smooth' });
    });
    
    // 小组选项卡切换
    const teamTabs = document.querySelectorAll('.team-tab');
    const teamGroups = document.querySelectorAll('.team-group');
    
    teamTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有tab的active类
            teamTabs.forEach(t => t.classList.remove('active'));
            // 为当前点击的tab添加active类
            this.classList.add('active');
            
            // 获取目标team-group的id
            const targetId = this.getAttribute('data-target');
            
            // 隐藏所有team-group
            teamGroups.forEach(group => {
                group.classList.remove('active');
            });
            
            // 显示目标team-group
            document.getElementById(targetId).classList.add('active');
            
            // 重置所有轮播到第一张
            const sliders = document.querySelectorAll('.members-slider');
            sliders.forEach(slider => {
                slider.style.transform = 'translateX(0)';
            });
            
            // 重置所有指示器
            const indicators = document.querySelectorAll('.indicator');
            indicators.forEach(indicator => {
                indicator.classList.remove('active');
            });
            document.querySelectorAll('.carousel-indicators').forEach(indicatorGroup => {
                const firstIndicator = indicatorGroup.querySelector('.indicator');
                if (firstIndicator) {
                    firstIndicator.classList.add('active');
                }
            });
        });
    });
    
    // 成员轮播功能初始化
    setupCarousels();
    
    // 模拟滚动事件以触发初始动画
    window.dispatchEvent(new Event('scroll'));
});

/**
 * 初始化成员展示区域
 * 根据成员数据动态生成DOM结构
 */
function initMembersDisplay() {
    const membersDisplay = document.querySelector('.members-display');
    if (!membersDisplay) return;
    
    // 清空现有内容
    membersDisplay.innerHTML = '';
    
    // 每页显示的成员数量
    const MEMBERS_PER_PAGE = 3;
    
    // 为每个小组创建内容
    Object.keys(membersData).forEach(teamId => {
        const teamMembers = membersData[teamId];
        const teamName = teamNames[teamId];
        
        // 创建小组容器
        const teamGroup = document.createElement('div');
        teamGroup.className = `team-group${teamId === 'ctf-team' ? ' active' : ''}`;
        teamGroup.id = teamId;
        
        // 创建小组标题
        const teamTitle = document.createElement('div');
        teamTitle.className = 'team-group-title';
        teamTitle.innerHTML = `<h3>${teamName}</h3>`;
        teamGroup.appendChild(teamTitle);
        
        // 创建轮播区域
        const carousel = document.createElement('div');
        carousel.className = 'members-carousel';
        
        // 创建轮播容器
        const slider = document.createElement('div');
        slider.className = 'members-slider';
        slider.id = `${teamId}-slider`;
        
        // 计算总页数
        const totalPages = Math.ceil(teamMembers.length / MEMBERS_PER_PAGE);
        
        // 为每一页创建内容
        for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
            const slide = document.createElement('div');
            slide.className = 'member-slide';
            
            // 创建网格容器
            const grid = document.createElement('div');
            grid.className = 'team-grid';
            
            // 获取当前页的成员
            const startIndex = pageIndex * MEMBERS_PER_PAGE;
            const endIndex = Math.min(startIndex + MEMBERS_PER_PAGE, teamMembers.length);
            const pageMembers = teamMembers.slice(startIndex, endIndex);
            
            // 为每个成员创建卡片
            pageMembers.forEach((member, memberIndex) => {
                const delay = memberIndex * 100;
                const memberCard = createMemberCard(member, delay);
                grid.appendChild(memberCard);
            });
            
            slide.appendChild(grid);
            slider.appendChild(slide);
        }
        
        carousel.appendChild(slider);
        
        // 创建导航箭头
        const navigation = document.createElement('div');
        navigation.className = 'team-navigation';
        navigation.innerHTML = `
            <div class="nav-arrow nav-prev" data-slider="${teamId}-slider">
                <i class="fas fa-arrow-left"></i>
            </div>
            <div class="nav-arrow nav-next" data-slider="${teamId}-slider">
                <i class="fas fa-arrow-right"></i>
            </div>
        `;
        carousel.appendChild(navigation);
        
        // 创建指示器
        const indicators = document.createElement('div');
        indicators.className = 'carousel-indicators';
        indicators.id = `${teamId}-indicators`;
        
        for (let i = 0; i < totalPages; i++) {
            const indicator = document.createElement('div');
            indicator.className = `indicator${i === 0 ? ' active' : ''}`;
            indicator.setAttribute('data-slide', i);
            indicator.setAttribute('data-slider', `${teamId}-slider`);
            indicators.appendChild(indicator);
        }
        
        carousel.appendChild(indicators);
        teamGroup.appendChild(carousel);
        
        // 添加到展示区域
        membersDisplay.appendChild(teamGroup);
    });
}

/**
 * 创建成员卡片
 * @param {Object} member 成员数据
 * @param {number} delay 动画延迟时间
 * @returns {HTMLElement} 成员卡片DOM元素
 */
function createMemberCard(member, delay) {
    const card = document.createElement('div');
    card.className = 'team-member';
    card.setAttribute('data-delay', delay);
    
    card.innerHTML = `
        <div class="member-avatar">
            <img src="${member.avatar}" alt="${member.name}" ">
        </div>
        <h3 class="member-name">${member.name}</h3>
        <p class="member-role">${member.role}</p>
        <p class="member-description">${member.description}</p>
    `;
    
    return card;
}

/**
 * 设置轮播功能
 * 处理轮播导航和指示器
 */
function setupCarousels() {
    // 轮播导航箭头
    const prevArrows = document.querySelectorAll('.nav-prev');
    const nextArrows = document.querySelectorAll('.nav-next');
    
    // 上一页
    prevArrows.forEach(arrow => {
        arrow.addEventListener('click', function() {
            const sliderId = this.getAttribute('data-slider');
            const slider = document.getElementById(sliderId);
            const slides = slider.querySelectorAll('.member-slide');
            const indicators = document.querySelectorAll(`.indicator[data-slider="${sliderId}"]`);
            
            // 获取当前活动指示器的索引
            let activeIndex = 0;
            indicators.forEach((indicator, index) => {
                if (indicator.classList.contains('active')) {
                    activeIndex = index;
                }
            });
            
            // 计算新的活动指示器索引
            let newActiveIndex = activeIndex - 1;
            if (newActiveIndex < 0) {
                newActiveIndex = slides.length - 1;
            }
            
            // 更新轮播位置
            slider.style.transform = `translateX(-${newActiveIndex * 100}%)`;
            
            // 更新指示器状态
            indicators.forEach(indicator => indicator.classList.remove('active'));
            indicators[newActiveIndex].classList.add('active');
            
            // 触发新滑动中的卡片动画
            animateNewSlideMembers(slider.querySelectorAll('.member-slide')[newActiveIndex]);
        });
    });
    
    // 下一页
    nextArrows.forEach(arrow => {
        arrow.addEventListener('click', function() {
            const sliderId = this.getAttribute('data-slider');
            const slider = document.getElementById(sliderId);
            const slides = slider.querySelectorAll('.member-slide');
            const indicators = document.querySelectorAll(`.indicator[data-slider="${sliderId}"]`);
            
            // 获取当前活动指示器的索引
            let activeIndex = 0;
            indicators.forEach((indicator, index) => {
                if (indicator.classList.contains('active')) {
                    activeIndex = index;
                }
            });
            
            // 计算新的活动指示器索引
            let newActiveIndex = activeIndex + 1;
            if (newActiveIndex >= slides.length) {
                newActiveIndex = 0;
            }
            
            // 更新轮播位置
            slider.style.transform = `translateX(-${newActiveIndex * 100}%)`;
            
            // 更新指示器状态
            indicators.forEach(indicator => indicator.classList.remove('active'));
            indicators[newActiveIndex].classList.add('active');
            
            // 触发新滑动中的卡片动画
            animateNewSlideMembers(slider.querySelectorAll('.member-slide')[newActiveIndex]);
        });
    });
    
    // 指示器点击事件
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const sliderId = this.getAttribute('data-slider');
            const slider = document.getElementById(sliderId);
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            const groupIndicators = document.querySelectorAll(`.indicator[data-slider="${sliderId}"]`);
            
            // 更新轮播位置
            slider.style.transform = `translateX(-${slideIndex * 100}%)`;
            
            // 更新指示器状态
            groupIndicators.forEach(ind => ind.classList.remove('active'));
            this.classList.add('active');
            
            // 触发新滑动中的卡片动画
            animateNewSlideMembers(slider.querySelectorAll('.member-slide')[slideIndex]);
        });
    });
    
    // 初始动画效果
    setTimeout(() => {
        initializeCardAnimations();
    }, 500);
}

/**
 * 初始化卡片动画
 */
function initializeCardAnimations() {
    const activeGroups = document.querySelectorAll('.team-group.active');
    activeGroups.forEach(group => {
        const members = group.querySelectorAll('.team-member');
        members.forEach((member, index) => {
            setTimeout(() => {
                member.classList.add('visible');
            }, (parseInt(member.dataset.delay) || 0) + 500);
        });
    });
}

/**
 * 为新滑动页面中的成员卡片触发动画
 * @param {HTMLElement} slide 滑动页面元素
 */
function animateNewSlideMembers(slide) {
    if (!slide) return;
    
    const members = slide.querySelectorAll('.team-member');
    
    // 先重置所有卡片的可见状态
    members.forEach(member => {
        member.classList.remove('visible');
    });
    
    // 然后逐个触发动画
    members.forEach((member, index) => {
        setTimeout(() => {
            member.classList.add('visible');
        }, (parseInt(member.dataset.delay) || 0) + 100);
    });
} 