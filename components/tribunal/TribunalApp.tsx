"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  BadgeAlert,
  Bird,
  ChartNoAxesCombined,
  Clock3,
  Cpu,
  Fan,
  Gauge,
  Gavel,
  ListRestart,
  MessageSquareQuote,
  MonitorCog,
  Orbit,
  PlaySquare,
  RotateCcw,
  Scale,
  ScrollText,
  SlidersHorizontal,
  Stamp,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState, type CSSProperties } from "react";
import { useLightweightMode } from "@/components/TypographySettings";

type WitnessId = "windows" | "nobara" | "grub" | "rx580" | "ryzen" | "lact" | "mangohud" | "expert";
type EvidenceId = "launch" | "graph" | "profile" | "comment" | "night" | "proton";
type VerdictId = "windows" | "nobara" | "hardware" | "experts" | "owner" | "secret";

type Witness = {
  id: WitnessId;
  name: string;
  role: string;
  icon: LucideIcon;
  tone: string;
  statements: string[];
  objection: {
    question: string;
    answer: string;
    ruling: string;
  };
};

type Evidence = {
  id: EvidenceId;
  title: string;
  label: string;
  icon: LucideIcon;
  summary: string;
  finding: string;
  footnote: string;
};

type Verdict = {
  id: VerdictId;
  label: string;
  title: string;
  rank: string;
  body: string;
  sentence: string;
};

