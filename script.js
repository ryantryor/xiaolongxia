document.addEventListener('DOMContentLoaded', () => {
    // ============================================================
    // 0. 隐藏页面加载遮罩
    // ============================================================
    const pageLoader = document.getElementById('page-loader');
    if (pageLoader) {
        pageLoader.classList.add('hidden');
        setTimeout(() => pageLoader.remove(), 500);
    }

    // ============================================================
    // 1. 移动端导航菜单
    // ============================================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // ============================================================
    // 2. 滚动动画 (Intersection Observer)
    // ============================================================
    const revealElements = document.querySelectorAll(
        '.card, .section-title, .section-subtitle, .community-box, .dashboard-card, .profit-card, .track-card, .testimonial-card, .pricing-card, .calculator-box'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============================================================
    // 3. 导航栏滚动投影
    // ============================================================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.style.boxShadow = window.scrollY > 50
            ? '0 4px 20px rgba(0,0,0,0.08)'
            : 'none';
    });

    // ============================================================
    // 4. 平滑滚动修正
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ============================================================
    // 5. 数据看板 — 数字滚动动画
    // ============================================================
    const formatNumber = (num, prefix = '', separator = '') => {
        let str = Math.floor(num).toString();
        if (separator) {
            str = str.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
        }
        return prefix + str;
    };

    const animateValue = (element, target, duration = 2000) => {
        const prefix = element.dataset.prefix || '';
        const separator = element.dataset.separator || '';
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(eased * target);
            element.textContent = formatNumber(currentValue, prefix, separator);
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        requestAnimationFrame(update);
    };

    const dashboardValues = document.querySelectorAll('.dashboard-value[data-target]');
    const dashboardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateValue(entry.target, target);
                dashboardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    dashboardValues.forEach(el => dashboardObserver.observe(el));

    // ============================================================
    // 6. TOP 盈利排行榜
    // ============================================================
    const trackFilterContainer = document.getElementById('track-filter-container');
    const profitGrid = document.getElementById('profit-grid');

    if (trackFilterContainer && profitGrid && typeof profitProjects !== 'undefined') {
        let currentTrackFilter = 'all';

        const initTrackFilters = () => {
            const allBtn = document.createElement('button');
            allBtn.className = 'track-filter-btn active';
            allBtn.textContent = '全部赛道';
            allBtn.dataset.track = 'all';
            allBtn.addEventListener('click', handleTrackFilter);
            trackFilterContainer.appendChild(allBtn);

            for (const [key, meta] of Object.entries(trackMeta)) {
                if (profitProjects.some(p => p.track === key)) {
                    const btn = document.createElement('button');
                    btn.className = 'track-filter-btn';
                    btn.innerHTML = `${meta.icon} ${meta.label}`;
                    btn.dataset.track = key;
                    btn.addEventListener('click', handleTrackFilter);
                    trackFilterContainer.appendChild(btn);
                }
            }
        };

        const renderProfitCards = (trackFilter) => {
            profitGrid.innerHTML = '';
            let filtered = trackFilter === 'all'
                ? [...profitProjects]
                : profitProjects.filter(p => p.track === trackFilter);

            // Sort by 30d revenue descending
            filtered.sort((a, b) => b.revenue30d - a.revenue30d);

            filtered.forEach((project, index) => {
                const meta = trackMeta[project.track];
                const rank = index + 1;
                const isTop3 = rank <= 3;

                const card = document.createElement('div');
                card.className = 'profit-card reveal active';
                card.innerHTML = `
                    <div class="profit-card-rank ${isTop3 ? 'top-3' : ''}">${rank}</div>
                    <div class="profit-card-track" style="color: ${meta.color}">
                        ${meta.icon} ${meta.label}
                    </div>
                    <h3>${project.name}</h3>
                    <p class="profit-card-desc">${project.desc}</p>
                    <div class="profit-card-stats">
                        <div class="profit-stat">
                            <div class="profit-stat-value highlight">$${(project.revenue30d / 1000).toFixed(1)}k</div>
                            <div class="profit-stat-label">30天收入</div>
                        </div>
                        <div class="profit-stat">
                            <div class="profit-stat-value">$${project.mrr > 0 ? (project.mrr / 1000).toFixed(1) + 'k' : '—'}</div>
                            <div class="profit-stat-label">MRR</div>
                        </div>
                        <div class="profit-stat">
                            <div class="profit-stat-value">${project.totalRevenue >= 1000000 ? '$' + (project.totalRevenue / 1000000).toFixed(1) + 'M' : '$' + (project.totalRevenue / 1000).toFixed(0) + 'k'}</div>
                            <div class="profit-stat-label">累计收入</div>
                        </div>
                    </div>
                    <div class="profit-card-highlight">💡 ${project.highlight}</div>
                    <a href="${project.url}" target="_blank" class="profit-card-link">查看详情 →</a>
                `;
                profitGrid.appendChild(card);

                // Insert community CTA every 6 cards
                if ((index + 1) % 6 === 0 && index < filtered.length - 1) {
                    const ctaCard = document.createElement('div');
                    ctaCard.className = 'profit-card reveal active';
                    ctaCard.style.cssText = 'background:linear-gradient(135deg,rgba(230,57,70,0.04),rgba(255,215,0,0.08)); border:2px solid var(--primary-red); text-align:center; display:flex; flex-direction:column; align-items:center; justify-content:center;';
                    ctaCard.innerHTML = `
                        <div style="font-size:2.5rem; margin-bottom:16px;">🔥</div>
                        <h3 style="color:var(--primary-red);">想复制他们的成功？</h3>
                        <p class="profit-card-desc">加入社群获取每个项目的详细运营拆解和启动 SOP</p>
                        <a href="#pricing" class="btn btn-primary" style="margin-top:8px;">加入玩赚社群 →</a>
                    `;
                    profitGrid.appendChild(ctaCard);
                }
            });
        };

        const handleTrackFilter = (e) => {
            document.querySelectorAll('.track-filter-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            currentTrackFilter = e.currentTarget.dataset.track;
            renderProfitCards(currentTrackFilter);
        };

        initTrackFilters();
        renderProfitCards('all');
    }

    // ============================================================
    // 7. 6大赚钱赛道
    // ============================================================
    const tracksGrid = document.getElementById('tracks-grid');

    if (tracksGrid && typeof trackMeta !== 'undefined' && typeof profitProjects !== 'undefined') {
        for (const [key, meta] of Object.entries(trackMeta)) {
            const trackProjects = profitProjects.filter(p => p.track === key);
            const totalRev = trackProjects.reduce((sum, p) => sum + p.revenue30d, 0);
            const count = trackProjects.length;
            const exampleNames = trackProjects.slice(0, 3).map(p => p.name).join('、');

            const card = document.createElement('div');
            card.className = 'track-card reveal';
            card.innerHTML = `
                <div class="track-card-header">
                    <div class="track-card-icon" style="background: ${meta.color}15;">${meta.icon}</div>
                    <div>
                        <div class="track-card-title" style="margin-bottom:0;">${meta.label}</div>
                    </div>
                </div>
                <p class="track-card-desc">${meta.desc}</p>
                <div class="track-card-stats">
                    <span class="track-stat">项目数 <strong>${count}</strong></span>
                    <span class="track-stat">30天总收入 <strong>$${(totalRev / 1000).toFixed(0)}k+</strong></span>
                </div>
                ${exampleNames ? `<div class="track-card-examples"><strong>代表项目：</strong>${exampleNames}</div>` : ''}
            `;
            tracksGrid.appendChild(card);

            // Re-observe for scroll animation
            revealObserver.observe(card);
        }
    }

    // ============================================================
    // 8. 收入计算器
    // ============================================================
    const calcSelections = { time: null, skill: null, preference: null };

    document.querySelectorAll('.calc-opt').forEach(btn => {
        btn.addEventListener('click', () => {
            const group = btn.parentElement;
            const name = group.dataset.name;
            group.querySelectorAll('.calc-opt').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            calcSelections[name] = btn.dataset.value;

            // Check if all selections made
            if (calcSelections.time && calcSelections.skill && calcSelections.preference) {
                showCalcResult();
            }
        });
    });

    const showCalcResult = () => {
        const { time, skill, preference } = calcSelections;
        const resultEl = document.getElementById('calc-result');
        const trackEl = document.getElementById('calc-track');
        const incomeEl = document.getElementById('calc-income');
        const refEl = document.getElementById('calc-ref');

        let track, incomeRange, refProject;

        if (skill === 'beginner') {
            if (preference === 'service' || preference === 'both') {
                track = '🔧 安装服务赛道';
                incomeRange = time >= 40 ? '$2,000 - $8,000/月' : time >= 15 ? '$500 - $3,000/月' : '$200 - $1,000/月';
                refProject = 'setupclaw ($43k/月) · Roofclaw ($1.8M累计)';
            } else {
                track = '🎓 培训教育赛道';
                incomeRange = time >= 40 ? '$1,000 - $5,000/月' : time >= 15 ? '$300 - $2,000/月' : '$100 - $500/月';
                refProject = 'AI MONEY GROUP ($18k/月 · $288k累计)';
            }
        } else if (skill === 'intermediate') {
            if (preference === 'recurring') {
                track = '🏠 托管部署赛道';
                incomeRange = time >= 40 ? '$3,000 - $15,000/月' : time >= 15 ? '$1,000 - $5,000/月' : '$300 - $1,500/月';
                refProject = 'OpenClaw Pro (MRR $57k) · Coral (MRR $16k)';
            } else {
                track = '📦 模板/Wrapper 赛道';
                incomeRange = time >= 40 ? '$2,000 - $10,000/月' : time >= 15 ? '$800 - $4,000/月' : '$200 - $1,000/月';
                refProject = 'OpenClaw Kit ($42k累计) · ClawWrapper ($18k累计)';
            }
        } else {
            if (preference === 'recurring' || preference === 'both') {
                track = '🤖 SaaS 产品赛道';
                incomeRange = time >= 40 ? '$5,000 - $50,000/月' : time >= 15 ? '$2,000 - $10,000/月' : '$500 - $3,000/月';
                refProject = 'Quick Claw (MRR $5.8k) · AtomicBot.ai · OpenTweet';
            } else {
                track = '🛒 技能市场赛道';
                incomeRange = time >= 40 ? '$3,000 - $20,000/月' : time >= 15 ? '$1,000 - $8,000/月' : '$300 - $2,000/月';
                refProject = 'Claw Mart ($85k/月) · LarryBrain (MRR $6.8k)';
            }
        }

        trackEl.textContent = track;
        incomeEl.textContent = incomeRange;
        refEl.innerHTML = `参考项目：${refProject}`;

        resultEl.style.display = 'block';
        resultEl.style.animation = 'none';
        resultEl.offsetHeight; // trigger reflow
        resultEl.style.animation = 'fadeInUp 0.5s ease-out';
    };

    // ============================================================
    // 9. 免费资源大厅（保留原有逻辑）
    // ============================================================
    const filterContainer = document.getElementById('filter-container');
    const resourceGrid = document.getElementById('resource-grid');

    if (filterContainer && resourceGrid && typeof resources !== 'undefined') {
        let currentFilter = 'all';

        const initFilters = () => {
            const allBtn = document.createElement('button');
            allBtn.className = 'filter-btn active';
            allBtn.textContent = 'All 全部';
            allBtn.dataset.category = 'all';
            allBtn.addEventListener('click', handleFilterClick);
            filterContainer.appendChild(allBtn);

            for (const [key, meta] of Object.entries(categoryMeta)) {
                if (resources.some(r => r.category === key)) {
                    const btn = document.createElement('button');
                    btn.className = 'filter-btn';
                    btn.innerHTML = `${meta.icon} ${meta.label}`;
                    btn.dataset.category = key;
                    btn.addEventListener('click', handleFilterClick);
                    filterContainer.appendChild(btn);
                }
            }
        };

        const renderCards = (filterCategory) => {
            resourceGrid.innerHTML = '';
            let filtered = filterCategory === 'all'
                ? [...resources]
                : resources.filter(r => r.category === filterCategory);

            if (filterCategory === 'all') {
                filtered = filtered.slice(0, 11);
            }

            filtered.forEach((res, index) => {
                const meta = categoryMeta[res.category];
                const cardHtml = `
                    <div class="card resource-card reveal active">
                        <span class="resource-source" style="color: ${meta.color}">
                            ${meta.icon} ${res.source}
                        </span>
                        <h3>${res.title}</h3>
                        <p>${res.desc}</p>
                        <div class="resource-tags">
                            ${(res.tags || []).map(t => `<span class="tag">#${t}</span>`).join('')}
                        </div>
                        <a href="${res.url}" target="_blank" class="link">前往阅读 &rarr;</a>
                    </div>
                `;
                resourceGrid.insertAdjacentHTML('beforeend', cardHtml);

                if ((index + 1) % 5 === 0) {
                    const adCardHtml = `
                        <div class="card resource-card ad-card reveal active" style="text-align:center;">
                            <span class="resource-source" style="color: var(--primary-red)">
                                🌟 社群专属
                            </span>
                            <h3>想看更深度的赚钱教程？</h3>
                            <p>加入玩赚社群，获取独家盈利案例拆解和实操 SOP。</p>
                            <a href="#pricing" class="btn btn-primary" style="margin-top:auto;">加入社群 ¥199/年</a>
                        </div>
                    `;
                    resourceGrid.insertAdjacentHTML('beforeend', adCardHtml);
                }
            });

            if (filtered.length > 0 && filtered.length < 5) {
                const communityAdHtml = `
                    <div class="card resource-card ad-card reveal active" style="text-align:center;">
                        <span class="resource-source" style="color: var(--primary-yellow)">
                            💬 加入我们
                        </span>
                        <h3>发现更多赚钱玩法</h3>
                        <p>加入 OpenClaw 小龙虾社群，获取内部独家赚钱技巧分享。</p>
                        <a href="#pricing" class="btn btn-yellow" style="margin-top:auto;">加入玩赚社群</a>
                    </div>
                `;
                resourceGrid.insertAdjacentHTML('beforeend', communityAdHtml);
            }
        };

        const handleFilterClick = (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            currentFilter = e.currentTarget.dataset.category;
            renderCards(currentFilter);
        };

        initFilters();
        renderCards('all');
    }

    // ============================================================
    // 10. FAQ 手风琴
    // ============================================================
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const isOpen = item.classList.contains('open');

            // 关闭所有
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

            // 如果当前不是打开状态，则打开
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    // ============================================================
    // 11. 浮动底部 CTA 栏
    // ============================================================
    const floatingCta = document.getElementById('floating-cta');
    const heroSection = document.querySelector('.hero');

    if (floatingCta && heroSection) {
        const showFloatingCta = () => {
            const heroBottom = heroSection.getBoundingClientRect().bottom;
            const pricingSection = document.getElementById('pricing');
            const contactSection = document.getElementById('contact');

            // 在 pricing 和 contact 区域隐藏浮动栏（避免与页面内 CTA 重叠）
            let inPricingOrContact = false;
            if (pricingSection) {
                const pr = pricingSection.getBoundingClientRect();
                if (pr.top < window.innerHeight && pr.bottom > 0) inPricingOrContact = true;
            }
            if (contactSection) {
                const cr = contactSection.getBoundingClientRect();
                if (cr.top < window.innerHeight && cr.bottom > 0) inPricingOrContact = true;
            }

            if (heroBottom < 0 && !inPricingOrContact) {
                floatingCta.classList.add('visible');
            } else {
                floatingCta.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', showFloatingCta, { passive: true });
        showFloatingCta();
    }

    // ============================================================
    // 12. 技能库渲染
    // ============================================================
    if (typeof skillsData !== 'undefined' && typeof skillCategories !== 'undefined') {
        const skillFilterContainer = document.getElementById('skill-filter-container');
        const skillGrid = document.getElementById('skill-grid');
        let currentSkillFilter = 'all';

        const safetyMeta = {
            safe: { label: '✅ 安全', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
            caution: { label: '⚠️ 注意', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
            warning: { label: '🔴 高风险', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
        };

        function renderSkillFilters() {
            if (!skillFilterContainer) return;
            const allBtn = `<button class="filter-btn active" data-category="all">全部</button>`;
            const catBtns = skillCategories.map(c =>
                `<button class="filter-btn" data-category="${c.id}">${c.icon} ${c.label}</button>`
            ).join('');
            skillFilterContainer.innerHTML = allBtn + catBtns;
        }

        function renderSkillCards(filter) {
            if (!skillGrid) return;
            const filtered = filter === 'all'
                ? skillsData
                : skillsData.filter(s => s.category === filter);

            skillGrid.innerHTML = filtered.map(s => {
                const sm = safetyMeta[s.safetyLevel] || safetyMeta.caution;
                return `
                <div class="skill-card">
                    <div class="skill-header">
                        <h3>${s.title}</h3>
                        <span class="safety-badge" style="background:${sm.bg};color:${sm.color}">${sm.label}</span>
                    </div>
                    <p class="skill-desc">${s.desc}</p>
                    <div class="skill-safety">
                        <span class="skill-section-label">🛡️ 安全评估</span>
                        <p>${s.safetyNote}</p>
                    </div>
                    <div class="skill-money">
                        <span class="skill-section-label">💰 赚钱思路</span>
                        <p>${s.moneyTip}</p>
                    </div>
                    <div class="skill-footer">
                        <span class="skill-source">来源: ${s.source}</span>
                        <div class="skill-tags">${s.tags.map(t => `<span>${t}</span>`).join('')}</div>
                    </div>
                </div>`;
            }).join('');
        }

        renderSkillFilters();
        renderSkillCards('all');

        if (skillFilterContainer) {
            skillFilterContainer.addEventListener('click', e => {
                if (!e.target.classList.contains('filter-btn')) return;
                skillFilterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                currentSkillFilter = e.target.dataset.category;
                renderSkillCards(currentSkillFilter);
            });
        }
    }

    // ============================================================
    // 13. 滚动进度条
    // ============================================================
    const updateScrollProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        document.querySelector('.navbar').style.setProperty('--scroll-progress', progress + '%');
    };
    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    // ============================================================
    // 14. 返回顶部按钮
    // ============================================================
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================================
    // 15. 导航链接高亮当前 section
    // ============================================================
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = [];
    navAnchors.forEach(a => {
        const id = a.getAttribute('href').substring(1);
        const section = document.getElementById(id);
        if (section) sections.push({ el: section, link: a });
    });

    if (sections.length > 0) {
        const navHighlightObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navAnchors.forEach(a => a.classList.remove('nav-active'));
                    const match = sections.find(s => s.el === entry.target);
                    if (match) match.link.classList.add('nav-active');
                }
            });
        }, { threshold: 0.2, rootMargin: '-80px 0px -50% 0px' });

        sections.forEach(s => navHighlightObserver.observe(s.el));
    }

    // ============================================================
    // 16. 暗色模式切换
    // ============================================================
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeToggle) themeToggle.textContent = '☀️';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = '🌙';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = '☀️';
            }
        });
    }

});
