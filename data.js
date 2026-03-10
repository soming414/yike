// 会员数据 - 这里使用模拟数据，实际项目中应该从服务器获取
const members = [
    {
        id: 1,
        name: "张明",
        gender: "male",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        age: 28,
        ethnicity: "汉族",
        birthDate: "1996-05-15",
        zodiac: "鼠",
        constellation: "金牛座",
        height: 178,
        weight: 72,
        hometown: "北京",
        currentResidence: "上海",
        education: "硕士",
        occupation: "软件工程师",
        monthlyIncome: 25000,
        acceptLongDistance: "接受",
        selfIntroduction: "性格开朗的阳光男孩，喜欢运动、旅行和摄影。工作认真负责，生活积极向上，希望能找到一个志同道合的另一半。",
        preferredType: "温柔体贴，有共同爱好的女生",
        photos: [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=600&fit=crop"
        ]
    },
    {
        id: 2,
        name: "李婷",
        gender: "female",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
        age: 26,
        ethnicity: "汉族",
        birthDate: "1998-08-22",
        zodiac: "虎",
        constellation: "狮子座",
        height: 165,
        weight: 52,
        hometown: "杭州",
        currentResidence: "杭州",
        education: "本科",
        occupation: "设计师",
        monthlyIncome: 18000,
        acceptLongDistance: "不接受",
        selfIntroduction: "热爱生活的文艺女生，喜欢画画、阅读和旅行。性格温柔细腻，希望能遇到一个懂我、疼我的男生。",
        preferredType: "成熟稳重，有责任心的男生",
        photos: [
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=600&fit=crop"
        ]
    },
    {
        id: 3,
        name: "王强",
        gender: "male",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        age: 32,
        ethnicity: "汉族",
        birthDate: "1992-11-10",
        zodiac: "猴",
        constellation: "天蝎座",
        height: 182,
        weight: 75,
        hometown: "成都",
        currentResidence: "深圳",
        education: "博士",
        occupation: "大学教授",
        monthlyIncome: 35000,
        acceptLongDistance: "接受",
        selfIntroduction: "学术型男生，热爱科研和教学。性格稳重，有责任心，希望能找到一个理解我工作的另一半。",
        preferredType: "知性优雅，有独立思想的女生",
        photos: [
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
        ]
    },
    {
        id: 4,
        name: "陈雪",
        gender: "female",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
        age: 24,
        ethnicity: "汉族",
        birthDate: "2000-03-18",
        zodiac: "龙",
        constellation: "双鱼座",
        height: 168,
        weight: 55,
        hometown: "广州",
        currentResidence: "广州",
        education: "本科",
        occupation: "市场营销",
        monthlyIncome: 15000,
        acceptLongDistance: "视情况而定",
        selfIntroduction: "活泼开朗的女生，喜欢交朋友，热爱美食和旅行。工作努力，生活态度积极，希望能遇到有趣的灵魂。",
        preferredType: "幽默风趣，有上进心的男生",
        photos: [
            "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&h=600&fit=crop"
        ]
    },
    {
        id: 5,
        name: "刘洋",
        gender: "male",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        age: 30,
        ethnicity: "汉族",
        birthDate: "1994-07-25",
        zodiac: "狗",
        constellation: "狮子座",
        height: 175,
        weight: 70,
        hometown: "西安",
        currentResidence: "北京",
        education: "硕士",
        occupation: "金融分析师",
        monthlyIncome: 30000,
        acceptLongDistance: "接受",
        selfIntroduction: "理性务实的男生，工作认真，生活规律。喜欢运动、阅读和投资理财，希望能找到一起成长的伴侣。",
        preferredType: "温柔贤惠，有理财观念的女生",
        photos: [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=600&fit=crop"
        ]
    },
    {
        id: 6,
        name: "赵雨",
        gender: "female",
        avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop",
        age: 27,
        ethnicity: "汉族",
        birthDate: "1997-12-05",
        zodiac: "牛",
        constellation: "射手座",
        height: 162,
        weight: 50,
        hometown: "南京",
        currentResidence: "上海",
        education: "硕士",
        occupation: "医生",
        monthlyIncome: 22000,
        acceptLongDistance: "不接受",
        selfIntroduction: "温柔细心的白衣天使，工作繁忙但热爱生活。喜欢音乐、电影和烹饪，希望能遇到理解我工作的另一半。",
        preferredType: "体贴细心，有责任感的男生",
        photos: [
            "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=600&fit=crop"
        ]
    }
];

// 获取所有会员
function getAllMembers() {
    return members;
}

// 根据性别筛选会员
function getMembersByGender(gender) {
    if (gender === 'all') return members;
    return members.filter(member => member.gender === gender);
}

// 根据ID获取会员
function getMemberById(id) {
    return members.find(member => member.id === id);
}

// 添加新会员
function addMember(memberData) {
    const newId = members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1;
    const newMember = {
        id: newId,
        ...memberData
    };
    members.push(newMember);
    return newMember;
}

// 更新会员信息
function updateMember(id, memberData) {
    const index = members.findIndex(member => member.id === id);
    if (index !== -1) {
        members[index] = { ...members[index], ...memberData };
        return members[index];
    }
    return null;
}

// 删除会员
function deleteMember(id) {
    const index = members.findIndex(member => member.id === id);
    if (index !== -1) {
        return members.splice(index, 1)[0];
    }
    return null;
}

// 导出函数供其他文件使用
window.memberData = {
    getAllMembers,
    getMembersByGender,
    getMemberById,
    addMember,
    updateMember,
    deleteMember
};