const witnesses: Witness[] = [
  {
    id: "windows",
    name: "Windows 11",
    role: "соседка по NVMe",
    icon: MonitorCog,
    tone: "#9bc7ff",
    statements: [
      "Я вообще сидела на своем разделе и никого не трогала. У меня алиби, обои и лицензионное соглашение на сорок восемь страниц.",
      "Да, иногда я говорю, что выключилась, а сама продолжаю держать диск. Это не обман, это быстрый запуск и сложные отношения.",
      "Обновления устанавливаются тогда, когда считают нужным. Демократия хороша, пока пользователь не нажал «Отложить» двенадцать раз.",
      "Он сам оставил меня рядом с Nobara. Теперь каждое утро выбирает систему и делает вид, будто GRUB проводит психологический тест.",
    ],
    objection: {
      question: "А Fast Startup, мадам? Почему раздел иногда выглядит занятым?",
      answer: "Я воспользуюсь пятьдесят первой поправкой и правом срочно установить обновления.",
      ruling: "Пятьдесят первой поправки здесь нет. Но подозрительное шуршание диска суд зафиксировал.",
    },
  },
  {
    id: "nobara",
    name: "Nobara 43",
    role: "новая хозяйка вечера",
    icon: Orbit,
    tone: "#cdb7ff",
    statements: [
      "Я дала ему Welcome, штатный обновлятор, игровые пакеты и нормальную Mesa. Он все равно открыл инструкцию для Ubuntu 18.04.",
      "Я прямо написала: обновляй через nobara-sync. Он спросил, нельзя ли просто добавить еще четыре репозитория. Я считаю это угрозой.",
      "В системе уже есть zram, falcond и правила планировщиков. Но человеку обязательно нужен скрипт optimize_everything_FINAL.sh с аватаркой волка.",
      "Я не обещала плюс двести FPS. Я обещала удобный игровой Linux. Разницу прошу занести в протокол крупными буквами.",
    ],
    objection: {
      question: "Почему после переезда человеку пришлось выучить столько новых слов?",
      answer: "Потому что он двадцать лет нажимал «Далее», не задавая Windows встречных вопросов.",
      ruling: "Ответ дерзкий, но технически жизнеспособный. Возражение отклонено.",
    },
  },
  {
    id: "grub",
    name: "GRUB",
    role: "уставший швейцар",
    icon: ListRestart,
    tone: "#f2cd78",
    statements: [
      "Каждое утро я вежливо спрашиваю: Nobara или Windows? Он смотрит на меня так, будто решает судьбу человечества.",
      "Один раз он нажал «e» просто посмотреть. С тех пор я выхожу на смену в бронежилете.",
      "У меня две понятные записи. Две. Но курсор все равно начинает путешествие, как будто выбирает концовку в RPG.",
      "Я загрузчик, а не семейный психолог. Разбираться, какая система сегодня любимая, в мои обязанности не входит.",
    ],
    objection: {
      question: "Вы признаете, что выглядите страшно для человека после Windows?",
      answer: "Черный фон и текст еще не преступление. Терминал подтвердит.",
      ruling: "Суд согласен. Страшным признано только желание удалить случайную строку загрузки.",
    },
  },
  {
    id: "rx580",
    name: "Radeon RX 580",
    role: "ветеран горячего цеха",
    icon: Fan,
    tone: "#ff9db8",
    statements: [
      "Я честно рисую кадры и бесплатно отапливаю комнату. Этот деятель выкрутил графику на ультра и спрашивает, почему загрузка 100%.",
      "Я выдала 74 FPS на мониторе 75 Гц. Он назвал это «неиграбельно». Прошу проверить его на наличие охуевания.",
      "Одновременно работали игра, OBS, браузер и ролик «КАК УВЕЛИЧИТЬ FPS». Виноватой почему-то назначили меня.",
      "После андервольта стало холоднее и тише. Через пять минут он спросил, а нельзя ли теперь разогнать обратно. Логика покинула помещение.",
    ],
    objection: {
      question: "Почему в тяжелой игре вы все-таки держитесь около 100%?",
      answer: "Потому что я видеокарта, мать вашу. Когда я работаю, моя работа работает.",
      ruling: "Свидетель отвечает эмоционально, зато точнее половины форумов. Возражение снято.",
    },
  },
  {
    id: "ryzen",
    name: "Ryzen 5 2600",
    role: "шесть ядер терпения",
    icon: Cpu,
    tone: "#ffb277",
    statements: [
      "Шесть ядер, двенадцать потоков. Но виноват почему-то я, а не сорок семь вкладок браузера и лаунчер каждого издателя.",
      "Мне отключили защиты от уязвимостей ради двух кадров. Два кадра не пришли. Защиты тоже не пришли. Великолепный план.",
      "В игре упор был в RX 580, но три часа обсуждали мой TDP. Меня даже не спросили, хочу ли я участвовать в этом цирке.",
      "Я процессор 2018 года, а не джинн. Потереть крышку и загадать 144 FPS недостаточно.",
    ],
    objection: {
      question: "Не пытаетесь ли вы прикрыть возраст красивыми словами про баланс системы?",
      answer: "Пытаюсь. Но монитор все равно 75 Гц, так что давайте стареть достойно.",
      ruling: "Честность смягчает обстоятельства. Процессор остается на свободе под наблюдением датчиков.",
    },
  },
  {
    id: "lact",
    name: "LACT",
    role: "механик, которого боялись открыть",
    icon: Gauge,
    tone: "#9aebbe",
    statements: [
      "Он меня еще не открывал, но уже обсуждал напряжение, частоты и мировой рекорд RX 580. Подготовка была чисто теоретической.",
      "Потом открыл, увидел графики температуры и закрыл. В принципе, это было самое безопасное решение за вечер.",
      "Профиль назвали safe_final_REAL. У профиля нет описания, исходных значений и чувства собственного достоинства.",
      "Я умею применять настройки видеокарты. Читать мысли владельца и угадывать исправный вольтаж в комплект не входит.",
    ],
    objection: {
      question: "Почему у вас столько ползунков, если их нельзя бездумно двигать?",
      answer: "У автомобиля тоже есть руль. Это не приглашение ехать в стену ради проверки подвески.",
      ruling: "Сравнение принято. Стена просила передать, что участвовать в A/B-тесте не будет.",
    },
  },
  {
    id: "mangohud",
    name: "MangoHUD",
    role: "цифры без психотерапии",
    icon: ChartNoAxesCombined,
    tone: "#b9e36f",
    statements: [
      "Я показываю цифры. Я не обещал, что пользователь умеет их читать и не выберет самый красивый прогон.",
      "Первый тест дал 73 FPS, второй 76, третий 74. Он выбрал 76 и написал «твик работает». Статистика тихо заплакала.",
      "Во время A-теста шел стрим, а во время B-теста нет. Зато маршрут был почти одинаковый: один раз налево, другой раз через всю карту.",
      "На графике был один пик при автосохранении. Его увеличили, обвели красным и объявили системной проблемой года.",
    ],
    objection: {
      question: "Почему ваши графики не говорят прямо, какой твик хороший?",
      answer: "Потому что график является данными, а не гадалкой с рынка. Думать придется отдельно.",
      ruling: "Сурово. Законно. Суд приобщает медиану к делу, а лучший единичный прогон отправляет гулять.",
    },
  },
  {
    id: "expert",
    name: "Эксперт из интернета",
    role: "аватарка волка, стаж три дня",
    icon: Wifi,
    tone: "#ef8fff",
    statements: [
      "Брат, просто вставь мои сорок две команды. Что они делают, расскажу во второй части после рекламы казино.",
      "Откат не нужен. У меня все летает. Правда, дистрибутив другой, видеокарта NVIDIA и комментарии я отключил.",
      "Обязательно поставь еще один оптимизатор поверх falcond. Чем больше демонов спорят за профиль питания, тем киберспортивнее система.",
      "Источник? Я видел похожую команду в 2021 году. Или это был рецепт маринада. Короче, должно помочь.",
    ],
    objection: {
      question: "Назовите версию системы, ожидаемый результат и точный откат.",
      answer: "Не душни, брат. Лайк, подписка, колокольчик. Следующий вопрос.",
      ruling: "Свидетель лишен статуса эксперта и приговорен читать собственные команды перед публикацией.",
    },
  },
];

