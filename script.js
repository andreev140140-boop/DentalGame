const allSymptoms = [
  "Наличие полости",
  "Боль от сладкого/солёного",
  "Самопроизвольная боль",
  "Боль от температуры",
  "Боль от механического напряжения",
  "Реакция на зондирование",
  "Воспаление десны",
  "Кровь из десны",
  "Наличие пародонтальных карманов",
  "Наличие подвижности",
  "Наличие гноя",
  "Реакция на перкуссию"
];

const diseases = [
  "Кариес",
  "Пульпит",
  "Периодонтит",
  "Гингивит",
  "Пародонтит",
  "Гиперестезия",
  "Перикоронарит",
  "Радикулярная киста",
  "Флюороз"
];

const symptomDiseaseMatrix = {
  "Наличие полости": ["++", "++", "+", "-", "-", "-", "-", "+", "-"],
  "Боль от сладкого/солёного": ["++", "+", "-", "-", "-", "++", "-", "-", "±"],
  "Самопроизвольная боль": ["-", "++", "+", "-", "-", "-", "+", "-", "-"],
  "Боль от температуры": ["+", "++", "+", "-", "-", "++", "-", "-", "+"],
  "Боль от механического напряжения": ["-", "+", "++", "-", "+", "-", "+", "+", "-"],
  "Реакция на зондирование": ["++", "++", "+", "-", "-", "++", "-", "-", "-"],
  "Воспаление десны": ["-", "+", "+", "++", "++", "-", "++", "+", "-"],
  "Кровь из десны": ["-", "-", "+", "++", "++", "-", "+", "-", "-"],
  "Наличие пародонтальных карманов": ["-", "-", "+", "-", "++", "-", "-", "-", "-"],
  "Наличие подвижности": ["-", "-", "+", "-", "++", "-", "-", "+", "-"],
  "Наличие гноя": ["-", "-", "++", "-", "+", "-", "+", "+", "-"],
  "Реакция на перкуссию": ["-", "+", "++", "-", "+", "-", "+", "+", "-"]
};

function relationFor(diseaseName, symptom) {
  const idx = diseases.indexOf(diseaseName);
  const row = symptomDiseaseMatrix[symptom];
  const value = row?.[idx] ?? "-";
  return value === "−" ? "-" : value;
}

function isDiseaseContradictedBySelectedSymptoms(diseaseName, selectedSymptomsSet) {
  for (const symptom of selectedSymptomsSet) {
    if (relationFor(diseaseName, symptom) === "-") return true;
  }
  return false;
}

function relationScore(rel) {
  if (rel === "++") return 2;
  if (rel === "+") return 1;
  if (rel === "±") return 0.5;
  return 0;
}

function scoreDisease(diseaseName, selectedSymptomsSet) {
  let score = 0;
  for (const symptom of selectedSymptomsSet) {
    score += relationScore(relationFor(diseaseName, symptom));
  }
  return score;
}

