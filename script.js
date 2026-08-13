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

// 领袖百科完整名录：重点卡片用于快速选择，完整名录用于查找文明与领袖。
const completeLeaders = [
  ['美国', '西奥多·罗斯福（公牛麋鹿）、西奥多·罗斯福（骑兵）、亚伯拉罕·林肯、哈莉特·塔布曼'],
  ['英国', '维多利亚（帝国时代）、维多利亚（蒸汽时代）、伊丽莎白一世、埃莉诺'],
  ['法国', '凯瑟琳·德·美第奇（黑王后）、凯瑟琳·德·美第奇（盛世）、埃莉诺'],
  ['德国', '腓特烈·巴巴罗萨、路德维希二世'],
  ['西班牙', '腓力二世'],
  ['葡萄牙', '若昂三世'],
  ['希腊', '伯里克利、戈尔戈'],
  ['罗马', '图拉真、尤利乌斯·恺撒'],
  ['俄罗斯', '彼得'],
  ['波兰', '雅德维加'],
  ['瑞典', '克里斯蒂娜'],
  ['苏格兰', '罗伯特·布鲁斯'],
  ['匈牙利', '马加什一世'],
  ['阿拉伯', '萨拉丁（苏丹）、萨拉丁（维齐尔）'],
  ['埃及', '克娄巴特拉（埃及）、克娄巴特拉（托勒密）、拉美西斯二世'],
  ['波斯', '居鲁士、纳迪尔沙'],
  ['奥斯曼', '苏莱曼（立法者）、苏莱曼（大帝）'],
  ['腓尼基', '狄多'],
  ['埃塞俄比亚', '孟尼利克二世'],
  ['努比亚', '阿曼妮托蕾'],
  ['马里', '曼萨·穆萨、松迪亚塔·凯塔'],
  ['中国', '秦始皇（天命）、秦始皇（统一者）、武则天、永乐、忽必烈'],
  ['日本', '北条时宗、德川家康'],
  ['韩国', '善德女王、世宗大王'],
  ['蒙古', '成吉思汗、忽必烈'],
  ['越南', '征侧'],
  ['印度', '甘地、旃陀罗笈多'],
  ['印度尼西亚', '吉塔嘉'],
  ['高棉', '阇耶跋摩七世'],
  ['苏美尔', '吉尔伽美什'],
  ['斯基泰', '托米丽司'],
  ['祖鲁', '恰卡'],
  ['玛雅', '六天女王'],
  ['印加', '帕查库特克'],
  ['阿兹特克', '蒙特祖玛'],
  ['巴西', '佩德罗二世'],
  ['加拿大', '威尔弗里德·劳里埃'],
  ['大哥伦比亚', '西蒙·玻利瓦尔'],
  ['毛利', '库佩'],
  ['拜占庭', '巴西尔二世、西奥多拉'],
  ['高卢', '安比奥里克斯'],
  ['刚果', '姆本巴·恩津加'],
  ['格鲁吉亚', '塔玛丽'],
  ['马其顿', '亚历山大'],
  ['克里', '庞德梅克'],
  ['巴比伦', '汉谟拉比'],
  ['阿比西尼亚', '暂无独立领袖条目']
];
const leaderPageDirectory = document.querySelector('.directory-card');
if (leaderPageDirectory && location.pathname.endsWith('leaders.html')) {
  leaderPageDirectory.className = 'leader-directory';
  leaderPageDirectory.innerHTML = `<div class="directory-head"><div><p class="eyebrow"><span></span> 完整领袖名录</p><h3>文明 VI 领袖与文明索引</h3></div><p>按文明查找全部领袖。重点卡片负责推荐，下面名录负责完整查阅。</p></div><div class="directory-grid">${completeLeaders.map(([civ, leaders]) => `<div><b>${civ}</b><p>${leaders}</p></div>`).join('')}</div><p class="directory-note">名录覆盖本体与主要 DLC / Pass 内容；不同版本与平台可能存在领袖可用性差异。</p>`;
}

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

