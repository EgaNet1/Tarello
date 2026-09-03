// ============================================================
// Данные и HTML-шаблоны экранов интерактивного прототипа «Соседи»
// ============================================================

/* ---------- Общие строительные блоки ---------- */

function topbarBack(title, subtitle, screenBack){
  return '<div class="app-topbar">' +
    '<button class="icon-btn" onclick="goTo(\'' + screenBack + '\')"><i class="fa-solid fa-arrow-left"></i></button>' +
    '<div class="title"><h3>' + title + '</h3>' + (subtitle ? '<span>' + subtitle + '</span>' : '') + '</div>' +
  '</div>';
}

function topbarHome(){
  return '<div class="app-topbar">' +
    '<div class="title">' +
      '<span style="font-size:11.5px;color:var(--text-muted);display:flex;align-items:center;gap:5px;"><i class="fa-solid fa-location-dot" style="color:var(--clr-primary-500);"></i> ул. Садовая, 12</span>' +
      '<h3 style="margin-top:2px;">Привет, Мария 👋</h3>' +
    '</div>' +
    '<button class="icon-btn" onclick="goTo(\'buyer-profile\')"><i class="fa-solid fa-bell"></i></button>' +
  '</div>';
}

function bottomNavBuyer(active){
  function tab(key, icon, label, target){
    return '<button class="' + (active===key?'active':'') + '" onclick="goTo(\'' + target + '\')"><i class="fa-solid ' + icon + '"></i>' + label + '</button>';
  }
  return '<div class="app-bottomnav">' +
    tab('home','fa-house','Лента','feed') +
    tab('search','fa-magnifying-glass','Поиск','feed') +
    tab('orders','fa-receipt','Заказы','tracking') +
    tab('profile','fa-user','Профиль','buyer-profile') +
  '</div>' + '<div class="home-indicator"></div>';
}

function bottomNavCook(active){
  function tab(key, icon, label, target){
    return '<button class="' + (active===key?'active':'') + '" onclick="goTo(\'' + target + '\')"><i class="fa-solid ' + icon + '"></i>' + label + '</button>';
  }
  return '<div class="app-bottomnav">' +
    tab('today','fa-sun','Сегодня','cook-today') +
    tab('orders','fa-list-check','Заказы','cook-orders') +
    tab('dishes','fa-utensils','Блюда','cook-dishes') +
    tab('profile','fa-user','Профиль','cook-profile-settings') +
  '</div>' + '<div class="home-indicator"></div>';
}

function starLine(rating, count){
  return '<div class="rating-line"><span class="stars"><i class="fa-solid fa-star"></i></span> <b style="color:var(--text-primary);">' + rating + '</b> · ' + count + ' отзывов</div>';
}

/* ---------- Карточка блюда для ленты ---------- */
function dishCard(opts){
  var badge = '';
  if(opts.soldout){
    badge = '<div class="portions-badge soldout"><i class="fa-solid fa-ban"></i> Распродано</div>';
  } else if(opts.portions <= 2){
    badge = '<div class="portions-badge low"><i class="fa-solid fa-fire"></i> Осталось ' + opts.portions + '</div>';
  } else {
    badge = '<div class="portions-badge"><i class="fa-solid fa-bowl-food"></i> Осталось ' + opts.portions + '</div>';
  }
  return '<div class="dish-card ' + (opts.soldout?'soldout':'') + '" onclick="goTo(\'' + (opts.soldout ? 'sold-out' : 'dish-detail') + '\')">' +
    '<div class="thumb-wrap"><img src="' + opts.img + '" alt="' + opts.name + '">' + badge + '</div>' +
    '<div class="info">' +
      '<h4>' + opts.name + '</h4>' +
      '<div class="cook-mini"><img src="' + opts.cookImg + '" alt=""><span>' + opts.cook + '</span>' + (opts.verified ? '<i class="fa-solid fa-circle-check verified-dot"></i>' : '') + '</div>' +
      starLine(opts.rating, opts.reviews) +
      '<div class="dish-meta-row">' +
        '<div><div class="dish-price">' + (opts.soldout ? 'нет в наличии' : opts.price + ' ₽') + '</div><div class="dish-eta"><i class="fa-solid fa-location-dot"></i> ' + opts.distance + ' · ' + opts.eta + '</div></div>' +
        (opts.soldout ? '<button class="add-btn" style="background:var(--bg-surface-2);color:var(--text-muted);" onclick="event.stopPropagation();"><i class="fa-solid fa-bell"></i></button>' :
        '<button class="add-btn" onclick="event.stopPropagation(); addToCart(this)"><i class="fa-solid fa-plus"></i></button>') +
      '</div>' +
    '</div>' +
  '</div>';
}

