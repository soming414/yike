// 会员数据存储 - 使用 localStorage 持久化
let members = [];

// 初始会员数据（仅在没有保存数据时使用）
const initialMembers = [
  {
    id: 1,
    name: "LY001",
    gender: "male",
    avatar: "https://s3.bmp.ovh/2026/03/11/nkgwYB06.jpg",
    age: 23,
    birthYear: 2003,
    height: 186,
    weight: 160,
    hometown: "无",
    currentResidence: "苏州在福州",
    education: "硕士",
    occupation: "硕士在读",
    monthlyIncome: 0,
    acceptLongDistance: "只考虑福建省内",
    selfIntroduction: "喜欢游泳 心理学",
    preferredType: "05后 性格好 身材匀称",
    photos: [
        "https://s3.bmp.ovh/2026/03/11/nkgwYB06.jpg"
    ]
},
{
    id: 2,
    name: "LY002",
    gender: "female",
    avatar: "https://s3.bmp.ovh/2026/03/11/sYPsUpAj.jpg",
    age: 20,
    birthYear: 2006,
    height: 162,
    weight: 110,
    hometown: "无",
    currentResidence: "漳州",
    education: "大专",
    occupation: "学生",
    monthlyIncome: 0,
    acceptLongDistance: "接受",
    selfIntroduction: "无",
    preferredType: "178+ 阳光开朗",
    photos: [
        "https://s3.bmp.ovh/2026/03/11/sYPsUpAj.jpg"
    ]
},
{
    id: 3,
    name: "LY003",
    gender: "female",
    avatar: "https://s3.bmp.ovh/2026/03/11/UwuFuqCA.jpg",
    age: 28,
    birthYear: 1998,
    height: 163,
    weight: 96,
    hometown: "贵州",
    currentResidence: "贵州在福州",
    education: "高中",
    occupation: "文员",
    monthlyIncome: 5000,
    acceptLongDistance: "接受",
    selfIntroduction: "大大咧咧",
    preferredType: "175+ 成熟稳重 三观正",
    photos: [
        "https://s3.bmp.ovh/2026/03/11/UwuFuqCA.jpg"
    ]
},
{
    id: 4,
    name: "LY004",
    gender: "female",
    avatar: "https://s3.bmp.ovh/2026/03/11/ZKvh6vTF.jpg",
    age: 24,
    birthYear: 2002,
    height: 165,
    weight: 88,
    hometown: "无",
    currentResidence: "福州",
    education: "大学",
    occupation: "创业",
    monthlyIncome: 0,
    acceptLongDistance: "接受",
    selfIntroduction: "无",
    preferredType: "情绪稳定",
    photos: [
        "https://s3.bmp.ovh/2026/03/11/ZKvh6vTF.jpg"
    ]
},
{
    id: 5,
    name: "LY005",
    gender: "female",
    avatar: "https://s3.bmp.ovh/2026/03/11/wZblj9CK.jpg",
    age: 21,
    birthYear: 2005,
    height: 163,
    weight: 95,
    hometown: "无",
    currentResidence: "泉州",
    education: "无",
    occupation: "老师",
    monthlyIncome: 0,
    acceptLongDistance: "接受",
    selfIntroduction: "活泼开朗 吵死人",
    preferredType: "随缘",
    photos: [
        "https://s3.bmp.ovh/2026/03/11/wZblj9CK.jpg"
    ]
},
{
    id: 6,
    name: "LY006",
    gender: "female",
    avatar: "https://s3.bmp.ovh/2026/03/11/muTucS8c.jpg",
    age: 21,
    birthYear: 2005,
    height: 172,
    weight: 0,
    hometown: "无",
    currentResidence: "南平在福州",
    education: "无",
    occupation: "学生",
    monthlyIncome: 0,
    acceptLongDistance: "接受",
    selfIntroduction: "无",
    preferredType: "年上",
    photos: [
        "https://s3.bmp.ovh/2026/03/11/muTucS8c.jpg"
    ]
},
{
    id: 7,
    name: "LY007",
    gender: "female",
    avatar: "https://s3.bmp.ovh/2026/03/11/DnbsEKmM.jpg",
    age: 21,
    birthYear: 2005,
    height: 167,
    weight: 123,
    hometown: "无",
    currentResidence: "泉州",
    education: "大专",
    occupation: "学生",
    monthlyIncome: 0,
    acceptLongDistance: "接受",
    selfIntroduction: "安静",
    preferredType: "175+ 年纪不要太大",
    photos: [
        "https://s3.bmp.ovh/2026/03/11/DnbsEKmM.jpg"
    ]
},
{
    id: 8,
    name: "LY008",
    gender: "female",
    avatar: "https://s3.bmp.ovh/2026/03/11/1eIaVxxS.jpg",
    age: 18,
    birthYear: 2008,
    height: 172,
    weight: 105,
    hometown: "湖南",
    currentResidence: "湖南在厦门",
    education: "无",
    occupation: "音乐生",
    monthlyIncome: 3000,
    acceptLongDistance: "接受",
    selfIntroduction: "无",
    preferredType: "178+ 长相端正",
    photos: [
        "https://s3.bmp.ovh/2026/03/11/1eIaVxxS.jpg"
    ]
},
{
    id: 9,
    name: "LY009",
    gender: "female",
    avatar: "https://s3.bmp.ovh/2026/03/11/SEXsz9wM.jpg",
    age: 21,
    birthYear: 2005,
    height: 168,
    weight: 84,
    hometown: "无",
    currentResidence: "漳州",
    education: "大专",
    occupation: "学生",
    monthlyIncome: 0,
    acceptLongDistance: "接受",
    selfIntroduction: "无",
    preferredType: "170+",
    photos: [
        "https://s3.bmp.ovh/2026/03/11/SEXsz9wM.jpg"
    ]
},
{
    id: 10,
    name: "LY010",
    gender: "female",
    avatar: "https://s3.bmp.ovh/2026/03/11/K21HgnO4.jpg",
    age: 22,
    birthYear: 2004,
    height: 160,
    weight: 115,
    hometown: "四川",
    currentResidence: "四川在泉州",
    education: "大专",
    occupation: "外卖员",
    monthlyIncome: 8000,
    acceptLongDistance: "接受",
    selfIntroduction: "大大咧咧",
    preferredType: "无",
    photos: [
        "https://s3.bmp.ovh/2026/03/11/K21HgnO4.jpg"
    ]
},
{
    id: 11,
    name: "LY011",
    gender: "male",
    avatar: "https://s3.bmp.ovh/2026/03/11/N9mwJHQ1.jpg",
    age: 25,
    birthYear: 2001,
    height: 181,
    weight: 160,
    hometown: "无",
    currentResidence: "莆田在泉州",
    education: "本科",
    occupation: "现役军官",
    monthlyIncome: 10000,
    acceptLongDistance: "接受",
    selfIntroduction: "圈子干净",
    preferredType: "温柔",
    photos: [
        "https://s3.bmp.ovh/2026/03/11/N9mwJHQ1.jpg"
    ]
},
{
    id: 12,
    name: "LY012",
    gender: "male",
    avatar: "https://s3.bmp.ovh/2026/03/11/DsRzqWWa.jpg",
    age: 22,
    birthYear: 2004,
    height: 176,
    weight: 145,
    hometown: "无",
    currentResidence: "漳州",
    education: "高中",
    occupation: "消防员",
    monthlyIncome: 0,
    acceptLongDistance: "接受",
    selfIntroduction: "无",
    preferredType: "无",
    photos: [
        "https://s3.bmp.ovh/2026/03/11/DsRzqWWa.jpg"
    ]
},
{
    id: 13,
    name: "LY013",
    gender: "male",
    avatar: "https://s3.bmp.ovh/2026/03/11/P79buUZv.jpg",
    age: 21,
    birthYear: 2005,
    height: 188,
    weight: 160,
    hometown: "无",
    currentResidence: "泉州在南平",
    education: "大专",
    occupation: "学生",
    monthlyIncome: 0,
    acceptLongDistance: "接受",
    selfIntroduction: "无",
    preferredType: "165+ 温柔 三观正",
    photos: [
        "https://s3.bmp.ovh/2026/03/11/P79buUZv.jpg"
    ]
},
{
    id: 14,
    name: "LY014",
    gender: "male",
    avatar: "https://s3.bmp.ovh/2026/03/11/f0hpiCtZ.jpg",
    age: 24,
    birthYear: 2002,
    height: 186,
    weight: 140,
    hometown: "无",
    currentResidence: "龙岩",
    education: "本科",
    occupation: "央企",
    monthlyIncome: 15000,
    acceptLongDistance: "接受",
    selfIntroduction: "无",
    preferredType: "五官端正",
    photos: [
        "https://s3.bmp.ovh/2026/03/11/f0hpiCtZ.jpg"
    ]
},
{
    id: 15,
    name: "LY015",
    gender: "male",
    avatar: "https://s3.bmp.ovh/2026/03/11/LRWcqSgG.jpg",
    age: 19,
    birthYear: 2007,
    height: 182,
    weight: 126,
    hometown: "无",
    currentResidence: "福州",
    education: "大学",
    occupation: "学生",
    monthlyIncome: 0,
    acceptLongDistance: "接受",
    selfIntroduction: "无",
    preferredType: "五官端正 投缘",
    photos: [
        "https://s3.bmp.ovh/2026/03/11/LRWcqSgG.jpg"
    ]
},
{
    id: 16,
    name: "LY016",
    gender: "female",
    avatar: "https://s3.bmp.ovh/2026/03/11/ZUcVncli.jpg",
    age: 22,
    birthYear: 2004,
    height: 168,
    weight: 110,
    hometown: "无",
    currentResidence: "漳州",
    education: "本科",
    occupation: "学生",
    monthlyIncome: 0,
    acceptLongDistance: "接受",
    selfIntroduction: "幼稚 敏感",
    preferredType: "看感觉",
    photos: [
        "https://s3.bmp.ovh/2026/03/11/ZUcVncli.jpg"
    ]
},
{
    id: 17,
    name: "LY017",
    gender: "female",
    avatar: "https://s3.bmp.ovh/2026/03/11/dXCQeinI.jpg",
    age: 23,
    birthYear: 2003,
    height: 166,
    weight: 82,
    hometown: "无",
    currentResidence: "漳州",
    education: "本科",
    occupation: "老师",
    monthlyIncome: 0,
    acceptLongDistance: "接受",
    selfIntroduction: "会钢琴 跳舞",
    preferredType: "阳光开朗 幽默",
    photos: [
        "https://s3.bmp.ovh/2026/03/11/dXCQeinI.jpg"
    ]
},
{
    id: 18,
    name: "LY018",
    gender: "male",
    avatar: "https://s3.bmp.ovh/2026/03/11/qBqsbLpV.jpg",
    age: 18,
    birthYear: 2008,
    height: 178,
    weight: 128,
    hometown: "无",
    currentResidence: "莆田",
    education: "高中",
    occupation: "无",
    monthlyIncome: 0,
    acceptLongDistance: "接受",
    selfIntroduction: "性格腼腆",
    preferredType: "无",
    photos: [
        "https://s3.bmp.ovh/2026/03/11/qBqsbLpV.jpg"
    ]
},
{
    id: 19,
    name: "LY019",
    gender: "female",
    avatar: "https://s3.bmp.ovh/2026/03/11/WsxLuNCX.jpg",
    age: 19,
    birthYear: 2007,
    height: 158,
    weight: 121,
    hometown: "无",
    currentResidence: "福州",
    education: "无",
    occupation: "学生",
    monthlyIncome: 0,
    acceptLongDistance: "接受",
    selfIntroduction: "无",
    preferredType: "三观相符 长相清秀",
    photos: [
        "https://s3.bmp.ovh/2026/03/11/WsxLuNCX.jpg"
    ]
},
{
    id: 20,
    name: "LY020",
    gender: "female",
    avatar: "https://s3.bmp.ovh/2026/03/11/36H0lkjW.jpg",
    age: 23,
    birthYear: 2003,
    height: 168,
    weight: 124,
    hometown: "无",
    currentResidence: "莆田",
    education: "无",
    occupation: "无",
    monthlyIncome: 0,
    acceptLongDistance: "接受",
    selfIntroduction: "无",
    preferredType: "180+ 98后",
    photos: [
        "https://s3.bmp.ovh/2026/03/11/36H0lkjW.jpg"
    ]
},
{
    id: 21,
    name: "LY021",
    gender: "male",
    avatar: "https://s3.bmp.ovh/2026/03/11/oMhDKv8C.jpg",
    age: 24,
    birthYear: 2002,
    height: 193,
    weight: 200,
    hometown: "无",
    currentResidence: "泉州",
    education: "本科",
    occupation: "国企",
    monthlyIncome: 3500,
    acceptLongDistance: "只考虑泉州",
    selfIntroduction: "无",
    preferredType: "无",
    photos: [
        "https://s3.bmp.ovh/2026/03/11/oMhDKv8C.jpg"
    ]
},
{
    id: 22,
    name: "LY022",
    gender: "male",
    avatar: "https://s3.bmp.ovh/2026/03/11/a9Nu11iE.jpg",
    age: 20,
    birthYear: 2006,
    height: 175,
    weight: 0,
    hometown: "无",
    currentResidence: "宁德在泉州",
    education: "本科",
    occupation: "无",
    monthlyIncome: 0,
    acceptLongDistance: "只考虑福建省内",
    selfIntroduction: "无",
    preferredType: "真诚开朗 年龄差三岁内",
    photos: [
        "https://s3.bmp.ovh/2026/03/11/a9Nu11iE.jpg"
    ]
},
{
    id: 23,
    name: "LY023",
    gender: "female",
    avatar: "https://s3.bmp.ovh/2026/03/11/vgXFEbL0.jpg",
    age: 21,
    birthYear: 2005,
    height: 165,
    weight: 100,
    hometown: "台湾",
    currentResidence: "台湾",
    education: "大学",
    occupation: "营销",
    monthlyIncome: 0,
    acceptLongDistance: "接受",
    selfIntroduction: "外向活泼 entj",
    preferredType: "看感觉 真诚",
    photos: [
        "https://s3.bmp.ovh/2026/03/11/vgXFEbL0.jpg"
    ]
}
];

