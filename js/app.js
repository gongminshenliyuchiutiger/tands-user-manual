/**
 * 教育部因材網時空學園 互動式使用者操作手冊 - 核心互動引擎
 * 包含：星雲粒子背景、步驟輪播、Lightbox、全文搜尋、XP徽章、五大模擬器、隨堂測驗、吉祥物自由拖曳
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. 全域狀態與本地儲存 (XP、徽章、音效、主題)
     ========================================================================== */
  const STORAGE_KEY = 'tands_manual_progress_v1';
  const state = {
    xp: 0,
    completedChapters: [],
    soundEnabled: true,
    theme: 'dark',
    bopomofo: false,
    stepIndices: {} // 記錄每個章節目前所在步驟索引
  };

  let bopomofoFontLoaded = false;

  function ensureBopomofoFontLoaded() {
    if (bopomofoFontLoaded) return;
    bopomofoFontLoaded = true;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Bpmf+Huninn&display=swap';
    document.head.appendChild(link);
  }

  function applyBopomofoMode(enabled, notify = false) {
    state.bopomofo = Boolean(enabled);
    if (state.bopomofo) ensureBopomofoFontLoaded();
    document.body.classList.toggle('bopomofo-mode', state.bopomofo);

    const btn = document.getElementById('bopomofo-toggle-btn');
    if (btn) {
      btn.classList.toggle('active', state.bopomofo);
      btn.setAttribute('aria-pressed', String(state.bopomofo));
    }
    const simCheck = document.getElementById('sim-bopomofo');
    if (simCheck) simCheck.checked = state.bopomofo;

    saveProgress();
    if (notify) {
      showToast(
        state.bopomofo ? '已開啟全站注音輔助！國小生也能輕鬆看懂！' : '已關閉注音輔助模式',
        'fa-solid fa-language'
      );
    }
  }

  function loadProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      if (typeof saved.xp === 'number') state.xp = saved.xp;
      if (Array.isArray(saved.completedChapters)) state.completedChapters = saved.completedChapters;
      if (saved.theme === 'light') {
        state.theme = 'light';
        document.body.classList.add('theme-light');
      }
      if (saved.bopomofo === true) {
        state.bopomofo = true;
      }
    } catch (e) {
      // 忽略本機儲存讀取異常
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        xp: state.xp,
        completedChapters: state.completedChapters,
        theme: state.theme,
        bopomofo: state.bopomofo
      }));
    } catch (e) {
      // 忽略本機儲存寫入異常
    }
  }

  /* ==========================================================================
     2. Web Audio API 合成趣味互動音效（零外部檔案依賴）
     ========================================================================== */
  let audioCtx = null;
  function playTone(type = 'click') {
    if (!state.soundEnabled) return;
    try {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        audioCtx = new AudioContextClass();
      }
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(620, now);
        osc.frequency.exponentialRampToValueAtTime(920, now + 0.07);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'success') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        osc.frequency.setValueAtTime(1046.5, now + 0.24);
        gain.gain.setValueAtTime(0.11, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
        osc.start(now);
        osc.stop(now + 0.42);
      } else if (type === 'error') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.linearRampToValueAtTime(160, now + 0.18);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'pop') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(860, now + 0.1);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      }
    } catch (e) {
      // 忽略不支援音訊的環境
    }
  }

  /* ==========================================================================
     3. Toast 通知與簡易彩紙慶祝特效
     ========================================================================== */
  function showToast(message, iconClass = 'fa-solid fa-sparkles') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const item = document.createElement('div');
    item.className = 'toast-item';
    item.innerHTML = `<i class="${iconClass}" style="color: var(--neon-gold);"></i><span>${message}</span>`;
    container.appendChild(item);
    setTimeout(() => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(30px)';
      item.style.transition = 'all 0.3s ease';
      setTimeout(() => item.remove(), 320);
    }, 2800);
  }

  function burstConfetti() {
    const colors = ['#00f5ff', '#ff3cac', '#ffd166', '#a855f7', '#22c55e', '#ff7b00'];
    for (let i = 0; i < 42; i++) {
      const p = document.createElement('div');
      p.style.position = 'fixed';
      p.style.left = `${Math.random() * 100}vw`;
      p.style.top = '-12px';
      p.style.width = `${6 + Math.random() * 7}px`;
      p.style.height = `${10 + Math.random() * 8}px`;
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.borderRadius = '2px';
      p.style.zIndex = '2500';
      p.style.pointerEvents = 'none';
      p.style.transition = `transform ${1.4 + Math.random() * 1.4}s cubic-bezier(0.2, 0.7, 0.3, 1), opacity 1.8s ease`;
      document.body.appendChild(p);
      requestAnimationFrame(() => {
        p.style.transform = `translate(${(Math.random() - 0.5) * 260}px, ${window.innerHeight + 60}px) rotate(${Math.random() * 720}deg)`;
        p.style.opacity = '0';
      });
      setTimeout(() => p.remove(), 2900);
    }
  }

  function addXP(amount, reason) {
    state.xp += amount;
    saveProgress();
    updateXPUI();
    if (reason) {
      showToast(`+${amount} 時空能量！${reason}`, 'fa-solid fa-bolt');
    }
  }

  function completeChapter(chapterId) {
    if (state.completedChapters.includes(chapterId)) {
      showToast('本章節徽章已經收入囊中囉！', 'fa-solid fa-medal');
      playTone('click');
      return;
    }
    const ch = window.MANUAL_CHAPTERS.find(c => c.id === chapterId);
    state.completedChapters.push(chapterId);
    state.xp += 100;
    saveProgress();
    updateXPUI();
    playTone('success');
    burstConfetti();
    if (ch) {
      showToast(`解鎖徽章【${ch.badgeName}】+100 XP！`, 'fa-solid fa-trophy');
    }
    refreshCompletionUI();
  }

  function updateXPUI() {
    const xpEl = document.getElementById('xp-value');
    const badgeCountEl = document.getElementById('badge-count');
    if (xpEl) xpEl.textContent = `${state.xp} XP`;
    if (badgeCountEl) badgeCountEl.textContent = `${state.completedChapters.length}/${window.MANUAL_CHAPTERS.length}`;
  }

  function refreshCompletionUI() {
    window.MANUAL_CHAPTERS.forEach(ch => {
      const done = state.completedChapters.includes(ch.id);
      const navBtn = document.querySelector(`.chapter-nav-btn[data-target="${ch.id}"]`);
      if (navBtn) navBtn.classList.toggle('completed', done);
      const completeBtn = document.querySelector(`.complete-chapter-btn[data-chapter="${ch.id}"]`);
      if (completeBtn) {
        if (done) {
          completeBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> 已解鎖本章徽章';
          completeBtn.classList.remove('btn-primary');
          completeBtn.classList.add('btn-outline');
        }
      }
    });
    renderBadgesModal();
  }

  /* ==========================================================================
     4. 動態星雲粒子背景 (Canvas)
     ========================================================================== */
  function initStarfield() {
    const canvas = document.getElementById('starfield-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, stars = [];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const count = Math.min(110, Math.floor((width * height) / 14000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.8 + 0.5,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        alpha: Math.random() * 0.7 + 0.25,
        hue: [185, 275, 325, 45][Math.floor(Math.random() * 4)]
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const isLight = document.body.classList.contains('theme-light');
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = isLight
          ? `hsla(${s.hue}, 78%, 48%, ${s.alpha * 0.45})`
          : `hsla(${s.hue}, 95%, 75%, ${s.alpha})`;
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    draw();
  }

  /* ==========================================================================
     5. 渲染側邊欄、總覽卡片與 9 大章節互動內容
     ========================================================================== */
  function renderNavigationAndOverview() {
    const navList = document.getElementById('chapter-nav-list');
    const overviewGrid = document.getElementById('overview-grid');
    if (!navList || !overviewGrid) return;

    navList.innerHTML = '';
    overviewGrid.innerHTML = '';

    window.MANUAL_CHAPTERS.forEach(ch => {
      // 側邊欄按鈕
      const li = document.createElement('li');
      li.innerHTML = `
        <button class="chapter-nav-btn" data-target="${ch.id}">
          <span class="chapter-nav-icon" style="background: ${ch.accent};">
            <i class="${ch.icon}"></i>
          </span>
          <span class="chapter-nav-meta">
            <span class="chapter-nav-num">CHAPTER ${ch.num}</span>
            <span class="chapter-nav-name">${ch.title}</span>
          </span>
          <i class="fa-solid fa-circle-check chapter-done-check"></i>
        </button>
      `;
      li.querySelector('button').addEventListener('click', () => {
        playTone('click');
        scrollToSection(ch.id);
        closeMobileSidebar();
      });
      navList.appendChild(li);

      // 總覽卡片
      const card = document.createElement('div');
      card.className = 'overview-card';
      card.style.setProperty('--card-accent', ch.accent);
      card.innerHTML = `
        <div class="overview-card-top">
          <div class="overview-icon" style="background: ${ch.accent};">
            <i class="${ch.icon}"></i>
          </div>
          <span class="overview-num">${ch.num}</span>
        </div>
        <h3>${ch.title}</h3>
        <p>${ch.subtitle}</p>
        <div class="overview-card-footer">
          <span><i class="fa-solid fa-layer-group"></i> ${ch.steps.length} 個互動步驟</span>
          <span><i class="fa-solid fa-arrow-right"></i></span>
        </div>
      `;
      card.addEventListener('click', () => {
        playTone('click');
        scrollToSection(ch.id);
      });
      overviewGrid.appendChild(card);
    });
  }

  function renderAllChapters() {
    const container = document.getElementById('chapters-container');
    if (!container) return;
    container.innerHTML = '';

    window.MANUAL_CHAPTERS.forEach(ch => {
      state.stepIndices[ch.id] = 0;
      const section = document.createElement('section');
      section.className = 'chapter-section';
      section.id = ch.id;

      const pillsHtml = ch.highlights
        .map(h => `<span class="summary-pill"><i class="fa-solid fa-star"></i> ${h}</span>`)
        .join('');

      const tabsHtml = ch.steps
        .map((st, idx) => `
          <button class="step-tab-btn ${idx === 0 ? 'active' : ''}" data-chapter="${ch.id}" data-step="${idx}">
            <i class="fa-solid fa-circle-dot"></i> ${idx + 1}. ${st.tab}
          </button>
        `)
        .join('');

      section.innerHTML = `
        <div class="chapter-header">
          <div class="chapter-title-group">
            <div class="chapter-badge-icon" style="background: ${ch.accent};">
              <i class="${ch.icon}"></i>
            </div>
            <div>
              <div class="chapter-kicker">CHAPTER ${ch.num} · 徽章：${ch.badgeName}</div>
              <h2 class="chapter-title">${ch.title}</h2>
            </div>
          </div>
          <button class="btn btn-primary btn-sm complete-chapter-btn" data-chapter="${ch.id}">
            <i class="fa-solid fa-award"></i> 標記學會領 +100 XP
          </button>
        </div>

        <div class="chapter-summary-pills">${pillsHtml}</div>

        <div class="stepper-container">
          <div class="step-tabs" id="tabs-${ch.id}">${tabsHtml}</div>
          <div class="step-stage" id="stage-${ch.id}"></div>
        </div>

        ${ch.simulator ? `<div class="sim-box" id="sim-${ch.simulator}"></div>` : ''}
      `;

      container.appendChild(section);
      renderChapterStep(ch.id, 0);

      // 綁定步驟頁籤點擊
      section.querySelectorAll('.step-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          playTone('click');
          renderChapterStep(ch.id, Number(btn.dataset.step));
        });
      });

      // 綁定完成章節領 XP
      section.querySelector('.complete-chapter-btn').addEventListener('click', () => {
        completeChapter(ch.id);
      });
    });

    // 初始化五大互動模擬器
    initLobbySimulator();
    initSearchSimulator();
    initSoloBattleSimulator();
    initCoopSimulator();
    initFuelSimulator();
  }

  function renderChapterStep(chapterId, stepIndex) {
    const ch = window.MANUAL_CHAPTERS.find(c => c.id === chapterId);
    if (!ch) return;
    const total = ch.steps.length;
    const idx = Math.max(0, Math.min(stepIndex, total - 1));
    state.stepIndices[chapterId] = idx;
    const step = ch.steps[idx];

    // 更新頁籤高亮
    const tabsWrap = document.getElementById(`tabs-${chapterId}`);
    if (tabsWrap) {
      tabsWrap.querySelectorAll('.step-tab-btn').forEach((b, i) => {
        b.classList.toggle('active', i === idx);
      });
    }

    const stage = document.getElementById(`stage-${chapterId}`);
    if (!stage) return;

    const bulletsHtml = step.bullets
      .map(b => `<li><i class="fa-solid fa-angles-right"></i><span>${b}</span></li>`)
      .join('');

    const galleryClass = step.images.length === 1 ? 'step-gallery single-img' : 'step-gallery';
    const imagesHtml = step.images
      .map(img => `
        <div class="step-img-card" data-src="${img.src}" data-caption="${img.caption}">
          <img src="${img.src}" alt="${img.caption}" loading="lazy" />
          <span class="step-img-zoom-badge"><i class="fa-solid fa-magnifying-glass-plus"></i></span>
        </div>
      `)
      .join('');

    stage.innerHTML = `
      <div class="step-info-box">
        <span class="step-page-tag"><i class="fa-solid fa-book-open"></i> 對應手冊 ${step.page} · 步驟 ${idx + 1}/${total}</span>
        <h3 class="step-heading">${step.title}</h3>
        <ul class="step-bullets">${bulletsHtml}</ul>
        <div class="step-tip-box">
          <i class="fa-solid fa-lightbulb"></i>
          <span><strong>操作小秘訣：</strong>${step.tip}</span>
        </div>
        <div class="step-nav-controls">
          <button class="btn btn-outline btn-sm prev-step-btn" ${idx === 0 ? 'disabled style="opacity:0.4;cursor:not-allowed;"' : ''}>
            <i class="fa-solid fa-chevron-left"></i> 上一步
          </button>
          <button class="btn btn-primary btn-sm next-step-btn">
            ${idx === total - 1 ? '<i class="fa-solid fa-flag-checkered"></i> 完成本章節' : '下一步 <i class="fa-solid fa-chevron-right"></i>'}
          </button>
        </div>
      </div>
      <div class="${galleryClass}">${imagesHtml}</div>
    `;

    // 綁定上下步
    const prevBtn = stage.querySelector('.prev-step-btn');
    const nextBtn = stage.querySelector('.next-step-btn');
    if (prevBtn && idx > 0) {
      prevBtn.addEventListener('click', () => {
        playTone('click');
        renderChapterStep(chapterId, idx - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (idx === total - 1) {
          completeChapter(chapterId);
        } else {
          playTone('click');
          renderChapterStep(chapterId, idx + 1);
        }
      });
    }

    // 綁定圖片點擊放大 Lightbox
    stage.querySelectorAll('.step-img-card').forEach(card => {
      card.addEventListener('click', () => {
        playTone('pop');
        openLightbox(card.dataset.src, card.dataset.caption);
      });
    });
  }

  /* ==========================================================================
     6. 五大內建迷你互動模擬器
     ========================================================================== */

  // 模擬器 1：大廳功能熱點互動面板（第 2 章）
  function initLobbySimulator() {
    const el = document.getElementById('sim-lobby');
    if (!el) return;

    const panels = {
      mail: {
        title: '信件中心（模擬體驗）',
        html: `
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
            <div>
              <strong><i class="fa-solid fa-gift" style="color:var(--neon-pink);"></i> 星球排行榜結算獎勵</strong>
              <p style="font-size:0.86rem;color:var(--text-muted);">恭喜你在期間限定星球表現優異，內含 500 能量與 AI 晶片！</p>
            </div>
            <button class="btn btn-primary btn-sm" id="sim-claim-mail"><i class="fa-solid fa-hand-holding-heart"></i> 一鍵領取獎勵</button>
          </div>
        `
      },
      settings: {
        title: '系統設定與權限切換（模擬體驗）',
        html: `
          <div style="display:flex;flex-wrap:wrap;gap:14px;align-items:center;">
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-weight:700;">
              <input type="checkbox" id="sim-bopomofo" checked /> <i class="fa-solid fa-language"></i> 開啟注音輔助
            </label>
            <label style="display:flex;align-items:center;gap:8px;font-weight:700;">
              <i class="fa-solid fa-user-tie"></i> 模擬身分：
              <select class="sim-select" id="sim-role-select">
                <option value="teacher">教師帳號（可自由調整導師等級）</option>
                <option value="student">學生帳號（依學校年級鎖定）</option>
              </select>
            </label>
            <label style="display:flex;align-items:center;gap:8px;font-weight:700;">
              <i class="fa-solid fa-sliders"></i> 導師等級：
              <select class="sim-select" id="sim-mentor-lv">
                <option>國小三年級</option>
                <option selected>國小五年級</option>
                <option>國中七年級</option>
              </select>
            </label>
          </div>
          <p id="sim-setting-note" style="margin-top:10px;font-size:0.84rem;color:var(--neon-cyan);">
            <i class="fa-solid fa-circle-info"></i> 教師帳號可隨時調整導師等級，控制抽題難度！
          </p>
        `
      },
      web: {
        title: '官方網站即時公告（模擬體驗）',
        html: `<p><i class="fa-solid fa-bullhorn" style="color:var(--neon-gold);"></i> <strong>最新公告：</strong>2026 全新「動態魔王」與「黑洞遊臺灣情境任務 3 大章節」重磅登場！歡迎全國師生使用教育部因材網帳號免費暢玩。</p>`
      },
      poster: {
        title: '大廳活動海報牆（模擬體驗）',
        html: `<p><i class="fa-solid fa-images" style="color:var(--neon-purple);"></i> <strong>當期主打活動：</strong>「春季跨學科星際遠征」熱烈開跑中，累積積分衝上排行榜即可不定時獲得限定獎勵！</p>`
      },
      rank: {
        title: '各校師生總名次排行榜（模擬體驗）',
        html: `
          <div style="display:flex;flex-wrap:wrap;gap:12px;">
            <span class="summary-pill"><i class="fa-solid fa-crown" style="color:#ffd166;"></i> 第 1 名：星際領航小隊 (9,850 分)</span>
            <span class="summary-pill"><i class="fa-solid fa-medal" style="color:#cbd5e1;"></i> 第 2 名：因材探索者 (9,420 分)</span>
            <span class="summary-pill"><i class="fa-solid fa-award" style="color:#ff7b00;"></i> 第 3 名：時空秋老虎 (9,180 分)</span>
          </div>
        `
      }
    };

    el.innerHTML = `
      <div class="sim-header">
        <div class="sim-title"><i class="fa-solid fa-gamepad"></i> 互動體驗：大廳五大功能模擬面板</div>
        <span class="sim-badge"><i class="fa-solid fa-hand-pointer"></i> 點擊按鈕試玩</span>
      </div>
      <div class="lobby-sim-grid">
        <button class="lobby-btn active" data-panel="mail"><i class="fa-solid fa-envelope-open-text" style="color:#ff3cac;"></i>信件</button>
        <button class="lobby-btn" data-panel="settings"><i class="fa-solid fa-gear" style="color:#00f5ff;"></i>設定</button>
        <button class="lobby-btn" data-panel="web"><i class="fa-solid fa-globe" style="color:#22c55e;"></i>官方網站</button>
        <button class="lobby-btn" data-panel="poster"><i class="fa-solid fa-panorama" style="color:#a855f7;"></i>海報</button>
        <button class="lobby-btn" data-panel="rank"><i class="fa-solid fa-ranking-star" style="color:#ffd166;"></i>排行榜</button>
      </div>
      <div class="lobby-preview-panel" id="lobby-preview-panel"></div>
    `;

    const preview = el.querySelector('#lobby-preview-panel');

    function showPanel(key) {
      el.querySelectorAll('.lobby-btn').forEach(b => b.classList.toggle('active', b.dataset.panel === key));
      preview.innerHTML = `<h4 style="margin-bottom:10px;">${panels[key].title}</h4>${panels[key].html}`;

      if (key === 'mail') {
        const claimBtn = preview.querySelector('#sim-claim-mail');
        claimBtn.addEventListener('click', () => {
          playTone('success');
          claimBtn.disabled = true;
          claimBtn.innerHTML = '<i class="fa-solid fa-check"></i> 已領取獎勵';
          addXP(20, '成功體驗大廳信件領獎！');
        });
      }
      if (key === 'settings') {
        const bpmfCheck = preview.querySelector('#sim-bopomofo');
        const roleSel = preview.querySelector('#sim-role-select');
        const lvSel = preview.querySelector('#sim-mentor-lv');
        const note = preview.querySelector('#sim-setting-note');
        if (bpmfCheck) {
          bpmfCheck.checked = state.bopomofo;
          bpmfCheck.addEventListener('change', () => {
            playTone('pop');
            applyBopomofoMode(bpmfCheck.checked, true);
          });
        }
        roleSel.addEventListener('change', () => {
          playTone('click');
          const isStudent = roleSel.value === 'student';
          lvSel.disabled = isStudent;
          note.innerHTML = isStudent
            ? '<i class="fa-solid fa-lock"></i> 學生帳號的導師等級會依學校帳號自動綁定，無法手動更改！'
            : '<i class="fa-solid fa-unlock"></i> 教師帳號可自由切換導師等級，即時調整抽題難度！';
        });
      }
    }

    el.querySelectorAll('.lobby-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        playTone('click');
        showPanel(btn.dataset.panel);
      });
    });

    showPanel('mail');
  }

  // 模擬器 2：關卡碼搜尋與年級學科篩選（第 3 章）
  function initSearchSimulator() {
    const el = document.getElementById('sim-search');
    if (!el) return;

    const sampleStages = [
      { code: 'TW-101', name: '自由女神像的秘密', grade: '高年級', subject: '社會', icon: 'fa-solid fa-landmark' },
      { code: 'SC-204', name: '太陽系行星大探索', grade: '中年級', subject: '自然', icon: 'fa-solid fa-meteor' },
      { code: 'MA-309', name: '分數與小數時空橋', grade: '高年級', subject: '數學', icon: 'fa-solid fa-calculator' },
      { code: 'CH-112', name: '成語森林大冒險', grade: '中年級', subject: '國語', icon: 'fa-solid fa-feather-pointed' },
      { code: 'TW-888', name: '臺灣生態與黑面琵鷺', grade: '國中', subject: '自然', icon: 'fa-solid fa-leaf' },
      { code: 'EN-505', name: '世界節慶英語通', grade: '國中', subject: '英語', icon: 'fa-solid fa-earth-americas' }
    ];

    el.innerHTML = `
      <div class="sim-header">
        <div class="sim-title"><i class="fa-solid fa-magnifying-glass-location"></i> 互動體驗：關卡碼、QR Code 與學科篩選器</div>
        <span class="sim-badge"><i class="fa-solid fa-bolt"></i> 試著輸入「自由女神像」</span>
      </div>
      <div class="search-sim-controls">
        <input type="text" class="sim-input" id="sim-stage-input" placeholder="輸入關卡碼或名稱（例：自由女神像、TW-101）" />
        <select class="sim-select" id="sim-grade-filter">
          <option value="">全部年級</option>
          <option value="中年級">中年級</option>
          <option value="高年級">高年級</option>
          <option value="國中">國中</option>
        </select>
        <select class="sim-select" id="sim-subject-filter">
          <option value="">全部學科</option>
          <option value="國語">國語</option>
          <option value="數學">數學</option>
          <option value="自然">自然</option>
          <option value="社會">社會</option>
          <option value="英語">英語</option>
        </select>
        <button class="btn btn-primary btn-sm" id="sim-qr-scan-btn">
          <i class="fa-solid fa-qrcode"></i> 模擬掃描 QR Code
        </button>
      </div>
      <div class="sim-stage-results" id="sim-stage-results"></div>
    `;

    const input = el.querySelector('#sim-stage-input');
    const gradeSel = el.querySelector('#sim-grade-filter');
    const subjSel = el.querySelector('#sim-subject-filter');
    const resultsWrap = el.querySelector('#sim-stage-results');
    const qrBtn = el.querySelector('#sim-qr-scan-btn');

    function renderList() {
      const q = input.value.trim().toLowerCase();
      const g = gradeSel.value;
      const s = subjSel.value;
      const filtered = sampleStages.filter(st => {
        const matchText = !q || st.name.toLowerCase().includes(q) || st.code.toLowerCase().includes(q);
        const matchG = !g || st.grade === g;
        const matchS = !s || st.subject === s;
        return matchText && matchG && matchS;
      });

      if (!filtered.length) {
        resultsWrap.innerHTML = `<p style="color:var(--text-muted);font-size:0.9rem;"><i class="fa-solid fa-circle-exclamation"></i> 找不到符合條件的範例關卡，請清除關鍵字再試試！</p>`;
        return;
      }

      resultsWrap.innerHTML = filtered.map(st => `
        <div class="sim-stage-card">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span class="step-page-tag">${st.code}</span>
            <span style="font-size:0.78rem;color:var(--text-muted);">${st.grade} · ${st.subject}</span>
          </div>
          <strong style="font-size:0.98rem;"><i class="${st.icon}" style="color:var(--neon-cyan);"></i> ${st.name}</strong>
          <button class="btn btn-outline btn-sm launch-sim-stage" data-name="${st.name}">
            <i class="fa-solid fa-play"></i> 進入關卡
          </button>
        </div>
      `).join('');

      resultsWrap.querySelectorAll('.launch-sim-stage').forEach(btn => {
        btn.addEventListener('click', () => {
          playTone('success');
          addXP(15, `已秒速進入關卡【${btn.dataset.name}】！`);
        });
      });
    }

    input.addEventListener('input', renderList);
    gradeSel.addEventListener('change', () => { playTone('click'); renderList(); });
    subjSel.addEventListener('change', () => { playTone('click'); renderList(); });
    qrBtn.addEventListener('click', () => {
      playTone('success');
      input.value = '自由女神像';
      gradeSel.value = '';
      subjSel.value = '';
      renderList();
      addXP(20, 'QR Code 掃描成功，已定位「自由女神像」關卡！');
    });

    renderList();
  }

  // 模擬器 3：單人冒險實戰（導師/戰寵 + 拖曳知識卡 + 星星回收）（第 6 章）
  function initSoloBattleSimulator() {
    const el = document.getElementById('sim-solo');
    if (!el) return;

    const correctCards = ['美國紐約自由島', '法國贈送的禮物', '象徵自由與民主'];
    const allCards = [
      '美國紐約自由島',
      '埃及吉薩高原',
      '法國贈送的禮物',
      '日本幕府贈送',
      '象徵自由與民主',
      '用來測量降雨量'
    ];

    let selectedMentor = '社會導師';
    let hintActive = false;
    let slots = [null, null, null];
    let bossHp = 100;
    let holdTimer = null;
    let holdProgress = 0;

    el.innerHTML = `
      <div class="sim-header">
        <div class="sim-title"><i class="fa-solid fa-wand-magic-sparkles"></i> 互動實戰：單人冒險答題與戰寵鷹架模擬器</div>
        <span class="sim-badge"><i class="fa-solid fa-hand-back-fist"></i> 拖曳或點擊知識卡放入 3 個槽位</span>
      </div>
      <div class="battle-arena">
        <div class="battle-setup-row">
          <div class="battle-selector-group">
            <label><i class="fa-solid fa-chalkboard-user"></i> 步驟 1：選擇時空導師（本題為「社會」科）</label>
            <div class="choice-pills" id="sim-mentor-pills">
              <button class="choice-pill selected" data-mentor="社會導師"><i class="fa-solid fa-earth-asia"></i> 社會導師 (對應加成)</button>
              <button class="choice-pill" data-mentor="數學導師"><i class="fa-solid fa-square-root-variable"></i> 數學導師</button>
            </div>
          </div>
          <div class="battle-selector-group">
            <label><i class="fa-solid fa-dragon"></i> 步驟 2：發動戰寵技能</label>
            <div class="choice-pills">
              <button class="btn btn-outline btn-sm" id="sim-pet-skill-btn">
                <i class="fa-solid fa-magnifying-glass"></i> 發動戰寵「關鍵字鷹架提示」
              </button>
            </div>
          </div>
        </div>

        <div class="boss-bar-wrap">
          <i class="fa-solid fa-skull-crossbones" style="font-size:1.6rem;color:var(--neon-pink);"></i>
          <div style="flex:1;">
            <div style="display:flex;justify-content:space-between;font-size:0.82rem;font-weight:800;margin-bottom:4px;">
              <span>時空魔王 HP</span>
              <span id="sim-boss-hp-text">100 / 100</span>
            </div>
            <div class="boss-hp-track"><div class="boss-hp-fill" id="sim-boss-hp-fill"></div></div>
          </div>
        </div>

        <div class="question-prompt-box" id="sim-question-text"></div>

        <div class="drop-slots-row" id="sim-drop-slots">
          <div class="answer-slot" data-slot="0">槽位 1（拖曳或點卡放入）</div>
          <div class="answer-slot" data-slot="1">槽位 2（拖曳或點卡放入）</div>
          <div class="answer-slot" data-slot="2">槽位 3（拖曳或點卡放入）</div>
        </div>

        <div class="cards-hand-grid" id="sim-cards-hand"></div>

        <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
          <button class="btn btn-primary btn-sm" id="sim-attack-btn"><i class="fa-solid fa-bolt"></i> 出擊攻擊魔王！</button>
          <button class="btn btn-outline btn-sm" id="sim-reset-battle"><i class="fa-solid fa-rotate-left"></i> 重新放置卡片</button>
          <span id="sim-battle-feedback" style="font-size:0.88rem;font-weight:800;"></span>
        </div>

        <div class="star-recovery-box" id="sim-star-recovery">
          <div><i class="fa-solid fa-star" style="color:var(--neon-gold);"></i> <strong>觸發答錯回收機制！</strong>連續長按下方星星按鈕，收集積分、能量與 AI 晶片！</div>
          <button class="star-hold-btn" id="sim-star-hold-btn"><i class="fa-solid fa-star"></i> 長按收集星光能量 (0%)</button>
        </div>
      </div>
    `;

    const qText = el.querySelector('#sim-question-text');
    const hand = el.querySelector('#sim-cards-hand');
    const slotEls = el.querySelectorAll('.answer-slot');
    const feedback = el.querySelector('#sim-battle-feedback');
    const starBox = el.querySelector('#sim-star-recovery');
    const starBtn = el.querySelector('#sim-star-hold-btn');

    function renderQuestion() {
      if (hintActive) {
        qText.innerHTML = `<i class="fa-solid fa-circle-question" style="color:var(--neon-cyan);"></i> <strong>題目：</strong>請找出關於「<span class="keyword-highlight">自由女神像</span>」的 3 項正確知識卡！（提示：留意它的<span class="keyword-highlight">所在地</span>、<span class="keyword-highlight">贈送國</span>與<span class="keyword-highlight">精神象徵</span>）`;
      } else {
        qText.innerHTML = `<i class="fa-solid fa-circle-question" style="color:var(--neon-cyan);"></i> <strong>題目：</strong>請從下方知識卡中，挑出 3 張關於「自由女神像」的正確敘述放入槽位並按下【出擊】！`;
      }
    }

    function renderCardsAndSlots() {
      slotEls.forEach((slotEl, i) => {
        if (slots[i]) {
          slotEl.textContent = slots[i];
          slotEl.classList.add('filled');
        } else {
          slotEl.textContent = `槽位 ${i + 1}（拖曳或點卡放入）`;
          slotEl.classList.remove('filled');
        }
      });

      hand.innerHTML = allCards.map(text => {
        const used = slots.includes(text);
        return `<div class="knowledge-card ${used ? 'used' : ''}" draggable="true" data-card="${text}"><i class="fa-solid fa-note-sticky"></i> ${text}</div>`;
      }).join('');

      hand.querySelectorAll('.knowledge-card').forEach(cardEl => {
        const text = cardEl.dataset.card;
        // 支援拖曳
        cardEl.addEventListener('dragstart', e => {
          e.dataTransfer.setData('text/plain', text);
        });
        // 支援點擊快速放入空槽位（手機觸控超友善）
        cardEl.addEventListener('click', () => {
          const emptyIdx = slots.indexOf(null);
          if (emptyIdx === -1) {
            showToast('3 個槽位已放滿，點擊槽位可移出卡片！', 'fa-solid fa-circle-info');
            return;
          }
          playTone('click');
          slots[emptyIdx] = text;
          renderCardsAndSlots();
        });
      });
    }

    slotEls.forEach((slotEl, i) => {
      slotEl.addEventListener('dragover', e => {
        e.preventDefault();
        slotEl.classList.add('drag-over');
      });
      slotEl.addEventListener('dragleave', () => slotEl.classList.remove('drag-over'));
      slotEl.addEventListener('drop', e => {
        e.preventDefault();
        slotEl.classList.remove('drag-over');
        const text = e.dataTransfer.getData('text/plain');
        if (text && !slots.includes(text)) {
          playTone('click');
          slots[i] = text;
          renderCardsAndSlots();
        }
      });
      // 點擊槽位清空該格
      slotEl.addEventListener('click', () => {
        if (slots[i]) {
          playTone('click');
          slots[i] = null;
          renderCardsAndSlots();
        }
      });
    });

    // 導師選擇
    el.querySelectorAll('#sim-mentor-pills .choice-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        playTone('click');
        el.querySelectorAll('#sim-mentor-pills .choice-pill').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedMentor = btn.dataset.mentor;
      });
    });

    // 戰寵關鍵字鷹架技能
    el.querySelector('#sim-pet-skill-btn').addEventListener('click', () => {
      playTone('pop');
      hintActive = true;
      renderQuestion();
      showToast('戰寵發動技能！已為你高亮題目關鍵字！', 'fa-solid fa-dragon');
    });

    // 出擊判定
    el.querySelector('#sim-attack-btn').addEventListener('click', () => {
      if (slots.includes(null)) {
        playTone('error');
        feedback.style.color = 'var(--neon-gold)';
        feedback.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> 請先放滿 3 張知識卡再出擊！';
        return;
      }
      const isCorrect = correctCards.every(c => slots.includes(c));
      if (isCorrect) {
        playTone('success');
        const bonus = selectedMentor === '社會導師' ? 100 : 60;
        bossHp = Math.max(0, bossHp - bonus);
        el.querySelector('#sim-boss-hp-fill').style.width = `${bossHp}%`;
        el.querySelector('#sim-boss-hp-text').textContent = `${bossHp} / 100`;
        starBox.classList.remove('show');
        feedback.style.color = 'var(--neon-green)';
        feedback.innerHTML = selectedMentor === '社會導師'
          ? '<i class="fa-solid fa-fire"></i> 完美答對 + 社會導師加成！一擊必殺魔王！（手冊詳解倒數 10 秒）'
          : '<i class="fa-solid fa-check-circle"></i> 答對造成 60 傷害！提示：選對「社會導師」可觸發加成喔！';
        burstConfetti();
        addXP(40, '單人冒險實戰答題成功！');
      } else {
        playTone('error');
        feedback.style.color = '#f87171';
        feedback.innerHTML = '<i class="fa-solid fa-xmark"></i> 答題錯誤！已觸發「長按星星回收機制」，快試試看！';
        starBox.classList.add('show');
      }
    });

    // 重設
    el.querySelector('#sim-reset-battle').addEventListener('click', () => {
      playTone('click');
      slots = [null, null, null];
      bossHp = 100;
      el.querySelector('#sim-boss-hp-fill').style.width = '100%';
      el.querySelector('#sim-boss-hp-text').textContent = '100 / 100';
      feedback.textContent = '';
      starBox.classList.remove('show');
      holdProgress = 0;
      starBtn.innerHTML = '<i class="fa-solid fa-star"></i> 長按收集星光能量 (0%)';
      renderCardsAndSlots();
    });

    // 長按星星回收機制
    function startHold() {
      if (holdProgress >= 100) return;
      holdTimer = setInterval(() => {
        holdProgress = Math.min(100, holdProgress + 10);
        starBtn.innerHTML = `<i class="fa-solid fa-star"></i> 收集星光能量中 (${holdProgress}%)`;
        if (holdProgress >= 100) {
          clearInterval(holdTimer);
          playTone('success');
          starBtn.innerHTML = '<i class="fa-solid fa-gem"></i> 回收完成！獲得積分 + 能量 + AI 晶片';
          addXP(25, '成功體驗長按星星回收機制！');
        }
      }, 90);
    }
    function stopHold() {
      if (holdTimer) clearInterval(holdTimer);
    }
    starBtn.addEventListener('pointerdown', startHold);
    starBtn.addEventListener('pointerup', stopHold);
    starBtn.addEventListener('pointerleave', stopHold);

    renderQuestion();
    renderCardsAndSlots();
  }

  // 模擬器 4：組隊冒險房間配對（第 7 章）
  function initCoopSimulator() {
    const el = document.getElementById('sim-coop');
    if (!el) return;

    let roomCode = 'TS-8492';
    let mode = 'coop';
    let members = ['你（房主）'];

    el.innerHTML = `
      <div class="sim-header">
        <div class="sim-title"><i class="fa-solid fa-users-gear"></i> 互動體驗：組隊冒險開房與房間碼邀請</div>
        <span class="sim-badge"><i class="fa-solid fa-copy"></i> 支援一鍵複製房間碼</span>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin-bottom:14px;">
        <div class="choice-pills" id="sim-coop-mode">
          <button class="choice-pill selected" data-mode="coop"><i class="fa-solid fa-handshake"></i> 協作模式 (1~4人 · 可指定關卡碼)</button>
          <button class="choice-pill" data-mode="versus"><i class="fa-solid fa-khanda"></i> 陣營對戰 (2V2/3V3/4V4 · 隨機抽題)</button>
        </div>
        <div class="room-code-display">
          <i class="fa-solid fa-key"></i>
          <span id="sim-room-code">${roomCode}</span>
        </div>
        <button class="btn btn-outline btn-sm" id="sim-copy-code"><i class="fa-solid fa-copy"></i> 複製房間碼</button>
      </div>
      <div class="team-slots-grid" id="sim-team-slots"></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;">
        <button class="btn btn-outline btn-sm" id="sim-invite-bot"><i class="fa-solid fa-user-plus"></i> 模擬隊友輸入房間碼加入</button>
        <button class="btn btn-primary btn-sm" id="sim-coop-launch"><i class="fa-solid fa-rocket"></i> 全員就緒！出擊</button>
      </div>
    `;

    const slotsWrap = el.querySelector('#sim-team-slots');
    const codeSpan = el.querySelector('#sim-room-code');
    const botNames = ['小鯉魚同學', '秋老虎隊長', '星際學霸'];

    function renderTeam() {
      let html = '';
      for (let i = 0; i < 4; i++) {
        const m = members[i];
        if (m) {
          html += `
            <div class="team-slot-card ready">
              <i class="fa-solid fa-user-astronaut" style="font-size:1.6rem;color:var(--neon-green);"></i>
              <strong style="font-size:0.9rem;">${m}</strong>
              <span style="font-size:0.75rem;color:var(--neon-green);"><i class="fa-solid fa-check"></i> 準備完成</span>
            </div>
          `;
        } else {
          html += `
            <div class="team-slot-card">
              <i class="fa-solid fa-user-clock" style="font-size:1.5rem;color:var(--text-muted);"></i>
              <span style="font-size:0.84rem;color:var(--text-muted);">等待同學加入...</span>
            </div>
          `;
        }
      }
      slotsWrap.innerHTML = html;
    }

    el.querySelectorAll('#sim-coop-mode .choice-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        playTone('click');
        el.querySelectorAll('#sim-coop-mode .choice-pill').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        mode = btn.dataset.mode;
        roomCode = (mode === 'coop' ? 'TS-' : 'VS-') + Math.floor(1000 + Math.random() * 9000);
        codeSpan.textContent = roomCode;
      });
    });

    el.querySelector('#sim-copy-code').addEventListener('click', () => {
      playTone('pop');
      if (navigator.clipboard) navigator.clipboard.writeText(roomCode).catch(() => {});
      showToast(`已複製房間碼【${roomCode}】，快傳給同學吧！`, 'fa-solid fa-clipboard-check');
    });

    el.querySelector('#sim-invite-bot').addEventListener('click', () => {
      if (members.length >= 4) {
        showToast('房間已滿 4 人，隨時可以出擊！', 'fa-solid fa-users');
        return;
      }
      playTone('pop');
      members.push(botNames[members.length - 1]);
      renderTeam();
    });

    el.querySelector('#sim-coop-launch').addEventListener('click', () => {
      playTone('success');
      burstConfetti();
      addXP(30, `${mode === 'coop' ? '協作隊伍' : '陣營對戰'}（${members.length} 人）熱血出擊！`);
    });

    renderTeam();
  }

  // 模擬器 5：油料補充加油站小遊戲（第 9 章）
  function initFuelSimulator() {
    const el = document.getElementById('sim-fuel');
    if (!el) return;

    const fuelQuestions = [
      { q: '【因材網快問 1/3】12 × 8 等於多少？', opts: ['86', '96', '104'], ans: '96' },
      { q: '【因材網快問 2/3】臺灣最長的河流是哪一條？', opts: ['濁水溪', '淡水河', '秀姑巒溪'], ans: '濁水溪' },
      { q: '【因材網快問 3/3】植物行光合作用主要會釋放出哪種氣體？', opts: ['氧氣', '氮氣', '二氧化碳'], ans: '氧氣' }
    ];

    let idx = 0;
    let fuel = 25;

    el.innerHTML = `
      <div class="sim-header">
        <div class="sim-title"><i class="fa-solid fa-gas-pump"></i> 互動體驗：油料補充加油站（點選對應油槍答題）</div>
        <span class="sim-badge"><i class="fa-solid fa-fire-flame-curved"></i> 全對補滿 100% 油料</span>
      </div>
      <div class="fuel-meter-wrap">
        <i class="fa-solid fa-gauge-high" style="font-size:1.5rem;color:var(--neon-gold);"></i>
        <div class="fuel-track"><div class="fuel-fill" id="sim-fuel-fill"></div></div>
        <strong id="sim-fuel-pct">25%</strong>
      </div>
      <div class="question-prompt-box" id="sim-fuel-q"></div>
      <div class="fuel-nozzles-row" id="sim-fuel-nozzles"></div>
      <p id="sim-fuel-msg" style="margin-top:12px;font-size:0.88rem;font-weight:800;"></p>
    `;

    const fillEl = el.querySelector('#sim-fuel-fill');
    const pctEl = el.querySelector('#sim-fuel-pct');
    const qEl = el.querySelector('#sim-fuel-q');
    const nozzlesEl = el.querySelector('#sim-fuel-nozzles');
    const msgEl = el.querySelector('#sim-fuel-msg');

    function renderFuelStep() {
      fillEl.style.width = `${fuel}%`;
      pctEl.textContent = `${fuel}%`;

      if (idx >= fuelQuestions.length) {
        qEl.innerHTML = '<i class="fa-solid fa-circle-check" style="color:var(--neon-green);"></i> <strong>油箱已加滿 100%！</strong>你現在擁有足夠油料，可以立即出發挑戰「黑洞任務」囉！';
        nozzlesEl.innerHTML = `<button class="btn btn-outline btn-sm" id="sim-fuel-replay"><i class="fa-solid fa-rotate-right"></i> 再玩一次加油站</button>`;
        nozzlesEl.querySelector('#sim-fuel-replay').addEventListener('click', () => {
          idx = 0;
          fuel = 25;
          msgEl.textContent = '';
          renderFuelStep();
        });
        return;
      }

      const cur = fuelQuestions[idx];
      qEl.innerHTML = `<i class="fa-solid fa-oil-can" style="color:var(--neon-orange);"></i> <strong>${cur.q}</strong>`;
      nozzlesEl.innerHTML = cur.opts.map(opt => `
        <button class="fuel-nozzle-btn" data-opt="${opt}">
          <i class="fa-solid fa-gas-pump"></i> 油槍：${opt}
        </button>
      `).join('');

      nozzlesEl.querySelectorAll('.fuel-nozzle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if (btn.dataset.opt === cur.ans) {
            playTone('success');
            idx++;
            fuel = Math.min(100, fuel + 25);
            msgEl.style.color = 'var(--neon-green)';
            msgEl.innerHTML = '<i class="fa-solid fa-check"></i> 加油成功！油料 +25%！';
            if (idx === fuelQuestions.length) {
              burstConfetti();
              addXP(40, '完成油料補充任務，油箱 100% 滿格！');
            }
            renderFuelStep();
          } else {
            playTone('error');
            msgEl.style.color = '#f87171';
            msgEl.innerHTML = '<i class="fa-solid fa-rotate-left"></i> 這個加油孔不對喔！依手冊規定答錯需重新填答，再試一次！';
          }
        });
      });
    }

    renderFuelStep();
  }

  /* ==========================================================================
     7. 綜合隨堂闖關大挑戰（6 題）
     ========================================================================== */
  function initQuiz() {
    const wrap = document.getElementById('quiz-container');
    if (!wrap) return;

    let qIdx = 0;
    let score = 0;

    function renderQuizQuestion() {
      if (qIdx >= window.QUIZ_DATA.length) {
        const rank = score === window.QUIZ_DATA.length
          ? '傳說級時空大導師'
          : score >= 4 ? '資深星際冒險家' : '潛力時空見習生';
        wrap.innerHTML = `
          <div style="text-align:center;padding:16px 0;">
            <i class="fa-solid fa-trophy" style="font-size:3.2rem;color:var(--neon-gold);margin-bottom:12px;"></i>
            <h3 style="font-size:1.6rem;margin-bottom:8px;">挑戰完成！你答對了 ${score} / ${window.QUIZ_DATA.length} 題</h3>
            <p style="font-size:1.1rem;color:#7df9ff;font-weight:800;margin-bottom:20px;">獲得稱號：【${rank}】</p>
            <button class="btn btn-primary" id="quiz-restart-btn"><i class="fa-solid fa-rotate-right"></i> 重新挑戰隨堂測驗</button>
          </div>
        `;
        if (score >= 4) burstConfetti();
        wrap.querySelector('#quiz-restart-btn').addEventListener('click', () => {
          playTone('click');
          qIdx = 0;
          score = 0;
          renderQuizQuestion();
        });
        return;
      }

      const item = window.QUIZ_DATA[qIdx];
      wrap.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px;">
          <span class="hero-badge" style="margin:0;"><i class="fa-solid fa-circle-question"></i> 第 ${qIdx + 1} / ${window.QUIZ_DATA.length} 題</span>
          <span style="font-weight:800;color:var(--neon-gold);"><i class="fa-solid fa-star"></i> 目前得分：${score}</span>
        </div>
        <h3 style="font-size:1.2rem;margin-bottom:18px;line-height:1.5;">${item.q}</h3>
        <div style="display:flex;flex-direction:column;gap:10px;" id="quiz-options">
          ${item.options.map((opt, i) => `
            <button class="quiz-option-btn" data-idx="${i}">
              <i class="fa-solid fa-circle-chevron-right"></i>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>
        <div id="quiz-explain" style="margin-top:16px;display:none;padding:14px;border-radius:12px;background:rgba(0,0,0,0.28);border-left:4px solid var(--neon-cyan);"></div>
      `;

      const opts = wrap.querySelectorAll('.quiz-option-btn');
      const explainEl = wrap.querySelector('#quiz-explain');

      opts.forEach(btn => {
        btn.addEventListener('click', () => {
          const chosen = Number(btn.dataset.idx);
          opts.forEach(b => (b.disabled = true));
          if (chosen === item.answer) {
            btn.classList.add('correct');
            score++;
            playTone('success');
            addXP(20, '隨堂測驗答對！');
          } else {
            btn.classList.add('wrong');
            opts[item.answer].classList.add('correct');
            playTone('error');
          }
          explainEl.style.display = 'block';
          explainEl.innerHTML = `
            <p style="margin-bottom:12px;"><i class="fa-solid fa-lightbulb" style="color:var(--neon-gold);"></i> <strong>手冊解析：</strong>${item.explain}</p>
            <button class="btn btn-primary btn-sm" id="quiz-next-btn">
              ${qIdx === window.QUIZ_DATA.length - 1 ? '<i class="fa-solid fa-flag-checkered"></i> 查看總成績' : '下一題 <i class="fa-solid fa-arrow-right"></i>'}
            </button>
          `;
          explainEl.querySelector('#quiz-next-btn').addEventListener('click', () => {
            playTone('click');
            qIdx++;
            renderQuizQuestion();
          });
        });
      });
    }

    renderQuizQuestion();
  }

  /* ==========================================================================
     8. 全文即時搜尋
     ========================================================================== */
  function initGlobalSearch() {
    const input = document.getElementById('global-search-input');
    const clearBtn = document.getElementById('search-clear-btn');
    const dropdown = document.getElementById('search-results-dropdown');
    if (!input || !dropdown) return;

    function doSearch() {
      const q = input.value.trim().toLowerCase();
      clearBtn.classList.toggle('visible', q.length > 0);
      if (!q) {
        dropdown.classList.remove('open');
        dropdown.innerHTML = '';
        return;
      }

      const hits = [];
      window.MANUAL_CHAPTERS.forEach(ch => {
        ch.steps.forEach((st, stepIdx) => {
          const haystack = `${ch.title} ${st.tab} ${st.title} ${st.bullets.join(' ')} ${st.tip}`.toLowerCase();
          if (haystack.includes(q)) {
            hits.push({ ch, st, stepIdx });
          }
        });
      });

      if (!hits.length) {
        dropdown.innerHTML = `<div class="search-result-item"><i class="fa-solid fa-face-meh"></i><div><div class="search-result-title">找不到「${input.value}」相關步驟</div><div class="search-result-desc">試試搜尋：登入、注音、QR code、戰寵、魔王、星星、油料</div></div></div>`;
      } else {
        dropdown.innerHTML = hits.slice(0, 8).map(h => `
          <div class="search-result-item" data-ch="${h.ch.id}" data-step="${h.stepIdx}">
            <i class="${h.ch.icon}"></i>
            <div>
              <div class="search-result-title">CH.${h.ch.num} ${h.ch.title} — ${h.st.title}</div>
              <div class="search-result-desc">${h.st.bullets[0]}</div>
            </div>
          </div>
        `).join('');

        dropdown.querySelectorAll('.search-result-item').forEach(item => {
          item.addEventListener('click', () => {
            playTone('click');
            const chId = item.dataset.ch;
            const stIdx = Number(item.dataset.step);
            renderChapterStep(chId, stIdx);
            scrollToSection(chId);
            dropdown.classList.remove('open');
          });
        });
      }
      dropdown.classList.add('open');
    }

    input.addEventListener('input', doSearch);
    clearBtn.addEventListener('click', () => {
      input.value = '';
      doSearch();
      input.focus();
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('.topbar-search')) dropdown.classList.remove('open');
    });
  }

  /* ==========================================================================
     9. Lightbox 放大檢視 & 徽章成就視窗
     ========================================================================== */
  function openLightbox(src, caption) {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-caption');
    if (!modal || !img) return;
    img.src = src;
    img.alt = caption || '';
    cap.textContent = caption || '';
    modal.classList.add('open');
  }

  function renderBadgesModal() {
    const grid = document.getElementById('badges-grid');
    if (!grid) return;
    grid.innerHTML = window.MANUAL_CHAPTERS.map(ch => {
      const unlocked = state.completedChapters.includes(ch.id);
      return `
        <div class="badge-item ${unlocked ? 'unlocked' : ''}">
          <i class="${ch.icon}" style="color:${ch.color};"></i>
          <div style="font-weight:800;font-size:0.86rem;">${ch.badgeName}</div>
          <div style="font-size:0.74rem;color:var(--text-muted);margin-top:3px;">
            ${unlocked ? '<i class="fa-solid fa-check" style="display:inline;font-size:0.74rem;"></i> 已解鎖' : `CH.${ch.num} ${ch.title}`}
          </div>
        </div>
      `;
    }).join('');
  }

  /* ==========================================================================
     10. 左下角吉祥物（任意拖曳移動 + 懸停霓虹發光抖動）
     ========================================================================== */
  function initDraggableMascot() {
    const mascot = document.getElementById('mascot-widget');
    if (!mascot) return;

    let isDragging = false;
    let movedDistance = 0;
    let startX = 0, startY = 0;
    let origLeft = 0, origTop = 0;

    mascot.addEventListener('pointerdown', e => {
      isDragging = true;
      movedDistance = 0;
      mascot.classList.add('dragging');
      mascot.setPointerCapture(e.pointerId);

      const rect = mascot.getBoundingClientRect();
      // 切換為 left/top 定位，方便拖曳至畫面任何位置
      mascot.style.left = `${rect.left}px`;
      mascot.style.top = `${rect.top}px`;
      mascot.style.bottom = 'auto';
      mascot.style.right = 'auto';

      startX = e.clientX;
      startY = e.clientY;
      origLeft = rect.left;
      origTop = rect.top;
    });

    mascot.addEventListener('pointermove', e => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      movedDistance = Math.hypot(dx, dy);

      const maxLeft = window.innerWidth - mascot.offsetWidth - 8;
      const maxTop = window.innerHeight - mascot.offsetHeight - 8;
      const nextLeft = Math.max(8, Math.min(maxLeft, origLeft + dx));
      const nextTop = Math.max(8, Math.min(maxTop, origTop + dy));

      mascot.style.left = `${nextLeft}px`;
      mascot.style.top = `${nextTop}px`;
    });

    function endDrag(e) {
      if (!isDragging) return;
      isDragging = false;
      mascot.classList.remove('dragging');
      try { mascot.releasePointerCapture(e.pointerId); } catch (_) {}

      if (movedDistance < 6) {
        playTone('pop');
      }
    }

    mascot.addEventListener('pointerup', endDrag);
    mascot.addEventListener('pointercancel', endDrag);

    // 視窗縮放時確保吉祥物留在畫面內
    window.addEventListener('resize', () => {
      if (mascot.style.top && mascot.style.top !== 'auto') {
        const rect = mascot.getBoundingClientRect();
        const clampedLeft = Math.max(8, Math.min(window.innerWidth - mascot.offsetWidth - 8, rect.left));
        const clampedTop = Math.max(8, Math.min(window.innerHeight - mascot.offsetHeight - 8, rect.top));
        mascot.style.left = `${clampedLeft}px`;
        mascot.style.top = `${clampedTop}px`;
      }
    });
  }

  /* ==========================================================================
     11. 捲動追蹤、進度條、側邊欄與全域事件綁定
     ========================================================================== */
  function scrollToSection(id) {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function closeMobileSidebar() {
    document.getElementById('sidebar')?.classList.remove('open');
    document.getElementById('sidebar-backdrop')?.classList.remove('show');
  }

  function initGlobalControls() {
    // 手機漢堡選單
    document.getElementById('menu-toggle-btn')?.addEventListener('click', () => {
      playTone('click');
      document.getElementById('sidebar')?.classList.toggle('open');
      document.getElementById('sidebar-backdrop')?.classList.toggle('show');
    });
    document.getElementById('sidebar-backdrop')?.addEventListener('click', closeMobileSidebar);

    // 全站注音輔助開關（幫助國小生閱讀）
    const bopomofoBtn = document.getElementById('bopomofo-toggle-btn');
    if (state.bopomofo) {
      applyBopomofoMode(true, false);
    }
    bopomofoBtn?.addEventListener('click', () => {
      playTone('pop');
      applyBopomofoMode(!state.bopomofo, true);
    });

    // 主題切換
    const themeBtn = document.getElementById('theme-toggle-btn');
    function syncThemeIcon() {
      if (!themeBtn) return;
      themeBtn.innerHTML = state.theme === 'light'
        ? '<i class="fa-solid fa-moon"></i>'
        : '<i class="fa-solid fa-sun"></i>';
    }
    syncThemeIcon();
    themeBtn?.addEventListener('click', () => {
      playTone('click');
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      document.body.classList.toggle('theme-light', state.theme === 'light');
      syncThemeIcon();
      saveProgress();
      showToast(state.theme === 'light' ? '已切換為繽紛糖果淺色模式！' : '已切換為星際霓虹深色模式！', 'fa-solid fa-palette');
    });

    // 音效開關
    const soundBtn = document.getElementById('sound-toggle-btn');
    soundBtn?.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      soundBtn.innerHTML = state.soundEnabled
        ? '<i class="fa-solid fa-volume-high"></i>'
        : '<i class="fa-solid fa-volume-xmark"></i>';
      if (state.soundEnabled) playTone('pop');
      showToast(state.soundEnabled ? '已開啟互動音效' : '已靜音', 'fa-solid fa-music');
    });

    // 徽章成就視窗
    const badgeModal = document.getElementById('badge-modal');
    document.getElementById('xp-pill-btn')?.addEventListener('click', () => {
      playTone('pop');
      renderBadgesModal();
      badgeModal?.classList.add('open');
    });
    document.getElementById('badge-modal-close')?.addEventListener('click', () => badgeModal?.classList.remove('open'));
    badgeModal?.addEventListener('click', e => {
      if (e.target === badgeModal) badgeModal.classList.remove('open');
    });

    // Lightbox 關閉
    const lbModal = document.getElementById('lightbox-modal');
    document.getElementById('lightbox-close')?.addEventListener('click', () => lbModal?.classList.remove('open'));
    lbModal?.addEventListener('click', e => {
      if (e.target === lbModal) lbModal.classList.remove('open');
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        lbModal?.classList.remove('open');
        badgeModal?.classList.remove('open');
      }
    });

    // 回到頂部 & 閱讀進度條 & 側邊欄自動高亮
    const progressBar = document.getElementById('reading-progress-bar');
    const backTopBtn = document.getElementById('back-to-top');
    backTopBtn?.addEventListener('click', () => {
      playTone('click');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      if (progressBar) progressBar.style.width = `${pct}%`;
      if (backTopBtn) backTopBtn.classList.toggle('visible', scrollTop > 380);

      // 更新側邊欄目前所在章節
      let activeId = window.MANUAL_CHAPTERS[0]?.id;
      for (const ch of window.MANUAL_CHAPTERS) {
        const sec = document.getElementById(ch.id);
        if (sec && sec.getBoundingClientRect().top <= 160) {
          activeId = ch.id;
        }
      }
      document.querySelectorAll('.chapter-nav-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.target === activeId);
      });
    }, { passive: true });
  }

  /* ==========================================================================
     12. 啟動初始化
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    initStarfield();
    renderNavigationAndOverview();
    renderAllChapters();
    initQuiz();
    initGlobalSearch();
    initDraggableMascot();
    initGlobalControls();
    updateXPUI();
    refreshCompletionUI();
  });
})();
