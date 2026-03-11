// 后台管理脚本

// 当前编辑的会员ID（null表示添加新会员）
let editingMemberId = null;

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化后台管理页面
    initAdminPage();
    
    // 绑定事件监听器
    bindAdminEvents();
    
    // 加载会员数据到表格
    loadMembersTable();
    
    // 更新统计信息
    updateStatistics();
});

// 初始化后台管理页面
function initAdminPage() {
    // 设置当前日期为出生日期的默认值
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const minDate = new Date(today.getFullYear() - 60, today.getMonth(), today.getDate());
    
    const birthDateInput = document.getElementById('memberBirthDate');
    if (birthDateInput) {
        // 设置默认值为25年前
        const defaultDate = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
        birthDateInput.value = defaultDate.toISOString().split('T')[0];
        birthDateInput.max = maxDate.toISOString().split('T')[0];
        birthDateInput.min = minDate.toISOString().split('T')[0];
    }
}

// 绑定后台管理事件
function bindAdminEvents() {
    // 菜单切换
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有菜单项的active类
            menuItems.forEach(menu => menu.classList.remove('active'));
            // 给当前菜单项添加active类
            this.classList.add('active');
            // 显示对应的内容区域
            const section = this.getAttribute('data-section');
            showContentSection(section);
        });
    });
    
    // 添加会员按钮
    const addMemberBtn = document.getElementById('addMemberBtn');
    if (addMemberBtn) {
        addMemberBtn.addEventListener('click', function() {
            showEditMemberModal(null);
        });
    }
    
    // 搜索功能
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterMembersTable(this.value);
        });
    }
    
    // 模态框关闭按钮
    const closeEditModalBtn = document.getElementById('closeEditModal');
    const editMemberModal = document.getElementById('editMemberModal');
    const cancelEditBtn = document.getElementById('cancelEdit');
    
    if (closeEditModalBtn) {
        closeEditModalBtn.addEventListener('click', function() {
            editMemberModal.style.display = 'none';
        });
    }
    
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', function() {
            editMemberModal.style.display = 'none';
        });
    }
    
    // 点击模态框背景关闭
    if (editMemberModal) {
        editMemberModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    }
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const editModal = document.getElementById('editMemberModal');
            if (editModal.style.display === 'flex') {
                editModal.style.display = 'none';
            }
        }
    });
    
    // 保存会员表单
    const memberForm = document.getElementById('memberForm');
    if (memberForm) {
        memberForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveMember();
        });
    }
    
    // 保存设置按钮
    const saveSettingsBtn = document.getElementById('saveSettings');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', saveSettings);
    }
    
    // 恢复默认设置按钮
    const resetSettingsBtn = document.getElementById('resetSettings');
    if (resetSettingsBtn) {
        resetSettingsBtn.addEventListener('click', resetSettings);
    }
}