// 资料库解释层：名称负责索引，下面的说明负责帮助玩家做决定。
const databaseNotes = {
  tech: {
    '远古时代': '开局先解决生存问题。采矿让你能改良矿山、砍树并规划高生产城市；畜牧业寻找马匹并解锁牧场；弓箭负责处理野蛮人。若准备建学院，写作通常是第一条明确目标。判断标准：研究结束后，你能立刻改良、生产或解决一个现实问题。',
    '古典时代': '这是第一次分流期。铁器和骑术决定早期战争，货币支撑商业中心与贸易，数学改善区域与奇观节奏，教育则把学院转成稳定科技引擎。不要按时代顺序盲点：邻国逼近时先拿军力科技，和平扩张时再补经济科技。',
    '中世纪': '把已有区域升级起来，而不是继续铺新摊子。教育优先给学院城市，机械强化弩手和防守，学徒制为工业区与生产力做准备，银行业强化商业中心。判断标准：你的核心城市是否开始稳定产出科技、金币或生产力。',
    '文艺复兴': '火药、经济学和工业化会直接改变军力与城市效率。火药让你拥有更可靠的中期军队；经济学改善商业体系；工业化把生产力推向后期项目。准备转战争或太空路线时，先确认硝石、煤炭和高生产城市是否到位。',
    '工业时代': '核心是把生产力、人口和地图控制放大。电力支持高级建筑与项目，炼钢改善军力，化肥让粮食与人口继续增长，飞行打开空军与旅游路线。不要为了追最高科技放弃当前急需的防御、住房或生产。',
    '现代至信息时代': '进入收尾阶段后，每项研究都应服务终局。火箭学、卫星和机器人是科技胜利的连续任务；计算机与人工智能扩大研究优势；核裂变既是科技节点也是战略威慑。判断标准：下一项研究是否会缩短你的胜利回合，不能就先补生产、资源或防守。'
  },
  civic: {
    '远古时代': '法典给基础政策，早期帝国帮助扩张，军事传统服务战争。市政完成后第一件事是检查政策卡，而不是立刻点下一个研究。',
    '古典时代': '政治哲学决定政府方向：和平扩张、军事压迫和宗教路线在这里开始分开。戏剧与诗歌适合准备文化路线。',
    '中世纪': '封建主义改善工人和农业节奏，行会强化经济。战争路线可先走雇佣兵降低升级成本，再回到经济市政。',
    '文艺复兴': '探索和重商主义会扩大贸易与城市能力。文化胜利此时要开始准备作品、博物馆和开放边界。',
    '工业时代': '民族主义让单位组成军团，城市化强化城市发展。进入工业时代后，每次市政完成都应重新安排生产卡。',
    '现代至信息时代': '大众传媒、动员和全球化决定后期转化效率。不要只追最高级市政，优先选择能直接完成当前胜利目标的政策。'
  },
  buildings: {
    '城市中心': '所有城市的底盘。先补纪念碑、粮仓或城墙解决当前短板；人口未起来前，不要急着堆高级建筑。',
    '学院区': '科技城市的核心。通常先建图书馆，再看大科学家竞争；低邻接学院可以延后，不要为了“有学院”浪费关键生产。',
    '圣地': '只有决定走宗教或需要信仰购买时才优先。没有拿到宗教创立机会时，圣地的回报往往不如学院或商业中心。',
    '商业中心': '给扩张和战争提供金币与贸易路线。第二、第三城常用它补现金流；沿河或靠港时优先级明显提高。',
    '工业区': '不是越早越好，而是要放在能覆盖多座城市的位置。科技胜利和统治胜利通常需要至少一座高生产核心城。',
    '剧院广场': '文化路线的发动机。先解决作品槽位，再考虑奇观；没有作品、考古和旅游配套时，单建剧院广场意义有限。',
    '军营': '战争路线的训练基地，也能提供大将军点数。准备第一场战争前建；和平发育时只在明确需要军力时投入。',
    '港口与机场': '沿海城市的经济与后期投射能力。港口解决贸易和海军，机场解决旅游与空军，不要把两者混为同一条路线。',
    '娱乐、保护区与水上乐园': '宜居度不足时才优先。保护区依赖高魅力自然地块，娱乐区适合解决多个城市的长期宜居度问题。',
    '政府与外交': '这些建筑放大的是政策、总督、间谍和外交，而不是单座城市产出。进入中后期再按路线补齐。'
  },
  units: {
    '近战与侦察': '近战单位负责占城和护送，侦察单位负责信息。任何战争编队至少保留一支近战单位，否则打下城市也无法占领。',
    '远程单位': '最稳定的输出线。用近战挡在前面、远程隔一格输出；升级老兵通常比重新生产更省回合。',
    '骑兵与重骑兵': '适合开放地形、绕后和掠夺，不适合正面撞城墙。地图狭窄或山地多时，不要把全部军力押在骑兵上。',
    '攻城单位': '城市有城墙时才真正重要。先侦察射程与护卫，再带至少一支近战和一支远程推进，避免攻城器械被单独消灭。',
    '海军': '群岛和沿海地图的主力。生产前先确认港口、战略资源和敌方海岸；大陆内陆战争不必过早投入海军。',
    '空军': '后期改变战场尺度。机场决定容量，战斗机负责制空，轰炸机负责拆城；没有机场网络时不要只看单位面板。',
    '民用单位': '它们不直接打仗，却决定扩张、经济、宗教和文化。开拓者、工人和考古学家都应由军队或安全路线护送。',
    '支援单位': '支援单位的价值来自配套兵种：攻城塔配近战、观测气球配远程、医疗兵跟随前线。单独生产通常等于浪费。'
  }
};
function addDatabaseNotes(panelSelector, noteGroup) {
  document.querySelectorAll(panelSelector).forEach((card) => {
    const title = card.querySelector('h3')?.textContent.trim();
    const note = noteGroup[title];
    if (!note || card.querySelector('.db-detail')) return;
    const detail = document.createElement('div');
    detail.className = 'db-detail';
    detail.innerHTML = `<b>${noteGroup === databaseNotes.tech ? '研究重点' : '怎么用'}</b><span>${note}</span>`;
    card.append(detail);
  });
}
addDatabaseNotes('.database-panel[data-db-panel="tech"] .era-columns > div', databaseNotes.tech);
addDatabaseNotes('.database-panel[data-db-panel="civic"] .era-columns > div', databaseNotes.civic);
addDatabaseNotes('.database-panel[data-db-panel="building"] .catalog-grid article', databaseNotes.buildings);
addDatabaseNotes('.database-panel[data-db-panel="unit"] .unit-catalog article', databaseNotes.units);

