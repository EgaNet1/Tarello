// ============================================================
// Контроллер интерактивного прототипа: рендер экранов, навигация,
// переключение ролей, мелкие интеракции (корзина, тосты, степперы)
// ============================================================

var currentRole = 'buyer';
var currentScreen = 'onb-1';
var cartCount = 0;
var dishQty = 1;
var dishUnitPrice = 350;
var portionCount = 8;

function renderScreen(key){
  var cfg = SCREENS[key];
  if(!cfg) return;
  currentScreen = key;
  var viewport = document.getElementById('appViewport');
  var topbar = cfg.topbar !== undefined ? cfg.topbar : '';
  var body = cfg.body || '';
  var footer = cfg.footer !== undefined ? cfg.footer : '';

  viewport.innerHTML =
    '<div class="app-screen active">' +
      topbar +
      body +
    '</div>';

  // Footer нужно закрепить вне скролла — переносим его после viewport
  var existingFooter = document.getElementById('pinnedFooter');
  if(existingFooter) existingFooter.remove();

  if(footer){
    var f = document.createElement('div');
    f.id = 'pinnedFooter';
    f.innerHTML = footer;
    viewport.parentNode.appendChild(f);
  }

  viewport.scrollTop = 0;
  updateSidebarActive(key);
  updateCaption(key);

  // Восстановить состояние счётчика в карточке блюда
  if(key === 'dish-detail'){
    dishQty = 1;
    document.getElementById('dishQty').textContent = dishQty;
    document.getElementById('dishTotal').textContent = (dishUnitPrice * dishQty) + ' ₽';
  }
  if(key === 'add-2'){
    var pv = document.getElementById('portionVal');
    if(pv) pv.textContent = portionCount;
  }
}

function goTo(key){
  renderScreen(key);
}

function updateSidebarActive(key){
  document.querySelectorAll('.screen-list button').forEach(function(btn){
    btn.classList.toggle('active', btn.getAttribute('data-screen') === key);
  });
}

var CAPTIONS = {
  'onb-1': 'Онбординг сразу задаёт тон: не «доставка», а тёплое соседское знакомство.',
  'onb-2': 'Гиперлокальность объясняется на старте — это не техническая настройка, а суть продукта.',
  'onb-3': 'Доверие проговаривается явно и человеческим языком, ещё до регистрации.',
  'feed': 'Радиус поиска — крупный, видимый фильтр. Каждая карточка показывает живую доступность порций.',
  'cook-profile': 'Профиль повара — это личность: фото человека, история, детальный рейтинг, отзывы с фото.',
  'dish-detail': 'Крупное «аппетитное» фото как якорь, честный статус порций, бейджи доверия рядом с описанием.',
  'sold-out': '«Распродано» не разочаровывает: показывает, что товар живой, и подталкивает к похожим блюдам.',
  'checkout': 'Карта расстояния и явное объяснение схемы оплаты снимают тревогу перед первым платежом незнакомцу.',
  'tracking': 'Статусы в реальном времени + прямой контакт с поваром — как в чате с соседом, а не с колл-центром.',
  'buyer-profile': 'Переключение в роль повара — явный, но не пугающий блок, а не скрытая настройка.',
  'cook-today': 'Кабинет повара — «Сегодня», а не сложная CRM: заработок, заказы, одна крупная кнопка действия.',
  'cook-orders': 'Заказы — крупные кнопки «Принять/Готово», понятные статусы без бизнес-жаргона.',
  'cook-dishes': 'Управление доступностью блюд — простые переключатели, а не таблицы и настройки склада.',
  'add-1': 'Добавление блюда — 3 больших шага. Шаг 1: фото и название, с понятной подсказкой по свету.',
  'add-2': 'Шаг 2: цена и порции — крупный степпер, ориентир по ценам соседей снижает неуверенность новичка.',
  'add-3': 'Шаг 3: время готовности — переключатели вместо календаря, чтобы задать «живую» доступность блюда.',
  'add-done': 'Мгновенное подтверждение публикации — повар сразу видит, как блюдо выглядит для покупателей.',
  'cook-profile-settings': 'Верификация показана как понятные, не пугающие статусы — это то же доверие, но с другой стороны.'
};