const evidence: Evidence[] = [
  {
    id: "launch",
    title: "Параметры запуска",
    label: "улика A-17",
    icon: ScrollText,
    summary: "Одна строка, 28 флагов и ни одного объяснения.",
    finding: "Первые семь параметров противоречат следующим девяти. Еще четыре относятся к NVIDIA, которой в этом ПК никогда не было. Последний параметр просто написан с ошибкой, но держится уверенно.",
    footnote: "Экспертиза не смогла установить, где заканчивается команда и начинается крик о помощи.",
  },
  {
    id: "graph",
    title: "График на четыре секунды",
    label: "улика FPS-75",
    icon: ChartNoAxesCombined,
    summary: "81 FPS зафиксирован в главном меню и уже назван прорывом.",
    finding: "Неудачные две минуты аккуратно обрезаны. Удачные четыре секунды увеличены, покрашены в зеленый и отправлены друзьям с подписью «Я же говорил».",
    footnote: "Суд заметил попытку статистического мошенничества. Автосохранение требует отдельного адвоката.",
  },
  {
    id: "profile",
    title: "Папка профилей LACT",
    label: "улика FINAL",
    icon: SlidersHorizontal,
    summary: "safe, safe2, final, final_real и еще один совсем последний.",
    finding: "Найдены профили safe, safe2, final, final_real, final_real_last и final_real_last_USE_THIS. Какой из них содержит исходные значения, не знает даже человек, который их создавал.",
    footnote: "Файл default оказался самым новым. Следствие окончательно зашло в тупик.",
  },
  {
    id: "comment",
    title: "Совет с тремя лайками",
    label: "улика WWW",
    icon: MessageSquareQuote,
    summary: "Автор xX_KernelDestroyer_Xx гарантирует плюс 400%.",
    finding: "Один лайк поставил автор. Второй его запасной аккаунт. Третий пользователь, предположительно, пытался нажать «Ответить» и промахнулся.",
    footnote: "Канал уже переименован в криптовалютный и продает курс по разгону холодильников.",
  },
  {
    id: "night",
    title: "Терминал в 02:47",
    label: "улика TIME",
    icon: Clock3,
    summary: "Именно в это время любое «быстро проверю» становится уголовным делом.",
    finding: "История показывает три минуты диагностики, сорок минут чтения форума и два часа исправления того, что до форума работало нормально.",
    footnote: "Последняя осмысленная команда выполнена до полуночи. Дальше действовала темная магия и кофе.",
  },
  {
    id: "proton",
    title: "Восемь версий Proton",
    label: "улика GE-8",
    icon: PlaySquare,
    summary: "Каждую запускали один раз, ни одной не дали закончить префикс.",
    finding: "Версии менялись быстрее, чем игра создавала кэш. После шестой попытки был изменен еще и драйвер, поэтому установить виновника теперь может только гадалка.",
    footnote: "Proton Experimental просит пять минут покоя и право на один законченный запуск.",
  },
];

