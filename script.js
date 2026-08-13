/* 文明6攻略站：轻量、无依赖的页面交互 */
const victoryData = {
  science: { title: '科技胜利', description: '让人类的第一艘火箭抵达群星。科技路线重视稳定的研究曲线与高产城市。', steps: ['远古：尽早落地学院，优先研究写作。', '中期：用贸易与工业区堆高生产力，抢关键大科学家。', '后期：完成太空港与火星殖民项目，保护你的科研引擎。'] },
  culture: { title: '文化胜利', description: '让世界为你的艺术、旅游业与文明遗产倾倒。', steps: ['远古：布局圣地与剧院广场，积累伟人点数。', '中期：修建奇观、博物馆，打开边界并交换艺术品。', '后期：用摇滚乐队、考古与机场扩大国际旅游。'] },
  domination: { title: '统治胜利', description: '以军队与战略决断夺取所有对手的首都。', steps: ['远古：快速侦察，判断邻国位置与战略资源。', '中期：升级兵种、建立军团，集中火力击穿一个方向。', '后期：保持战线补给，利用间谍与空军终结抵抗。'] },
  religion: { title: '宗教胜利', description: '建立信仰并让它传播至世界每个文明。', steps: ['远古：抢下伟大先知，选择契合地形的信条。', '中期：用使徒与传教士建立信仰走廊。', '后期：保护圣城，围绕竞争信仰进行反向传教。'] },
  diplomatic: { title: '外交胜利', description: '以智慧、援助与合作成为世界大会的领袖。', steps: ['早期：结交城邦，累积外交能见度。', '中期：参加紧急事件与世界议会，掌握议程。', '后期：建造外交区与自由女神像，稳健拿下外交点。'] },
  score: { title: '分数胜利', description: '在时间尽头，以综合实力成为最伟大的文明。', steps: ['扩张领土、人口与城市数量，保持经济健康。', '兼顾科技、文化、军事与奇观，不让短板拖累总分。', '进入信息时代后，优先完成能带来长期分数的项目。'] }
};

const modal = document.querySelector('#victory-modal');
const modalTitle = document.querySelector('#modal-title');
const modalDescription = document.querySelector('#modal-description');
const modalSteps = document.querySelector('#modal-steps');

function openVictory(key) {
  const data = victoryData[key];
  if (!data || !modal || !modalTitle || !modalDescription || !modalSteps) return;
  modalTitle.textContent = data.title;
  modalDescription.textContent = data.description;
  modalSteps.innerHTML = data.steps.map((step, i) => `<div><b>0${i + 1}</b>${step}</div>`).join('');
  modal.showModal();
}

document.querySelectorAll('.victory-card').forEach((card) => {
  card.addEventListener('click', () => openVictory(card.dataset.victory));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openVictory(card.dataset.victory); }
  });
});
const modalClose = document.querySelector('.modal-close');
if (modalClose && modal) modalClose.addEventListener('click', () => modal.close());
if (modal) modal.addEventListener('click', (event) => { if (event.target === modal) modal.close(); });

document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.leader-card').forEach((card) => {
      card.classList.toggle('is-hidden', filter !== 'all' && !card.dataset.tags.split(' ').includes(filter));
    });
  });
});

const directoryButton = document.querySelector('.filter-directory');
const directory = document.querySelector('#leader-directory');
if (directoryButton && directory) directoryButton.addEventListener('click', () => {
  const isOpen = !directory.hidden;
  directory.hidden = isOpen;
  directoryButton.classList.toggle('active', !isOpen);
  directoryButton.textContent = isOpen ? '查看完整名录 67' : '收起完整名录';
});

const databaseTabs = document.querySelectorAll('.database-tab');
const databasePanels = document.querySelectorAll('.database-panel');
databaseTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.db;
    databaseTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    databasePanels.forEach((panel) => panel.classList.toggle('active', panel.dataset.dbPanel === target));
  });
});

const searchInput = document.querySelector('#site-search, #leader-search');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    document.querySelectorAll('main article').forEach((item) => item.classList.toggle('search-match', Boolean(query) && item.textContent.toLowerCase().includes(query)));
  });
}

// 百科分类面板：同一位置切换不同知识体系，适合快速查阅。
const encyclopediaTabs = document.querySelectorAll('.encyclopedia-tab');
const encyclopediaPanels = document.querySelectorAll('.encyclopedia-panel');
encyclopediaTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    encyclopediaTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    encyclopediaPanels.forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === target));
  });
});