function updateCaption(key){
  var el = document.getElementById('stageCaption');
  if(!el) return;
  var text = CAPTIONS[key] || 'Кликайте по элементам экрана, чтобы пройти сценарий дальше.';
  var roleLabel = currentRole === 'buyer' ? 'покупателя' : 'повара';
  el.innerHTML = '👆 ' + text;
}

/* ---------- Переключение роли ---------- */
function switchToRole(role){
  currentRole = role;
  document.querySelectorAll('#roleSwitcher button').forEach(function(btn){
    btn.classList.toggle('active', btn.getAttribute('data-role') === role);
  });
  if(role === 'buyer'){
    document.getElementById('buyerScreens').classList.remove('group-hidden');
    document.getElementById('cookScreens').classList.add('group-hidden');
    renderScreen('feed');
  } else {
    document.getElementById('cookScreens').classList.remove('group-hidden');
    document.getElementById('buyerScreens').classList.add('group-hidden');
    renderScreen('cook-today');
  }
}

/* ---------- Мелкие интеракции ---------- */
function addToCart(btn){
  btn.classList.add('added');
  btn.innerHTML = '<i class="fa-solid fa-check"></i>';
  cartCount++;
  showToast('Добавлено в заказ · корзина: ' + cartCount);
  setTimeout(function(){
    btn.classList.remove('added');
    btn.innerHTML = '<i class="fa-solid fa-plus"></i>';
  }, 1400);
}

function changeQty(delta){
  dishQty = Math.max(1, dishQty + delta);
  document.getElementById('dishQty').textContent = dishQty;
  document.getElementById('dishTotal').textContent = (dishUnitPrice * dishQty) + ' ₽';
}

function addAndGo(){
  showToast('Добавлено: ' + dishQty + ' × Борщ по-домашнему');
  setTimeout(function(){ goTo('checkout'); }, 700);
}

function stepPortion(delta){
  portionCount = Math.max(1, portionCount + delta);
  document.getElementById('portionVal').textContent = portionCount;
}

function showToast(text){
  var toast = document.getElementById('toast');
  document.getElementById('toastText').textContent = text;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(function(){ toast.classList.remove('show'); }, 2200);
}

function toggleProfileTheme(el){
  el.classList.toggle('on');
  var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  var buttons = document.querySelectorAll('.theme-toggle button');
  var target = isDark ? 'light' : 'dark';
  buttons.forEach(function(btn){
    if(btn.getAttribute('data-theme') === target) btn.click();
  });
}

/* ---------- Инициализация ---------- */
document.addEventListener('DOMContentLoaded', function(){
  var params = new URLSearchParams(window.location.search);
  var deepScreen = params.get('screen');
  var deepRole = params.get('role');
  if(deepRole === 'cook'){
    currentRole = 'cook';
    document.getElementById('cookScreens').classList.remove('group-hidden');
    document.getElementById('buyerScreens').classList.add('group-hidden');
    document.querySelectorAll('#roleSwitcher button').forEach(function(btn){
      btn.classList.toggle('active', btn.getAttribute('data-role') === 'cook');
    });
  }
  renderScreen(deepScreen && SCREENS[deepScreen] ? deepScreen : 'onb-1');

  document.querySelectorAll('#roleSwitcher button').forEach(function(btn){
    btn.addEventListener('click', function(){ switchToRole(btn.getAttribute('data-role')); });
  });

  document.querySelectorAll('.screen-list button').forEach(function(btn){
    btn.addEventListener('click', function(){ goTo(btn.getAttribute('data-screen')); });
  });

  // Живые часы в статус-баре
  function tick(){
    var d = new Date();
    var h = d.getHours() % 12; if(h===0) h=12;
    var m = d.getMinutes();
    document.getElementById('clock').textContent = h + ':' + (m<10?'0':'') + m;
  }
  tick();
  setInterval(tick, 30000);
});