const day1Patients = [
  {
    name: "Анна Миронова",
    diagnosis: "Кариес",
    intro: "Доктор, у меня зуб реагирует на сладкое и иногда на холодное.",
    patientImage: "assets/CrocoPatient1.svg",
    mouthImage: "assets/DentThings1.png",
    ctImage: "assets/DentCardNO.svg",
    card: { age: 21, complaint: "Болит зуб, когда ем сладкое", status: "спокойна" },
    questions: [
      { id: "q1", text: "Как давно появилась боль?", answer: "Наверное пару недель назад." },
      { id: "q2", text: "Боль проходит после раздражителя?", answer: "Да, почти сразу проходит." },
      { id: "q3", text: "Есть ли ночная боль?", answer: "Нет." },
      { id: "q4", text: "Больно жевать?", answer: "Нет." }
    ],
    interactions: [
      { id: "i1", text: "Зондирование", answer: "Ай... здесь больно. Зонд как будто цепляется." },
      { id: "i2", text: "Перкуссия", answer: "Нет, не больно." },
      { id: "i3", text: "Осмотр десны", answer: "Десна выглядит нормально." }
    ]
  },
  {
    name: "Игорь Савельев",
    diagnosis: "Пульпит",
    intro: "Я уже вторую ночь нормально не сплю из-за зуба.",
    patientImage: "assets/CrocoPatient2.svg",
    mouthImage: "assets/DentThings2.png",
    ctImage: "assets/DentCardNO.svg",
    card: { age: 34, complaint: "Сильная боль ночью", status: "раздражён, уставший" },
    questions: [
      { id: "q1", text: "Боль появляется сама или от раздражителей?", answer: "Может начаться вообще сама." },
      { id: "q2", text: "Реакция на холодное есть?", answer: "Да, очень сильная." },
      { id: "q3", text: "Боль долго сохраняется?", answer: "Да, иногда минут по 10-15." },
      { id: "q4", text: "Есть ли боль при накусывании?", answer: "Не особо." }
    ],
    interactions: [
      { id: "i1", text: "Зондирование", answer: "АА! Очень больно!" },
      { id: "i2", text: "Перкуссия", answer: "Слегка неприятно." },
      { id: "i3", text: "Осмотр", answer: "Обнаружена глубокая кариозная полость." }
    ]
  },
  {
    name: "Максим Котов",
    diagnosis: "Периодонтит",
    intro: "Я не могу нормально кусать на эту сторону.",
    patientImage: "assets/CrocoPatient3.svg",
    mouthImage: "assets/DentThings3.png",
    ctImage: "assets/DentCardNO.svg",
    card: { age: 42, complaint: "Больно жевать", status: "напряжён" },
    questions: [
      { id: "q1", text: "Есть реакция на холодное?", answer: "Почти нет." },
      { id: "q2", text: "Боль постоянная?", answer: "Да, ноющая." },
      { id: "q3", text: "Чувство выросшего зуба есть?", answer: "Да, будто он стал выше." },
      { id: "q4", text: "Была ли раньше боль?", answer: "Да, раньше реагировал на холодное." }
    ],
    interactions: [
      { id: "i1", text: "Перкуссия", answer: "Ай! Очень больно." },
      { id: "i2", text: "Зондирование", answer: "Терпимо." },
      { id: "i3", text: "Осмотр десны", answer: "Небольшой отек." },
      { id: "i4", text: "Осмотр", answer: "Глубокая кариозная полость." }
    ]
  },
  {
    name: "Елена Громова",
    diagnosis: "Гингивит",
    intro: "Когда чищу зубы - идет кровь.",
    patientImage: "assets/CrocoPatient4.svg",
    mouthImage: "assets/DentThings4.png",
    ctImage: "assets/DentCardNO.svg",
    card: { age: 27, complaint: "Кровит десна", status: "спокойна" },
    questions: [
      { id: "q1", text: "Есть боль в зубах?", answer: "Нет." },
      { id: "q2", text: "Есть реакция на холодное?", answer: "Нет." },
      { id: "q3", text: "Давно кровоточивость?", answer: "Где-то месяц." },
      { id: "q4", text: "Неприятный запах замечали?", answer: "Иногда." }
    ],
    interactions: [
      { id: "i1", text: "Осмотр десны", answer: "Десна покрасневшая и отечная." },
      { id: "i2", text: "Зондирование десны", answer: "Появилась кровоточивость." },
      { id: "i3", text: "Перкуссия", answer: "Не больно." }
    ]
  },
  {
    name: "Денис Орлов",
    diagnosis: "Перикоронарит",
    intro: "У меня сзади что-то воспалилось около зуба.",
    patientImage: "assets/CrocoPatient5.svg",
    mouthImage: "assets/DentThings5.png",
    ctImage: "assets/DentCardNO.svg",
    card: { age: 19, complaint: "Больно открывать рот", status: "тревожен" },
    questions: [
      { id: "q1", text: "Какой зуб беспокоит?", answer: "Самый дальний снизу." },
      { id: "q2", text: "Больно глотать?", answer: "Да, немного." },
      { id: "q3", text: "Температура была?", answer: "Вчера была слабость." },
      { id: "q4", text: "Больно жевать?", answer: "Да." }
    ],
    interactions: [
      { id: "i1", text: "Осмотр", answer: "Частично прорезанный зуб мудрости." },
      { id: "i2", text: "Осмотр десны", answer: "Десна над зубом воспалена." },
      { id: "i3", text: "Перкуссия", answer: "Неприятно." },
      { id: "i4", text: "Пальпация", answer: "Ай, больно." }
    ]
  }
];