// 显示内容区域
function showContentSection(section) {
    // 隐藏所有内容区域
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 显示选中的内容区域
    const targetSection = document.getElementById(`${section}Section`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// 加载会员表格
function loadMembersTable() {
    const tbody = document.getElementById('membersTableBody');
    if (!tbody) return;
    
    const members = window.memberData.getAllMembers();
    
    if (members.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="loading-cell">
                    <i class="fas fa-users-slash"></i> 暂无会员数据
                </td>
            </tr>
        `;
        return;
    }
    
    const rowsHTML = members.map(member => createMemberTableRow(member)).join('');
    tbody.innerHTML = rowsHTML;
    
    // 为操作按钮添加事件
    document.querySelectorAll('.action-btn.edit').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const memberId = parseInt(this.getAttribute('data-id'));
            showEditMemberModal(memberId);
        });
    });
    
    document.querySelectorAll('.action-btn.delete').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const memberId = parseInt(this.getAttribute('data-id'));
            deleteMember(memberId);
        });
    });
}

// 创建会员表格行
function createMemberTableRow(member) {
    const genderClass = member.gender === 'male' ? 'gender-male' : 'gender-female';
    const genderText = member.gender === 'male' ? '男生' : '女生';
    const genderIcon = member.gender === 'male' ? 'mars' : 'venus';
    
    // 格式化收入显示
    const incomeFormatted = new Intl.NumberFormat('zh-CN').format(member.monthlyIncome);
    
    return `
        <tr>
            <td>${member.id}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="${member.avatar}" alt="${member.name}" 
                         style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">
                    <strong>${member.name}</strong>
                </div>
            </td>
            <td>
                <span class="gender-badge ${genderClass}">
                    <i class="fas fa-${genderIcon}"></i> ${genderText}
                </span>
            </td>
            <td>${member.age}岁</td>
            <td>${member.occupation}</td>
            <td>${member.currentResidence}</td>
            <td>${incomeFormatted}元</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit" data-id="${member.id}" title="编辑">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" data-id="${member.id}" title="删除">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `;
}

// 筛选会员表格
function filterMembersTable(searchTerm) {
    const tbody = document.getElementById('membersTableBody');
    const members = window.memberData.getAllMembers();
    
    if (!searchTerm.trim()) {
        loadMembersTable();
        return;
    }
    
    const filteredMembers = members.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.occupation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.currentResidence.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filteredMembers.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="loading-cell">
                    <i class="fas fa-search"></i> 未找到匹配的会员
                </td>
            </tr>
        `;
        return;
    }
    
    const rowsHTML = filteredMembers.map(member => createMemberTableRow(member)).join('');
    tbody.innerHTML = rowsHTML;
    
    // 重新绑定事件
    document.querySelectorAll('.action-btn.edit').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const memberId = parseInt(this.getAttribute('data-id'));
            showEditMemberModal(memberId);
        });
    });
    
    document.querySelectorAll('.action-btn.delete').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const memberId = parseInt(this.getAttribute('data-id'));
            deleteMember(memberId);
        });
    });
}

