/**
 * 木鱼安全实验室网站主要JavaScript文件
 * 实现响应式菜单、滚动效果和表单验证等功能
 */

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 获取DOM元素
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const contactForm = document.querySelector('.contact-form form');

    // 导航栏菜单切换
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
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

    // 点击导航链接时关闭菜单
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 991) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 监听滚动事件，为导航栏添加阴影
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // 显示/隐藏回到顶部按钮
        if (scrollTopBtn) {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }
    });

    // 联系表单提交处理
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 简单表单验证
            const nameInput = contactForm.querySelector('input[type="text"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            const subjectInput = contactForm.querySelector('input[placeholder="主题"]');
            const messageInput = contactForm.querySelector('textarea');
            
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                showError(nameInput, '请输入您的姓名');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            if (!emailInput.value.trim()) {
                showError(emailInput, '请输入您的邮箱');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, '请输入有效的邮箱地址');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            if (!subjectInput.value.trim()) {
                showError(subjectInput, '请输入主题');
                isValid = false;
            } else {
                removeError(subjectInput);
            }
            
            if (!messageInput.value.trim()) {
                showError(messageInput, '请输入消息内容');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // 在实际应用中，这里应该发送表单数据到服务器
                // 这里仅模拟表单提交成功
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = '发送中...';
                
                setTimeout(() => {
                    showSuccessMessage('消息发送成功！我们会尽快回复您。');
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 1500);
            }
        });
    }

    // 添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 为研究卡片添加点击事件
    const researchCards = document.querySelectorAll('.research-card');
    researchCards.forEach(card => {
        card.addEventListener('click', () => {
            const link = card.querySelector('.read-more').getAttribute('href');
            window.location.href = link;
        });
    });

    // 添加图片懒加载
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // FAQ切换功能
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // 关闭其他所有FAQ项
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const toggle = otherItem.querySelector('.faq-toggle i');
                    toggle.className = 'fas fa-plus';
                }
            });

            // 切换当前FAQ项
            item.classList.toggle('active');
            const toggle = item.querySelector('.faq-toggle i');
            if (item.classList.contains('active')) {
                toggle.className = 'fas fa-times';
            } else {
                toggle.className = 'fas fa-plus';
            }
        });
    });

    // 工具函数：显示表单错误消息
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        
        formGroup.classList.add('error');
        input.classList.add('error-input');
    }

    // 工具函数：移除表单错误消息
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        formGroup.classList.remove('error');
        input.classList.remove('error-input');
    }

    // 工具函数：显示成功消息
    function showSuccessMessage(message) {
        const successElement = document.createElement('div');
        successElement.className = 'success-message';
        successElement.textContent = message;
        
        const form = contactForm.parentElement;
        form.insertBefore(successElement, contactForm);
        
        setTimeout(() => {
            form.removeChild(successElement);
        }, 5000);
    }

    // 工具函数：验证邮箱格式
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}); 