const day2Patients = [
  {
    name: "Мария Орлова",
    diagnosis: "Пародонтит",
    intro: "У меня зубы как будто начали двигаться.",
    patientImage: "assets/CrocoPatient6.svg",
    mouthImage: "assets/DentThings6.jpg",
    ctImage: "assets/DentCardNO.svg",
    card: { age: 51, complaint: "Шатаются зубы", status: "обеспокоен" },
    questions: [
      { id: "q1", text: "Есть кровоточивость?", answer: "Да, почти постоянно." },
      { id: "q2", text: "Неприятный запах замечали?", answer: "Да." },
      { id: "q3", text: "Есть боль от холодного?", answer: "Нет." },
      { id: "q4", text: "Давно это происходит?", answer: "Уже несколько месяцев." }
    ],
    interactions: [
      { id: "i1", text: "Осмотр десны", answer: "Десна воспалена." },
      { id: "i2", text: "Зондирование десны", answer: "Обнаружены глубокие пародонтальные карманы." },
      { id: "i3", text: "Проверка подвижности", answer: "Зуб имеет подвижность." },
      { id: "i4", text: "Перкуссия", answer: "Слегка неприятно." }
    ]
  },
  {
    name: "Виктория Лебедева",
    diagnosis: "Гиперестезия",
    intro: "Я не могу пить холодную воду.",
    patientImage: "assets/CrocoPatient7.svg",
    mouthImage: "assets/DentThings7.png",
    ctImage: "assets/DentCardNO.svg",
    card: { age: 24, complaint: "Очень чувствительные зубы", status: "спокойна" },
    questions: [
      { id: "q1", text: "Боль быстро проходит?", answer: "Да, почти сразу." },
      { id: "q2", text: "Есть ли кариозные полости?", answer: "Не знаю." },
      { id: "q3", text: "Есть ночная боль?", answer: "Нет." },
      { id: "q4", text: "Больно жевать?", answer: "Нет." }
    ],
    interactions: [
      { id: "i1", text: "Осмотр", answer: "Видимых кариозных полостей нет." },
      { id: "i2", text: "Зондирование", answer: "Резкая болезненность в области шейки зуба." },
      { id: "i3", text: "Перкуссия", answer: "Не больно." },
      { id: "i4", text: "Осмотр десны", answer: "Без особенностей." }
    ]
  },
  {
    name: "Олег Журавлёв",
    diagnosis: "Радикулярная киста",
    intro: "Иногда десна возле зуба надувается.",
    patientImage: "assets/CrocoPatient8.svg",
    mouthImage: "assets/DentThings8.jpg",
    ctImage: "assets/DentCard8.jpg",
    card: { age: 39, complaint: "Иногда появляется припухлость", status: "спокоен" },
    questions: [
      { id: "q1", text: "Боль сильная?", answer: "Нет, скорее давление." },
      { id: "q2", text: "Раньше зуб болел?", answer: "Да, давно." },
      { id: "q3", text: "Есть реакция на холодное?", answer: "Нет." },
      { id: "q4", text: "Больно жевать?", answer: "Иногда." }
    ],
    interactions: [
      { id: "i1", text: "Перкуссия", answer: "Слегка больно." },
      { id: "i2", text: "Осмотр", answer: "Зуб изменён в цвете." },
      { id: "i3", text: "Пальпация десны", answer: "Небольшое выбухание." }
    ]
  },
  {
    name: "Мария Власова",
    diagnosis: "Флюороз",
    intro: "Мне не нравится внешний вид зубов.",
    patientImage: "assets/CrocoPatient9.svg",
    mouthImage: "assets/DentThings9.jpg",
    ctImage: "assets/DentCardNO.svg",
    card: { age: 18, complaint: "Белые пятна на зубах", status: "спокойна" },
    questions: [
      { id: "q1", text: "Есть боль?", answer: "Нет." },
      { id: "q2", text: "Пятна появились давно?", answer: "С детства." },
      { id: "q3", text: "Они симметричны?", answer: "Да, почти одинаковые." },
      { id: "q4", text: "Есть реакция на холодное?", answer: "Иногда немного." }
    ],
    interactions: [
      { id: "i1", text: "Осмотр", answer: "Множественные белые пятна на эмали." },
      { id: "i2", text: "Зондирование", answer: "Поверхность гладкая." },
      { id: "i3", text: "Перкуссия", answer: "Безболезненно." },
      { id: "i4", text: "Осмотр десны", answer: "Без особенностей." }
    ]
  },
  {
    name: "Артём Никифоров",
    diagnosis: "Периодонтит",
    intro: "Когда кусаю - прям неприятно отдаёт в зуб.",
    patientImage: "assets/CrocoPatient10.svg",
    mouthImage: "assets/DentThings10.jpg",
    ctImage: "assets/DentCardNO.svg",
    card: { age: 36, complaint: "Больно жевать на один зуб", status: "уставший" },
    questions: [
      { id: "q1", text: "Есть реакция на холодное?", answer: "Почти нет." },
      { id: "q2", text: "Боль постоянная?", answer: "Ноющая, да." },
      { id: "q3", text: "Раньше зуб болел сильнее?", answer: "Да, несколько месяцев назад очень сильно болел." },
      { id: "q4", text: "Есть ощущение давления?", answer: "Да, как будто зуб мешает." }
    ],
    interactions: [
      { id: "i1", text: "Осмотр", answer: "Обнаружена глубокая кариозная полость." },
      { id: "i2", text: "Перкуссия", answer: "Ай, больно." },
      { id: "i3", text: "Зондирование", answer: "Небольшая болезненность." },
      { id: "i4", text: "Осмотр десны", answer: "Лёгкий локальный отёк." },
      { id: "i5", text: "Пальпация", answer: "Неприятные ощущения." }
    ]
  }
];

