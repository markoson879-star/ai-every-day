const weeks = [
  {title:"Неделя 1. AI для повседневной жизни",days:[
    "Составь персональный план на неделю с помощью AI",
    "Попроси AI подобрать меню и список покупок на 3 дня",
    "Преврати длинный текст или статью в краткое резюме",
    "Попроси объяснить сложную тему простыми словами",
    "Составь маршрут однодневной поездки с AI",
    "Подготовь вежливое письмо или важное сообщение",
    "Создай персональный список целей и привычек"
  ]},
  {title:"Неделя 2. AI для работы и продуктивности",days:[
    "Составь резюме или улучши описание своего опыта",
    "Подготовься к собеседованию: попроси AI задать вопросы",
    "Преврати заметки в понятный план действий",
    "Создай таблицу для учёта расходов или задач",
    "Попроси AI найти ошибки и улучшить деловой текст",
    "Сделай презентацию по заданной теме",
    "Создай шаблон повторяющегося рабочего процесса"
  ]},
  {title:"Неделя 3. AI для творчества и контента",days:[
    "Придумай 10 идей для собственного проекта",
    "Создай изображение по подробному текстовому описанию",
    "Напиши сценарий короткого видео",
    "Подготовь контент-план публикаций на неделю",
    "Придумай название, слоган и описание бренда",
    "Сделай викторину или обучающую игру",
    "Создай простую веб-страницу с помощью AI"
  ]},
  {title:"Неделя 4. AI для развития и новых возможностей",days:[
    "Составь план изучения нового навыка на 30 дней",
    "Потренируй иностранный язык в диалоге с AI",
    "Попроси AI проанализировать идею небольшого бизнеса",
    "Найди способы автоматизировать одну рутинную задачу",
    "Сравни три инструмента AI для одной конкретной задачи",
    "Создай личную библиотеку из 10 полезных промптов",
    "Подведи итоги: выбери 5 AI-приёмов для регулярного использования"
  ]}
];

const STORAGE_KEY = "ai-every-day-progress-v1";
let completed = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
const weeksRoot = document.querySelector("#weeks");

function render() {
  weeksRoot.innerHTML = "";
  let dayNumber = 1;
  weeks.forEach(week => {
    const card = document.createElement("article");
    card.className = "week";
    const firstDay = dayNumber;
    const weekDays = week.days.map(task => {
      const currentDay = dayNumber++;
      const checked = completed.has(currentDay);
      return `<label class="task ${checked ? "done" : ""}">
        <input type="checkbox" data-day="${currentDay}" ${checked ? "checked" : ""}>
        <span class="task-text"><small>ДЕНЬ ${String(currentDay).padStart(2,"0")}</small>${task}</span>
      </label>`;
    }).join("");
    const count = week.days.filter((_, i) => completed.has(firstDay + i)).length;
    card.innerHTML = `<div class="week-head"><h3>${week.title}</h3><span>${count}/${week.days.length}</span></div>
      <div class="week-progress"><div style="width:${count/week.days.length*100}%"></div></div>${weekDays}`;
    weeksRoot.appendChild(card);
  });
  weeksRoot.querySelectorAll("input[data-day]").forEach(input => {
    input.addEventListener("change", () => {
      const day = Number(input.dataset.day);
      input.checked ? completed.add(day) : completed.delete(day);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
      render();
    });
  });
  updateProgress();
}
function updateProgress() {
  const count = completed.size;
  document.querySelector("#progress-count").textContent = `${count} / 30`;
  document.querySelector("#progress-fill").style.width = `${count/30*100}%`;
  document.querySelector("#progress-caption").textContent =
    count === 30 ? "Отличная работа! Теперь используй лучшие AI-приёмы регулярно." :
    count === 0 ? "Начни с первого задания — шаг за шагом." :
    `Выполнено ${count} из 30 заданий. Продолжай в своём темпе!`;
}
document.querySelector("#reset-button").addEventListener("click", () => {
  if (confirm("Сбросить все отметки? Это действие нельзя отменить.")) {
    completed.clear();
    localStorage.removeItem(STORAGE_KEY);
    render();
  }
});
render();