// 将资料库中的名称拆成可展开的单条说明，方便查一个具体解锁点。
const entryNotes = {
  tech: {
    '制陶术': '解锁粮仓与灌溉路线。首都粮食不足、准备加速人口增长时优先。', '采矿': '解锁矿山与采石场，也常用于砍伐森林和规划生产核心。', '畜牧业': '显示马匹并解锁牧场；准备骑兵或需要改善牧场资源时研究。', '弓箭': '解锁弓箭手和弓箭尤里卡，是应对早期野蛮人的安全节点。', '车轮': '解锁重型战车和水车；没有战争或城市中心需求时可延后。', '航海': '解锁海岸城市、桨帆船和渔船；群岛或沿海开局价值更高。', '灌溉': '解锁种植园并改善奢侈资源，宜居度紧张时比单纯追科技更实际。', '砌砖': '解锁古典城墙与防御工程；邻国好战时优先级上升。', '青铜器': '显示铁资源并解锁兵营；准备剑士或需要军营点数时研究。', '天文学': '解锁圣地相关的远古知识与海军方向，适合自然奇观或宗教开局。', '写作': '解锁学院，是科技胜利最常见的第一座区域节点。', '青铜铸造': '强化早期军事路线并通向铁器；有邻国压力时不要贪经济科技。', '数学': '改善区域与奇观规划，适合准备高邻接学院、圣地或奇观。', '骑术': '解锁骑手、牧场相关能力；开放地形和马资源会显著提高价值。', '铁器': '解锁剑士并显示铁；第一场主动战争前必须确认资源是否可用。', '造船术': '强化海军和沿海移动，群岛图优先级明显提高。', '工程': '解锁攻城器械与高级城市建设，准备攻城时研究而不是只看时代。', '货币': '解锁商业中心，是扩张、贸易和战争现金流的核心科技。', '机械': '解锁弩手，远程线的重要升级；保留老兵升级通常比重造更快。', '学徒制': '解锁工业区和工坊，把多座城市的生产力连接起来。', '教育': '解锁大学，学院城市从“有科技”变成稳定科技引擎。', '银行业': '解锁银行，提升商业中心金币；准备购买单位或地块时优先。', '军事战术': '让军事单位和防御更可靠，战争线缺军力时优先于普通经济节点。', '火药': '解锁火枪手和更强攻城体系，中期战争的关键转折点。', '经济学': '强化商业与贸易，适合扩张城市多但金币紧张的局面。', '工业化': '解锁工厂与生产力核心，是太空项目和大规模战争的前置。', '电力': '解锁发电体系和现代生产建筑，后期核心城市的产能放大器。', '内燃机': '解锁坦克、飞机等现代机动单位；开放地图或需要突破战线时使用。', '炼钢': '强化现代军事和城市防御，面对强敌时不要只追民用科技。', '化肥': '提升粮食与人口上限，适合高人口科技城或城市增长停滞时研究。', '飞行': '解锁空军方向并拓展文化旅游工具；机场网络成型后才真正发挥价值。', '无线电': '推进广播、海军和文化传播，文化路线后期常用。', '塑料': '通向现代生产与海洋资源，按终局项目需要决定是否提前。', '计算机': '大幅强化后期科技与信息时代能力，科技胜利进入收尾阶段优先。', '核裂变': '解锁核武器与核能，既是终局科技也是战略威慑节点。', '火箭学': '科技胜利的核心入口，解锁太空港和后续太空项目。', '卫星': '推进太空胜利并扩大地图视野；太空路线应提前准备高生产城市。', '机器人': '解锁高级生产与现代项目，适合太空港城市补产能。', '纳米技术': '后期高级军事与科技节点，只有在终局路线需要时投入。', '核聚变': '科技胜利后段的项目科技，研究前确认生产力和太空港已经到位。', '人工智能': '信息时代顶层科技，适合加速终局，不适合落后时无条件直冲。', '量子计算': '最终科技节点之一；当其他系统已完成，只需把研究优势转成结束回合。'
  },
  civic: {
    '法典': '解锁纪律与经济等基础政策，开局完成后立刻装上适合生产的卡。', '工艺': '解锁改良与生产政策，完成工人相关鼓舞后尽快研究。', '对外贸易': '解锁商人、贸易路线和扩张政策，第二城准备出发时很重要。', '早期帝国': '提供扩张政策与城市规划能力，准备连续铺城时优先。', '军事传统': '解锁军事政策和侧翼思路，野蛮人多或临近战争时值得提前。', '神秘主义': '通往宗教和伟人路线的早期节点，宗教开局才需要抢节奏。', '国家劳动力': '解锁工人加速政策和政府区方向，城市开始建区域时价值上升。', '防御战术': '强化防御与城墙方向，邻国军力高时不要为了经济跳过。', '戏剧与诗歌': '解锁剧院广场，文化路线要在中期前完成第一座。', '游戏与娱乐': '解锁娱乐区和宜居度工具，人口增长受限时优先。', '军事训练': '强化单位生产与升级，准备战争窗口时搭配军事政策。', '政治哲学': '解锁首批政府，是和平扩张、军事压迫和伟人路线的分水岭。', '历史记录': '推进伟人和文化方向，已有剧院广场或伟人竞争时更有价值。', '神学': '解锁宗教单位与神权政府，只有确立宗教或准备信仰购买时优先。', '民政': '强化中期政府与城市管理，适合扩张后补经济和政策槽位。', '神权': '强化宗教路线并提供信仰购买能力，宗教胜利要围绕它安排生产。', '封建主义': '改善农田与工人效率，人口多、粮食紧张的宽铺城很受益。', '行会': '强化商业与经济政策，城市多但现金流紧张时优先。', '雇佣兵': '降低单位升级成本并改善军队维护，战争转型前值得准备。', '海军传统': '海军与港口路线的政策节点，群岛地图比大陆图更需要。', '外交服务': '打开高级外交和间谍工具，外交或文化路线开始经营国际关系。', '探索': '强化贸易、港口和远洋扩张，沿海帝国或文化路线价值更高。', '人文主义': '解锁博物馆与文化政策，文化胜利进入作品经营期。', '重商主义': '强化贸易和经济弹性，宽铺城需要更多现金时优先。', '改革教会': '强化宗教传播和信仰体系，宗教压力不足时比继续造传教士更重要。', '启蒙运动': '解锁高级政策与政府，科技、文化和外交路线都常用的中期节点。', '土木工程': '改善防御与城市建设，战争前或城市生产不足时使用。', '殖民主义': '强化海外扩张和海军，群岛或跨海殖民时优先。', '民族主义': '解锁军团和军队，是统治路线的关键跃迁。', '自然史': '解锁考古与博物馆内容，文化路线要提前准备作品槽位。', '歌剧与芭蕾': '进一步强化剧院和伟人作品，文化路线中期核心。', '焦土政策': '提升战争与掠夺能力，主动战争正在持续时才优先。', '城市化': '强化城市和生产政策，进入工业时代后用于放大核心城市。', '资本主义': '提高经济能力与贸易收益，文化和外交路线都需要稳定现金流。', '阶级斗争': '解锁后期政府和军事政策，按你的政府转换计划研究。', '保护主义': '强化奢侈资源与贸易收益，资源丰富但金币不足时很有价值。', '意识形态': '选择后期政府并明确最终路线，研究前先看政策槽位是否够用。', '大众传媒': '文化旅游后期节点，博物馆、广播和开放边界准备好后再冲。', '动员': '进一步组建军团和军队，统治路线后期的效率放大器。', '核计划': '解锁核武器相关政策和项目，科技或统治终局才需要。', '冷战': '强化后期间谍、外交与军事体系，落后时可用间谍追赶。', '文化遗产': '整理伟人作品与文化建筑，旅游值不足时优先检查。', '太空竞赛': '科技胜利的市政侧加速器，太空港准备完成后优先。', '全球化': '后期贸易与外交放大器，胜利前最后检查政策卡。', '社交媒体': '文化和信息时代的旅游节点，国际旅游差距不足时研究。', '未来公民': '最终市政节点，适合完成其他目标后再投入。'
  },
  building: {},
  unit: {}
};