const allPatients = [...day1Patients, ...day2Patients];
let patientsByDay = [];

let currentDayIndex = 0;
let currentIndex = 0;
let rating = 50;
let askedQuestionIds = new Set();
let askedInteractionIds = new Set();
let selectedSymptoms = new Set();
let selectedDiagnosis = "";
let pendingAdvance = false;
let finalAction = "restart";

function shuffled(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function initializeGameDays() {
  const randomOrder = shuffled(allPatients);
  patientsByDay = [randomOrder.slice(0, 5), randomOrder.slice(5, 10)];
}

const chat = document.getElementById("chat");
const questionsContainer = document.getElementById("questions");
const patientNumber = document.getElementById("patientNumber");
const dayCounter = document.getElementById("dayCounter");
const totalPatients = document.getElementById("totalPatients");
const ratingEl = document.getElementById("rating");
const ratingFill = document.getElementById("ratingFill");
const patientImage = document.getElementById("patientImage");
const patientCard = document.querySelector(".patient-card");
const menuScreen = document.getElementById("menuScreen");
const startShiftBtn = document.getElementById("startShiftBtn");
const diagnosisBtn = document.getElementById("diagnosisBtn");
const consultBtn = document.getElementById("consultBtn");
const diagnosisPopup = document.getElementById("diagnosisPopup");
const closePopup = document.getElementById("closePopup");
const symptomsList = document.getElementById("symptomsList");
const diagnosisList = document.getElementById("diagnosisList");
const confirmDiagnosisBtn = document.getElementById("confirmDiagnosisBtn");
const resetSymptomsBtn = document.getElementById("resetSymptomsBtn");
const imagePopup = document.getElementById("imagePopup");
const closeImagePopup = document.getElementById("closeImagePopup");
const popupImage = document.getElementById("popupImage");
const popupText = document.getElementById("popupText");
const imagePopupTitle = document.getElementById("imagePopupTitle");
const resultPopup = document.getElementById("resultPopup");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");
const continueBtn = document.getElementById("continueBtn");
const finalPopup = document.getElementById("finalPopup");
const finalTitle = document.getElementById("finalTitle");
const finalMessage = document.getElementById("finalMessage");
const restartBtn = document.getElementById("restartBtn");
const openCtBtn = document.getElementById("openCt");
const openMouthBtn = document.getElementById("openMouth");
const interactionsContainer = document.getElementById("interactions");
const ctPreview = document.getElementById("ctPreview");
const mouthPreview = document.getElementById("mouthPreview");

function currentDayPatients() {
  return patientsByDay[currentDayIndex];
}

function currentPatient() {
  return currentDayPatients()[currentIndex];
}

function updateTopBar() {
  const patientsInDay = currentDayPatients();
  const patientNumberValue = Math.min(currentIndex + 1, patientsInDay.length);
  patientNumber.textContent = patientNumberValue;
  dayCounter.textContent = currentDayIndex + 1;
  totalPatients.textContent = patientsInDay.length;
  ratingEl.textContent = rating;
  ratingFill.style.width = `${rating}%`;
  if (rating < 50) ratingFill.style.background = "#ef4b4b";
  else if (rating > 50) ratingFill.style.background = "#57c95f";
  else ratingFill.style.background = "#f2c744";
}

function addMessage(text, type = "patient") {
  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = text;
  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;
}

function clearQuestions() {
  questionsContainer.innerHTML = "";
  interactionsContainer.innerHTML = "";
}

function resetDiagnosisState() {
  askedQuestionIds = new Set();
  askedInteractionIds = new Set();
  selectedSymptoms = new Set();
  selectedDiagnosis = "";
}

function openPopup(el) {
  el.classList.remove("hidden");
}

function closePopupFn(el) {
  el.classList.add("hidden");
}

function renderPatient() {
  const patient = currentPatient();
  if (!patient) return;

  patientImage.src = patient.patientImage;
  openCtBtn.dataset.image = patient.ctImage || "";
  openMouthBtn.dataset.image = patient.mouthImage || "";
  ctPreview.style.backgroundImage = "url('assets/DentCard.svg')";
  mouthPreview.style.backgroundImage = "url('assets/DentThings.svg')";

  chat.innerHTML = "";
  clearQuestions();
  resetDiagnosisState();
  updateTopBar();
  addMessage(patient.intro, "patient");

  patient.questions.forEach((questionData) => {
    const btn = document.createElement("button");
    btn.className = "question-button";
    btn.textContent = questionData.text;
    btn.addEventListener("click", () => {
      if (askedQuestionIds.has(questionData.id)) return;
      askedQuestionIds.add(questionData.id);
      btn.disabled = true;
      addMessage(questionData.text, "doctor");
      addMessage(questionData.answer, "patient");
    });
    questionsContainer.appendChild(btn);
  });

  patient.interactions.forEach((interaction) => {
    const btn = document.createElement("button");
    btn.className = "question-button";
    btn.textContent = interaction.text;
    btn.addEventListener("click", () => {
      if (askedInteractionIds.has(interaction.id)) return;
      askedInteractionIds.add(interaction.id);
      btn.disabled = true;
      addMessage(interaction.text, "doctor");
      addMessage(interaction.answer, "patient");
    });
    interactionsContainer.appendChild(btn);
  });
}

function openImage(type) {
  const patient = currentPatient();
  if (!patient) return;

  if (type === "mouth") {
    imagePopupTitle.textContent = "Осмотр ротовой полости";
    popupImage.src = openMouthBtn?.dataset?.image || patient.mouthImage || "";
    popupImage.alt = "Осмотр ротовой полости";
    popupText.textContent = "";
    popupText.classList.add("hidden");
  }

  if (type === "ct") {
    imagePopupTitle.textContent = "Медицинская карта";
    popupImage.src = openCtBtn?.dataset?.image || patient.ctImage || "";
    popupImage.alt = "Медицинская карта";
    popupText.textContent = `Имя: ${patient.name}
Возраст: ${patient.card.age}
Жалоба: ${patient.card.complaint}
Общий статус: ${patient.card.status}`;
    popupText.classList.remove("hidden");
  }

  if (!popupImage.src || popupImage.src.endsWith("/")) {
    popupImage.removeAttribute("src");
    popupImage.style.display = "none";
    if (!document.getElementById("imagePlaceholder")) {
      const placeholder = document.createElement("div");
      placeholder.id = "imagePlaceholder";
      placeholder.style.padding = "20px";
      placeholder.style.border = "1px dashed #999";
      placeholder.style.background = "#f4f4f4";
      placeholder.textContent = "Изображение отсутствует";
      imagePopup.querySelector(".popup__body--image").prepend(placeholder);
    }
  } else {
    popupImage.style.display = "block";
    const placeholder = document.getElementById("imagePlaceholder");
    if (placeholder) placeholder.remove();
  }

  openPopup(imagePopup);
}

function renderSymptomsList() {
  symptomsList.innerHTML = "";
  allSymptoms.forEach((symptom) => {
    const row = document.createElement("label");
    row.className = "symptom-item";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = selectedSymptoms.has(symptom);
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) selectedSymptoms.add(symptom);
      else selectedSymptoms.delete(symptom);
      selectedDiagnosis = "";
      renderDiagnosisList();
    });
    const text = document.createElement("span");
    text.textContent = symptom;
    row.appendChild(checkbox);
    row.appendChild(text);
    symptomsList.appendChild(row);
  });
}

