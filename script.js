// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面
    initPage();
    
    // 绑定事件监听器
    bindEvents();
    
    // 加载会员数据
    loadMembers('all');
});

// 初始化页面
function initPage() {
    // 设置当前年份
    const yearElement = document.querySelector('.footer p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
    }
}

// 绑定事件监听器
function bindEvents() {
    // 选项卡切换
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // 给当前按钮添加active类
            this.classList.add('active');
            // 加载对应性别的会员
            const gender = this.getAttribute('data-gender');
            loadMembers(gender);
        });
    });
    
    // 关闭模态框按钮
    const closeModalBtn = document.getElementById('closeModal');
    const modalOverlay = document.getElementById('memberModal');
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            modalOverlay.style.display = 'none';
        });
    }
    
    // 点击模态框背景关闭
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    }
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
            modalOverlay.style.display = 'none';
        }
    });
}

// 加载会员列表
function loadMembers(gender) {
    const container = document.getElementById('membersContainer');
    
    // 显示加载状态
    container.innerHTML = `
        <div class="loading">
            <i class="fas fa-spinner fa-spin"></i>
            <p>正在加载会员信息...</p>
        </div>
    `;
    
    // 模拟网络延迟
    setTimeout(() => {
        const members = window.memberData.getMembersByGender(gender);
        
        if (members.length === 0) {
            // 显示空状态
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-users-slash"></i>
                    <h3>暂无会员信息</h3>
                    <p>当前分类下还没有会员，请稍后再来查看</p>
                </div>
            `;
            return;
        }
        
        // 生成会员卡片
        const cardsHTML = members.map(member => createMemberCard(member)).join('');
        container.innerHTML = cardsHTML;
        
        // 为每个卡片添加点击事件
        document.querySelectorAll('.member-card').forEach(card => {
            card.addEventListener('click', function() {
                const memberId = parseInt(this.getAttribute('data-id'));
                showMemberDetails(memberId);
            });
        });
    }, 500);
}

// 创建会员卡片HTML
function createMemberCard(member) {
    const genderClass = member.gender === 'male' ? 'male' : 'female';
    const genderText = member.gender === 'male' ? '男生' : '女生';
    const genderBadgeClass = member.gender === 'male' ? 'male-badge' : 'female-badge';
    const genderIcon = member.gender === 'male' ? 'mars' : 'venus';
    
    return `
        <div class="member-card ${genderClass}" data-id="${member.id}">
            <div class="card-image">
                <img src="${member.avatar}" alt="${member.name}" loading="lazy">
            </div>
            <div class="card-content">
                <div class="card-header">
                    <h3 class="member-name">${member.name}</h3>
                    <span class="member-gender ${genderBadgeClass}">
                        <i class="fas fa-${genderIcon}"></i> ${genderText}
                    </span>
                </div>
                <div class="card-info">
                    <div class="info-item">
                        <i class="fas fa-birthday-cake"></i>
                        <span>${member.age}岁</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-ruler-vertical"></i>
                        <span>${member.height}cm</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-graduation-cap"></i>
                        <span>${member.education}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-briefcase"></i>
                        <span>${member.occupation}</span>
                    </div>
                </div>
                <div class="card-footer">
                    <span class="age-badge">${member.birthYear}年</span>
                    <span class="view-details">
                        查看详情 <i class="fas fa-arrow-right"></i>
                    </span>
                </div>
            </div>
        </div>
    `;
}

// 显示会员详细信息
function showMemberDetails(memberId) {
    const member = window.memberData.getMemberById(memberId);
    if (!member) return;
    
    const modalBody = document.getElementById('modalBody');
    const modalOverlay = document.getElementById('memberModal');
    
    const genderClass = member.gender === 'male' ? 'male-badge' : 'female-badge';
    const genderText = member.gender === 'male' ? '男生' : '女生';
    const genderIcon = member.gender === 'male' ? 'mars' : 'venus';
    
    // 格式化收入显示
    const incomeFormatted = new Intl.NumberFormat('zh-CN').format(member.monthlyIncome);
    
    // 生成详情HTML
    const detailHTML = `
        <div class="member-detail">
            <div class="detail-image">
                <img src="${member.photos ? member.photos[0] : member.avatar}" alt="${member.name}">
            </div>
            <div class="detail-content">
                <div class="detail-header">
                    <h2 class="detail-name">${member.name}</h2>
                    <span class="detail-gender ${genderClass}">
                        <i class="fas fa-${genderIcon}"></i> ${genderText}
                    </span>
                </div>
                
                <div class="info-grid">
                    <div class="info-row">
                        <span class="info-label">
                            <i class="fas fa-venus-mars"></i> 性别：
                        </span>
                        <span class="info-value">${genderText}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">
                            <i class="fas fa-birthday-cake"></i> 出生年份：
                        </span>
                        <span class="info-value">${member.birthYear}年</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">
                            <i class="fas fa-ruler-vertical"></i> 身高：
                        </span>
                        <span class="info-value">${member.height}cm</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">
                            <i class="fas fa-weight"></i> 体重：
                        </span>
                        <span class="info-value">${member.weight}kg</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">
                            <i class="fas fa-home"></i> 籍贯：
                        </span>
                        <span class="info-value">${member.hometown}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">
                            <i class="fas fa-map-marker-alt"></i> 现居：
                        </span>
                        <span class="info-value">${member.currentResidence}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">
                            <i class="fas fa-graduation-cap"></i> 学历：
                        </span>
                        <span class="info-value">${member.education}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">
                            <i class="fas fa-briefcase"></i> 职业：
                        </span>
                        <span class="info-value">${member.occupation}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">
                            <i class="fas fa-money-bill-wave"></i> 月收入：
                        </span>
                        <span class="info-value">${incomeFormatted}元</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">
                            <i class="fas fa-plane"></i> 是否接受异地恋：
                        </span>
                        <span class="info-value">${member.acceptLongDistance}</span>
                    </div>
                </div>
                
                <div class="special-info">
                    <h3><i class="fas fa-user-circle"></i> 自我介绍</h3>
                    <p>${member.selfIntroduction}</p>
                </div>
                
                <div class="special-info">
                    <h3><i class="fas fa-heart"></i> 喜欢类型</h3>
                    <p>${member.preferredType}</p>
                </div>
            </div>
        </div>
    `;
    
    modalBody.innerHTML = detailHTML;
    modalOverlay.style.display = 'flex';
}

// 工具函数：格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// 工具函数：获取生肖
function getChineseZodiac(birthYear) {
    const zodiacs = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
    const startYear = 1924; // 鼠年开始年份
    const index = (birthYear - startYear) % 12;
    return zodiacs[index >= 0 ? index : index + 12];
}