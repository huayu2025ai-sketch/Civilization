/* 多页面站点共用导航：移动端菜单与当前页面高亮 */
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}
if (nav && !nav.querySelector('a[href="domination.html"]')) {
  const guideLink = document.createElement('a');
  guideLink.href = 'domination.html';
  guideLink.textContent = '完整攻略';
  nav.insertBefore(guideLink, nav.querySelector('a[href="playbook.html"]'));
}
if (nav && !nav.querySelector('a[href="tips.html"]')) {
  const tipsLink = document.createElement('a');
  tipsLink.href = 'tips.html';
  tipsLink.textContent = '技巧库';
  nav.insertBefore(tipsLink, nav.querySelector('a[href="playbook.html"]'));
}
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.main-nav a').forEach((link) => {
  if (link.getAttribute('href') === currentPage) link.classList.add('current');
});