function renderDiagnosisList() {
  diagnosisList.innerHTML = "";
  const scored = diseases
    .map((diseaseName) => ({
      name: diseaseName,
      score: scoreDisease(diseaseName, selectedSymptoms),
      isContradicted: isDiseaseContradictedBySelectedSymptoms(diseaseName, selectedSymptoms)
    }))
    .sort((a, b) => b.score - a.score);

  const highlightDiagnosis = selectedDiagnosis || scored[0]?.name || "";
  scored.forEach((item) => {
    const diagnosisItem = document.createElement("button");
    diagnosisItem.className = "diagnosis-item";
    diagnosisItem.textContent = item.name;
    if (item.name === highlightDiagnosis) diagnosisItem.classList.add("is-best");
    if (item.isContradicted) diagnosisItem.classList.add("is-impossible");
    diagnosisItem.addEventListener("click", () => {
      selectedDiagnosis = item.name;
      renderDiagnosisList();
    });
    diagnosisList.appendChild(diagnosisItem);
  });
}

function openDiagnosisPopup() {
  renderSymptomsList();
  renderDiagnosisList();
  openPopup(diagnosisPopup);
}

function showResultPopup(isCorrect, chosen, correct) {
  resultTitle.textContent = isCorrect ? "Верный диагноз" : "Неверный диагноз";
  resultMessage.textContent = isCorrect
    ? `Вы выбрали: ${chosen}. Это правильный диагноз.`
    : `Вы выбрали: ${chosen}. Правильный диагноз: ${correct}.`;
  openPopup(resultPopup);
}