const verdicts: Verdict[] = [
  {
    id: "windows",
    label: "Виновата Windows",
    title: "Частично виновна, как обычно",
    rank: "СЛЕДОВАТЕЛЬ ПО БЫСТРОМУ ЗАПУСКУ",
    body: "Windows 11 признана виновной в Fast Startup, внезапных обновлениях и слишком уверенном поведении. Однако двадцать восемь параметров запуска игры добавляла не она. Камера это видела.",
    sentence: "Windows остается на своем разделе и обязуется не притворяться полностью выключенной. Владельцу запрещено сваливать на нее вообще все до конца недели.",
  },
  {
    id: "nobara",
    label: "Виновата Nobara",
    title: "Оправдана за отсутствием логов",
    rank: "СВИДЕТЕЛЬ, КОТОРЫЙ НЕ ДОЧИТАЛ ВЫВОД",
    body: "Обвинение не смогло доказать, что Nobara сама открыла старую инструкцию, подключила случайный репозиторий и запустила команду из комментария. Подсудимая выглядит самодовольно, но это пока не статья.",
    sentence: "Владельцу назначается чтение последних десяти строк терминала без перескакивания сразу к красному слову ERROR.",
  },
  {
    id: "hardware",
    label: "Виновато железо",
    title: "Железо подало встречный иск",
    rank: "УКРОТИТЕЛЬ 75 ГЕРЦ",
    body: "RX 580 напомнила про свой возраст, Ryzen показал все двенадцать потоков, а монитор еще раз сообщил, что работает на 75 Гц. Требование получить 144 FPS на ультра признано художественным произведением.",
    sentence: "Железу выдается один вечер без benchmark. Владельцу разрешается играть и запрещается смотреть счетчик FPS каждые восемь секунд.",
  },
  {
    id: "experts",
    label: "Виноваты эксперты",
    title: "Интернет признан местом происшествия",
    rank: "САНИТАР КОММЕНТАРИЕВ",
    body: "Эксперты с аватарками волков признаны виновными в распространении скриптов без версий, причин и отката. После требования показать источник девяносто семь процентов обвиняемых растворились.",
    sentence: "Каждый эксперт обязан назвать симптом, ожидаемый результат и способ вернуть все назад. Приговор оказался настолько жестоким, что раздел комментариев опустел.",
  },
  {
    id: "owner",
    label: "Виноват я",
    title: "Самосознание обнаружено",
    rank: "ОПАСНЫЙ С SUDO, НО ОБУЧАЕМЫЙ",
    body: "Суд потрясен добровольным признанием. Подсудимый действительно менял две вещи одновременно, выбирал лучший прогон и называл экспериментом вечернюю импровизацию. Чистосердечное засчитано.",
    sentence: "Назначается два часа игры без настроек. Терминал закрыть. MangoHUD оставить только ради температуры и перестать смотреть на него, как на кардиограмму пациента.",
  },
  {
    id: "secret",
    label: "Виновато желание чинить",
    title: "Вот теперь дело раскрыто",
    rank: "БОСС ПО РАБОТАЮЩИМ СИСТЕМАМ",
    body: "Виновным признано блядское желание чинить то, что уже работает. Windows загружается, Nobara играет, RX 580 рисует кадры, но спокойный вечер почему-то показался недостаточно захватывающим.",
    sentence: "Все участники освобождены. Владельцу выдается игра, чай и запрет произносить «я только один параметр проверю» после полуночи.",
  },
];

const gavelMessages = [
  "Молоток исправен. Стол теперь немного менее исправен.",
  "Судья просит прекратить. Это не тест клавиатуры.",
  "Секретарь записал: «подсудимый любит нажимать без причины».",
  "Еще удар, и заседание перейдет в режим аварийного GRUB.",
  "Скрытая статья обнаружена. Похоже, молоток все-таки был кнопкой.",
  "Хватит, блядь. Тайный приговор уже открыт.",
];

