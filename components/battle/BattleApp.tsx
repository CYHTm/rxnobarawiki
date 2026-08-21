"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ChartNoAxesCombined,
  ChevronRight,
  CirclePlay,
  Cpu,
  Gamepad2,
  Gauge,
  HardDrive,
  MonitorCog,
  Orbit,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Swords,
  Terminal,
  Trophy,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLightweightMode } from "@/components/TypographySettings";

type Fighter = "windows" | "nobara";
type Speaker = Fighter | "zheka" | "both";
type Scene = "intro" | "fight" | "final";

type BattleLine = {
  speaker: Speaker;
  text: string;
};

type BattleArgument = {
  side: Fighter;
  text: string;
};

type BattleRound = {
  number: string;
  title: string;
  arena: string;
  icon: LucideIcon;
  thought: string;
  lines: BattleLine[];
  arguments: BattleArgument[];
  score: { windows: number; nobara: number };
  impact: string;
};

type CollectedArgument = BattleArgument & {
  round: string;
  number: string;
};

const rounds: BattleRound[] = [
  {
    number: "01",
    title: "Зато привычно",
    arena: "Первый запуск после установки",
    icon: CirclePlay,
    thought: "Жека: «Windows я хотя бы знаю. В Linux вдруг каждое окно попросит собрать ядро?»",
    lines: [
      { speaker: "windows", text: "Жека, родной, куда ты собрался? У меня Пуск на привычном месте. Иногда. После редизайна. Если поиск не завис." },
      { speaker: "nobara", text: "А я уже установлена рядом и нормально загружаюсь. Никто не предлагает ему собирать ядро в подвале при свечах." },
      { speaker: "windows", text: "Зато он знает, где у меня настройки." },
      { speaker: "nobara", text: "Он знает три разные панели настроек и до сих пор не понимает, какая из них сегодня главная. Не пизди про уют." },
      { speaker: "zheka", text: "Ладно. Вопрос про сборку ядра временно снимаю." },
    ],
    arguments: [
      { side: "windows", text: "Знакомый интерфейс" },
      { side: "nobara", text: "Уже установлена и загружается" },
      { side: "nobara", text: "KDE не требует шаманства" },
    ],
    score: { windows: 0, nobara: 1 },
    impact: "ПРИВЫЧКА НЕ РАВНА УДОБСТВУ",
  },
  {
    number: "02",
    title: "Кто тут главный",
    arena: "Обновления и контроль",
    icon: ShieldCheck,
    thought: "Жека: «А вдруг Nobara обновится и все разъебет? Windows хотя бы предупреждает... иногда за тридцать секунд.»",
    lines: [
      { speaker: "windows", text: "Мои обновления надежны. Я сама выберу время, перезагружу ПК и поставлю рядом милую надпись «Не выключайте»." },
      { speaker: "nobara", text: "У меня есть штатный обновлятор. Жека сам его запускает, видит процесс и не получает ночной сюрприз с процентами." },
      { speaker: "windows", text: "Зато я могу исправить проблемы автоматически." },
      { speaker: "nobara", text: "Ты называешь экран «Подготовка автоматического восстановления» исправлением? Смело. Бессовестно. По-виндовому." },
      { speaker: "zheka", text: "То есть обновление можно начать тогда, когда я готов, а не когда у системы гороскоп совпал?" },
    ],
    arguments: [
      { side: "windows", text: "Автоматическое обслуживание" },
      { side: "nobara", text: "Обновление по решению Жеки" },
      { side: "nobara", text: "Штатный Nobara System Updater" },
    ],
    score: { windows: 0, nobara: 2 },
    impact: "ПЕРЕЗАГРУЗКА ОТМЕНЕНА ВЛАДЕЛЬЦЕМ",
  },
  {
    number: "03",
    title: "А игры вообще пойдут?",
    arena: "PortProton выходит на ринг",
    icon: Gamepad2,
    thought: "Жека: «На Windows нажал exe и играешь. А здесь сейчас окажется двести префиксов и алтарь Гейбу.»",
    lines: [
      { speaker: "windows", text: "Игры созданы для меня. DirectX, лаунчеры, античиты. Тут даже спорить не о чем." },
      { speaker: "nobara", text: "PortProton, Lesta Game Center и Tanks Blitz уже стоят. Steam тоже не просит принести жертву из трех библиотек DLL." },
      { speaker: "windows", text: "Но не каждая игра заведется!" },
      { speaker: "nobara", text: "Правда. За честность получаешь очко. Но конкретные игры Жеки уже работают, а не участвуют в твоей рекламной презентации." },
      { speaker: "zheka", text: "Подождите. Я боялся устанавливать то, что уже установлено? Заебись подготовился." },
    ],
    arguments: [
      { side: "windows", text: "Максимальная совместимость игр" },
      { side: "nobara", text: "PortProton уже настроен" },
      { side: "nobara", text: "Lesta и Tanks Blitz уже на месте" },
    ],
    score: { windows: 1, nobara: 3 },
    impact: "КОНКРЕТНЫЙ ПК БЬЕТ ОБЩИЙ СТРАХ",
  },
  {
    number: "04",
    title: "Ветеран RX 580",
    arena: "Драйверы, LACT и горячий воздух",
    icon: Gauge,
    thought: "Жека: «На Windows есть драйвер AMD с красивыми кнопками. В Linux видеокарта вообще знает, что она видеокарта?»",
    lines: [
      { speaker: "windows", text: "У меня официальный установщик AMD. Большой, красный, уверенный. Иногда сбрасывает профиль, зато логотип красивый." },
      { speaker: "nobara", text: "RX 580 уже работает через amdgpu и Mesa RADV. Драйвер не надо искать на сайте среди двадцати выпадающих списков." },
      { speaker: "windows", text: "А как же управление частотами?" },
      { speaker: "nobara", text: "LACT уже установлен. Сначала откроем, проверим службу, GPU и датчики. Потом двигаем ползунки, а не хуярим напряжение по совету xX_FPS_BOSS_Xx." },
      { speaker: "zheka", text: "То есть видеокарта уже работает, а моя первая задача - не мешать ей работать. Неожиданный поворот." },
    ],
    arguments: [
      { side: "windows", text: "Знакомая панель AMD" },
      { side: "nobara", text: "Mesa RADV уже работает" },
      { side: "nobara", text: "LACT установлен, сначала проверка" },
    ],
    score: { windows: 1, nobara: 4 },
    impact: "RX 580 НЕ НУЖНА ВТОРАЯ УСТАНОВКА",
  },
  {
    number: "05",
    title: "Бесплатные 400% FPS",
    arena: "MangoHUD против эксперта с волком",
    icon: ChartNoAxesCombined,
    thought: "Жека: «Я видел ролик: семь команд, и старый Ryzen начинает гнуть физику. В комментариях три лайка.»",
    lines: [
      { speaker: "windows", text: "Вот у меня есть игровые оптимизаторы. Нажимаешь большую кнопку BOOST, и она очень убедительно меняет цвет на зеленый." },
      { speaker: "nobara", text: "У меня уже есть zram, falcond и игровые настройки. Эффект проверяется через MangoHUD, а не по священному ощущению «будто плавнее»." },
      { speaker: "windows", text: "Но после твика стало 76 FPS вместо 74!" },
      { speaker: "nobara", text: "На мониторе 75 Гц. Один удачный прогон не делает тебя инженером. Он делает тебя человеком, который выбрал удобную цифру." },
      { speaker: "zheka", text: "А если назвать профиль FINAL_v2_REAL_LAST, результат станет научнее?" },
      { speaker: "both", text: "НЕТ, БЛЯДЬ." },
    ],
    arguments: [
      { side: "windows", text: "Большая кнопка BOOST" },
      { side: "nobara", text: "zram и falcond уже в системе" },
      { side: "nobara", text: "MangoHUD вместо самообмана" },
    ],
    score: { windows: 1, nobara: 5 },
    impact: "ТРИ ЛАЙКА НЕ ЯВЛЯЮТСЯ БЕНЧМАРКОМ",
  },
  {
    number: "06",
    title: "Один NVMe на двоих",
    arena: "GRUB держит двери",
    icon: HardDrive,
    thought: "Жека: «Они стоят рядом на одном диске. Вдруг Nobara однажды проснется и сожрет Windows вместе с EFI?»",
    lines: [
      { speaker: "windows", text: "Этот NVMe был моим первым. И EFI мой. Я вообще не понимаю, почему здесь поселился пингвин." },
      { speaker: "nobara", text: "Общий EFI на 200 МБ, отдельные системные разделы, GRUB выбирает загрузку. Никто не делит диск бензопилой каждое утро." },
      { speaker: "windows", text: "А если места в EFI станет мало? Наверняка из-за его игр. И вообще мой Fast Startup делает загрузку быстрее." },
      { speaker: "nobara", text: "Игры не лезут в EFI, не неси хуйню. А Fast Startup является неполным выключением и потом делает вид, что занятый раздел сам виноват." },
      { speaker: "windows", text: "Зато слово Fast красивое." },
      { speaker: "nobara", text: "Смотрим свободное место и расположение /boot с /boot/efi, а не удаляем записи наугад ради красивого слова." },
      { speaker: "zheka", text: "Значит, переустанавливать ничего не надо, пока обе системы грузятся и место контролируется? Вот это сюжетный твист." },
    ],
    arguments: [
      { side: "windows", text: "Первая хозяйка NVMe" },
      { side: "nobara", text: "Dual-boot уже собран" },
      { side: "nobara", text: "GRUB спокойно разводит системы" },
    ],
    score: { windows: 1, nobara: 6 },
    impact: "EFI НЕ ЯВЛЯЕТСЯ ПАПКОЙ С ИГРАМИ",
  },
  {
    number: "07",
    title: "Страшный терминал",
    arena: "Последний большой страх Жеки",
    icon: Terminal,
    thought: "Жека: «А если я введу не ту команду и компьютер превратится в дорогой черный прямоугольник?»",
    lines: [
      { speaker: "windows", text: "Вот! Мой пользователь правильно боится. У меня безопасно: он просто скачивает случайный exe и четыре раза нажимает «Да»." },
      { speaker: "nobara", text: "В повседневной жизни есть KDE, Nobara Welcome и DNF App Center. Терминал нужен, когда важно увидеть точный результат, а не ради косплея хакера." },
      { speaker: "windows", text: "Но sudo дает страшные права!" },
      { speaker: "nobara", text: "Поэтому команда сначала объясняется, потом выполняется и имеет откат. Это взрослее, чем дважды нажать FixMyPC_2020_crack.exe." },
      { speaker: "zheka", text: "Короче, не вставлять сорок команд ночью и читать, что произойдет. Звучит подозрительно разумно." },
    ],
    arguments: [
      { side: "windows", text: "Привычное двойное нажатие exe" },
      { side: "nobara", text: "Графические инструменты для базы" },
      { side: "nobara", text: "Команда только с результатом и откатом" },
    ],
    score: { windows: 2, nobara: 7 },
    impact: "ТЕРМИНАЛ НЕ КУСАЕТСЯ, НО ЧИТАТЬ НАДО",
  },
  {
    number: "08",
    title: "Главный противник",
    arena: "Желание чинить то, что работает",
    icon: Cpu,
    thought: "Жека: «Допустим, все работает. Но вдруг можно еще немножко оптимизировать?»",
    lines: [
      { speaker: "windows", text: "Вот здесь я его понимаю. Реестр сам себя не почистит, службы сами себя не отключат. Давай старый добрый debloat на восемьсот строк." },
      { speaker: "nobara", text: "А потом поставим второй оптимизатор поверх falcond, отключим защиты Ryzen ради двух кадров и назовем пожар A/B-тестом? Идите нахуй оба." },
      { speaker: "windows", text: "Грубо." },
      { speaker: "nobara", text: "Зато дошло. RX 580 рисует, Ryzen считает, игры запускаются, OBS стримит. Иногда лучший твик - закрыть график и начать играть." },
      { speaker: "zheka", text: "То есть главный враг не Windows, не Linux и не железо, а мое «я только один параметр проверю» в 02:47?" },
      { speaker: "both", text: "НАКОНЕЦ-ТО, ЖЕКА." },
    ],
    arguments: [
      { side: "windows", text: "Бесконечный debloat как образ жизни" },
      { side: "nobara", text: "Сначала игра, потом измеримый эксперимент" },
      { side: "nobara", text: "Работающую систему можно не чинить" },
    ],
    score: { windows: 2, nobara: 9 },
    impact: "ЗДРАВЫЙ СМЫСЛ НАНОСИТ КРИТИЧЕСКИЙ УДАР",
  },
];