// 显示编辑会员模态框
function showEditMemberModal(memberId) {
    const modal = document.getElementById('editMemberModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('memberForm');
    
    editingMemberId = memberId;
    
    if (memberId) {
        // 编辑现有会员
        modalTitle.textContent = '编辑会员信息';
        const member = window.memberData.getMemberById(memberId);
        if (member) {
            // 填充表单数据
            document.getElementById('memberName').value = member.name;
            document.getElementById('memberGender').value = member.gender;
            document.getElementById('memberAge').value = member.age;
            document.getElementById('memberBirthYear').value = member.birthYear;
            document.getElementById('memberHeight').value = member.height;
            document.getElementById('memberWeight').value = member.weight;
            document.getElementById('memberHometown').value = member.hometown;
            document.getElementById('memberCurrentResidence').value = member.currentResidence;
            document.getElementById('memberEducation').value = member.education;
            document.getElementById('memberOccupation').value = member.occupation;
            document.getElementById('memberMonthlyIncome').value = member.monthlyIncome;
            document.getElementById('memberAcceptLongDistance').value = member.acceptLongDistance;
            document.getElementById('memberSelfIntroduction').value = member.selfIntroduction;
            document.getElementById('memberPreferredType').value = member.preferredType;
            document.getElementById('memberAvatar').value = member.avatar;
        }
    } else {
        // 添加新会员
        modalTitle.textContent = '添加新会员';
        form.reset();
        
        // 设置默认值
        const today = new Date();
        const defaultYear = today.getFullYear() - 25;
        document.getElementById('memberBirthYear').value = defaultYear;
        document.getElementById('memberEducation').value = '本科';
        document.getElementById('memberAcceptLongDistance').value = '接受';
        document.getElementById('memberMonthlyIncome').value = 15000;
        document.getElementById('memberHeight').value = 170;
        document.getElementById('memberWeight').value = 60;
    }
    
    modal.style.display = 'flex';
}

// 保存会员信息
function saveMember() {
    const form = document.getElementById('memberForm');
    if (!form.checkValidity()) {
        alert('请填写所有必填字段！');
        return;
    }
    
    const memberData = {
        name: document.getElementById('memberName').value,
        gender: document.getElementById('memberGender').value,
        age: parseInt(document.getElementById('memberAge').value),
        birthYear: parseInt(document.getElementById('memberBirthYear').value),
        height: parseInt(document.getElementById('memberHeight').value),
        weight: parseFloat(document.getElementById('memberWeight').value),
        hometown: document.getElementById('memberHometown').value,
        currentResidence: document.getElementById('memberCurrentResidence').value,
        education: document.getElementById('memberEducation').value,
        occupation: document.getElementById('memberOccupation').value,
        monthlyIncome: parseInt(document.getElementById('memberMonthlyIncome').value),
        acceptLongDistance: document.getElementById('memberAcceptLongDistance').value,
        selfIntroduction: document.getElementById('memberSelfIntroduction').value,
        preferredType: document.getElementById('memberPreferredType').value,
        avatar: document.getElementById('memberAvatar').value,
        photos: [document.getElementById('memberAvatar').value]
    };
    
    if (editingMemberId) {
        // 更新现有会员
        window.memberData.updateMember(editingMemberId, memberData);
        alert('会员信息更新成功！');
    } else {
        // 添加新会员
        window.memberData.addMember(memberData);
        alert('新会员添加成功！');
    }
    
    // 关闭模态框
    document.getElementById('editMemberModal').style.display = 'none';
    
    // 刷新表格和统计
    loadMembersTable();
    updateStatistics();
}

// 删除会员
function deleteMember(memberId) {
    if (!confirm('确定要删除这个会员吗？此操作不可撤销。')) {
        return;
    }
    
    const member = window.memberData.getMemberById(memberId);
    if (!member) return;
    
    if (confirm(`确定要删除会员 "${member.name}" 吗？`)) {
        window.memberData.deleteMember(memberId);
        alert('会员删除成功！');
        loadMembersTable();
        updateStatistics();
    }
}

// 更新统计信息
function updateStatistics() {
    const members = window.memberData.getAllMembers();
    
    // 更新总会员数
    const totalMembers = document.getElementById('totalMembers');
    if (totalMembers) {
        totalMembers.textContent = members.length;
    }
    
    // 更新男生人数
    const maleMembers = document.getElementById('maleMembers');
    if (maleMembers) {
        const maleCount = members.filter(m => m.gender === 'male').length;
        maleMembers.textContent = maleCount;
    }
    
    // 更新女生人数
    const femaleMembers = document.getElementById('femaleMembers');
    if (femaleMembers) {
        const femaleCount = members.filter(m => m.gender === 'female').length;
        femaleMembers.textContent = femaleCount;
    }
    
    // 更新统计图表
    updateCharts(members);
}

// 更新统计图表
function updateCharts(members) {
    // 性别比例
    const genderChart = document.getElementById('genderChart');
    if (genderChart) {
        const maleCount = members.filter(m => m.gender === 'male').length;
        const femaleCount = members.filter(m => m.gender === 'female').length;
        const total = members.length;
        
        if (total > 0) {
            const malePercent = Math.round((maleCount / total) * 100);
            const femalePercent = 100 - malePercent;
            
            genderChart.innerHTML = `
                <div style="text-align: center; width: 100%;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 10px;">
                        <div style="display: flex; align-items: center; gap: 5px;">
                            <div style="width: 12px; height: 12px; background: #1976d2; border-radius: 50%;"></div>
                            <span>男生: ${maleCount}人 (${malePercent}%)</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 5px;">
                            <div style="width: 12px; height: 12px; background: #c2185b; border-radius: 50%;"></div>
                            <span>女生: ${femaleCount}人 (${femalePercent}%)</span>
                        </div>
                    </div>
                    <div style="height: 20px; background: #e9ecef; border-radius: 10px; overflow: hidden;">
                        <div style="width: ${malePercent}%; height: 100%; background: #1976d2;"></div>
                    </div>
                </div>
            `;
        } else {
            genderChart.innerHTML = '<p>暂无数据</p>';
        }
    }
    
    // 年龄分布
    const ageDistribution = document.getElementById('ageDistribution');
    if (ageDistribution) {
        const ageGroups = {
            '18-25': 0,
            '26-30': 0,
            '31-35': 0,
            '36+': 0
        };
        
        members.forEach(member => {
            if (member.age >= 18 && member.age <= 25) ageGroups['18-25']++;
            else if (member.age >= 26 && member.age <= 30) ageGroups['26-30']++;
            else if (member.age >= 31 && member.age <= 35) ageGroups['31-35']++;
            else if (member.age > 35) ageGroups['36+']++;
        });
        
        let ageHTML = '<div>';
        for (const [group, count] of Object.entries(ageGroups)) {
            if (count > 0) {
                const percent = Math.round((count / members.length) * 100);
                ageHTML += `
                    <div style="margin-bottom: 8px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                            <span>${group}岁</span>
                            <span>${count}人 (${percent}%)</span>
                        </div>
                        <div style="height: 8px; background: #e9ecef; border-radius: 4px; overflow: hidden;">
                            <div style="width: ${percent}%; height: 100%; background: #f57c00;"></div>
                        </div>
                    </div>
                `;
            }
        }
        ageHTML += '</div>';
        
        ageDistribution.innerHTML = members.length > 0 ? ageHTML : '<p>暂无数据</p>';
    }
    
    // 收入统计
    const incomeStats = document.getElementById('incomeStats');
    if (incomeStats) {
        if (members.length > 0) {
            const incomes = members.map(m => m.monthlyIncome);
            const avgIncome = Math.round(incomes.reduce((a, b) => a + b, 0) / incomes.length);
            const maxIncome = Math.max(...incomes);
            const minIncome = Math.min(...incomes);
            
            incomeStats.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: bold; color: #388e3c; margin-bottom: 10px;">
                        ${new Intl.NumberFormat('zh-CN').format(avgIncome)}元
                    </div>
                    <div style="color: #6c757d; font-size: 0.9rem;">
                        平均月收入
                    </div>
                    <div style="display: flex; justify-content: space-around; margin-top: 15px;">
                        <div>
                            <div style="font-weight: bold; color: #388e3c;">${new Intl.NumberFormat('zh-CN').format(maxIncome)}</div>
                            <div style="font-size: 0.8rem; color: #6c757d;">最高</div>
                        </div>
                        <div>
                            <div style="font-weight: bold; color: #388e3c;">${new Intl.NumberFormat('zh-CN').format(minIncome)}</div>
                            <div style="font-size: 0.8rem; color: #6c757d;">最低</div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            incomeStats.innerHTML = '<p>暂无数据</p>';
        }
    }
    
    // 地区统计
    const locationStats = document.getElementById('locationStats');
    if (locationStats) {
        const locations = {};
        members.forEach(member => {
            const location = member.currentResidence;
            locations[location] = (locations[location] || 0) + 1;
        });
        
        const sortedLocations = Object.entries(locations)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        
        if (sortedLocations.length > 0) {
            let locationHTML = '<div>';
            sortedLocations.forEach(([location, count]) => {
                const percent = Math.round((count / members.length) * 100);
                locationHTML += `
                    <div style="margin-bottom: 8px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                            <span>${location}</span>
                            <span>${count}人</span>
                        </div>
                        <div style="height: 8px; background: #e9ecef; border-radius: 4px; overflow: hidden;">
                            <div style="width: ${percent}%; height: 100%; background: #7b1fa2;"></div>
                        </div>
                    </div>
                `;
            });
            locationHTML += '</div>';
            locationStats.innerHTML = locationHTML;
        } else {
            locationStats.innerHTML = '<p>暂无数据</p>';
        }
    }
}

// 保存设置
function saveSettings() {
    const siteTitle = document.getElementById('siteTitle').value;
    const welcomeMessage = document.getElementById('welcomeMessage').value;
    const contactInfo = document.getElementById('contactInfo').value;
    const uploadLimit = document.getElementById('uploadLimit').value;
    
    // 这里应该将设置保存到服务器或本地存储
    // 目前先显示成功消息
    alert('设置保存成功！');
    
    // 在实际应用中，应该更新前端显示
    console.log('设置已保存:', {
        siteTitle,
        welcomeMessage,
        contactInfo,
        uploadLimit
    });
}

// 恢复默认设置
function resetSettings() {
    if (confirm('确定要恢复默认设置吗？当前的自定义设置将会丢失。')) {
        document.getElementById('siteTitle').value = '真诚交友会员展示系统';
        document.getElementById('welcomeMessage').value = '本资料仅用于真诚交友，不涉及隐私与敏感内容。\n遇到喜欢的人会帮忙牵线搭桥，脱单记得来报喜～\n⚠️ 未见面前，切勿发生任何金钱往来！';
        document.getElementById('contactInfo').value = '';
        document.getElementById('uploadLimit').value = '5';
        alert('设置已恢复为默认值！');
    }
}