const repeatObjections = [
  "Возражение повторно отклонено. Громкость не является новым юридическим аргументом.",
  "Суд уже слышал это возражение. Свидетель тоже. Соседи, скорее всего, тоже.",
  "Секретарь заменил кнопку на мысленную. Физическая почему-то продолжает работать.",
  "Возражение принято против самого возражения. Заседание ненадолго стало рекурсивным.",
  "Ты не можешь перебивать каждого только потому, что у тебя есть большая кнопка. Хотя технически уже можешь.",
];

function addToSet<T>(source: Set<T>, value: T) {
  const next = new Set(source);
  next.add(value);
  return next;
}

export function TribunalApp() {
  const reduceMotion = useReducedMotion();
  const lightweightMode = useLightweightMode();
  const simpleMotion = Boolean(reduceMotion || lightweightMode);
  const [started, setStarted] = useState(false);
  const [activeWitness, setActiveWitness] = useState<WitnessId>("rx580");
  const [witnessTurns, setWitnessTurns] = useState<Record<WitnessId, number>>({
    windows: 0,
    nobara: 0,
    grub: 0,
    rx580: 0,
    ryzen: 0,
    lact: 0,
    mangohud: 0,
    expert: 0,
  });
  const [heardWitnesses, setHeardWitnesses] = useState<Set<WitnessId>>(new Set(["rx580"]));
  const [objectedWitnesses, setObjectedWitnesses] = useState<Set<WitnessId>>(new Set());
  const [objectionText, setObjectionText] = useState("Суд разрешает перебивать свидетелей, но последствия юридически сомнительны.");
  const [objectionCount, setObjectionCount] = useState(0);
  const [activeEvidence, setActiveEvidence] = useState<EvidenceId | null>(null);
  const [seenEvidence, setSeenEvidence] = useState<Set<EvidenceId>>(new Set());
  const [gavelHits, setGavelHits] = useState(0);
  const [gavelText, setGavelText] = useState("Молоток является судебным инструментом. Наверное.");
  const [selectedVerdict, setSelectedVerdict] = useState<VerdictId | null>(null);
  const [courtLog, setCourtLog] = useState<string[]>([
    "Судья Tux открыл дело и сразу пожалел об этом.",
    "RX 580 вызвана первой, потому что громче всех крутила вентиляторы.",
  ]);

  const witness = witnesses.find((item) => item.id === activeWitness) ?? witnesses[0];
  const WitnessIcon = witness.icon;
  const witnessLine = witness.statements[witnessTurns[activeWitness] % witness.statements.length];
  const evidenceItem = evidence.find((item) => item.id === activeEvidence) ?? null;
  const verdict = verdicts.find((item) => item.id === selectedVerdict) ?? null;
  const secretUnlocked = gavelHits >= 5;
  const verdictReady = heardWitnesses.size >= 4 && seenEvidence.size >= 2;

  const courtroomStatus = useMemo(() => {
    if (verdictReady) return "Материалов достаточно. Приговор можно испортить лично.";
    if (heardWitnesses.size < 2) return "Судья требует услышать не только видеокарту.";
    if (seenEvidence.size === 0) return "Показания есть. Теперь найди хоть одну улику, Шерлок.";
    return "Картина пиздеца складывается, но суд хочет еще немного фактов.";
  }, [heardWitnesses.size, seenEvidence.size, verdictReady]);

  const pushLog = (text: string) => {
    setCourtLog((current) => [text, ...current].slice(0, 7));
  };

  const hearWitness = (id: WitnessId) => {
    const nextWitness = witnesses.find((item) => item.id === id) ?? witnesses[0];
    setActiveWitness(id);
    setHeardWitnesses((current) => addToSet(current, id));
    setWitnessTurns((current) => ({ ...current, [id]: current[id] + (activeWitness === id ? 1 : 0) }));
    setObjectionText(`Сейчас говорит ${nextWitness.name}. Если начнет юлить, большая кнопка рядом.`);
    pushLog(`${nextWitness.name} дает показания. Секретарь проверяет, не врет ли хотя бы интонация.`);
  };

  const objectToWitness = () => {
    const firstObjection = !objectedWitnesses.has(activeWitness);
    const nextCount = objectionCount + 1;
    setObjectionCount(nextCount);
    if (firstObjection) {
      setObjectedWitnesses((current) => addToSet(current, activeWitness));
      setObjectionText(`Ты: «${witness.objection.question}»\n\n${witness.name}: «${witness.objection.answer}»\n\nСудья Tux: ${witness.objection.ruling}`);
      pushLog(`Возражение против ${witness.name} внесено в протокол и слегка помято.`);
      return;
    }
    const response = repeatObjections[(nextCount - 1) % repeatObjections.length];
    setObjectionText(`Судья Tux: ${response}`);
    pushLog("Кнопка «Возражаю» снова пережила насилие. Производитель гордится.");
  };

  const inspectEvidence = (id: EvidenceId) => {
    const item = evidence.find((entry) => entry.id === id) ?? evidence[0];
    setActiveEvidence(id);
    setSeenEvidence((current) => addToSet(current, id));
    pushLog(`${item.title} приобщена к делу. Пахнет кофе, пылью и плохим решением.`);
  };

  const hitGavel = () => {
    const next = gavelHits + 1;
    setGavelHits(next);
    setGavelText(gavelMessages[Math.min(next - 1, gavelMessages.length - 1)]);
    if (next === 5) pushLog("Молоток открыл секретный приговор. Суд делает вид, что так и было задумано.");
    else pushLog(`Удар молотком №${next}. Юридическая ценность по-прежнему не обнаружена.`);
  };

  const chooseVerdict = (id: VerdictId) => {
    setSelectedVerdict(id);
    const result = verdicts.find((item) => item.id === id);
    if (result) pushLog(`Приговор вынесен: ${result.title}. Апелляция принимает чай и печенье.`);
    window.requestAnimationFrame(() => document.getElementById("tribunal-result")?.scrollIntoView({ behavior: simpleMotion ? "auto" : "smooth", block: "start" }));
  };

  const resetCourt = () => {
    setActiveWitness("rx580");
    setWitnessTurns({ windows: 0, nobara: 0, grub: 0, rx580: 0, ryzen: 0, lact: 0, mangohud: 0, expert: 0 });
    setHeardWitnesses(new Set(["rx580"]));
    setObjectedWitnesses(new Set());
    setObjectionText("Суд разрешает перебивать свидетелей, но последствия юридически сомнительны.");
    setObjectionCount(0);
    setActiveEvidence(null);
    setSeenEvidence(new Set());
    setGavelHits(0);
    setGavelText("Молоток является судебным инструментом. Наверное.");
    setSelectedVerdict(null);
    setCourtLog([
      "Дело пересмотрено. Все участники снова делают вид, что видят друг друга впервые.",
      "RX 580 вызвана первой, потому что громче всех крутила вентиляторы.",
    ]);
    window.scrollTo({ top: 0, behavior: simpleMotion ? "auto" : "smooth" });
  };

  if (!started) {
    return (
      <main className="tribunal-app tribunal-intro">
        <div className="tribunal-noise" aria-hidden="true" />
        <div className="tribunal-glow tribunal-glow-one" aria-hidden="true" />
        <div className="tribunal-glow tribunal-glow-two" aria-hidden="true" />
        <header className="tribunal-header">
          <Link href="/guide" className="tribunal-back"><ArrowLeft aria-hidden="true" /><span>Вернуться к гайду</span></Link>
          <span className="tribunal-case-chip"><Scale aria-hidden="true" /> дело №43</span>
        </header>
        <section className="tribunal-intro-card">
          <motion.div
            className="tribunal-seal"
            initial={simpleMotion ? false : { opacity: 0, scale: 0.78, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: -4 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
          >
            <Bird aria-hidden="true" />
            <small>LINUX</small>
            <strong>43</strong>
          </motion.div>
          <motion.div
            className="tribunal-intro-copy"
            initial={simpleMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.45 }}
          >
            <span className="tribunal-eyebrow">закрытое судебное заседание</span>
            <h1>Кто опять полез<br />в настройки?</h1>
            <p>Дело о пропавшем вечере, нестабильном FPS и двадцати семи вкладках с советами. Подсудимые на месте. Здравый смысл снова не явился.</p>
            <button type="button" className="tribunal-start" onClick={() => setStarted(true)}>
              <Gavel aria-hidden="true" />
              <span><small>Принять полномочия</small><strong>Открыть дело</strong></span>
            </button>
            <p className="tribunal-intro-note">Это пасхалка, а не инструкция. Команды выполнять не придется. Осуждать всех подряд - придется.</p>
          </motion.div>
        </section>
      </main>
    );
  }

  return (
    <main className="tribunal-app">
      <div className="tribunal-noise" aria-hidden="true" />
      <div className="tribunal-glow tribunal-glow-one" aria-hidden="true" />
      <div className="tribunal-glow tribunal-glow-two" aria-hidden="true" />
      <header className="tribunal-header">
        <Link href="/guide" className="tribunal-back"><ArrowLeft aria-hidden="true" /><span>Вернуться к гайду</span></Link>
        <div className="tribunal-header-title"><small>Линуксовый трибунал</small><strong>Народ против здравого смысла</strong></div>
        <span className="tribunal-case-chip"><Scale aria-hidden="true" /> дело №43</span>
      </header>

      <div className="tribunal-shell">
        <section className="tribunal-opening">
          <div className="tribunal-judge">
            <span className="tribunal-judge-icon"><Bird aria-hidden="true" /></span>
            <div>
              <small>председательствует судья Tux</small>
              <h1>Заседание открыто.<br />Начинаем этот цирк.</h1>
              <p>Фраза «у меня работает» без логов считается не показанием, а пиздежом. Выслушай свидетелей, поковыряй улики и реши, кто угробил спокойный вечер.</p>
            </div>
          </div>
          <button type="button" className="tribunal-gavel" onClick={hitGavel} aria-label="Ударить судейским молотком">
            <motion.span animate={simpleMotion ? undefined : { rotate: gavelHits % 2 ? -9 : 5 }} transition={{ type: "spring", stiffness: 500, damping: 18 }}><Gavel aria-hidden="true" /></motion.span>
            <small>Ударить молотком</small>
            <strong>{gavelHits || "не надо"}</strong>
          </button>
          <p className="tribunal-gavel-message" aria-live="polite">{gavelText}</p>
        </section>

        <section className="tribunal-section" aria-labelledby="witnesses-title">
          <div className="tribunal-section-heading">
            <div><span>01 / показания</span><h2 id="witnesses-title">Допроси подозреваемых</h2></div>
            <p>Нажимай повторно. У каждого накопилось больше одной претензии к владельцу этого ПК.</p>
          </div>
          <div className="tribunal-witness-grid">
            {witnesses.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  type="button"
                  key={item.id}
                  className="tribunal-witness-button"
                  data-active={activeWitness === item.id || undefined}
                  data-heard={heardWitnesses.has(item.id) || undefined}
                  style={{ "--witness-tone": item.tone } as CSSProperties}
                  onClick={() => hearWitness(item.id)}
                  aria-pressed={activeWitness === item.id}
                >
                  <span><Icon aria-hidden="true" /></span>
                  <strong>{item.name}</strong>
                  <small>{item.role}</small>
                </button>
              );
            })}
          </div>

          <div className="tribunal-testimony" style={{ "--witness-tone": witness.tone } as CSSProperties}>
            <div className="tribunal-testimony-speaker">
              <span><WitnessIcon aria-hidden="true" /></span>
              <div><small>дает показания</small><strong>{witness.name}</strong><em>{witness.role}</em></div>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.blockquote
                key={`${activeWitness}-${witnessTurns[activeWitness]}`}
                aria-live="polite"
                initial={simpleMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={simpleMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: simpleMotion ? 0 : 0.2 }}
              >
                «{witnessLine}»
              </motion.blockquote>
            </AnimatePresence>
            <div className="tribunal-objection-row">
              <button type="button" onClick={objectToWitness}><BadgeAlert aria-hidden="true" /> ВОЗРАЖАЮ!</button>
              <p className="tribunal-objection-answer" aria-live="polite">{objectionText}</p>
            </div>
          </div>
        </section>

        <section className="tribunal-section" aria-labelledby="evidence-title">
          <div className="tribunal-section-heading">
            <div><span>02 / вещественные доказательства</span><h2 id="evidence-title">Поковыряй улики</h2></div>
            <p>Все совпадения с реальными папками FINAL являются очень неудобной случайностью.</p>
          </div>
          <div className="tribunal-evidence-layout">
            <div className="tribunal-evidence-grid">
              {evidence.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => inspectEvidence(item.id)}
                    data-active={activeEvidence === item.id || undefined}
                    data-seen={seenEvidence.has(item.id) || undefined}
                  >
                    <span><Icon aria-hidden="true" /></span>
                    <small>{item.label}</small>
                    <strong>{item.title}</strong>
                    <p>{item.summary}</p>
                  </button>
                );
              })}
            </div>
            <div className="tribunal-evidence-file" data-empty={!evidenceItem || undefined} aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                {evidenceItem ? (
                  <motion.div key={evidenceItem.id} initial={simpleMotion ? false : { opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={simpleMotion ? undefined : { opacity: 0, x: -10 }}>
                    <span><Stamp aria-hidden="true" /> исследовано</span>
                    <small>{evidenceItem.label}</small>
                    <h3>{evidenceItem.title}</h3>
                    <p>{evidenceItem.finding}</p>
                    <blockquote>{evidenceItem.footnote}</blockquote>
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={false} animate={{ opacity: 1 }}>
                    <span><ScrollText aria-hidden="true" /> материалов нет</span>
                    <h3>Открой любую улику</h3>
                    <p>Суд не может построить обвинение исключительно на подозрительном шуме вентиляторов. Хотя очень хочет.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section className="tribunal-section tribunal-verdict-section" aria-labelledby="verdict-title">
          <div className="tribunal-section-heading">
            <div><span>03 / решающее слово</span><h2 id="verdict-title">Вынеси приговор</h2></div>
            <p>{courtroomStatus}</p>
          </div>
          <div className="tribunal-verdict-layout">
            <div className="tribunal-verdict-list" data-locked={!verdictReady || undefined}>
              {verdicts.filter((item) => item.id !== "secret" || secretUnlocked).map((item) => (
                <button type="button" key={item.id} onClick={() => verdictReady && chooseVerdict(item.id)} disabled={!verdictReady} data-secret={item.id === "secret" || undefined}>
                  <Scale aria-hidden="true" />
                  <span><small>{item.id === "secret" ? "секретная статья" : "версия обвинения"}</small><strong>{item.label}</strong></span>
                </button>
              ))}
            </div>
            <aside className="tribunal-log" aria-label="Протокол заседания">
              <div><ScrollText aria-hidden="true" /><span><small>протокол</small><strong>Секретарь все записывает</strong></span></div>
              <ol>{courtLog.map((entry, index) => <li key={`${entry}-${index}`}>{entry}</li>)}</ol>
            </aside>
          </div>
        </section>

        <AnimatePresence>
          {verdict && (
            <motion.section
              id="tribunal-result"
              className="tribunal-result"
              initial={simpleMotion ? false : { opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={simpleMotion ? undefined : { opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 190, damping: 24 }}
            >
              <div className="tribunal-result-stamp"><Stamp aria-hidden="true" /><span>приговор<br />окончательный*</span></div>
              <div className="tribunal-result-copy">
                <span>Постановление линуксового трибунала</span>
                <h2>{verdict.title}</h2>
                <p>{verdict.body}</p>
                <blockquote>{verdict.sentence}</blockquote>
                <div className="tribunal-rank"><small>Гражданин официально признан</small><strong>{verdict.rank}</strong></div>
                <p className="tribunal-result-signature">Состав суда в лице Модератора, Менеджера, Друга, Кента, БОССА и одного крайне уставшего Tux. <b>noenemies / CYHTm ♥</b></p>
                <div className="tribunal-result-actions">
                  <button type="button" onClick={resetCourt}><RotateCcw aria-hidden="true" /> Пересмотреть эту херню</button>
                  <Link href="/guide"><ArrowLeft aria-hidden="true" /> Вернуться к гайду</Link>
                </div>
                <small className="tribunal-result-footnote">* Апелляция принимается по пятницам с 03:14 до 03:15 при наличии справки от GRUB.</small>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
