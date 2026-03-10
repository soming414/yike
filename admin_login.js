// 后台管理登录脚本

// 管理员密码
const ADMIN_PASSWORD = "yike.888";

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否已登录
    checkLoginStatus();
    
    // 绑定登录事件
    bindLoginEvents();
});

// 检查登录状态
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
    const loginContainer = document.getElementById('loginContainer');
    const adminContainer = document.getElementById('adminContainer');
    
    if (isLoggedIn) {
        // 已登录，直接显示后台
        if (loginContainer) loginContainer.style.display = 'none';
        if (adminContainer) adminContainer.style.display = 'flex';
    } else {
        // 未登录，显示登录页面
        if (loginContainer) loginContainer.style.display = 'flex';
        if (adminContainer) adminContainer.style.display = 'none';
    }
}

// 绑定登录事件
function bindLoginEvents() {
    const loginBtn = document.getElementById('loginBtn');
    const passwordInput = document.getElementById('adminPassword');
    const errorMessage = document.getElementById('errorMessage');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
    }
    
    if (passwordInput) {
        // 回车键登录
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleLogin();
            }
        });
        
        // 输入时清除错误状态
        passwordInput.addEventListener('input', function() {
            this.classList.remove('wrong');
            if (errorMessage) {
                errorMessage.classList.remove('show');
            }
        });
    }
}

// 处理登录
function handleLogin() {
    const passwordInput = document.getElementById('adminPassword');
    const password = passwordInput ? passwordInput.value : '';
    
    if (!password) {
        showError('请输入密码！');
        return;
    }
    
    if (password === ADMIN_PASSWORD) {
        // 密码正确
        loginSuccess();
    } else {
        // 密码错误
        showError('密码错误！请重试。');
        passwordInput.classList.add('wrong');
        passwordInput.value = '';
        passwordInput.focus();
    }
}

// 显示错误信息
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    if (!errorMessage) {
        // 创建错误消息元素
        const passwordInput = document.getElementById('adminPassword');
        if (passwordInput) {
            const errorDiv = document.createElement('div');
            errorDiv.id = 'errorMessage';
            errorDiv.className = 'error-message';
            errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
            
            const parent = passwordInput.parentNode;
            parent.appendChild(errorDiv);
            
            setTimeout(() => {
                errorDiv.classList.add('show');
            }, 10);
            
            // 3秒后自动隐藏
            setTimeout(() => {
                errorDiv.classList.remove('show');
                setTimeout(() => {
                    if (errorDiv.parentNode) {
                        errorDiv.parentNode.removeChild(errorDiv);
                    }
                }, 300);
            }, 3000);
        }
    } else {
        errorMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        errorMessage.classList.add('show');
    }
}

// 登录成功
function loginSuccess() {
    const passwordInput = document.getElementById('adminPassword');
    if (passwordInput) {
        passwordInput.classList.add('correct');
    }
    
    // 显示成功动画
    const loginSuccess = document.getElementById('loginSuccess');
    if (loginSuccess) {
        loginSuccess.classList.add('show');
    }
    
    // 保存登录状态到本地存储（有效期24小时）
    localStorage.setItem('admin_logged_in', 'true');
    localStorage.setItem('admin_login_time', new Date().getTime());
    
    // 2秒后进入后台
    setTimeout(() => {
        const loginContainer = document.getElementById('loginContainer');
        const adminContainer = document.getElementById('adminContainer');
        
        if (loginContainer) loginContainer.style.display = 'none';
        if (adminContainer) adminContainer.style.display = 'flex';
        
        // 隐藏成功动画
        if (loginSuccess) {
            loginSuccess.classList.remove('show');
        }
        
        // 初始化后台管理页面
        if (typeof initAdminPage === 'function') {
            initAdminPage();
        }
        if (typeof bindAdminEvents === 'function') {
            bindAdminEvents();
        }
        if (typeof loadMembersTable === 'function') {
            loadMembersTable();
        }
        if (typeof updateStatistics === 'function') {
            updateStatistics();
        }
    }, 2000);
}

// 登出功能（可以在后台添加登出按钮）
function logout() {
    if (confirm('确定要退出登录吗？')) {
        localStorage.removeItem('admin_logged_in');
        localStorage.removeItem('admin_login_time');
        
        // 刷新页面回到登录界面
        window.location.reload();
    }
}

// 自动登出（24小时后）
function checkAutoLogout() {
    const loginTime = localStorage.getItem('admin_login_time');
    if (loginTime) {
        const currentTime = new Date().getTime();
        const hoursPassed = (currentTime - parseInt(loginTime)) / (1000 * 60 * 60);
        
        if (hoursPassed > 24) {
            // 超过24小时，自动登出
            localStorage.removeItem('admin_logged_in');
            localStorage.removeItem('admin_login_time');
            window.location.reload();
        }
    }
}

// 页面切换时检查登录状态
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        checkLoginStatus();
    }
});

// 定期检查自动登出（每5分钟检查一次）
setInterval(checkAutoLogout, 5 * 60 * 1000);

// 添加登出按钮到后台（如果不存在）
function addLogoutButton() {
    const adminNav = document.querySelector('.admin-nav');
    if (adminNav && !document.getElementById('logoutBtn')) {
        const logoutBtn = document.createElement('button');
        logoutBtn.id = 'logoutBtn';
        logoutBtn.className = 'nav-link';
        logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> 退出登录';
        logoutBtn.addEventListener('click', logout);
        
        adminNav.appendChild(logoutBtn);
    }
}

// 页面加载完成后检查并添加登出按钮
setTimeout(addLogoutButton, 1000);