var FEED_DISHES = [
  {name:'Борщ по-домашнему, 1 л', cook:'Анна Соколова', cookImg:'images/cook-woman1.jpg', img:'images/dish-borscht.jpg', price:350, portions:3, distance:'800 м', eta:'готово к 14:00', rating:'4.9', reviews:128, verified:true},
  {name:'Плов узбекский с бараниной', cook:'Тимур Каримов', cookImg:'images/cook-man1.jpg', img:'images/dish-plov.jpg', price:420, portions:5, distance:'1.2 км', eta:'готово к 13:30', rating:'4.8', reviews:96, verified:true},
  {name:'Пельмени домашние, 1 кг', cook:'Ольга Волкова', cookImg:'images/cook-woman2.jpg', img:'images/dish-pelmeni.jpg', price:380, portions:2, distance:'650 м', eta:'сегодня до 20:00', rating:'5.0', reviews:214, verified:true},
  {name:'Хинкали с говядиной, 10 шт', cook:'Нина Гелашвили', cookImg:'images/cook-woman1.jpg', img:'images/dish-khinkali.jpg', price:0, portions:0, distance:'900 м', eta:'—', rating:'4.9', reviews:61, verified:true, soldout:true},
  {name:'Сырники со сметаной', cook:'Анна Соколова', cookImg:'images/cook-woman1.jpg', img:'images/dish-syrniki.jpg', price:280, portions:6, distance:'800 м', eta:'готово к 10:00', rating:'4.7', reviews:53, verified:true},
  {name:'Паста с соусом болоньезе', cook:'Марк Данилов', cookImg:'images/cook-man1.jpg', img:'images/dish-pasta.jpg', price:390, portions:1, distance:'1.5 км', eta:'готово к 19:00', rating:'4.6', reviews:29, verified:false}
];

/* ============================================================
   SCREENS — конфигурация каждого экрана прототипа
   ============================================================ */
var SCREENS = {};

/* ---------------- ОНБОРДИНГ ---------------- */
SCREENS['onb-1'] = {
  footer: '',
  body:
    '<div class="onboard-visual"><img src="images/dish-plov.jpg" alt="Домашняя еда"></div>' +
    '<div class="onboard-body">' +
      '<div class="dot-row"><span class="dot active"></span><span class="dot"></span><span class="dot"></span></div>' +
      '<h2 style="margin-top:14px;">Готовят соседи.<br>Едят соседи.</h2>' +
      '<p>Это не доставка из ресторана. Это тарелка, приготовленная человеком с вашей улицы, который любит готовить.</p>' +
      '<div class="onboard-footer">' +
        '<button class="btn btn-ghost btn-sm" onclick="goTo(\'feed\')">Пропустить</button>' +
        '<button class="btn btn-primary" onclick="goTo(\'onb-2\')">Далее <i class="fa-solid fa-arrow-right"></i></button>' +
      '</div>' +
    '</div>'
};
SCREENS['onb-2'] = {
  footer: '',
  body:
    '<div class="onboard-visual" style="background:var(--clr-sage-100);"><img src="images/dish-borscht.jpg" alt="Еда рядом с домом"></div>' +
    '<div class="onboard-body">' +
      '<div class="dot-row"><span class="dot"></span><span class="dot active"></span><span class="dot"></span></div>' +
      '<h2 style="margin-top:14px;">Только то, что рядом</h2>' +
      '<p>Домашняя еда живёт в своём районе. Мы показываем поваров в радиусе, который выбираете вы сами — от 500 м до 3 км.</p>' +
      '<div class="onboard-footer">' +
        '<button class="btn btn-ghost btn-sm" onclick="goTo(\'feed\')">Пропустить</button>' +
        '<button class="btn btn-primary" onclick="goTo(\'onb-3\')">Далее <i class="fa-solid fa-arrow-right"></i></button>' +
      '</div>' +
    '</div>'
};
SCREENS['onb-3'] = {
  footer: '',
  body:
    '<div class="onboard-visual" style="background:var(--clr-honey-100);"><img src="images/cook-woman1.jpg" alt="Настоящий повар"></div>' +
    '<div class="onboard-body">' +
      '<div class="dot-row"><span class="dot"></span><span class="dot"></span><span class="dot active"></span></div>' +
      '<h2 style="margin-top:14px;">Видно, кому вы платите</h2>' +
      '<p>Проверенная личность, статус самозанятого и фото кухни — у каждого повара. Никаких анонимных точек продаж.</p>' +
      '<div class="onboard-footer">' +
        '<button class="btn btn-ghost btn-sm" onclick="goTo(\'feed\')">Пропустить</button>' +
        '<button class="btn btn-primary" onclick="goTo(\'feed\')">Начать <i class="fa-solid fa-check"></i></button>' +
      '</div>' +
    '</div>'
};

/* ---------------- ЛЕНТА ---------------- */
SCREENS['feed'] = {
  topbar: topbarHome(),
  bottomNav: bottomNavBuyer('home'),
  body:
    '<div class="chip-row">' +
      '<div class="chip chip-primary"><i class="fa-solid fa-sliders"></i> Радиус: 1.5 км</div>' +
      '<div class="chip active">Готово сейчас</div>' +
      '<div class="chip">Домашняя</div>' +
      '<div class="chip">Кавказская</div>' +
      '<div class="chip">Веган</div>' +
      '<div class="chip">Десерты</div>' +
    '</div>' +
    '<div class="radius-bar">' +
      '<div class="radius-head"><span><i class="fa-solid fa-location-dot" style="color:var(--clr-primary-500);"></i> Радиус поиска</span><b>1.5 км</b></div>' +
      '<div class="radius-track"><div class="radius-fill"></div><div class="radius-thumb"></div></div>' +
    '</div>' +
    '<div class="feed-section-title"><h4>Готово в ближайший час · 6</h4><a href="#" onclick="return false;">Все</a></div>' +
    '<div class="dish-list">' + FEED_DISHES.map(dishCard).join('') + '</div>'
};

