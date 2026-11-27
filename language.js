// Keep the selected language across both demonstrations.
(() => {
  const key = 'sentryfi-language';
  const page = location.pathname.split('/').pop();
  const english = page.includes('.en.');
  const current = english ? 'en' : 'zh';
  const base = page.replace(/(?:\.en)?\.html$/, '');
  const target = lang => base + (lang === 'en' ? '.en.html' : '.html') + location.search + location.hash;
  let saved;
  try { saved = localStorage.getItem(key); } catch {}
  if ((saved === 'en' || saved === 'zh') && saved !== current) {
    location.replace(target(saved));
    return;
  }
  const dialog = document.createElement('dialog');
  dialog.className = 'language-dialog';
  dialog.setAttribute('aria-labelledby', 'language-title');
  dialog.innerHTML = '<h2 id="language-title">选择语言 / Choose a language</h2><div><button lang="zh-CN" data-lang="zh">中文</button><button lang="en" data-lang="en">English</button></div>';
  const switcher = document.createElement('button');
  switcher.className = 'language-switch';
  switcher.textContent = english ? 'Language · EN' : '语言 · 中文';
  const header = document.querySelector('main header, main h1, h1');
  if (header?.matches('header')) header.append(switcher);
  else if (header) header.before(switcher);
  else document.body.prepend(switcher);
  document.body.append(dialog);
  switcher.onclick = () => dialog.showModal();
  dialog.addEventListener('cancel', event => { if (!saved) event.preventDefault(); });
  dialog.onclick = event => {
    const lang = event.target.dataset.lang;
    if (!lang) return;
    saved = lang;
    try { localStorage.setItem(key, lang); } catch {}
    dialog.close();
    if (lang !== current) location.replace(target(lang));
  };
  if (!saved) dialog.showModal();
})();