const speakerNames: Record<Speaker, string> = {
  windows: "Windows 11",
  nobara: "Nobara",
  zheka: "Жека",
  both: "Обе системы",
};

const flightVectors = [
  { x: -230, y: -105, rotate: -11 },
  { x: 210, y: -88, rotate: 9 },
  { x: -180, y: 112, rotate: 7 },
];

export function BattleApp() {
  const reduceMotion = useReducedMotion();
  const lightweightMode = useLightweightMode();
  const simpleMotion = Boolean(reduceMotion || lightweightMode);
  const [scene, setScene] = useState<Scene>("intro");
  const [roundIndex, setRoundIndex] = useState(0);
  const [colliding, setColliding] = useState(false);
  const [collected, setCollected] = useState<CollectedArgument[]>([]);
  const [score, setScore] = useState({ windows: 0, nobara: 0 });

  const round = rounds[roundIndex];
  const RoundIcon = round.icon;
  const lastRound = roundIndex === rounds.length - 1;

  useEffect(() => {
    if (!colliding) return;

    const timer = window.setTimeout(() => {
      const resolvedRound = rounds[roundIndex];
      setCollected((current) => [
        ...current,
        ...resolvedRound.arguments.map((argument) => ({
          ...argument,
          round: resolvedRound.title,
          number: resolvedRound.number,
        })),
      ]);
      setScore(resolvedRound.score);
      setColliding(false);

      if (roundIndex === rounds.length - 1) {
        setScene("final");
        window.requestAnimationFrame(() => {
          document.getElementById("battle-finale")?.scrollIntoView({ behavior: simpleMotion ? "auto" : "smooth", block: "start" });
        });
      } else {
        setRoundIndex((current) => current + 1);
      }
    }, simpleMotion ? 120 : 980);

    return () => window.clearTimeout(timer);
  }, [colliding, roundIndex, simpleMotion]);

  const nobaraLead = score.nobara - score.windows;
  const battleStatus = useMemo(() => {
    if (score.nobara === 0 && score.windows === 0) return "Все еще делают вид, что бой будет равным";
    if (nobaraLead <= 1) return "Windows держится за счет привычки";
    if (nobaraLead <= 4) return "Nobara забирает инициативу";
    return "Windows срочно ищет обновление с исправлением счета";
  }, [nobaraLead, score.nobara, score.windows]);

  const startFight = () => {
    setScene("fight");
    setRoundIndex(0);
    setCollected([]);
    setScore({ windows: 0, nobara: 0 });
  };

  const restartFight = () => {
    setScene("intro");
    setRoundIndex(0);
    setColliding(false);
    setCollected([]);
    setScore({ windows: 0, nobara: 0 });
    window.scrollTo({ top: 0, behavior: simpleMotion ? "auto" : "smooth" });
  };

  return (
    <main className="battle-app">
      <div className="battle-noise" aria-hidden="true" />
      <div className="battle-glow battle-glow-blue" aria-hidden="true" />
      <div className="battle-glow battle-glow-violet" aria-hidden="true" />

      <header className="battle-header">
        <Link href="/guide" className="battle-back"><ArrowLeft aria-hidden="true" /><span>Вернуться к гайду</span></Link>
        <div className="battle-header-title"><Swords aria-hidden="true" /><span><small>двойная загрузка представляет</small><strong>Windows 11 vs Nobara</strong></span></div>
        <span className="battle-machine">RX 580 · R5 2600 · ЖЕКА</span>
      </header>

      {scene === "intro" && (
        <section className="battle-intro">
          <div className="battle-intro-copy">
            <span className="battle-kicker">восемь раундов без права на случайный тык</span>
            <h1><span>Windows 11</span><i>VS</i><strong>Nobara</strong></h1>
            <p>Две системы делят один NVMe и терпение Жеки. Аргументы будут сталкиваться строго по порядку, разлетаться после удара и оставаться в протоколе боя. Победит не та, которая громче орет, а та, которая подходит этому ПК сейчас.</p>
            <button type="button" className="battle-start" onClick={startFight}>
              <Swords aria-hidden="true" />
              <span><small>Никаких развилок</small><strong>Столкнуть системы</strong></span>
              <ChevronRight aria-hidden="true" />
            </button>
          </div>

          <div className="battle-poster" aria-label="Windows 11 против Nobara">
            <motion.div className="battle-poster-fighter battle-poster-windows" initial={simpleMotion ? false : { opacity: 0, x: -40, rotate: -8 }} animate={{ opacity: 1, x: 0, rotate: -3 }}>
              <MonitorCog aria-hidden="true" />
              <small>синий угол</small>
              <strong>WIN<br />11</strong>
              <span>«Зато привычно»</span>
            </motion.div>
            <div className="battle-poster-vs"><Zap aria-hidden="true" /><strong>VS</strong></div>
            <motion.div className="battle-poster-fighter battle-poster-nobara" initial={simpleMotion ? false : { opacity: 0, x: 40, rotate: 8 }} animate={{ opacity: 1, x: 0, rotate: 3 }}>
              <Orbit aria-hidden="true" />
              <small>фиолетовый угол</small>
              <strong>NOB<br />43</strong>
              <span>«Уже работает»</span>
            </motion.div>
          </div>
        </section>
      )}

      {scene === "fight" && (
        <div className="battle-shell">
          <section className="battle-scoreboard" aria-label="Счет боя">
            <div className="battle-score battle-score-windows"><span><MonitorCog aria-hidden="true" /> Windows 11</span><strong>{score.windows}</strong></div>
            <div className="battle-score-center"><small>счет после удара</small><strong>{battleStatus}</strong></div>
            <div className="battle-score battle-score-nobara"><strong>{score.nobara}</strong><span>Nobara <Orbit aria-hidden="true" /></span></div>
          </section>

          <div className="battle-layout">
            <section className="battle-stage" aria-live="polite" aria-busy={colliding}>
              <div className="battle-round-heading">
                <span><RoundIcon aria-hidden="true" /></span>
                <div><small>раунд {round.number} / {rounds.length.toString().padStart(2, "0")} · {round.arena}</small><h1>{round.title}</h1></div>
              </div>

              <div className="battle-thought"><span>Сомнение перед ударом</span><p>{round.thought}</p></div>

              <div className="battle-ring">
                <motion.div
                  className="battle-fighter battle-fighter-windows"
                  animate={colliding && !simpleMotion ? { x: [0, 8, 76], rotate: [0, -2, 8] } : { x: 0, rotate: 0 }}
                  transition={{ duration: 0.52, times: [0, 0.35, 1], ease: "easeIn" }}
                >
                  <span><MonitorCog aria-hidden="true" /></span>
                  <small>Windows 11</small>
                  <strong>«Я тут главная»</strong>
                </motion.div>

                <div className="battle-impact-zone" aria-hidden="true">
                  <AnimatePresence>
                    {colliding && (
                      <motion.div className="battle-impact" initial={simpleMotion ? false : { opacity: 0, scale: 0.2, rotate: -20 }} animate={{ opacity: [0, 1, 1], scale: [0.2, 1.35, 1], rotate: [0, 8, -4] }} exit={{ opacity: 0 }} transition={{ delay: simpleMotion ? 0 : 0.42, duration: simpleMotion ? 0 : 0.36 }}>
                        <Zap aria-hidden="true" /><strong>БАБАХ</strong>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <span className="battle-versus">VS</span>
                </div>

                <motion.div
                  className="battle-fighter battle-fighter-nobara"
                  animate={colliding && !simpleMotion ? { x: [0, -8, -76], rotate: [0, 2, -8] } : { x: 0, rotate: 0 }}
                  transition={{ duration: 0.52, times: [0, 0.35, 1], ease: "easeIn" }}
                >
                  <span><Orbit aria-hidden="true" /></span>
                  <small>Nobara 43</small>
                  <strong>«Сначала проверим»</strong>
                </motion.div>

                <AnimatePresence>
                  {colliding && round.arguments.map((argument, index) => {
                    const vector = flightVectors[index % flightVectors.length];
                    return (
                      <motion.span
                        key={`${round.number}-${argument.text}`}
                        className="battle-flying-argument"
                        data-side={argument.side}
                        initial={simpleMotion ? false : { opacity: 0, x: 0, y: 0, scale: 0.4 }}
                        animate={simpleMotion ? { opacity: 1 } : { opacity: [0, 1, 1], x: vector.x, y: vector.y, scale: [0.4, 1.08, 1], rotate: vector.rotate }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: simpleMotion ? 0 : 0.48 + index * 0.06, duration: simpleMotion ? 0 : 0.4 }}
                      >
                        {argument.text}
                      </motion.span>
                    );
                  })}
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.ol
                  key={round.number}
                  className="battle-dialogue"
                  initial={simpleMotion ? false : "hidden"}
                  animate="visible"
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.055 } } }}
                >
                  {round.lines.map((line, index) => (
                    <motion.li
                      key={`${round.number}-${index}`}
                      data-speaker={line.speaker}
                      variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                    >
                      <small>{speakerNames[line.speaker]}</small>
                      <p>{line.text}</p>
                    </motion.li>
                  ))}
                </motion.ol>
              </AnimatePresence>

              <button type="button" className="battle-hit" onClick={() => setColliding(true)} disabled={colliding}>
                {colliding ? <Zap aria-hidden="true" /> : <Swords aria-hidden="true" />}
                <span><small>{colliding ? "Аргументы разлетаются" : lastRound ? "Финальный удар" : `Закрыть раунд ${round.number}`}</small><strong>{colliding ? round.impact : lastRound ? "Решить бой" : "Столкнуть аргументы"}</strong></span>
                {!colliding && <ChevronRight aria-hidden="true" />}
              </button>
            </section>

            <aside className="battle-ledger" aria-live="polite">
              <div className="battle-ledger-heading"><Sparkles aria-hidden="true" /><span><small>после столкновения</small><h2>Аргументы остаются</h2></span></div>
              {collected.length ? (
                <ol>
                  {collected.map((argument) => (
                    <motion.li
                      key={`${argument.number}-${argument.text}`}
                      data-side={argument.side}
                      initial={simpleMotion ? false : { opacity: 0, x: 16, scale: 0.96 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                    >
                      <small>{argument.number} · {argument.round}</small>
                      <strong>{argument.text}</strong>
                    </motion.li>
                  ))}
                </ol>
              ) : (
                <div className="battle-ledger-empty"><Zap aria-hidden="true" /><p>Пока здесь тихо. Первый удар разложит спор на аргументы и начнет общую цепочку.</p></div>
              )}
            </aside>
          </div>
        </div>
      )}

      {scene === "final" && (
        <section id="battle-finale" className="battle-finale">
          <div className="battle-final-crown"><Trophy aria-hidden="true" /><span>ПОБЕДА</span></div>
          <div className="battle-final-copy">
            <span className="battle-kicker">финальный счет {score.windows} : {score.nobara}</span>
            <h1><small>Nobara</small> побеждает</h1>
            <p className="battle-final-lead">Не потому, что Linux магически лучше во всем. На конкретном ПК Жеки Nobara уже установлена, RX 580 работает через Mesa, нужные игры на месте, а управление системой не отбирают внезапные решения Windows.</p>

            <div className="battle-final-ledger">
              <div><Sparkles aria-hidden="true" /><span><small>ничего не потерялось</small><h2>Все аргументы после боя</h2></span></div>
              <ol>
                {collected.map((argument) => (
                  <li key={`final-${argument.number}-${argument.text}`} data-side={argument.side}>
                    <small>{argument.number}</small>
                    <strong>{argument.text}</strong>
                  </li>
                ))}
              </ol>
            </div>

            <div className="battle-postcredits">
              <div data-speaker="windows"><small>Windows 11</small><p>И что, меня теперь удалят?</p></div>
              <div data-speaker="nobara"><small>Nobara</small><p>Нет. Сиди на своем разделе, запускай редкие несовместимые игры и не трогай общий EFI.</p></div>
              <div data-speaker="windows"><small>Windows 11</small><p>А если у него появится сомнение?</p></div>
              <div data-speaker="nobara"><small>Nobara</small><p>Пусть загрузится обратно, сравнит и решит сам. Мы же не секта, блядь.</p></div>
              <div data-speaker="zheka"><small>Жека</small><p>Так я теперь могу просто поиграть, не оптимизируя все до рассвета?</p></div>
              <div data-speaker="both"><small>Обе системы</small><p>ДА, ЖЕКА. ИДИ УЖЕ ИГРАЙ.</p></div>
            </div>

            <div className="battle-final-status">
              <span><Orbit aria-hidden="true" /><small>основная система</small><strong>Nobara 43</strong></span>
              <span><MonitorCog aria-hidden="true" /><small>остается рядом</small><strong>Windows 11</strong></span>
              <span><Cpu aria-hidden="true" /><small>главный победитель</small><strong>Здравый смысл</strong></span>
            </div>

            <blockquote>Постановление ринга: Жека признан опасным с sudo, но в целом обучаемым. Nobara получает рабочий стол, Windows получает свой раздел, а RX 580 получает один вечер без ебаных экспериментов.</blockquote>

            <div className="battle-final-actions">
              <button type="button" onClick={restartFight}><RotateCcw aria-hidden="true" /> Посмотреть бой заново</button>
              <Link href="/guide"><ArrowLeft aria-hidden="true" /> Вернуться к гайду</Link>
            </div>
            <p className="battle-signature">Для Жеки от Модератора, Менеджера, Друга, Кента, БОССА. <b>noenemies / CYHTm ♥</b></p>
          </div>
        </section>
      )}
    </main>
  );
}