/* ---------------- ПРОФИЛЬ ПОВАРА ---------------- */
SCREENS['cook-profile'] = {
  footer: bottomNavBuyer(''),
  body:
    '<div class="cook-hero"><img src="images/cook-woman1.jpg" alt="Анна Соколова на кухне"></div>' +
    '<div style="padding:0 20px;">' +
      '<button class="icon-btn" style="position:absolute;top:60px;left:20px;background:rgba(255,255,255,0.85);color:#382d26;z-index:10;" onclick="goTo(\'feed\')"><i class="fa-solid fa-arrow-left"></i></button>' +
    '</div>' +
    '<div class="cook-header-card">' +
      '<img class="cook-avatar" src="images/cook-woman1.jpg" alt="Анна">' +
      '<div>' +
        '<div class="cook-name-row"><h3>Анна Соколова</h3></div>' +
        '<div class="specialty">Домашняя и русская кухня · готовит 6 лет</div>' +
        '<div class="badge-row" style="margin-top:8px;">' +
          '<span class="trust-badge identity"><i class="fa-solid fa-shield-check"></i> Личность проверена</span>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="section-block">' +
      '<div class="badge-row">' +
        '<span class="trust-badge selfemployed"><i class="fa-solid fa-file-invoice"></i> Самозанятая</span>' +
        '<span class="trust-badge kitchen"><i class="fa-solid fa-camera"></i> Кухня подтверждена фото</span>' +
      '</div>' +
      '<p class="bio-text" style="margin-top:14px;">Готовлю так, как готовила моя мама — без спешки и лишних добавок. Люблю супы, выпечку и домашние заготовки. Всегда кладу открытку с рецептом внутри заказа 🧡</p>' +
      '<div class="stat-row">' +
        '<div class="stat-pill"><b>4.9</b><span>рейтинг</span></div>' +
        '<div class="stat-pill"><b>412</b><span>заказов</span></div>' +
        '<div class="stat-pill"><b>800 м</b><span>от вас</span></div>' +
      '</div>' +
    '</div>' +
    '<div class="section-block" style="padding-top:0;">' +
      '<h4>Детальный рейтинг</h4>' +
      '<div class="rating-detail">' +
        '<div class="rating-detail-row"><span class="label">Вкус</span><div class="bar-track"><div class="bar-fill" style="width:98%;"></div></div><span class="val">4.9</span></div>' +
        '<div class="rating-detail-row"><span class="label">Как на фото</span><div class="bar-track"><div class="bar-fill" style="width:94%;"></div></div><span class="val">4.7</span></div>' +
        '<div class="rating-detail-row"><span class="label">Упаковка</span><div class="bar-track"><div class="bar-fill" style="width:96%;"></div></div><span class="val">4.8</span></div>' +
        '<div class="rating-detail-row"><span class="label">Время готовности</span><div class="bar-track"><div class="bar-fill" style="width:90%;"></div></div><span class="val">4.5</span></div>' +
      '</div>' +
    '</div>' +
    '<div class="section-block" style="padding-top:0;">' +
      '<h4>Блюда Анны</h4>' +
      '<div class="dishes-grid">' +
        '<div class="dish-grid-card" onclick="goTo(\'dish-detail\')"><img src="images/dish-borscht.jpg" alt=""><div class="dgc-body"><p>Борщ домашний</p><span>350 ₽</span></div></div>' +
        '<div class="dish-grid-card" onclick="goTo(\'dish-detail\')"><img src="images/dish-syrniki.jpg" alt=""><div class="dgc-body"><p>Сырники</p><span>280 ₽</span></div></div>' +
      '</div>' +
    '</div>' +
    '<div class="section-block" style="padding-top:0;">' +
      '<h4>Фото от покупателей</h4>' +
      '<div class="ugc-row">' +
        '<img src="images/dish-borscht.jpg" alt="UGC">' +
        '<img src="images/dish-syrniki.jpg" alt="UGC">' +
        '<img src="images/dish-pie.jpg" alt="UGC">' +
      '</div>' +
    '</div>' +
    '<div class="section-block" style="padding-top:0;">' +
      '<h4>Отзывы</h4>' +
      '<div class="review-card">' +
        '<div class="review-head"><img src="images/customer-woman1.jpg" alt=""><span class="rname">Екатерина</span><span class="stars">★★★★★</span></div>' +
        '<p>Борщ прямо как у бабушки, ещё и тёплый привезли! Взяла с собой сырники — тоже огонь.</p>' +
        '<div class="review-photos"><img src="images/dish-borscht.jpg" alt=""><span>+1</span></div>' +
      '</div>' +
      '<div class="review-card">' +
        '<div class="review-head"><img src="images/customer-man1.jpg" alt=""><span class="rname">Дмитрий</span><span class="stars">★★★★★</span></div>' +
        '<p>Упаковано аккуратно, приехало точно ко времени. Буду брать ещё.</p>' +
      '</div>' +
    '</div>'
};

