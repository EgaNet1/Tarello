// Общий переключатель темы (светлая/тёмная) для всех страниц проекта.
(function(){
  function applyTheme(theme){
    if(theme === 'dark'){
      document.documentElement.setAttribute('data-theme','dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    var buttons = document.querySelectorAll('.theme-toggle button');
    buttons.forEach(function(btn){
      btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
    });
    try{ localStorage.setItem('domashka-theme', theme); }catch(e){}
  }

  function initToggle(){
    var buttons = document.querySelectorAll('.theme-toggle button');
    buttons.forEach(function(btn){
      btn.addEventListener('click', function(){
        applyTheme(btn.getAttribute('data-theme'));
      });
    });
  }

  var saved = 'light';
  try{ saved = localStorage.getItem('domashka-theme') || 'light'; }catch(e){}

  document.addEventListener('DOMContentLoaded', function(){
    applyTheme(saved);
    initToggle();
  });
})();