function splitDatabaseNames(text) {
  return text.split(/\s*[·→；;]\s*|　+/).map((name) => name.trim()).filter(Boolean);
}
function makeEntryNote(name, category, kind, index, total) {
  if (entryNotes[kind]?.[name]) return entryNotes[kind][name];
  if (kind === 'building') return `${category}建筑链第 ${index + 1} 项。先判断这座城市是否承担${category}职责，再投入生产；不要为了完成链条牺牲开拓者、军队或核心区域。`;
  return `${category}路线的第 ${index + 1} 个单位。${name.includes('攻') ? '主要负责突破城市防线。' : name.includes('骑') || name.includes('坦克') ? '主要负责机动、绕后和追击。' : '主要负责推进、输出或支援前线。'} 生产前先确认资源、升级路径和金币。`;
}
function enhanceDatabaseEntries(selector, kind) {
  document.querySelectorAll(selector).forEach((card) => {
    const title = card.querySelector('h3')?.textContent.trim();
    const paragraph = card.querySelector('p');
    if (!title || !paragraph || card.querySelector('.db-entry-list')) return;
    const names = splitDatabaseNames(paragraph.textContent);
    const list = document.createElement('div');
    list.className = 'db-entry-list';
    list.innerHTML = names.map((name, index) => `<details class="db-entry"><summary>${name}<span>+</span></summary><p>${makeEntryNote(name, title, kind, index, names.length)}</p></details>`).join('');
    paragraph.replaceWith(list);
  });
}
enhanceDatabaseEntries('.database-panel[data-db-panel="tech"] .era-columns > div', 'tech');
enhanceDatabaseEntries('.database-panel[data-db-panel="civic"] .era-columns > div', 'civic');
enhanceDatabaseEntries('.database-panel[data-db-panel="building"] .catalog-grid article', 'building');
enhanceDatabaseEntries('.database-panel[data-db-panel="unit"] .unit-catalog article', 'unit');