/* ---------------- КАРТОЧКА БЛЮДА ---------------- */
SCREENS['dish-detail'] = {
  footer:
    '<div class="sticky-cta">' +
      '<div class="qty-stepper"><button onclick="changeQty(-1)"><i class="fa-solid fa-minus"></i></button><span id="dishQty">1</span><button onclick="changeQty(1)"><i class="fa-solid fa-plus"></i></button></div>' +
      '<button class="btn btn-primary" onclick="addAndGo()"><span>Добавить в заказ</span><span id="dishTotal">350 ₽</span></button>' +
    '</div>',
  body:
    '<div class="dish-hero">' +
      '<img src="images/dish-borscht.jpg" alt="Борщ по-домашнему">' +
      '<div class="topbar-float">' +
        '<button class="icon-btn" onclick="goTo(\'feed\')"><i class="fa-solid fa-arrow-left"></i></button>' +
        '<button class="icon-btn"><i class="fa-regular fa-heart"></i></button>' +
      '</div>' +
      '<div class="avail-pill"><span class="dot"></span> Осталось 3 порции · готово к 14:00</div>' +
    '</div>' +
    '<div class="section-block" style="padding-top:26px;">' +
      '<h2>Борщ по-домашнему, 1 литр</h2>' +
      '<div class="cook-mini" style="margin-top:8px;" onclick="goTo(\'cook-profile\')">' +
        '<img src="images/cook-woman1.jpg" alt=""><span style="font-size:13.5px;">Анна Соколова</span><i class="fa-solid fa-circle-check verified-dot"></i>' +
        '<span style="margin-left:auto;color:var(--clr-primary-600);font-size:12.5px;font-weight:700;">Профиль <i class="fa-solid fa-chevron-right" style="font-size:9px;"></i></span>' +
      '</div>' +
      starLine('4.9','128') +
      '<p style="margin-top:8px;">Наваристый борщ на говяжьем бульоне, со сметаной и зеленью на гарнир. Готовлю по рецепту моей мамы — без бульонных кубиков и лишней соли.</p>' +
      '<div class="ingredient-chips" style="margin-top:14px;">' +
        '<span class="ing-chip">Говядина</span><span class="ing-chip">Свёкла</span><span class="ing-chip">Капуста</span><span class="ing-chip">Сметана</span>' +
      '</div>' +
    '</div>' +
    '<div class="section-block" style="padding-top:0;">' +
      '<div class="badge-row">' +
        '<span class="trust-badge identity"><i class="fa-solid fa-shield-check"></i> Личность проверена</span>' +
        '<span class="trust-badge kitchen"><i class="fa-solid fa-camera"></i> Кухня подтверждена</span>' +
      '</div>' +
    '</div>' +
    '<div class="section-block" style="padding-top:0;">' +
      '<h4>Фото от покупателей</h4>' +
      '<div class="ugc-row"><img src="images/dish-borscht.jpg" alt=""><img src="images/dish-borscht.jpg" alt=""></div>' +
    '</div>'
};

/* ---------------- РАСПРОДАНО ---------------- */
SCREENS['sold-out'] = {
  footer: bottomNavBuyer(''),
  body:
    '<div class="dish-hero" style="height:220px;">' +
      '<img src="images/dish-khinkali.jpg" alt="Хинкали" style="filter:grayscale(0.4) brightness(0.85);">' +
      '<div class="topbar-float"><button class="icon-btn" onclick="goTo(\'feed\')"><i class="fa-solid fa-arrow-left"></i></button><span></span></div>' +
    '</div>' +
    '<div class="section-block" style="padding-top:26px;">' +
      '<h2>Хинкали с говядиной</h2>' +
      '<div class="cook-mini" style="margin-top:8px;"><img src="images/cook-woman1.jpg" alt=""><span style="font-size:13.5px;">Нина Гелашвили</span><i class="fa-solid fa-circle-check verified-dot"></i></div>' +
    '</div>' +
    '<div class="soldout-panel">' +
      '<div class="icon-circle"><i class="fa-solid fa-bowl-food"></i></div>' +
      '<h4>Сегодня уже всё разобрали 🎉</h4>' +
      '<p>Нина приготовила 20 порций — и все нашли своих соседей. Подпишитесь, чтобы узнать первыми о новой партии.</p>' +
      '<button class="btn btn-primary" style="width:100%;" onclick="showToast(\'Подписка оформлена — сообщим первыми!\')"><i class="fa-solid fa-bell"></i> Уведомить о новой партии</button>' +
    '</div>' +
    '<div class="feed-section-title"><h4>Похоже на это, рядом</h4></div>' +
    '<div class="dish-list">' +
      dishCard(FEED_DISHES[1]) + dishCard(FEED_DISHES[2]) +
    '</div>'
};

