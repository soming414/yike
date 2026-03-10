// 简单的Node.js服务器
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // 提供静态文件

// 数据文件路径
const DATA_FILE = path.join(__dirname, 'members.json');

// 初始化数据文件
async function initializeDataFile() {
    try {
        await fs.access(DATA_FILE);
    } catch (error) {
        // 文件不存在，创建默认数据
        const defaultMembers = [
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
            }
        ];
        await fs.writeFile(DATA_FILE, JSON.stringify(defaultMembers, null, 2));
    }
}

// 读取所有会员
app.get('/api/members', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const members = JSON.parse(data);
        res.json(members);
    } catch (error) {
        console.error('读取会员数据失败:', error);
        res.status(500).json({ error: '读取数据失败' });
    }
});

// 根据性别筛选会员
app.get('/api/members/gender/:gender', async (req, res) => {
    try {
        const gender = req.params.gender;
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const members = JSON.parse(data);
        
        let filteredMembers;
        if (gender === 'all') {
            filteredMembers = members;
        } else {
            filteredMembers = members.filter(member => member.gender === gender);
        }
        
        res.json(filteredMembers);
    } catch (error) {
        console.error('筛选会员失败:', error);
        res.status(500).json({ error: '筛选数据失败' });
    }
});

// 根据ID获取会员
app.get('/api/members/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const members = JSON.parse(data);
        const member = members.find(m => m.id === id);
        
        if (member) {
            res.json(member);
        } else {
            res.status(404).json({ error: '会员不存在' });
        }
    } catch (error) {
        console.error('获取会员失败:', error);
        res.status(500).json({ error: '获取数据失败' });
    }
});

// 添加新会员
app.post('/api/members', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const members = JSON.parse(data);
        
        const newId = members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1;
        const newMember = {
            id: newId,
            ...req.body,
            photos: req.body.photos || [req.body.avatar]
        };
        
        members.push(newMember);
        await fs.writeFile(DATA_FILE, JSON.stringify(members, null, 2));
        
        res.status(201).json(newMember);
    } catch (error) {
        console.error('添加会员失败:', error);
        res.status(500).json({ error: '添加数据失败' });
    }
});

// 更新会员信息
app.put('/api/members/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const members = JSON.parse(data);
        const index = members.findIndex(m => m.id === id);
        
        if (index !== -1) {
            members[index] = { ...members[index], ...req.body };
            await fs.writeFile(DATA_FILE, JSON.stringify(members, null, 2));
            res.json(members[index]);
        } else {
            res.status(404).json({ error: '会员不存在' });
        }
    } catch (error) {
        console.error('更新会员失败:', error);
        res.status(500).json({ error: '更新数据失败' });
    }
});

// 删除会员
app.delete('/api/members/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const members = JSON.parse(data);
        const index = members.findIndex(m => m.id === id);
        
        if (index !== -1) {
            const deletedMember = members.splice(index, 1)[0];
            await fs.writeFile(DATA_FILE, JSON.stringify(members, null, 2));
            res.json(deletedMember);
        } else {
            res.status(404).json({ error: '会员不存在' });
        }
    } catch (error) {
        console.error('删除会员失败:', error);
        res.status(500).json({ error: '删除数据失败' });
    }
});

// 启动服务器
async function startServer() {
    await initializeDataFile();
    
    app.listen(PORT, () => {
        console.log(`服务器运行在 http://localhost:${PORT}`);
        console.log(`前台页面: http://localhost:${PORT}/index.html`);
        console.log(`后台管理: http://localhost:${PORT}/admin.html`);
    });
}

startServer().catch(console.error);