function showDayTransitionPopup() {
  finalAction = "next-day";
  finalTitle.textContent = "Смена завершена";
  finalMessage.textContent = "День 1 завершён. Нажмите, чтобы начать новый день.";
  restartBtn.textContent = "Начать новый день";
  openPopup(finalPopup);
}

function showFinalPopup(isSuccess) {
  finalAction = "restart";
  finalTitle.textContent = isSuccess ? "Поздравляем!" : "Вы уволены";
  finalMessage.textContent = isSuccess
    ? "Вы прошли все дни и успешно завершили игру."
    : "Рейтинг упал до 0%. Смена завершена.";
  restartBtn.textContent = "Начать заново";
  openPopup(finalPopup);
}

function animatePatientChange() {
  return new Promise((resolve) => {
    patientCard.classList.add("patient-swipe-out");
    setTimeout(() => {
      patientCard.classList.remove("patient-swipe-out");
      patientCard.classList.add("patient-swipe-in");
      setTimeout(() => {
        patientCard.classList.remove("patient-swipe-in");
        resolve();
      }, 360);
    }, 320);
  });
}

function confirmDiagnosis() {
  const patient = currentPatient();
  if (!patient) return;
  const chosen = selectedDiagnosis || diseases[0];
  let isCorrect = false;
  if (chosen === patient.diagnosis) {
    rating += 5;
    isCorrect = true;
    addMessage(`Правильный диагноз: ${chosen}`, "system");
  } else {
    rating -= 10;
    addMessage(`Неверно. Правильный диагноз: ${patient.diagnosis}`, "system");
  }
  rating = Math.max(0, Math.min(100, rating));
  closePopupFn(diagnosisPopup);
  updateTopBar();
  pendingAdvance = true;
  showResultPopup(isCorrect, chosen, patient.diagnosis);
}