/* ---------------- ОФОРМЛЕНИЕ ЗАКАЗА ---------------- */
SCREENS['checkout'] = {
  footer:
    '<div class="sticky-cta" style="flex-direction:column;align-items:stretch;">' +
      '<div class="summary-line"><span>Блюда (2)</span><span>630 ₽</span></div>' +
      '<div class="summary-line"><span>Комиссия сервиса</span><span>25 ₽</span></div>' +
      '<div class="summary-line total"><span>Итого</span><span>655 ₽</span></div>' +
      '<button class="btn btn-primary" style="width:100%;margin-top:10px;justify-content:center;" onclick="goTo(\'tracking\')"><i class="fa-solid fa-lock"></i> Оформить заказ</button>' +
    '</div>',
  body:
    topbarBack('Оформление заказа', null, 'dish-detail') +
    '<div class="section-block" style="padding-top:0;">' +
      '<div class="order-line"><img src="images/dish-borscht.jpg" alt=""><div class="ol-name">Борщ по-домашнему</div><div class="ol-qty">×1</div><div class="ol-price">350 ₽</div></div>' +
      '<div class="order-line"><img src="images/dish-syrniki.jpg" alt=""><div class="ol-name">Сырники со сметаной</div><div class="ol-qty">×1</div><div class="ol-price">280 ₽</div></div>' +
    '</div>' +
    '<div class="section-block" style="padding-top:0;">' +
      '<h4>Откуда и куда</h4>' +
      '<div class="distance-map">' +
        '<div class="dash-line"></div>' +
        '<div class="pin cook"><i class="fa-solid fa-kitchen-set"></i></div>' +
        '<div class="pin you"><i class="fa-solid fa-house"></i></div>' +
        '<div class="dist-tag"><i class="fa-solid fa-location-dot"></i> 800 м · ~10 мин пешком</div>' +
      '</div>' +
    '</div>' +
    '<div class="section-block" style="padding-top:0;">' +
      '<h4>Как получить</h4>' +
      '<div class="toggle-pair">' +
        '<button class="active">Самовывоз</button>' +
        '<button>Доставка (+90 ₽)</button>' +
      '</div>' +
    '</div>' +
    '<div class="section-block" style="padding-top:0;">' +
      '<h4>Когда</h4>' +
      '<div class="slot-row">' +
        '<div class="slot-chip active">14:00<small>сегодня</small></div>' +
        '<div class="slot-chip">14:30<small>сегодня</small></div>' +
        '<div class="slot-chip">15:00<small>сегодня</small></div>' +
        '<div class="slot-chip">Завтра<small>10:00</small></div>' +
      '</div>' +
    '</div>' +
    '<div class="section-block" style="padding-top:0;">' +
      '<h4>Оплата</h4>' +
      '<div class="direct-pay-note"><i class="fa-solid fa-circle-info"></i><span>Оплата проходит через приложение — деньги переводятся повару только после подтверждения, что вы получили заказ. Ваши данные карты не передаются напрямую соседям.</span></div>' +
    '</div>'
};

/* ---------------- ТРЕКИНГ ЗАКАЗА ---------------- */
SCREENS['tracking'] = {
  footer: bottomNavBuyer('orders'),
  body:
    topbarBack('Заказ №2481', 'Анна Соколова', 'feed') +
    '<div class="tracking-hero">' +
      '<div class="eta-big">14:05</div>' +
      '<p>Ожидаемое время получения · борщ уже разливают по контейнерам</p>' +
    '</div>' +
    '<div class="stepper">' +
      '<div class="step-item done"><div class="step-dot"><i class="fa-solid fa-check"></i></div><div class="step-body"><b>Заказ принят</b><span>13:32 · Анна подтвердила заказ</span></div></div>' +
      '<div class="step-item current"><div class="step-dot"><i class="fa-solid fa-fire"></i></div><div class="step-body"><b>Готовится</b><span>Осталось примерно 20 минут</span></div></div>' +
      '<div class="step-item"><div class="step-dot"><i class="fa-solid fa-box"></i></div><div class="step-body"><b>Готово к выдаче</b><span>Придёт уведомление</span></div></div>' +
      '<div class="step-item"><div class="step-dot"><i class="fa-solid fa-house"></i></div><div class="step-body"><b>Получено</b><span>Оставьте отзыв Анне</span></div></div>' +
    '</div>' +
    '<div class="cook-contact-bar">' +
      '<img src="images/cook-woman1.jpg" alt="">' +
      '<div class="cc-info"><b>Анна Соколова</b><span>Обычно отвечает за 3 минуты</span></div>' +
      '<button class="cc-btn"><i class="fa-solid fa-message"></i></button>' +
    '</div>' +
    '<div class="section-block" style="padding-top:0;">' +
      '<h4>Ваш заказ</h4>' +
      '<div class="order-line"><img src="images/dish-borscht.jpg" alt=""><div class="ol-name">Борщ по-домашнему</div><div class="ol-qty">×1</div><div class="ol-price">350 ₽</div></div>' +
      '<div class="order-line"><img src="images/dish-syrniki.jpg" alt=""><div class="ol-name">Сырники со сметаной</div><div class="ol-qty">×1</div><div class="ol-price">280 ₽</div></div>' +
    '</div>'
};

/* ---------------- ПРОФИЛЬ ПОКУПАТЕЛЯ ---------------- */
SCREENS['buyer-profile'] = {
  footer: bottomNavBuyer('profile'),
  body:
    topbarBack('Профиль', null, 'feed') +
    '<div class="profile-header">' +
      '<img src="images/customer-woman1.jpg" alt="Мария">' +
      '<h3>Мария Петрова</h3>' +
      '<span style="font-size:12.5px;color:var(--text-muted);">На платформе с марта 2025 · 34 заказа</span>' +
    '</div>' +
    '<div class="role-switch-card">' +
      '<i class="fa-solid fa-kitchen-set"></i>' +
      '<h4>Хочете сами готовить и продавать?</h4>' +
      '<p style="font-size:12.5px;">Переключитесь в режим повара — это тот же аккаунт, просто другой набор экранов.</p>' +
      '<button class="btn btn-primary btn-sm" onclick="switchToRole(\'cook\')">Стать поваром <i class="fa-solid fa-arrow-right"></i></button>' +
    '</div>' +
    '<div class="section-block" style="padding-top:0;">' +
      '<div class="settings-list">' +
        '<div class="settings-item"><i class="fa-solid fa-location-dot"></i><span class="si-label">Мой адрес</span><span class="si-value">Садовая, 12</span><i class="fa-solid fa-chevron-right chev"></i></div>' +
        '<div class="settings-item"><i class="fa-solid fa-credit-card"></i><span class="si-label">Способы оплаты</span><span class="si-value">2 карты</span><i class="fa-solid fa-chevron-right chev"></i></div>' +
        '<div class="settings-item"><i class="fa-solid fa-heart"></i><span class="si-label">Избранные повара</span><span class="si-value">3</span><i class="fa-solid fa-chevron-right chev"></i></div>' +
        '<div class="settings-item"><i class="fa-solid fa-circle-half-stroke"></i><span class="si-label">Тёмная тема</span><span class="switch" id="profileThemeSwitch" onclick="toggleProfileTheme(this)"></span></div>' +
        '<div class="settings-item"><i class="fa-solid fa-text-height"></i><span class="si-label">Крупный текст</span><span class="switch" onclick="this.classList.toggle(\'on\')"></span></div>' +
        '<div class="settings-item"><i class="fa-solid fa-circle-question"></i><span class="si-label">Помощь и поддержка</span><i class="fa-solid fa-chevron-right chev"></i></div>' +
      '</div>' +
    '</div>'
};