// 数据存储键名
const STORAGE_KEY = 'claw_members_data';

// 保存数据到 localStorage
function saveMembersToStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
        return true;
    } catch (error) {
        console.error('保存会员数据失败:', error);
        return false;
    }
}

// 从 localStorage 加载数据
function loadMembersFromStorage() {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            // 验证数据格式
            if (Array.isArray(parsedData) && parsedData.length > 0) {
                members = parsedData;
                return true;
            }
        }
    } catch (error) {
        console.error('加载会员数据失败:', error);
    }
    
    // 如果没有保存的数据或数据无效，使用初始数据
    members = [...initialMembers];
    saveMembersToStorage();
    return false;
}

// 初始化数据
loadMembersFromStorage();

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
    
    // 保存到 localStorage
    if (saveMembersToStorage()) {
        console.log('新会员添加成功并保存到本地存储');
    }
    
    return newMember;
}

// 更新会员信息
function updateMember(id, memberData) {
    const index = members.findIndex(member => member.id === id);
    if (index !== -1) {
        members[index] = { ...members[index], ...memberData };
        
        // 保存到 localStorage
        if (saveMembersToStorage()) {
            console.log('会员信息更新成功并保存到本地存储');
        }
        
        return members[index];
    }
    return null;
}

// 删除会员
function deleteMember(id) {
    const index = members.findIndex(member => member.id === id);
    if (index !== -1) {
        const deleted = members.splice(index, 1)[0];
        
        // 保存到 localStorage
        if (saveMembersToStorage()) {
            console.log('会员删除成功并保存到本地存储');
        }
        
        return deleted;
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