// 统治胜利重点：标出直接影响军力、升级、攻城和军团效率的科技与市政。
const dominationHighlights = {
  tech: {
    '采矿': '改良矿山并砍伐森林，帮助首都更快生产军队、军营和开拓者。',
    '弓箭': '解锁早期远程单位，是清理野蛮人和压制邻国的低成本战力。',
    '青铜器': '显示铁资源并解锁兵营，为剑士和大将军路线做准备。',
    '骑术': '解锁骑手；开放地形中可绕后、掠夺并快速切断敌方补给。',
    '铁器': '解锁剑士并显示铁，是古典时代主动战争的关键节点。',
    '工程': '提供攻城路线与突破城市防御所需的工程能力。',
    '机械': '解锁弩手，远程火力升级后能显著降低攻城损耗。',
    '学徒制': '解锁工业区和工坊，为持续生产军团、攻城器械和升级单位提供产能。',
    '军事战术': '强化中期军队与防御体系，适合在战争窗口前补齐。',
    '火药': '解锁火枪手和更强的攻城节奏，常是中期军力跃迁点。',
    '工业化': '工厂带来区域范围生产力，让核心城市持续供给前线。',
    '炼钢': '强化现代军力与城市防御，敌方进入现代化后应及时跟进。',
    '内燃机': '解锁坦克等高速单位，适合开放地图上的突破与追击。',
    '飞行': '解锁空军路线，后期可绕过地面防线直接打击城市。',
    '核裂变': '解锁核武器与核能，是终局威慑和快速结束战争的节点。'
  },
  civic: {
    '军事传统': '解锁军事政策和侧翼体系，帮助早期军队以更低成本作战。',
    '防御战术': '面对邻国压力时提高城市和军队生存能力，避免被迫停战发育。',
    '军事训练': '强化单位生产与军事政策，是准备第一场主动战争的前置。',
    '政治哲学': '解锁寡头政府，早期战争路线常用它获得更强的近战与政策组合。',
    '雇佣兵': '降低升级成本并改善军队维护，适合把老兵快速换代。',
    '民族主义': '解锁军团，是统治路线从单兵作战进入编制作战的关键节点。',
    '焦土政策': '强化掠夺与战争经济，适合在前线持续推进时使用。',
    '动员': '解锁军队并进一步提高编制效率，后期攻城和决战前优先。',
    '意识形态': '选择后期政府并准备战争政策，需结合敌人军力和你的经济承受力。',
    '核计划': '解锁核武器相关政策与项目，适合用科技优势快速终结僵局。'
  }
};
function markDominationEntries(panelSelector, notes) {
  document.querySelectorAll(panelSelector).forEach((entry) => {
    const name = entry.querySelector('summary')?.firstChild?.textContent.trim();
    if (!name || !notes[name]) return;
    entry.classList.add('domination-focus');
    const summary = entry.querySelector('summary');
    summary.insertAdjacentHTML('beforeend', '<span class="route-star" aria-label="统治胜利重点">★</span>');
    const note = entry.querySelector('p');
    if (note) note.insertAdjacentHTML('beforebegin', `<p class="route-note"><b>统治胜利重点</b>${notes[name]}</p>`);
  });
}
markDominationEntries('.database-panel[data-db-panel="tech"] .db-entry', dominationHighlights.tech);
markDominationEntries('.database-panel[data-db-panel="civic"] .db-entry', dominationHighlights.civic);