/* ============================================================
   ЭКРАНЫ ПОВАРА
   ============================================================ */

SCREENS['cook-today'] = {
  footer: bottomNavCook('today'),
  body:
    '<div class="app-topbar">' +
      '<div class="title"><span style="font-size:11.5px;color:var(--text-muted);">Режим повара</span><h3 style="margin-top:2px;">Доброе утро, Анна ☀️</h3></div>' +
      '<button class="icon-btn" onclick="goTo(\'cook-profile-settings\')"><i class="fa-solid fa-bell"></i></button>' +
    '</div>' +
    '<div class="today-stats">' +
      '<div class="today-stat-card"><i class="fa-solid fa-ruble-sign"></i><b>3 240 ₽</b><span>заработано сегодня</span></div>' +
      '<div class="today-stat-card"><i class="fa-solid fa-receipt"></i><b>9</b><span>заказов сегодня</span></div>' +
      '<div class="today-stat-card"><i class="fa-solid fa-star"></i><b>4.9</b><span>рейтинг</span></div>' +
    '</div>' +
    '<div class="big-cta-card" onclick="goTo(\'add-1\')">' +
      '<div class="icon-wrap"><i class="fa-solid fa-plus"></i></div>' +
      '<div><b>Добавить новое блюдо</b><span>Это займёт всего пару минут</span></div>' +
    '</div>' +
    '<div class="feed-section-title"><h4>Требуют внимания</h4><a href="#" onclick="goTo(\'cook-orders\'); return false;">Все заказы</a></div>' +
    '<div class="section-block" style="padding-top:0;">' +
      '<div class="order-card">' +
        '<img src="images/customer-woman1.jpg" alt="">' +
        '<div class="oc-body">' +
          '<div class="oc-top"><b>Екатерина В.</b><span class="status-pill new">Новый</span></div>' +
          '<p>Борщ ×2, Сырники ×1 · получение в 14:00</p>' +
          '<div class="order-actions"><button class="ghost" onclick="showToast(\'Заказ отклонён\')">Отклонить</button><button class="accept" onclick="showToast(\'Заказ принят!\')">Принять</button></div>' +
        '</div>' +
      '</div>' +
      '<div class="order-card">' +
        '<img src="images/customer-man1.jpg" alt="">' +
        '<div class="oc-body">' +
          '<div class="oc-top"><b>Дмитрий Н.</b><span class="status-pill cooking">Готовится</span></div>' +
          '<p>Борщ ×1 · получение в 14:30</p>' +
          '<div class="order-actions"><button class="ready" onclick="showToast(\'Отмечено как «Готово»\')"><i class="fa-solid fa-check"></i> Готово</button></div>' +
        '</div>' +
      '</div>' +
    '</div>'
};

SCREENS['cook-orders'] = {
  footer: bottomNavCook('orders'),
  body:
    topbarBack('Заказы', 'Сегодня, 3 сентября', 'cook-today') +
    '<div class="chip-row">' +
      '<div class="chip active">Все · 9</div><div class="chip">Новые · 1</div><div class="chip">Готовятся · 2</div><div class="chip">Готовы · 1</div><div class="chip">Завершены · 5</div>' +
    '</div>' +
    '<div class="section-block" style="padding-top:0;">' +
      '<div class="order-card">' +
        '<img src="images/customer-woman1.jpg" alt="">' +
        '<div class="oc-body">' +
          '<div class="oc-top"><b>Екатерина В.</b><span class="status-pill new">Новый</span></div>' +
          '<p>Борщ ×2, Сырники ×1 · 14:00 · 630 ₽</p>' +
          '<div class="order-actions"><button class="ghost" onclick="showToast(\'Заказ отклонён\')">Отклонить</button><button class="accept" onclick="showToast(\'Заказ принят!\')">Принять</button></div>' +
        '</div>' +
      '</div>' +
      '<div class="order-card">' +
        '<img src="images/customer-man1.jpg" alt="">' +
        '<div class="oc-body">' +
          '<div class="oc-top"><b>Дмитрий Н.</b><span class="status-pill cooking">Готовится</span></div>' +
          '<p>Борщ ×1 · 14:30 · 350 ₽</p>' +
          '<div class="order-actions"><button class="ready" onclick="showToast(\'Отмечено как «Готово»\')"><i class="fa-solid fa-check"></i> Готово</button></div>' +
        '</div>' +
      '</div>' +
      '<div class="order-card">' +
        '<img src="images/customer-woman1.jpg" alt="">' +
        '<div class="oc-body">' +
          '<div class="oc-top"><b>Ирина С.</b><span class="status-pill ready">Готов к выдаче</span></div>' +
          '<p>Сырники ×2 · 12:00 · 560 ₽</p>' +
          '<div class="order-actions"><button class="ghost" onclick="showToast(\'Покупателю отправлено напоминание\')">Напомнить</button></div>' +
        '</div>' +
      '</div>' +
    '</div>'
};

