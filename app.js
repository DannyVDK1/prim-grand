/**
 * ПРИМ ГРАНД — main application script
 */

(function () {
  'use strict';

  /* =============================================
     HEADER
     ============================================= */
  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const nav = document.querySelector('.nav');

  window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 80);
  }, { passive: true });

  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('is-open');
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Плавная прокрутка
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      nav.classList.remove('is-open');
      burger.classList.remove('is-open');
      document.body.style.overflow = '';
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* =============================================
     ПОДБОР ФИЛЬТРА — ТАБЫ
     ============================================= */
  const tabs = document.querySelectorAll('.finder__tab');
  const panes = document.querySelectorAll('.finder__pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
      panes.forEach(p => p.classList.remove('is-active'));
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      document.querySelector('[data-pane="' + target + '"]').classList.add('is-active');
    });
  });

  /* =============================================
     ПОДБОР ФИЛЬТРА — СЕЛЕКТЫ
     ============================================= */
  const brandSelect = document.getElementById('brand');
  const modelSelect = document.getElementById('model');

  if (brandSelect && window.VEHICLE_DATA) {
    Object.keys(window.VEHICLE_DATA).sort().forEach(function(brand) {
      var opt = document.createElement('option');
      opt.value = brand;
      opt.textContent = brand;
      brandSelect.appendChild(opt);
    });

    brandSelect.addEventListener('change', function() {
      var brand = brandSelect.value;
      modelSelect.innerHTML = '';
      if (!brand) {
        modelSelect.disabled = true;
        modelSelect.innerHTML = '<option>Сначала выберите марку</option>';
        return;
      }
      modelSelect.disabled = false;
      modelSelect.innerHTML = '<option value="">Все модели</option>';
      (window.VEHICLE_DATA[brand] || []).forEach(function(m) {
        var opt = document.createElement('option');
        opt.value = m;
        opt.textContent = m;
        modelSelect.appendChild(opt);
      });
    });
  }

  /* =============================================
     ПОДБОР ФИЛЬТРА — ПОИСК
     ============================================= */
  function scrollToEl(el) {
    var top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  function showResults(items, query) {
    var wrap = document.getElementById('results');
    var grid = document.getElementById('resultsGrid');
    var title = document.getElementById('resultsTitle');

    wrap.hidden = false;
    grid.innerHTML = '';
    title.textContent = items.length
      ? 'Найдено ' + items.length + ' позиций: ' + query
      : '';

    if (!items.length) {
      grid.innerHTML =
        '<div class="no-results" style="grid-column:1/-1">' +
          '<h4>Ничего не найдено</h4>' +
          '<p>Попробуйте изменить параметры или оставьте заявку — мы подберём вручную.</p>' +
          '<a href="#contact" class="btn btn--primary">Запросить подбор</a>' +
        '</div>';
      scrollToEl(wrap);
      return;
    }

    items.forEach(function(f) {
      var typeName = window.FILTER_TYPE_NAMES[f.type] || f.type;
      var inStock = f.stock > 0;
      var card = document.createElement('div');
      card.className = 'result-card';
      card.innerHTML =
        '<span class="result-card__type">' + typeName + '</span>' +
        '<span class="result-card__code">' + f.code + '</span>' +
        '<span class="result-card__app">' + f.title + '<br>' + f.brand + ' — ' + f.models.join(', ') + '<br>Производитель: ' + f.manufacturer + '</span>' +
        '<div class="result-card__row">' +
          '<span class="result-card__stock ' + (inStock ? 'result-card__stock--in' : '') + '">' + (inStock ? 'В наличии (' + f.stock + ' шт)' : 'Под заказ') + '</span>' +
          '<a href="#contact" class="result-card__action" data-filter="' + f.code + '">Заказать →</a>' +
        '</div>';
      grid.appendChild(card);
    });

    // Клик «Заказать» — предзаполнение формы
    grid.querySelectorAll('.result-card__action').forEach(function(a) {
      a.addEventListener('click', function() {
        var code = a.dataset.filter;
        var commentField = document.querySelector('#contactForm textarea[name="comment"]');
        var topicField = document.getElementById('formTopic');
        if (commentField) commentField.value = 'Хочу заказать фильтр: ' + code;
        if (topicField) topicField.value = 'filters';
      });
    });

    scrollToEl(wrap);
  }

  // Кнопка: По марке
  var findByVehicle = document.getElementById('findByVehicle');
  if (findByVehicle) {
    findByVehicle.addEventListener('click', function() {
      var brand = brandSelect.value;
      var model = modelSelect.value;
      var ftype = document.getElementById('ftype').value;

      if (!brand) {
        brandSelect.focus();
        brandSelect.style.borderColor = '#ff6b1a';
        setTimeout(function() { brandSelect.style.borderColor = ''; }, 1500);
        return;
      }

      var results = window.FILTERS_DB.filter(function(f) { return f.brand === brand; });
      if (model) results = results.filter(function(f) { return f.models.indexOf(model) !== -1 || f.models.indexOf('*') !== -1; });
      if (ftype) results = results.filter(function(f) { return f.type === ftype; });

      var label = brand + (model ? ' ' + model : '') + (ftype ? ' — ' + window.FILTER_TYPE_NAMES[ftype] : '');
      showResults(results, label);
    });
  }

  // Кнопка: По каталожному номеру
  var findByCode = document.getElementById('findByCode');
  if (findByCode) {
    findByCode.addEventListener('click', function() {
      var raw = (document.getElementById('codeInput').value || '').trim();
      if (!raw) { document.getElementById('codeInput').focus(); return; }
      var code = raw.toUpperCase();
      var results = window.FILTERS_DB.filter(function(f) { return f.code.toUpperCase().indexOf(code) !== -1; });
      showResults(results, 'Артикул «' + raw + '»');
    });

    document.getElementById('codeInput').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') findByCode.click();
    });
  }

  // Сбросить поиск
  var resetSearch = document.getElementById('resetSearch');
  if (resetSearch) {
    resetSearch.addEventListener('click', function() {
      document.getElementById('results').hidden = true;
      brandSelect.value = '';
      modelSelect.innerHTML = '<option>Сначала выберите марку</option>';
      modelSelect.disabled = true;
      document.getElementById('ftype').value = '';
      document.getElementById('codeInput').value = '';
    });
  }

  /* =============================================
     КАЛЬКУЛЯТОР АРЕНДЫ
     ============================================= */
  var calcType = document.getElementById('calcType');
  var calcHours = document.getElementById('calcHours');
  var calcResult = document.getElementById('calcResult');
  var hoursLabel = document.getElementById('hoursLabel');

  function updateCalc() {
    if (!calcType || !calcHours) return;
    var rate = parseInt(calcType.value, 10);
    var hours = parseInt(calcHours.value, 10);
    hoursLabel.textContent = hours;
    var total = rate * hours;
    calcResult.textContent = total.toLocaleString('ru-RU') + ' ₽';
  }

  if (calcType) calcType.addEventListener('change', updateCalc);
  if (calcHours) calcHours.addEventListener('input', updateCalc);
  updateCalc();

  // Кнопка «Заказать расчёт» в калькуляторе
  var calcRequestBtn = document.getElementById('calcRequest');
  if (calcRequestBtn) {
    calcRequestBtn.addEventListener('click', function() {
      var type = calcType.options[calcType.selectedIndex].textContent;
      var hours = calcHours.value;
      var total = calcResult.textContent;
      var commentField = document.querySelector('#contactForm textarea[name="comment"]');
      var topicField = document.getElementById('formTopic');
      if (commentField) commentField.value = 'Аренда: ' + type + ', ' + hours + ' часов. Расчёт: ' + total;
      if (topicField) topicField.value = 'rental';
      scrollToEl(document.getElementById('contact'));
    });
  }

  // Кнопки «Запросить стоимость» на карточках техники
  document.querySelectorAll('[data-rental]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var name = btn.dataset.rental;
      var commentField = document.querySelector('#contactForm textarea[name="comment"]');
      var topicField = document.getElementById('formTopic');
      if (commentField) commentField.value = 'Интересует аренда: ' + name;
      if (topicField) topicField.value = 'rental';
      scrollToEl(document.getElementById('contact'));
    });
  });

  /* =============================================
     КОНТАКТНАЯ ФОРМА
     ============================================= */
  var formIdEl = document.getElementById('formId');
  if (formIdEl) {
    formIdEl.textContent = String(Math.floor(1000 + Math.random() * 9000));
  }

  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      var name = contactForm.querySelector('[name="name"]');
      var phone = contactForm.querySelector('[name="phone"]');
      var agree = contactForm.querySelector('[name="agree"]');
      var valid = true;

      [name, phone].forEach(function(f) {
        f.style.borderColor = '';
        if (!f.value.trim()) {
          f.style.borderColor = '#ff6b1a';
          valid = false;
        }
      });

      if (phone.value.trim() && !/[\d\s\+\-\(\)]{7,}/.test(phone.value.trim())) {
        phone.style.borderColor = '#ff6b1a';
        valid = false;
      }

      if (!agree.checked) {
        agree.parentElement.style.color = '#ff6b1a';
        valid = false;
        setTimeout(function() { agree.parentElement.style.color = ''; }, 2000);
      }

      if (!valid) return;

      var data = {
        id: formIdEl ? formIdEl.textContent : '',
        name: name.value.trim(),
        phone: phone.value.trim(),
        topic: contactForm.querySelector('[name="topic"]').value,
        comment: contactForm.querySelector('[name="comment"]').value.trim(),
        date: new Date().toISOString(),
      };

      console.log('📋 Новая заявка:', data);

      // Показать сообщение об успехе
      var formBody = contactForm.querySelector('.form__body');
      var formSuccess = document.getElementById('formSuccess');
      formBody.querySelectorAll('.field, .check, .btn').forEach(function(el) { el.style.display = 'none'; });
      formSuccess.hidden = false;

      setTimeout(function() {
        formBody.querySelectorAll('.field, .check, .btn').forEach(function(el) { el.style.display = ''; });
        formSuccess.hidden = true;
        contactForm.reset();
        if (formIdEl) formIdEl.textContent = String(Math.floor(1000 + Math.random() * 9000));
      }, 6000);
    });
  }

  /* =============================================
     МАСКА ТЕЛЕФОНА
     ============================================= */
  var phoneInput = document.querySelector('input[name="phone"]');
  if (phoneInput) {
    phoneInput.addEventListener('input', function() {
      var val = phoneInput.value.replace(/\D/g, '');
      if (val.length === 0) { phoneInput.value = ''; return; }
      if (val[0] === '8') val = '7' + val.slice(1);
      if (val[0] !== '7') val = '7' + val;

      var formatted = '+7';
      if (val.length > 1) formatted += ' (' + val.slice(1, 4);
      if (val.length >= 4) formatted += ') ' + val.slice(4, 7);
      if (val.length >= 7) formatted += '-' + val.slice(7, 9);
      if (val.length >= 9) formatted += '-' + val.slice(9, 11);

      phoneInput.value = formatted;
    });
  }

  /* =============================================
     SCROLL REVEAL
     ============================================= */
  function initReveal() {
    var selectors = [
      '.section-head', '.ftype', '.adv', '.rental-card',
      '.calc', '.gal-item', '.review', '.numbers',
      '.contact__info', '.form', '.finder__panel'
    ];

    selectors.forEach(function(sel) {
      document.querySelectorAll(sel).forEach(function(el) { el.classList.add('reveal'); });
    });

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(function(el) { observer.observe(el); });
  }

  function addCascade() {
    var grids = [
      { parent: '.filters__grid', child: '.ftype' },
      { parent: '.advantages__grid', child: '.adv' },
      { parent: '.gallery__grid', child: '.gal-item' },
      { parent: '.reviews__grid', child: '.review' }
    ];

    grids.forEach(function(g) {
      var container = document.querySelector(g.parent);
      if (!container) return;
      container.querySelectorAll(g.child).forEach(function(el, i) {
        el.style.transitionDelay = (i * 0.08) + 's';
      });
    });
  }

  /* =============================================
     АНИМАЦИЯ ЦИФР
     ============================================= */
  function animateNumbers() {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var text = el.textContent;
        var match = text.match(/^(\d+)/);
        if (!match) return;

        var target = parseInt(match[1], 10);
        var suffix = text.replace(match[1], '');
        var duration = 2000;
        var start = performance.now();

        function tick(now) {
          var progress = Math.min((now - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var current = Math.floor(target * eased);
          el.textContent = current + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.numbers__num').forEach(function(el) { observer.observe(el); });
    document.querySelectorAll('.hero__stat-num').forEach(function(el) { observer.observe(el); });
  }

  /* =============================================
     ГОД В ПОДВАЛЕ
     ============================================= */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =============================================
     ИНИЦИАЛИЗАЦИЯ
     ============================================= */
  function init() {
    addCascade();
    initReveal();
    animateNumbers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
