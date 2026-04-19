/**
 * АНКЕТА ПРЕДЗАПИСИ — РЕТРИТ «ТОЧКА СБОРКИ»
 *
 * КАК ЗАПУСТИТЬ:
 * 1. Открой script.google.com
 * 2. Нажми «Новый проект»
 * 3. Удали весь код в редакторе
 * 4. Вставь этот скрипт целиком
 * 5. Нажми кнопку ▶ «Выполнить» (или Ctrl+R)
 * 6. При первом запуске Google попросит разрешения — нажми «Разрешить»
 * 7. Готово! Ссылка на форму появится во всплывающем окне
 *    и будет скопирована в лог (Вид → Журналы)
 */

function createRetritForm() {

  // ── СОЗДАЁМ ФОРМУ ──────────────────────────────────────────
  var form = FormApp.create('Анкета предзаписи — Ретрит «Точка Сборки»');

  form.setDescription(
    'Заполнение займёт 5–7 минут.\n\n' +
    'После получения анкеты Константин лично свяжется с тобой, ' +
    'чтобы коротко поговорить и ответить на вопросы.\n\n' +
    '🔷 Мужской ретрит: 17–21 июня · Крым, «Круг Света»\n' +
    '🔶 Женский ретрит: 22–26 июня · Крым, «Круг Света»'
  );

  form.setConfirmationMessage(
    'Анкета получена. Константин свяжется с тобой в ближайшее время.\n\n' +
    'Если есть срочный вопрос — напиши напрямую в Telegram: @[username]'
  );

  // Запрещаем заполнять несколько раз с одного аккаунта
  form.setLimitOneResponsePerUser(false);
  form.setAllowResponseEdits(false);
  form.setProgressBar(true);
  form.setShuffleQuestions(false);

  // ── ВОПРОС 1: ИМЯ ─────────────────────────────────────────
  var q1 = form.addTextItem();
  q1.setTitle('Как тебя зовут?');
  q1.setHelpText('Имя и фамилия');
  q1.setRequired(true);

  // ── ВОПРОС 2: ТЕЛЕФОН ──────────────────────────────────────
  var q2 = form.addTextItem();
  q2.setTitle('Номер телефона');
  q2.setHelpText('На этот номер Константин позвонит для короткого разговора. ' +
                 'Укажи мессенджер, в котором удобнее: WhatsApp / Telegram.');
  q2.setRequired(true);
  q2.setValidation(
    FormApp.createTextValidation()
      .requireTextMatchesPattern('^[+\\d][\\d\\s\\-\\(\\)]{6,20}$')
      .setHelpText('Пожалуйста, введи корректный номер телефона')
      .build()
  );

  // ── ВОПРОС 3: ВЫБОР РЕТРИТА ────────────────────────────────
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('Какой ретрит тебя интересует?');
  q3.setRequired(true);
  q3.setChoices([
    q3.createChoice('🔷 Мужской ретрит — 17–21 июня'),
    q3.createChoice('🔶 Женский ретрит — 22–26 июня'),
    q3.createChoice('Пока не определился(ась), хочу узнать подробнее'),
  ]);

  // ── РАЗДЕЛИТЕЛЬ ────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('О тебе и твоей ситуации')
    .setHelpText(
      'Эти вопросы помогут Константину понять твою ситуацию до звонка, ' +
      'чтобы разговор сразу шёл по существу — без общих слов.'
    );

  // ── ВОПРОС 4: ЧТО ПРОИСХОДИТ ──────────────────────────────
  var q4 = form.addParagraphTextItem();
  q4.setTitle('Что сейчас происходит в твоей жизни? С чем хочешь разобраться?');
  q4.setHelpText(
    'Напиши честно и своими словами — 3–7 предложений. ' +
    'Это не нужно «красиво формулировать». ' +
    'Именно этот текст Константин прочитает перед звонком.'
  );
  q4.setRequired(true);
  q4.setValidation(
    FormApp.createParagraphTextValidation()
      .requireTextLengthGreaterThanOrEqualTo(30)
      .setHelpText('Пожалуйста, напиши хотя бы несколько предложений')
      .build()
  );

  // ── ВОПРОС 5: ОПЫТ ─────────────────────────────────────────
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('Ты уже обращался(ась) к психологу, коучу или был(а) на ретритах?');
  q5.setRequired(true);
  q5.setChoices([
    q5.createChoice('Да — и это помогло частично, но хочется глубже'),
    q5.createChoice('Да — но ощутимого результата не было'),
    q5.createChoice('Нет, это будет первый подобный опыт'),
  ]);

  // ── ВОПРОС 6: СОСТОЯНИЕ ────────────────────────────────────
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('Как бы ты описал(а) своё состояние прямо сейчас?');
  q6.setHelpText('Выбери то, что ближе всего');
  q6.setRequired(true);
  q6.setChoices([
    q6.createChoice('Есть конкретная ситуация или запрос, который хочу решить'),
    q6.createChoice('Общее ощущение «что-то не так», но сложно сформулировать'),
    q6.createChoice('Выгорание — нет энергии, нет смысла, всё по инерции'),
    q6.createChoice('Кризис — всё рушится или уже рухнуло, нужна точка опоры'),
  ]);

  // ── ВОПРОС 7: ВОЗРАЖЕНИЕ (необязательный) ─────────────────
  var q7 = form.addParagraphTextItem();
  q7.setTitle('Что мешает тебе решиться прямо сейчас? (необязательно)');
  q7.setHelpText(
    'Если есть сомнения или вопросы — напиши здесь. ' +
    'Константин разберёт это в разговоре.'
  );
  q7.setRequired(false);

  // ── ВОПРОС 8: ИСТОЧНИК ─────────────────────────────────────
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('Откуда ты узнал(а) о ретрите?');
  q8.setRequired(true);
  q8.setChoices([
    q8.createChoice('Telegram-канал Константина'),
    q8.createChoice('Instagram'),
    q8.createChoice('Яндекс Дзен'),
    q8.createChoice('Рекомендация знакомого'),
    q8.createChoice('Уже был(а) на ретрите или курсе у Константина'),
    q8.createChoice('Другое'),
  ]);

  // ── ФИНАЛЬНЫЙ РАЗДЕЛ ───────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Почти готово 👇')
    .setHelpText(
      'После отправки анкеты Константин лично свяжется с тобой.\n' +
      'Разговор займёт около 20 минут — честный, без давления.\n\n' +
      'Стоимость участия: от 50 000 руб. (без проживания)\n' +
      'Проживание и питание: 4 500 руб./сутки\n\n' +
      'Если ретрит тебе подходит — по итогам разговора получишь ссылку на оплату.'
    );

  // ── ПОЛУЧАЕМ ССЫЛКИ ────────────────────────────────────────
  var formUrl        = form.getPublishedUrl();
  var editUrl        = form.getEditUrl();
  var responsesUrl   = 'https://docs.google.com/spreadsheets/d/' +
                       form.getId();

  // Привязываем таблицу ответов
  var ss = SpreadsheetApp.create('Ответы — Анкета «Точка Сборки»');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  // ── ЛОГИРУЕМ РЕЗУЛЬТАТ ─────────────────────────────────────
  Logger.log('═══════════════════════════════════════');
  Logger.log('✅ ФОРМА СОЗДАНА УСПЕШНО');
  Logger.log('═══════════════════════════════════════');
  Logger.log('');
  Logger.log('🔗 ССЫЛКА ДЛЯ УЧАСТНИКОВ (публикуй эту):');
  Logger.log(formUrl);
  Logger.log('');
  Logger.log('✏️  ССЫЛКА ДЛЯ РЕДАКТИРОВАНИЯ ФОРМЫ:');
  Logger.log(editUrl);
  Logger.log('');
  Logger.log('📊 ТАБЛИЦА С ОТВЕТАМИ:');
  Logger.log('https://docs.google.com/spreadsheets/d/' + ss.getId());
  Logger.log('');
  Logger.log('═══════════════════════════════════════');

  // ── ВСПЛЫВАЮЩЕЕ ОКНО С ССЫЛКОЙ ─────────────────────────────
  var ui = SpreadsheetApp.getUi ? SpreadsheetApp.getUi() : null;

  var html = HtmlService.createHtmlOutput(
    '<html><body style="font-family:Arial;padding:20px;max-width:500px">' +
    '<h2 style="color:#1E3A5F">✅ Форма создана!</h2>' +
    '<p><b>Ссылка для участников:</b><br>' +
    '<a href="' + formUrl + '" target="_blank" style="color:#1E3A5F">' + formUrl + '</a></p>' +
    '<p><b>Таблица с ответами:</b><br>' +
    '<a href="https://docs.google.com/spreadsheets/d/' + ss.getId() + '" target="_blank" style="color:#1E3A5F">' +
    'Открыть таблицу</a></p>' +
    '<p style="color:#666;font-size:13px">Ссылки также скопированы в лог<br>' +
    '(Вид → Журналы выполнения)</p>' +
    '</body></html>'
  ).setWidth(520).setHeight(280);

  // Показываем в Apps Script редакторе
  try {
    FormApp.openById(form.getId());
  } catch(e) {}

  // Финальный лог
  Logger.log('Готово! Скопируй ссылку выше и вставь в посты прогрева.');
}