function consult() {
  const patient = currentPatient();
  if (!patient) return;
  rating -= 10;
  rating = Math.max(0, Math.min(100, rating));
  addMessage(`Консультация: правильный диагноз — ${patient.diagnosis}`, "system");
  closePopupFn(diagnosisPopup);
  updateTopBar();
  pendingAdvance = true;
  showResultPopup(false, "Консультация (сдаться)", patient.diagnosis);
}

async function advancePatientFlow() {
  currentIndex += 1;
  if (currentIndex >= currentDayPatients().length) {
    if (currentDayIndex < patientsByDay.length - 1) {
      showDayTransitionPopup();
      return;
    }
    showFinalPopup(true);
    return;
  }
  await animatePatientChange();
  renderPatient();
}

function startNextDay() {
  currentDayIndex += 1;
  currentIndex = 0;
  closePopupFn(finalPopup);
  renderPatient();
}

function restartGame() {
  initializeGameDays();
  currentDayIndex = 0;
  currentIndex = 0;
  rating = 50;
  askedQuestionIds = new Set();
  askedInteractionIds = new Set();
  selectedSymptoms = new Set();
  selectedDiagnosis = "";
  pendingAdvance = false;
  closePopupFn(finalPopup);
  renderPatient();
}

diagnosisBtn.addEventListener("click", openDiagnosisPopup);
consultBtn.addEventListener("click", consult);
closePopup.addEventListener("click", () => closePopupFn(diagnosisPopup));
confirmDiagnosisBtn.addEventListener("click", confirmDiagnosis);
resetSymptomsBtn.addEventListener("click", () => {
  selectedSymptoms = new Set();
  selectedDiagnosis = "";
  renderSymptomsList();
  renderDiagnosisList();
});
openMouthBtn.addEventListener("click", () => openImage("mouth"));
openCtBtn.addEventListener("click", () => openImage("ct"));
closeImagePopup.addEventListener("click", () => closePopupFn(imagePopup));
continueBtn.addEventListener("click", async () => {
  closePopupFn(resultPopup);
  if (!pendingAdvance) return;
  pendingAdvance = false;
  if (rating <= 0) {
    showFinalPopup(false);
    return;
  }
  if (rating >= 100) {
    showFinalPopup(true);
    return;
  }
  await advancePatientFlow();
});
restartBtn.addEventListener("click", () => {
  if (finalAction === "next-day") startNextDay();
  else restartGame();
});
startShiftBtn.addEventListener("click", () => {
  menuScreen.classList.add("hidden");
});

[diagnosisPopup, imagePopup].forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) closePopupFn(popup);
  });
});

initializeGameDays();
updateTopBar();
renderPatient();