SCREENS['cook-dishes'] = {
  footer: bottomNavCook('dishes'),
  body:
    '<div class="app-topbar">' +
      '<div class="title"><h3>Мои блюда</h3><span>5 блюд · 2 доступны сегодня</span></div>' +
      '<button class="icon-btn" style="background:var(--clr-primary-500);color:#fff;" onclick="goTo(\'add-1\')"><i class="fa-solid fa-plus"></i></button>' +
    '</div>' +
    '<div class="section-block" style="padding-top:0;">' +
      '<div class="manage-dish-card"><img src="images/dish-borscht.jpg" alt=""><div class="md-body"><b>Борщ по-домашнему</b><span>Осталось 3 · 350 ₽</span></div><div class="switch on" onclick="this.classList.toggle(\'on\')"></div></div>' +
      '<div class="manage-dish-card"><img src="images/dish-syrniki.jpg" alt=""><div class="md-body"><b>Сырники со сметаной</b><span>Осталось 6 · 280 ₽</span></div><div class="switch on" onclick="this.classList.toggle(\'on\')"></div></div>' +
      '<div class="manage-dish-card"><img src="images/dish-pie.jpg" alt=""><div class="md-body"><b>Шарлотка яблочная</b><span>Готовится завтра · 320 ₽</span></div><div class="switch" onclick="this.classList.toggle(\'on\')"></div></div>' +
      '<div class="manage-dish-card"><img src="images/dish-pasta.jpg" alt=""><div class="md-body"><b>Паста болоньезе</b><span>Распродано сегодня · 390 ₽</span></div><div class="switch" onclick="this.classList.toggle(\'on\')"></div></div>' +
      '<div class="manage-dish-card"><img src="images/dish-salad.jpg" alt=""><div class="md-body"><b>Салат «Цезарь»</b><span>На паузе · 260 ₽</span></div><div class="switch" onclick="this.classList.toggle(\'on\')"></div></div>' +
    '</div>'
};

/* ---------------- ДОБАВЛЕНИЕ БЛЮДА (3 шага) ---------------- */
function stepDots(active){
  var out = '<div class="dot-row" style="margin:4px 0 18px;">';
  for(var i=1;i<=3;i++){ out += '<span class="dot ' + (i<=active ? 'active':'') + '"></span>'; }
  return out + '</div>';
}

SCREENS['add-1'] = {
  footer: '<div class="sticky-cta"><button class="btn btn-primary" style="width:100%;justify-content:center;" onclick="goTo(\'add-2\')">Далее <i class="fa-solid fa-arrow-right"></i></button></div>',
  body:
    topbarBack('Новое блюдо', 'Шаг 1 из 3', 'cook-dishes') +
    '<div class="section-block">' +
      stepDots(1) +
      '<div class="form-field">' +
        '<label>Фото блюда</label>' +
        '<div class="photo-upload"><img src="images/dish-plov.jpg" alt="Предпросмотр"></div>' +
        '<span class="hint"><i class="fa-solid fa-circle-info"></i> Совет: снимайте при дневном свете, крупным планом — так блюдо выглядит вкуснее</span>' +
      '</div>' +
      '<div class="form-field">' +
        '<label>Название блюда</label>' +
        '<input class="text-input" type="text" value="Плов узбекский с бараниной">' +
      '</div>' +
      '<div class="form-field">' +
        '<label>Кухня</label>' +
        '<div class="chip-row" style="padding:0;">' +
          '<div class="chip active">Узбекская</div><div class="chip">Русская</div><div class="chip">Кавказская</div><div class="chip">Другое</div>' +
        '</div>' +
      '</div>' +
    '</div>'
};

SCREENS['add-2'] = {
  footer: '<div class="sticky-cta"><button class="btn btn-primary" style="width:100%;justify-content:center;" onclick="goTo(\'add-3\')">Далее <i class="fa-solid fa-arrow-right"></i></button></div>',
  body:
    topbarBack('Новое блюдо', 'Шаг 2 из 3', 'add-1') +
    '<div class="section-block">' +
      stepDots(2) +
      '<div class="form-field">' +
        '<label>Цена за порцию, ₽</label>' +
        '<input class="text-input" type="text" value="420">' +
        '<span class="hint">Похожие блюда рядом продаются по 380–450 ₽</span>' +
      '</div>' +
      '<div class="form-field">' +
        '<label>Сколько порций готовите?</label>' +
        '<div class="portion-stepper-lg">' +
          '<button onclick="stepPortion(-1)"><i class="fa-solid fa-minus"></i></button>' +
          '<span class="val" id="portionVal">8</span>' +
          '<button onclick="stepPortion(1)"><i class="fa-solid fa-plus"></i></button>' +
        '</div>' +
        '<span class="hint" style="text-align:center;display:block;">Когда закончатся — блюдо само скроется из ленты</span>' +
      '</div>' +
    '</div>'
};