const searchInput = document.querySelector('#site-search, #leader-search');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    document.querySelectorAll('main article').forEach((item) => item.classList.toggle('search-match', Boolean(query) && item.textContent.toLowerCase().includes(query)));
  });
}

// 每个菜单页的可执行任务：把知识转成回合中的具体动作。
const pageTasks = {
  'basics.html': ['前 10 回合：侦察兵绕首都探路，锁定水源、粮食和生产地块。', '前 20 回合：至少保留一支额外战斗单位，发现野蛮人营地先处理。', '前 30 回合：建立第二城，并给两座城市分别安排职责。', '每次完成市政：立即检查并更换生产、区域或军事政策卡。'],
  'victories.html': ['回合 1—30：选择一条主线，并写下它需要的第一个区域。', '回合 30—60：检查主线指标；科技看学院与生产力，文化看旅游，统治看攻城与资源。', '准备转向：主线关键资源连续两项拿不到，或竞争者已明显领先时再换路线。', '每 10 回合：确认当前生产队列是否仍在服务胜利目标。'],
  'leaders.html': ['先选地图目标：想稳健发育选科技/通用，想主动进攻选侵略扩张，想经营城邦选文化/外交。', '开局 10 回合：确认领袖能力能否被当前地形触发；不能触发就不要强行照攻略。', '生产前 30 回合：只安排一个主方向，避免同时追奇观、宗教和战争。', '复盘标准：领袖能力是否在前 50 回合带来至少一次明确收益。'],
  'database.html': ['查科技/市政前：先写出你下一步要生产的单位、区域或建筑。', '查区域前：先看邻接来源，再锁定地块；不要只看建筑名称。', '查单位前：确认资源、升级路径和金币，不满足就准备替代方案。', '完成解锁后：立刻回到生产队列，检查是否真的要建，而不是只收藏资料。'],
  'playbook.html': ['回合 1—8：侦察兵开视野，目标是村庄、城邦、自然奇观和邻国方向。', '回合 8—18：投石兵/战士处理野蛮人，同时争取弓箭相关尤里卡。', '回合 18—32：生产并护送开拓者，第二城优先水源、资源或高邻接位置。', '回合 30—50：工人改良立即增产地块，锁定第一个区域，并按胜利路线选建筑。']
};
const taskPage = location.pathname.split('/').pop() || 'index.html';
if (pageTasks[taskPage]) {
  const taskSection = document.createElement('section');
  taskSection.className = 'section tinted task-section';
  taskSection.innerHTML = `<div class="container"><div class="section-heading"><div><p class="eyebrow"><span></span> 可执行任务 · PLAY THIS</p><h2>现在就做什么？</h2></div><p>完成一项再进入下一项，<br>不要只停留在理解。</p></div><div class="task-grid">${pageTasks[taskPage].map((task, index) => `<article><span>任务 ${String(index + 1).padStart(2, '0')}</span><p>${task}</p><b>完成后再继续</b></article>`).join('')}</div></div>`;
  document.querySelector('main')?.append(taskSection);
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
