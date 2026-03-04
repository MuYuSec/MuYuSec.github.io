function getSafeText(value) {
    if (!value || typeof value !== 'string') {
        return '暂无简介';
    }

    const trimmed = value.trim();
    return trimmed.length ? trimmed : '暂无简介';
}

function buildMemberCard(member) {
    const wrapper = document.createElement('article');
    wrapper.className = 'member-card';
    wrapper.setAttribute('data-reveal', '');

    const avatarPath = member.avatar || 'img/logo.jpg';

    wrapper.innerHTML = `
        <div class="member-avatar">
            <img src="${avatarPath}" alt="${member.name || '成员头像'}">
        </div>
        <h3 class="member-name">${member.name || '未命名成员'}</h3>
        <p class="member-role">${member.role || '成员'}</p>
        <p class="member-description">${getSafeText(member.description)}</p>
    `;

    return wrapper;
}

function renderMembersTeam(teamId, membersContainer) {
    const teamMembers = membersData[teamId] || [];
    const teamName = teamNames[teamId] || '小组';

    const title = document.createElement('h3');
    title.className = 'members-team-title';
    title.textContent = teamName;
    membersContainer.appendChild(title);

    if (!teamMembers.length) {
        const emptyPanel = document.createElement('article');
        emptyPanel.className = 'panel';
        emptyPanel.setAttribute('data-reveal', '');
        emptyPanel.innerHTML = '<p>该小组暂未公开成员信息。</p>';
        membersContainer.appendChild(emptyPanel);
        return;
    }

    const grid = document.createElement('div');
    grid.className = 'members-grid';
    teamMembers.forEach((member) => {
        grid.appendChild(buildMemberCard(member));
    });

    membersContainer.appendChild(grid);
}

function buildTeamTabs(tabContainer, onSwitch) {
    Object.keys(teamNames).forEach((teamId, index) => {
        const tab = document.createElement('button');
        tab.type = 'button';
        tab.className = `tab-button${index === 0 ? ' active' : ''}`;
        tab.textContent = teamNames[teamId];
        tab.dataset.teamId = teamId;

        tab.addEventListener('click', () => {
            tabContainer.querySelectorAll('.tab-button').forEach((item) => {
                item.classList.remove('active');
            });
            tab.classList.add('active');
            onSwitch(teamId);
        });

        tabContainer.appendChild(tab);
    });
}

function renderMembersPage() {
    const tabsContainer = document.getElementById('team-tabs');
    const membersContainer = document.getElementById('members-content');

    if (!tabsContainer || !membersContainer || typeof membersData === 'undefined' || typeof teamNames === 'undefined') {
        return;
    }

    const teamIds = Object.keys(teamNames);
    if (!teamIds.length) {
        membersContainer.innerHTML = '<article class="panel"><p>暂无成员数据。</p></article>';
        return;
    }

    const renderTeam = (teamId) => {
        membersContainer.innerHTML = '';
        renderMembersTeam(teamId, membersContainer);

        if (typeof initRevealAnimation === 'function') {
            initRevealAnimation();
        }
    };

    buildTeamTabs(tabsContainer, renderTeam);
    renderTeam(teamIds[0]);
}

document.addEventListener('DOMContentLoaded', renderMembersPage);