SCREENS['add-3'] = {
  footer: '<div class="sticky-cta"><button class="btn btn-primary" style="width:100%;justify-content:center;" onclick="goTo(\'add-done\')"><i class="fa-solid fa-check"></i> Опубликовать блюдо</button></div>',
  body:
    topbarBack('Новое блюдо', 'Шаг 3 из 3', 'add-2') +
    '<div class="section-block">' +
      stepDots(3) +
      '<div class="form-field">' +
        '<label>Когда готовите?</label>' +
        '<div class="big-toggle-row">' +
          '<div class="big-toggle active"><i class="fa-solid fa-sun"></i>Сегодня</div>' +
          '<div class="big-toggle"><i class="fa-solid fa-calendar-day"></i>Завтра</div>' +
          '<div class="big-toggle"><i class="fa-solid fa-calendar-week"></i>Выбрать день</div>' +
        '</div>' +
      '</div>' +
      '<div class="form-field">' +
        '<label>Во сколько будет готово?</label>' +
        '<div class="slot-row">' +
          '<div class="slot-chip">12:00</div><div class="slot-chip active">13:30</div><div class="slot-chip">15:00</div><div class="slot-chip">18:00</div>' +
        '</div>' +
      '</div>' +
      '<div class="form-field">' +
        '<label>Нужно заказать заранее?</label>' +
        '<div class="settings-item" style="border:1px solid var(--border-soft);border-radius:var(--r-md);padding:12px 14px;">' +
          '<i class="fa-solid fa-clock"></i><span class="si-label" style="font-size:13px;">За 2 часа до готовности</span><span class="switch on" onclick="this.classList.toggle(\'on\')"></span>' +
        '</div>' +
      '</div>' +
    '</div>'
};

SCREENS['add-done'] = {
  footer: '<div class="sticky-cta" style="justify-content:center;"><button class="btn btn-primary" style="width:100%;justify-content:center;" onclick="goTo(\'cook-dishes\')">Перейти к моим блюдам</button></div>',
  body:
    '<div class="centered-screen">' +
      '<div class="big-icon"><i class="fa-solid fa-check"></i></div>' +
      '<h2>Готово! Блюдо опубликовано</h2>' +
      '<p>«Плов узбекский с бараниной» уже видно соседям в радиусе 1.5 км. Мы пришлём уведомление на первый заказ.</p>' +
      '<div class="dish-card" style="width:100%;text-align:left;margin-top:10px;">' +
        '<div class="thumb-wrap"><img src="images/dish-plov.jpg" alt=""><div class="portions-badge"><i class="fa-solid fa-bowl-food"></i> Осталось 8</div></div>' +
        '<div class="info"><h4>Плов узбекский с бараниной</h4><div class="dish-eta"><i class="fa-solid fa-clock"></i> готово к 13:30</div><div class="dish-price" style="margin-top:6px;">420 ₽</div></div>' +
      '</div>' +
    '</div>'
};

/* ---------------- ПРОФИЛЬ ПОВАРА (настройки) ---------------- */
SCREENS['cook-profile-settings'] = {
  footer: bottomNavCook('profile'),
  body:
    topbarBack('Профиль повара', null, 'cook-today') +
    '<div class="profile-header">' +
      '<img src="images/cook-woman1.jpg" alt="Анна">' +
      '<h3>Анна Соколова</h3>' +
      '<span style="font-size:12.5px;color:var(--text-muted);">Повар с апреля 2024 · 412 заказов</span>' +
      '<div class="badge-row" style="margin-top:10px;justify-content:center;">' +
        '<span class="trust-badge identity"><i class="fa-solid fa-shield-check"></i> Верифицирована</span>' +
        '<span class="trust-badge selfemployed"><i class="fa-solid fa-file-invoice"></i> Самозанятая</span>' +
      '</div>' +
    '</div>' +
    '<div class="role-switch-card">' +
      '<i class="fa-solid fa-basket-shopping"></i>' +
      '<h4>Хотите просто заказать еду?</h4>' +
      '<p style="font-size:12.5px;">Переключитесь обратно в режим покупателя одним нажатием.</p>' +
      '<button class="btn btn-primary btn-sm" onclick="switchToRole(\'buyer\')">Режим покупателя <i class="fa-solid fa-arrow-right"></i></button>' +
    '</div>' +
    '<div class="section-block" style="padding-top:0;">' +
      '<div class="settings-list">' +
        '<div class="settings-item"><i class="fa-solid fa-camera"></i><span class="si-label">Фото кухни</span><span class="si-value">Подтверждено</span><i class="fa-solid fa-chevron-right chev"></i></div>' +
        '<div class="settings-item"><i class="fa-solid fa-id-card"></i><span class="si-label">Верификация личности</span><span class="si-value">Пройдена</span><i class="fa-solid fa-chevron-right chev"></i></div>' +
        '<div class="settings-item"><i class="fa-solid fa-wallet"></i><span class="si-label">Куда выводить деньги</span><span class="si-value">Карта ···4521</span><i class="fa-solid fa-chevron-right chev"></i></div>' +
        '<div class="settings-item"><i class="fa-solid fa-calendar-days"></i><span class="si-label">Расписание готовки</span><i class="fa-solid fa-chevron-right chev"></i></div>' +
        '<div class="settings-item"><i class="fa-solid fa-circle-question"></i><span class="si-label">Помощь и поддержка</span><i class="fa-solid fa-chevron-right chev"></i></div>' +
      '</div>' +
    '</div>'
};
