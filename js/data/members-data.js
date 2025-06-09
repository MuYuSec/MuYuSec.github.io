/**
 * 木鱼安全实验室历届成员数据
 * 按照小组分类，每个小组包含多个成员数据
 */

// 成员数据配置，便于后续添加和修改
const membersData = {
    'ctf-team': [
        {
            name: 'Erika',
            role: '2022级负责人',
            description: '打杂项的人，心都很杂',
            avatar: 'img/team/Erika.jpg'
        },
        {
            name: 'S1nyer',
            role: '2022级负责人',
            description: '要拥有必先懂失去怎接受',
            avatar: 'img/team/S1nyer.jpg'
        },
        {
            name: 'Mt.',
            role: '2023级负责人',
            description: '循密理而析，凭巧思以破',
            avatar: 'img/team/Mt_.jpg'
        },
        {
            name: 'XDG',
            role: '2023级负责人',
            description: '懂得进退，方能成就人生',
            avatar: 'img/team/XDG.jpg'
        },
        {
            name: 'rokki3',
            role: '2023级负责人',
            description: '生命是一万次的春和景明',
            avatar: 'img/team/rokki3.jpeg'
        },
        {
            name: 'Liyck',
            role: '2023级负责人',
            description: '初见惊欢，久处怦然',
            avatar: 'img/team/Liyck.jpg'
        }
    ],
    'pentest-team': [
        {
            name: 'lhTings',
            role: '2021级负责人',
            description: '念念而不念于念',
            avatar: 'img/team/lhTings.jpg'
        },
        {
            name: 'xiyan',
            role: '2021级负责人',
            description: '前行自由归途',
            avatar: 'img/team/xiyan.jpg'
        },
        {
            name: 'lVV1',
            role: '2022级负责人',
            description: '',
            avatar: 'img/team/lVV1.jpg'
        }
    ],
    'devops-team': [
        {
            name: 'Qiu',
            role: '2021级负责人',
            description: '尽人事，知天命',
            avatar: 'img/team/Qiu.JPG'
        }
    ],
    'operations-team': [
        {
            name: 'test',
            role: 'test',
            description: '111',
            avatar: 'img/team/avatar10.jpg'
        },

    ]
};

// 小组名称配置
const teamNames = {
    'ctf-team': 'CTF小组',
    'pentest-team': '攻防渗透小组',
    'devops-team': '开发运维小组',
    'operations-team': '运营宣传小组'
};