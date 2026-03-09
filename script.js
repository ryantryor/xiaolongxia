document.addEventListener('DOMContentLoaded', () => {
    // 移动端导航菜单逻辑
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // 点击链接时自动关闭菜单
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // 滚动动画 (Intersection Observer API)
    const revealElements = document.querySelectorAll('.card, .section-title, .section-subtitle, .community-box');

    // 初始化元素隐藏
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 导航栏滚动控制（投影和背景变化）
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // 平滑滚动修正 (点击带 # 开头的链接时)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ----------------------------------------------------
    // --- 阶段二：资源大厅动态渲染与商业化植入逻辑 ---
    // ----------------------------------------------------
    const filterContainer = document.getElementById('filter-container');
    const resourceGrid = document.getElementById('resource-grid');

    if (filterContainer && resourceGrid && typeof resources !== 'undefined') {
        let currentFilter = 'all';

        // 1. 初始化过滤按钮
        const initFilters = () => {
            // “全部”按钮
            const allBtn = document.createElement('button');
            allBtn.className = 'filter-btn active';
            allBtn.textContent = 'All 全部';
            allBtn.dataset.category = 'all';
            allBtn.addEventListener('click', handleFilterClick);
            filterContainer.appendChild(allBtn);

            // 其他动态按钮
            for (const [key, meta] of Object.entries(categoryMeta)) {
                // 仅显示有数据的分类
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

        // 2. 渲染卡片
        const renderCards = (filterCategory) => {
            resourceGrid.innerHTML = '';
            let filtered = filterCategory === 'all'
                ? [...resources]
                : resources.filter(r => r.category === filterCategory);

            // 如果在“全部”视图下，截取前 12 个以保持美观，用户可以通过点击具体分类看更多
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

                // 🔥 商业化植入逻辑 🔥：
                // 每隔 4 个正常教程内容，或者在第 6 个位置，插入一个“引导代安装/加群”的特殊转化卡片
                if ((index + 1) % 5 === 0) {
                    const adCardHtml = `
                        <div class="card resource-card ad-card reveal active" style="text-align:center;">
                            <span class="resource-source" style="color: var(--primary-red)">
                                🌟 官方推荐服务
                            </span>
                            <h3>看不懂教程？不想折腾？</h3>
                            <p>把专业的事情交给专业的人做。\n我们提供 1对1 极速远程排障部署服务，10分钟拥有专属 AI 助理。</p>
                            <a href="#services" class="btn btn-primary" style="margin-top:auto;">立刻预约人工服务</a>
                        </div>
                    `;
                    resourceGrid.insertAdjacentHTML('beforeend', adCardHtml);
                }
            });

            // 如果列表比较短，在末尾固定加一个社群引流卡
            if (filtered.length > 0 && filtered.length < 5) {
                const communityAdHtml = `
                    <div class="card resource-card ad-card reveal active" style="text-align:center;">
                        <span class="resource-source" style="color: var(--primary-yellow)">
                            💬 加入我们
                        </span>
                        <h3>发现更多高阶插件玩法</h3>
                        <p>加入 OpenClaw 小龙虾社群，获取内部独家技能分享。</p>
                        <a href="#community" class="btn btn-yellow" style="margin-top:auto;">加入微信讨论群</a>
                    </div>
                `;
                resourceGrid.insertAdjacentHTML('beforeend', communityAdHtml);
            }
        };

        // 3. 处理点击事件
        const handleFilterClick = (e) => {
            const btn = e.currentTarget;
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentFilter = btn.dataset.category;
            renderCards(currentFilter);
        };

        // 4. 起步初始化
        initFilters();
        renderCards('all');
    }

});
