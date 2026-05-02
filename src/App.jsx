import { useState, useRef, useEffect } from "react";

const LAWS = [
  // ─── КОДЕКСИ ───────────────────────────────────────────────────────────────
  { id:1, title_bg:"Граждански процесуален кодекс", title_ru:"Гражданский процессуальный кодекс", title_en:"Civil Procedure Code", type:"kodeks", area:["civil"], year:2007, url:"https://lex.bg/laws/ldoc/2135558368" },
  { id:2, title_bg:"Наказателен кодекс", title_ru:"Уголовный кодекс", title_en:"Penal Code", type:"kodeks", area:["criminal"], year:1968, url:"https://lex.bg/laws/ldoc/1589654529" },
  { id:3, title_bg:"Търговски закон", title_ru:"Торговый закон", title_en:"Commercial Act", type:"kodeks", area:["business"], year:1991, url:"https://lex.bg/laws/ldoc/-14917630" },
  { id:4, title_bg:"Кодекс на труда", title_ru:"Трудовой кодекс", title_en:"Labour Code", type:"kodeks", area:["labor"], year:1986, url:"https://lex.bg/laws/ldoc/1594373121" },
  { id:5, title_bg:"Данъчно-осигурителен процесуален кодекс", title_ru:"Налогово-страховой процессуальный кодекс", title_en:"Tax-Insurance Procedure Code", type:"kodeks", area:["tax"], year:2005, url:"https://lex.bg/laws/ldoc/2135488631" },
  { id:6, title_bg:"Административнопроцесуален кодекс", title_ru:"Административно-процессуальный кодекс", title_en:"Administrative Procedure Code", type:"kodeks", area:["admin"], year:2006, url:"https://lex.bg/laws/ldoc/2135512224" },
  { id:7, title_bg:"Семеен кодекс", title_ru:"Семейный кодекс", title_en:"Family Code", type:"kodeks", area:["civil"], year:2009, url:"https://lex.bg/laws/ldoc/2135600528" },
  { id:8, title_bg:"Наказателно-процесуален кодекс", title_ru:"Уголовно-процессуальный кодекс", title_en:"Criminal Procedure Code", type:"kodeks", area:["criminal"], year:2005, url:"https://lex.bg/laws/ldoc/2135512224" },
  { id:9, title_bg:"Закон за задълженията и договорите", title_ru:"Закон об обязательствах и договорах", title_en:"Obligations and Contracts Act", type:"kodeks", area:["civil"], year:1950, url:"https://lex.bg/laws/ldoc/2121934337" },
  { id:10, title_bg:"Кодекс за социално осигуряване", title_ru:"Кодекс социального страхования", title_en:"Social Insurance Code", type:"kodeks", area:["labor","tax"], year:1999, url:"https://lex.bg/laws/ldoc/2134447728" },
  { id:11, title_bg:"Кодекс за застраховането", title_ru:"Кодекс страхования", title_en:"Insurance Code", type:"kodeks", area:["business","civil"], year:2015, url:"https://lex.bg/laws/ldoc/2136604541" },
  { id:12, title_bg:"Кодекс на международното частно право", title_ru:"Кодекс международного частного права", title_en:"Private International Law Code", type:"kodeks", area:["civil"], year:2005, url:"https://lex.bg/laws/ldoc/2135488591" },
  // ─── МИГРАЦИЯ ──────────────────────────────────────────────────────────────
  { id:20, title_bg:"Закон за чужденците в Република България", title_ru:"Закон об иностранцах в РБ", title_en:"Foreigners in Bulgaria Act", type:"zakon", area:["migration"], year:1998, url:"https://lex.bg/laws/ldoc/2134455296" },
  { id:21, title_bg:"Закон за влизането, пребиваването и напускането на РБ на гражданите на ЕС", title_ru:"Закон о въезде граждан ЕС", title_en:"EU Citizens Entry and Residence Act", type:"zakon", area:["migration"], year:2006, url:"https://lex.bg/laws/ldoc/2135509934" },
  { id:22, title_bg:"Закон за убежището и бежанците", title_ru:"Закон об убежище и беженцах", title_en:"Asylum and Refugees Act", type:"zakon", area:["migration"], year:2002, url:"https://lex.bg/laws/ldoc/2135101229" },
  { id:23, title_bg:"Закон за българското гражданство", title_ru:"Закон о болгарском гражданстве", title_en:"Bulgarian Citizenship Act", type:"zakon", area:["migration"], year:1998, url:"https://lex.bg/laws/ldoc/2134447032" },
  { id:24, title_bg:"Закон за трудовата миграция и трудовата мобилност", title_ru:"Закон о трудовой миграции", title_en:"Labour Migration and Mobility Act", type:"zakon", area:["migration","labor"], year:2016, url:"https://lex.bg/laws/ldoc/2136912513" },
  { id:25, title_bg:"Закон за насърчаване на инвестициите", title_ru:"Закон о поощрении инвестиций", title_en:"Investment Promotion Act", type:"zakon", area:["business","migration"], year:1997, url:"https://lex.bg/laws/ldoc/2134395927" },
  { id:26, title_bg:"Закон за гражданската регистрация", title_ru:"Закон о гражданской регистрации", title_en:"Civil Registration Act", type:"zakon", area:["migration","admin"], year:1999, url:"https://lex.bg/laws/ldoc/2134673409" },
  { id:27, title_bg:"Закон за българските лични документи", title_ru:"Закон о болгарских личных документах", title_en:"Bulgarian Identity Documents Act", type:"zakon", area:["migration","admin"], year:1998, url:"https://lex.bg/laws/ldoc/2134424576" },
  { id:28, title_bg:"Правилник за прилагане на Закона за чужденците", title_ru:"Правилник по применению Закона об иностранцах", title_en:"Regulation on Application of Foreigners Act", type:"naredba", area:["migration"], year:2011, url:"https://lex.bg/laws/ldoc/2135738597" },
  // ─── ДАНЪЦИ ────────────────────────────────────────────────────────────────
  { id:30, title_bg:"Закон за корпоративното подоходно облагане", title_ru:"Закон о корпоративном налоге", title_en:"Corporate Income Tax Act", type:"zakon", area:["tax"], year:2006, url:"https://lex.bg/laws/ldoc/2135509982" },
  { id:31, title_bg:"Закон за данък върху добавената стойност", title_ru:"Закон об НДС", title_en:"VAT Act", type:"zakon", area:["tax"], year:2006, url:"https://lex.bg/laws/ldoc/2135509994" },
  { id:32, title_bg:"Закон за данъците върху доходите на физическите лица", title_ru:"Закон о НДФЛ", title_en:"Personal Income Tax Act", type:"zakon", area:["tax"], year:2006, url:"https://lex.bg/laws/ldoc/2135510001" },
  { id:33, title_bg:"Закон за местните данъци и такси", title_ru:"Закон о местных налогах и сборах", title_en:"Local Taxes and Fees Act", type:"zakon", area:["tax","property"], year:1997, url:"https://lex.bg/laws/ldoc/2134395763" },
  { id:34, title_bg:"Закон за счетоводството", title_ru:"Закон о бухгалтерском учёте", title_en:"Accountancy Act", type:"zakon", area:["tax","business"], year:2015, url:"https://lex.bg/laws/ldoc/2136604688" },
  { id:35, title_bg:"Закон за данъка върху добавената стойност — Правилник", title_ru:"Правилник по НДС", title_en:"VAT Implementing Regulation", type:"naredba", area:["tax"], year:2006, url:"https://lex.bg/laws/ldoc/2135554821" },
  // ─── БИЗНЕС ────────────────────────────────────────────────────────────────
  { id:40, title_bg:"Закон за търговския регистър и регистъра на ЮЛНЦ", title_ru:"Закон о торговом реестре", title_en:"Commercial Register Act", type:"zakon", area:["business"], year:2006, url:"https://lex.bg/laws/ldoc/2135522741" },
  { id:41, title_bg:"Закон за регистър БУЛСТАТ", title_ru:"Закон о реестре БУЛСТАТ", title_en:"BULSTAT Register Act", type:"zakon", area:["business","migration"], year:2000, url:"https://lex.bg/laws/ldoc/2134673486" },
  { id:42, title_bg:"Закон за мерките срещу изпирането на пари (ЗМИП)", title_ru:"Закон о мерах против отмывания денег", title_en:"Anti-Money Laundering Act", type:"zakon", area:["business","tax"], year:2018, url:"https://lex.bg/laws/ldoc/2137027312" },
  { id:43, title_bg:"Закон за защита на конкуренцията", title_ru:"Закон о защите конкуренции", title_en:"Competition Protection Act", type:"zakon", area:["business"], year:2008, url:"https://lex.bg/laws/ldoc/2135576342" },
  { id:44, title_bg:"Закон за концесиите", title_ru:"Закон о концессиях", title_en:"Concessions Act", type:"zakon", area:["business"], year:2018, url:"https://lex.bg/laws/ldoc/2137065985" },
  // ─── НЕДВИЖИМОСТ ───────────────────────────────────────────────────────────
  { id:50, title_bg:"Закон за собствеността", title_ru:"Закон о собственности", title_en:"Property Act", type:"zakon", area:["property"], year:1951, url:"https://lex.bg/laws/ldoc/2122102787" },
  { id:51, title_bg:"Закон за кадастъра и имотния регистър", title_ru:"Закон о кадастре и имотном реестре", title_en:"Cadastre and Property Register Act", type:"zakon", area:["property"], year:2000, url:"https://lex.bg/laws/ldoc/2134918656" },
  { id:52, title_bg:"Закон за нотариусите и нотариалната дейност (ЗННД)", title_ru:"Закон о нотариусах и нотариальной деятельности", title_en:"Notaries and Notarial Activity Act", type:"zakon", area:["property","civil"], year:1996, url:"https://lex.bg/laws/ldoc/2133897733" },
  { id:53, title_bg:"Закон за устройство на територията (ЗУТ)", title_ru:"Закон о территориальном устройстве", title_en:"Spatial Planning Act", type:"zakon", area:["property"], year:2001, url:"https://lex.bg/laws/ldoc/2135163904" },
  { id:54, title_bg:"Закон за управление на етажната собственост", title_ru:"Закон об управлении этажной собственностью", title_en:"Condominium Management Act", type:"zakon", area:["property","civil"], year:2009, url:"https://lex.bg/laws/ldoc/2135600516" },
  { id:55, title_bg:"Закон за наследството", title_ru:"Закон о наследовании", title_en:"Inheritance Act", type:"zakon", area:["property","civil"], year:1949, url:"https://lex.bg/laws/ldoc/2121542657" },
  { id:56, title_bg:"Закон за задълженията към държавата при прехвърляне на недвижим имот", title_ru:"ДОПК чл. 264 — налоги при сделках с имуществом", title_en:"TIPA Art. 264 — tax clearance for property", type:"zakon", area:["property","tax"], year:2005, url:"https://lex.bg/laws/ldoc/2135488631" },
  // ─── АДМИНИСТРАТИВНО ───────────────────────────────────────────────────────
  { id:60, title_bg:"Закон за администрацията", title_ru:"Закон об администрации", title_en:"Administration Act", type:"zakon", area:["admin"], year:1998, url:"https://lex.bg/laws/ldoc/2134443520" },
  { id:61, title_bg:"Закон за достъп до обществена информация", title_ru:"Закон о доступе к информации", title_en:"Access to Public Information Act", type:"zakon", area:["admin"], year:2000, url:"https://lex.bg/laws/ldoc/2134447543" },
  { id:62, title_bg:"Закон за електронното управление", title_ru:"Закон об электронном управлении", title_en:"Electronic Governance Act", type:"zakon", area:["admin"], year:2007, url:"https://lex.bg/laws/ldoc/2135534095" },
  { id:63, title_bg:"Закон за административните нарушения и наказания", title_ru:"Закон об административных нарушениях и наказаниях", title_en:"Administrative Violations and Sanctions Act", type:"zakon", area:["admin"], year:1969, url:"https://lex.bg/laws/ldoc/1589654561" },
  { id:64, title_bg:"Закон за обществените поръчки", title_ru:"Закон о государственных закупках", title_en:"Public Procurement Act", type:"zakon", area:["admin","business"], year:2016, url:"https://lex.bg/laws/ldoc/2136912478" },
  // ─── ТРУД ──────────────────────────────────────────────────────────────────
  { id:70, title_bg:"Закон за здравословни и безопасни условия на труд", title_ru:"Закон об охране труда", title_en:"Health and Safety at Work Act", type:"zakon", area:["labor"], year:1997, url:"https://lex.bg/laws/ldoc/2134395728" },
  { id:71, title_bg:"Закон за насърчаване на заетостта", title_ru:"Закон о содействии занятости", title_en:"Employment Promotion Act", type:"zakon", area:["labor"], year:2001, url:"https://lex.bg/laws/ldoc/2134815654" },
  { id:72, title_bg:"Закон за закрила при безработица и насърчаване на заетостта", title_ru:"Закон о защите при безработице", title_en:"Unemployment Protection Act", type:"zakon", area:["labor"], year:2001, url:"https://lex.bg/laws/ldoc/2134815680" },
  // ─── ГРАЖДАНСКО ────────────────────────────────────────────────────────────
  { id:80, title_bg:"Закон за защита на потребителите", title_ru:"Закон о защите потребителей", title_en:"Consumer Protection Act", type:"zakon", area:["civil","business"], year:2005, url:"https://lex.bg/laws/ldoc/2135488657" },
  { id:81, title_bg:"Закон за защита на личните данни", title_ru:"Закон о защите персональных данных", title_en:"Personal Data Protection Act", type:"zakon", area:["civil","admin"], year:2002, url:"https://lex.bg/laws/ldoc/2135101048" },
  { id:82, title_bg:"Закон за задълженията и договорите — допълнения", title_ru:"ЗЗД — поправки", title_en:"OCA — amendments", type:"zakon", area:["civil"], year:1950, url:"https://lex.bg/laws/ldoc/2121934337" },
  { id:83, title_bg:"Закон за лицата и семейството", title_ru:"Закон о лицах и семье", title_en:"Persons and Family Act", type:"zakon", area:["civil"], year:1949, url:"https://lex.bg/laws/ldoc/2121542657" },
  { id:84, title_bg:"Закон за медиацията", title_ru:"Закон о медиации", title_en:"Mediation Act", type:"zakon", area:["civil"], year:2004, url:"https://lex.bg/laws/ldoc/2135292950" },
  // ─── НАРЕДБИ ───────────────────────────────────────────────────────────────
  { id:90, title_bg:"Наредба за регистрация на чужденците", title_ru:"Положение о регистрации иностранцев", title_en:"Regulation on Registration of Foreigners", type:"naredba", area:["migration"], year:2011, url:"https://lex.bg/laws/ldoc/2135738597" },
  { id:91, title_bg:"Наредба № Н-18 за регистриране на продажби чрез фискални устройства", title_ru:"Наредба № Н-18 о регистрации продаж", title_en:"Regulation N-18 on Sales Registration", type:"naredba", area:["tax","business"], year:2006, url:"https://lex.bg/laws/ldoc/2135558381" },
  { id:92, title_bg:"Тарифа № 4 за таксите в системата на МВР", title_ru:"Тариф № 4 — пошлины МВР", title_en:"Tariff No. 4 — MVR Fees", type:"naredba", area:["migration","admin"], year:2012, url:"https://lex.bg/laws/ldoc/2135844413" },
  { id:93, title_bg:"Наредба за командировките в страната", title_ru:"Положение о командировках", title_en:"Regulation on Business Travel", type:"naredba", area:["labor","tax"], year:1987, url:"https://lex.bg/laws/ldoc/1594373158" },
];

// ─── ШАБЛОНЫ: МИГРАЦИЯ МВР ───────────────────────────────────────────────────
const TEMPLATES_MIGRATION = [
  {
    id: "m1", cat: "migration",
    ru: "Заявление на ВНЖ (продолжительное пребывание)", en: "Long-term Residence Permit Application", bg: "Заявление за продължително пребиваване",
    basis: "ЗЧРБ чл. 24", source: "МВР Дирекция Миграция",
    info_ru: "Подаётся лично в сектор Миграция ОДМВР. Срок подачи — не позднее 14 рабочих дней до истечения текущего разрешения. Срок рассмотрения — до 14 дней.",
    info_en: "Filed in person at the Migration Sector of ODMVR. Must be filed no later than 14 working days before expiry. Processing time: up to 14 days.",
    docs_ru: "1. Паспорт (копия + оригинал)\n2. Документ-основание (договор аренды/трудовой/учредительные и т.д.)\n3. Медицинская страховка (мин. 30 000 EUR)\n4. Подтверждение финансов (мин. 500 лв/мес)\n5. Документ об адресе\n6. Квитанция об уплате госпошлины\n7. 2 фотографии 3.5×4.5 см",
    fields: [
      { key:"city", label:{ru:"Город (ОДМВР)", en:"City (ODMVR)", bg:"Град (ОДМВР)"}, placeholder:"Бургас" },
      { key:"date", label:{ru:"Дата подачи", en:"Application date", bg:"Дата на подаване"}, placeholder:"01.01.2025" },
      { key:"name_latin", label:{ru:"ФИО (латиница, как в паспорте)", en:"Full name (Latin, as in passport)", bg:"Три имена (латиница)"}, placeholder:"IVAN PETROV IVANOV" },
      { key:"name_bg", label:{ru:"ФИО (кириллица)", en:"Full name (Cyrillic)", bg:"Три имена (кирилица)"}, placeholder:"Иван Петров Иванов" },
      { key:"citizenship", label:{ru:"Гражданство", en:"Citizenship", bg:"Гражданство"}, placeholder:"Руска федерация" },
      { key:"dob", label:{ru:"Дата рождения", en:"Date of birth", bg:"Дата на раждане"}, placeholder:"01.01.1985" },
      { key:"pob", label:{ru:"Место рождения", en:"Place of birth", bg:"Място на раждане"}, placeholder:"Москва, Русия" },
      { key:"passport_no", label:{ru:"Номер паспорта", en:"Passport number", bg:"Номер на паспорта"}, placeholder:"700123456" },
      { key:"passport_valid", label:{ru:"Паспорт действителен до", en:"Passport valid until", bg:"Паспортът е валиден до"}, placeholder:"01.01.2030" },
      { key:"address_bg", label:{ru:"Адрес в Болгарии", en:"Address in Bulgaria", bg:"Адрес в България"}, placeholder:"гр. Бургас, ул. Александровска 1, ет. 3, ап. 7" },
      { key:"basis", label:{ru:"Основание пребывания", en:"Basis of residence", bg:"Основание за пребиваване"}, placeholder:"упражняване на търговска дейност / работа / семейство" },
      { key:"employer", label:{ru:"Работодатель/компания (если есть)", en:"Employer/company (if applicable)", bg:"Работодател/фирма"}, placeholder:"ЕООД Примерна Фирма, ЕИК 123456789" },
      { key:"phone", label:{ru:"Телефон", en:"Phone", bg:"Телефон"}, placeholder:"+359 88 123 4567" },
      { key:"email", label:{ru:"Email", en:"Email", bg:"Email"}, placeholder:"ivan@example.com" },
    ],
    generate: (f) => `ДО ДИРЕКТОРА НА ОБЛАСТНА ДИРЕКЦИЯ НА МВР
СЕКТОР "МИГРАЦИЯ" — ${f.city||"______"}

З А Я В Л Е Н И Е
за предоставяне на право за продължително пребиваване
на чужденец в Република България
(на основание чл. 24 от Закона за чужденците в Република България)

════════════════════════════════════════

ЛИЧНИ ДАННИ НА ЗАЯВИТЕЛЯ:

Три имена (латиница): ${f.name_latin||"________________"}
Три имена (кирилица): ${f.name_bg||"________________"}
Гражданство: ${f.citizenship||"________________"}
Дата на раждане: ${f.dob||"________________"}
Място на раждане: ${f.pob||"________________"}
Номер на паспорта: ${f.passport_no||"________________"}
Паспортът е валиден до: ${f.passport_valid||"________________"}

АДРЕС В БЪЛГАРИЯ:
${f.address_bg||"________________"}

Телефон: ${f.phone||"________________"}
Email: ${f.email||"________________"}

════════════════════════════════════════

ОСНОВАНИЕ ЗА ПРЕБИВАВАНЕ:
${f.basis||"________________"}

${f.employer ? `Работодател / Фирма: ${f.employer}` : ""}

════════════════════════════════════════

УВАЖАЕМИ ГОСПОДИН/ГОСПОЖО ДИРЕКТОР,

Моля да ми бъде предоставено право за продължително пребиваване
в Република България на посоченото основание.

Прилагам необходимите документи съгласно чл. 24 от ЗЧРБ
и Правилника за прилагане на ЗЧРБ.

Правно основание: чл. 24 от Закона за чужденците в Република България

════════════════════════════════════════
Дата: ${f.date||"__.__.__"}        Подпис: _________________
                              (${f.name_latin||""})
`
  },
  {
    id: "m2", cat: "migration",
    ru: "Заявление на ПМЖ (постоянное пребывание)", en: "Permanent Residence Permit Application", bg: "Заявление за постоянно пребиваване",
    basis: "ЗЧРБ чл. 25", source: "МВР Дирекция Миграция",
    info_ru: "Подаётся при непрерывном законном проживании 5 лет. Подаётся лично в сектор Миграция ОДМВР за 2 месяца до истечения срока ВНЖ.",
    info_en: "Filed after 5 years of continuous lawful residence. Filed in person at Migration Sector 2 months before long-term permit expires.",
    docs_ru: "1. Паспорт (копия + оригинал)\n2. Документ подтверждающий 5 лет непрерывного проживания\n3. Медицинская страховка\n4. Подтверждение финансов\n5. Справка о несудимости из страны гражданства\n6. Квитанция госпошлины\n7. 2 фотографии",
    fields: [
      { key:"city", label:{ru:"Город (ОДМВР)", en:"City", bg:"Град"}, placeholder:"Бургас" },
      { key:"date", label:{ru:"Дата подачи", en:"Date", bg:"Дата"}, placeholder:"01.01.2025" },
      { key:"name_latin", label:{ru:"ФИО (латиница)", en:"Full name (Latin)", bg:"Три имена (латиница)"}, placeholder:"IVAN PETROV IVANOV" },
      { key:"name_bg", label:{ru:"ФИО (кириллица)", en:"Full name (Cyrillic)", bg:"Три имена (кирилица)"}, placeholder:"Иван Петров Иванов" },
      { key:"citizenship", label:{ru:"Гражданство", en:"Citizenship", bg:"Гражданство"}, placeholder:"Руска федерация" },
      { key:"dob", label:{ru:"Дата рождения", en:"Date of birth", bg:"Дата на раждане"}, placeholder:"01.01.1985" },
      { key:"passport_no", label:{ru:"Номер паспорта", en:"Passport number", bg:"Номер паспорта"}, placeholder:"700123456" },
      { key:"address_bg", label:{ru:"Адрес в Болгарии", en:"Address in Bulgaria", bg:"Адрес в България"}, placeholder:"гр. Бургас, ул. Александровска 1, ет. 3, ап. 7" },
      { key:"residence_since", label:{ru:"Проживаю в Болгарии с", en:"Residing in Bulgaria since", bg:"Пребивавам в България от"}, placeholder:"01.01.2019" },
      { key:"current_permit", label:{ru:"Номер текущего ВНЖ", en:"Current residence permit number", bg:"Номер на текущото ВНЖ"}, placeholder:"BG1234567" },
      { key:"phone", label:{ru:"Телефон", en:"Phone", bg:"Телефон"}, placeholder:"+359 88 123 4567" },
    ],
    generate: (f) => `ДО ДИРЕКТОРА НА ОБЛАСТНА ДИРЕКЦИЯ НА МВР
СЕКТОР "МИГРАЦИЯ" — ${f.city||"______"}

З А Я В Л Е Н И Е
за предоставяне на право за ПОСТОЯННО пребиваване
на чужденец в Република България
(на основание чл. 25 от Закона за чужденците в Република България)

════════════════════════════════════════

ЛИЧНИ ДАННИ:

Три имена (латиница): ${f.name_latin||"________________"}
Три имена (кирилица): ${f.name_bg||"________________"}
Гражданство: ${f.citizenship||"________________"}
Дата на раждане: ${f.dob||"________________"}
Номер на паспорта: ${f.passport_no||"________________"}

АДРЕС В БЪЛГАРИЯ: ${f.address_bg||"________________"}
Телефон: ${f.phone||"________________"}

════════════════════════════════════════

Пребивавам законно и непрекъснато в Република България от: ${f.residence_since||"________________"}
Настоящо разрешение за пребиваване №: ${f.current_permit||"________________"}

════════════════════════════════════════

УВАЖАЕМИ ГОСПОДИН/ГОСПОЖО ДИРЕКТОР,

Моля да ми бъде предоставено право за ПОСТОЯННО пребиваване
в Република България на основание чл. 25, ал. 1 от ЗЧРБ,
тъй като законно и непрекъснато пребивавам в страната повече от 5 години.

Прилагам необходимите документи съгласно изискванията на ЗЧРБ и ППЗЧРБ.

Правно основание: чл. 25 от Закона за чужденците в Република България

════════════════════════════════════════
Дата: ${f.date||"__.__.__"}        Подпис: _________________
                              (${f.name_latin||""})
`
  },
  {
    id: "m3", cat: "migration",
    ru: "Декларация-покана для частного визита", en: "Invitation Declaration - Private Visit", bg: "Покана-декларация за частно посещение",
    basis: "ЗЧРБ чл. 17", source: "МВР сектор Миграция / Паспортни услуги",
    info_ru: "Заверяется в сектор Миграция или паспортных услугах ОДМВР. Приглашающий должен быть гражданином Болгарии или иностранцем с ВНЖ/ПМЖ.",
    info_en: "Certified at the Migration Sector or Passport Services of ODMVR. The inviting person must be a Bulgarian citizen or foreigner with residence permit.",
    docs_ru: "1. Паспорт приглашающего\n2. Документ о проживании (собственность или аренда)\n3. Документ о финансах\n4. Уплата госпошлины",
    fields: [
      { key:"city", label:{ru:"Город заверения", en:"City of certification", bg:"Град на заверяване"}, placeholder:"Бургас" },
      { key:"date", label:{ru:"Дата", en:"Date", bg:"Дата"}, placeholder:"01.01.2025" },
      { key:"host_name", label:{ru:"ФИО приглашающего", en:"Host full name", bg:"Три имена на поканващия"}, placeholder:"Иван Петров Иванов" },
      { key:"host_egn", label:{ru:"ЕГН/ЛНЧ приглашающего", en:"Host EGN/PNF", bg:"ЕГН/ЛНЧ на поканващия"}, placeholder:"7501011234" },
      { key:"host_address", label:{ru:"Адрес приглашающего", en:"Host address", bg:"Адрес на поканващия"}, placeholder:"гр. Бургас, ул. Александровска 1, ет. 3, ап. 7" },
      { key:"host_citizenship", label:{ru:"Гражданство приглашающего", en:"Host citizenship", bg:"Гражданство на поканващия"}, placeholder:"Руска федерация / България" },
      { key:"guest_name", label:{ru:"ФИО приглашаемого", en:"Guest full name", bg:"Три имена на поканвания"}, placeholder:"MARIA IVANOVA PETROVA" },
      { key:"guest_citizenship", label:{ru:"Гражданство приглашаемого", en:"Guest citizenship", bg:"Гражданство на поканвания"}, placeholder:"Руска федерация" },
      { key:"guest_dob", label:{ru:"Дата рождения приглашаемого", en:"Guest date of birth", bg:"Дата на раждане на поканвания"}, placeholder:"15.05.1990" },
      { key:"guest_passport", label:{ru:"Паспорт приглашаемого", en:"Guest passport number", bg:"Паспорт на поканвания"}, placeholder:"700654321" },
      { key:"visit_purpose", label:{ru:"Цель визита", en:"Purpose of visit", bg:"Цел на посещението"}, placeholder:"частно посещение / туризъм / почивка" },
      { key:"visit_duration", label:{ru:"Срок пребывания (до 90 дней)", en:"Duration of stay (up to 90 days)", bg:"Срок на престой"}, placeholder:"30 дни" },
      { key:"accommodation", label:{ru:"Место проживания гостя", en:"Guest accommodation address", bg:"Адрес на настаняване на госта"}, placeholder:"гр. Бургас, ул. Александровска 1, ет. 3, ап. 7" },
    ],
    generate: (f) => `П О К А Н А - Д Е К Л А Р А Ц И Я
за частно посещение на чужденец в Република България
(на основание чл. 17 от Закона за чужденците в Република България)

════════════════════════════════════════

Долуподписаният/ата: ${f.host_name||"________________"}
ЕГН/ЛНЧ: ${f.host_egn||"________________"}
Гражданство: ${f.host_citizenship||"________________"}
Адрес: ${f.host_address||"________________"}

Д Е К Л А Р И Р А М,

че каня следното лице за частно посещение в Република България:

════════════════════════════════════════
ДАННИ НА ПОКАНВАНИЯ:

Три имена: ${f.guest_name||"________________"}
Гражданство: ${f.guest_citizenship||"________________"}
Дата на раждане: ${f.guest_dob||"________________"}
Номер на паспорта: ${f.guest_passport||"________________"}

════════════════════════════════════════
ЦЕЛ НА ПОСЕЩЕНИЕТО: ${f.visit_purpose||"________________"}
СРОК НА ПРЕСТОЙ: ${f.visit_duration||"________________"}
АДРЕС НА НАСТАНЯВАНЕ: ${f.accommodation||"________________"}

════════════════════════════════════════

Декларирам, че поканеното от мен лице ще бъде напълно издържано
от мен по време на престоя му в Република България и ще осигуря
необходимото настаняване.

Известна ми е наказателната отговорност по чл. 313 от НК
за деклариране на неверни обстоятелства.

Правно основание: чл. 17 от ЗЧРБ

════════════════════════════════════════

Дата: ${f.date||"__.__.__"}        Декларатор: _________________
Гр. ${f.city||"______"}                         (${f.host_name||""})

════════════════════════════════════════
ЗАВЕРЕНО ОТ ОРГАН НА МВР:
Дата: ___________    Служител: _________________    Печат: [  ]
`
  },
  {
    id: "m4", cat: "migration",
    ru: "Декларация-покана для бизнес визита", en: "Invitation Declaration - Business Visit", bg: "Покана-декларация за бизнес посещение",
    basis: "ЗЧРБ чл. 17", source: "МВР сектор Миграция",
    info_ru: "Для деловых визитов. Приглашающая сторона — болгарская компания. Заверяется в МВР.",
    info_en: "For business visits. The inviting party is a Bulgarian company. Certified at MVR.",
    docs_ru: "1. Документы компании (ЕИК, актуальное состояние)\n2. Паспорт управляющего\n3. Документ о финансах компании\n4. Госпошлина",
    fields: [
      { key:"city", label:{ru:"Город", en:"City", bg:"Град"}, placeholder:"Бургас" },
      { key:"date", label:{ru:"Дата", en:"Date", bg:"Дата"}, placeholder:"01.01.2025" },
      { key:"company_name", label:{ru:"Название компании-приглашающей", en:"Inviting company name", bg:"Наименование на поканващата фирма"}, placeholder:"Примерна Фирма ЕООД" },
      { key:"company_eik", label:{ru:"ЕИК компании", en:"Company EIK", bg:"ЕИК на фирмата"}, placeholder:"123456789" },
      { key:"company_address", label:{ru:"Адрес компании", en:"Company address", bg:"Адрес на фирмата"}, placeholder:"гр. Бургас, ул. Търговска 5" },
      { key:"manager_name", label:{ru:"ФИО управляющего компании", en:"Company manager name", bg:"Управител на фирмата"}, placeholder:"Иван Петров Иванов" },
      { key:"manager_egn", label:{ru:"ЕГН управляющего", en:"Manager EGN", bg:"ЕГН на управителя"}, placeholder:"7501011234" },
      { key:"guest_name", label:{ru:"ФИО приглашаемого", en:"Guest full name", bg:"Три имена на поканвания"}, placeholder:"ALEXANDER SIDOROV PETROV" },
      { key:"guest_citizenship", label:{ru:"Гражданство", en:"Citizenship", bg:"Гражданство"}, placeholder:"Руска федерация" },
      { key:"guest_passport", label:{ru:"Номер паспорта гостя", en:"Guest passport number", bg:"Паспорт на поканвания"}, placeholder:"700654321" },
      { key:"guest_position", label:{ru:"Должность/роль гостя", en:"Guest position/role", bg:"Длъжност на поканвания"}, placeholder:"Директор по продажбите" },
      { key:"visit_purpose", label:{ru:"Цель бизнес визита", en:"Business visit purpose", bg:"Цел на бизнес посещението"}, placeholder:"преговори за бизнес партньорство / подписване на договор" },
      { key:"visit_duration", label:{ru:"Срок пребывания", en:"Duration", bg:"Срок"}, placeholder:"14 дни" },
    ],
    generate: (f) => `П О К А Н А - Д Е К Л А Р А Ц И Я
за бизнес посещение на чужденец в Република България
(на основание чл. 17 от Закона за чужденците в Република България)

════════════════════════════════════════

ПОКАНВАЩА ОРГАНИЗАЦИЯ:
Наименование: ${f.company_name||"________________"}
ЕИК: ${f.company_eik||"________________"}
Адрес: ${f.company_address||"________________"}
Представлявана от: ${f.manager_name||"________________"}, ЕГН: ${f.manager_egn||"________________"}

Д Е К Л А Р И Р А М,

че каним следното лице за бизнес посещение в Република България:

════════════════════════════════════════
ДАННИ НА ПОКАНВАНИЯ:

Три имена: ${f.guest_name||"________________"}
Гражданство: ${f.guest_citizenship||"________________"}
Номер на паспорта: ${f.guest_passport||"________________"}
Длъжност: ${f.guest_position||"________________"}

════════════════════════════════════════
ЦЕЛ НА ПОСЕЩЕНИЕТО: ${f.visit_purpose||"________________"}
СРОК НА ПРЕСТОЙ: ${f.visit_duration||"________________"}

════════════════════════════════════════

Декларираме, че поканеното от нас лице ще бъде изцяло издържано
от дружеството по време на престоя и ще бъде осигурено настаняване.

Известна ни е отговорността за деклариране на неверни обстоятелства.

Правно основание: чл. 17 от ЗЧРБ

════════════════════════════════════════

Дата: ${f.date||"__.__.__"}
Гр. ${f.city||"______"}

За ${f.company_name||"________________"}:
Управител: _________________  (${f.manager_name||""})
Печат на фирмата: [  ]

════════════════════════════════════════
ЗАВЕРЕНО ОТ ОРГАН НА МВР:
Дата: ___________    Служител: _________________    Печат: [  ]
`
  },
  {
    id: "m5", cat: "migration",
    ru: "Заявление об объединении семьи", en: "Family Reunification Application", bg: "Заявление за събиране на семейство",
    basis: "ЗЧРБ чл. 24, ал. 1, т. 5", source: "МВР Дирекция Миграция",
    info_ru: "Для воссоединения с супругом/детьми. Основной заявитель должен иметь действующее ВНЖ/ПМЖ.",
    info_en: "For reunification with spouse/children. Primary applicant must have valid residence permit.",
    docs_ru: "1. Паспорта обоих супругов\n2. Свидетельство о браке (с апостилем + перевод)\n3. Текущее разрешение на пребывание заявителя\n4. Подтверждение финансов и жилья\n5. Медицинская страховка",
    fields: [
      { key:"city", label:{ru:"Город (ОДМВР)", en:"City", bg:"Град"}, placeholder:"Бургас" },
      { key:"date", label:{ru:"Дата", en:"Date", bg:"Дата"}, placeholder:"01.01.2025" },
      { key:"applicant_name", label:{ru:"ФИО заявителя (с ВНЖ)", en:"Applicant name (with permit)", bg:"Три имена на заявителя (с ВНЖ)"}, placeholder:"IVAN PETROV IVANOV" },
      { key:"applicant_permit", label:{ru:"Номер разрешения на пребывание заявителя", en:"Applicant's residence permit number", bg:"Номер на разрешението за пребиваване"}, placeholder:"BG1234567" },
      { key:"applicant_address", label:{ru:"Адрес в Болгарии", en:"Address in Bulgaria", bg:"Адрес в България"}, placeholder:"гр. Бургас, ул. Александровска 1" },
      { key:"family_name", label:{ru:"ФИО члена семьи", en:"Family member full name", bg:"Три имена на члена на семейството"}, placeholder:"MARIA IVANOVA" },
      { key:"family_relation", label:{ru:"Степень родства", en:"Relationship", bg:"Степен на родство"}, placeholder:"съпруга / съпруг / дете" },
      { key:"family_citizenship", label:{ru:"Гражданство члена семьи", en:"Family member citizenship", bg:"Гражданство"}, placeholder:"Руска федерация" },
      { key:"family_passport", label:{ru:"Паспорт члена семьи", en:"Family member passport", bg:"Паспорт"}, placeholder:"700654321" },
      { key:"family_dob", label:{ru:"Дата рождения члена семьи", en:"Date of birth", bg:"Дата на раждане"}, placeholder:"15.05.1990" },
    ],
    generate: (f) => `ДО ДИРЕКТОРА НА ОБЛАСТНА ДИРЕКЦИЯ НА МВР
СЕКТОР "МИГРАЦИЯ" — ${f.city||"______"}

З А Я В Л Е Н И Е
за събиране на семейство
(на основание чл. 24, ал. 1, т. 5 от ЗЧРБ)

════════════════════════════════════════

ЗАЯВИТЕЛ (с право на пребиваване):
Три имена: ${f.applicant_name||"________________"}
Разрешение за пребиваване №: ${f.applicant_permit||"________________"}
Адрес в България: ${f.applicant_address||"________________"}

════════════════════════════════════════

ЧЛЕН НА СЕМЕЙСТВО, ЗА КОГОТО СЕ ПОДАВА ЗАЯВЛЕНИЕТО:
Три имена: ${f.family_name||"________________"}
Степен на родство: ${f.family_relation||"________________"}
Гражданство: ${f.family_citizenship||"________________"}
Номер на паспорта: ${f.family_passport||"________________"}
Дата на раждане: ${f.family_dob||"________________"}

════════════════════════════════════════

УВАЖАЕМИ ГОСПОДИН/ГОСПОЖО ДИРЕКТОР,

Моля да бъде предоставено право на пребиваване в Република България
на посочения член на моето семейство на основание събиране на семейство.

Прилагам изискуемите документи.

Правно основание: чл. 24, ал. 1, т. 5 от ЗЧРБ

════════════════════════════════════════
Дата: ${f.date||"__.__.__"}        Подпис: _________________
Гр. ${f.city||"______"}                        (${f.applicant_name||""})
`
  },
];

// ─── ШАБЛОНЫ: БТТП ───────────────────────────────────────────────────────────
const TEMPLATES_BCCI = [
  {
    id: "b1", cat: "bcci",
    ru: "Заявление о регистрации торгового представительства в БТТП", en: "BCCI Trade Representative Office Registration Application", bg: "Заявление за регистрация на търговско представителство в БТПП",
    basis: "ЗНИ чл. 24, ал. 1", source: "БТПП — Единен търговски регистър",
    info_ru: "Торговое представительство — не юридическое лицо, не вправе вести коммерческую деятельность. Регистрируется в Едином торговом реестре БТТП. После регистрации в БТТП — регистрация в БУЛСТАТ в течение 7 дней.",
    info_en: "A trade representative office is not a legal entity and may not conduct business activities. Registered in BCCI's Unified Trade Register. After BCCI registration, must register in BULSTAT within 7 days.",
    docs_ru: "1. Заявление (данная форма)\n2. Документ о регистрации иностранного юрлица в стране происхождения (легализованный + перевод)\n3. Решение о создании представительства (легализованное + перевод)\n4. Нотариально заверенная доверенность на представителя\n5. Документ о годовом обороте (мин. 100 000 лв) — для получения сертификата для ВНЖ\n6. Договор аренды/документ на помещение\n7. Уплата регистрационной пошлины БТТП",
    fields: [
      { key:"date", label:{ru:"Дата заявления", en:"Application date", bg:"Дата на заявлението"}, placeholder:"01.01.2025" },
      { key:"foreign_company", label:{ru:"Наименование иностранной компании", en:"Foreign company name", bg:"Наименование на чуждестранното лице"}, placeholder:"EXAMPLE COMPANY LLC" },
      { key:"foreign_country", label:{ru:"Страна регистрации", en:"Country of registration", bg:"Страна на регистрация"}, placeholder:"Руска федерация / Германия / ОАЕ" },
      { key:"foreign_reg_no", label:{ru:"Регистрационный номер в стране происхождения", en:"Registration number in home country", bg:"Рег. номер в страната на произход"}, placeholder:"ООО 1234567890" },
      { key:"foreign_address", label:{ru:"Адрес иностранной компании", en:"Foreign company address", bg:"Адрес на чуждестранното лице"}, placeholder:"Москва, ул. Примерная 1" },
      { key:"rep_name_bg", label:{ru:"Наименование представительства в Болгарии", en:"Representative office name in Bulgaria", bg:"Наименование на представителството в България"}, placeholder:"Примерна Компания — Представителство България" },
      { key:"rep_address", label:{ru:"Адрес представительства в Болгарии", en:"Representative office address in Bulgaria", bg:"Адрес на представителството в България"}, placeholder:"гр. София, ул. Раковски 1, офис 5" },
      { key:"rep_manager", label:{ru:"ФИО руководителя представительства", en:"Representative office manager name", bg:"Ръководител на представителството"}, placeholder:"Ivan Petrov Ivanov" },
      { key:"rep_manager_citizenship", label:{ru:"Гражданство руководителя", en:"Manager citizenship", bg:"Гражданство на ръководителя"}, placeholder:"Руска федерация / България" },
      { key:"activity", label:{ru:"Вид деятельности (рекламная/промо/проучвания)", en:"Activity type (advertising/promotion/market research)", bg:"Предмет на дейност на представителството"}, placeholder:"реклама и промоция на продуктите на чуждестранното лице" },
      { key:"authorized_person", label:{ru:"ФИО уполномоченного подавать заявление", en:"Authorized person name", bg:"Упълномощено лице за подаване"}, placeholder:"Maria Ivanova Petrova" },
    ],
    generate: (f) => `ДО
ИЗПЪЛНИТЕЛНИЯ СЪВЕТ НА
БЪЛГАРСКА ТЪРГОВСКО-ПРОМИШЛЕНА ПАЛАТА (БТПП)
гр. София, ул. Искър № 9

З А Я В Л Е Н И Е
за регистрация на търговско представителство на чуждестранно лице
в Единния търговски регистър на БТПП
(на основание чл. 24, ал. 1 от Закона за насърчаване на инвестициите)

════════════════════════════════════════

ДАННИ ЗА ЧУЖДЕСТРАННОТО ЛИЦЕ (ПРИНЦИПАЛ):

Наименование: ${f.foreign_company||"________________"}
Страна на регистрация: ${f.foreign_country||"________________"}
Рег. номер в страната на произход: ${f.foreign_reg_no||"________________"}
Адрес на управление: ${f.foreign_address||"________________"}

════════════════════════════════════════

ДАННИ ЗА ТЪРГОВСКОТО ПРЕДСТАВИТЕЛСТВО В БЪЛГАРИЯ:

Наименование: ${f.rep_name_bg||"________________"}
Адрес / Седалище: ${f.rep_address||"________________"}
Ръководител: ${f.rep_manager||"________________"} (${f.rep_manager_citizenship||"________________"})
Предмет на дейност: ${f.activity||"________________"}

════════════════════════════════════════

УВАЖАЕМИ ДАМИ И ГОСПОДА,

Моля да бъде регистрирано търговско представителство на посоченото
чуждестранно лице в Единния търговски регистър на БТПП.

Декларирам, че чуждестранното лице има право да извършва търговска
дейност съгласно националното законодателство на страната на регистрация.

Търговското представителство не е юридическо лице и няма да извършва
стопанска дейност на собствено основание (чл. 24, ал. 2 от ЗНИ).

Прилагам следните документи:
□ Документ за регистрация на чуждестранното лице (легализиран + превод)
□ Решение за учредяване на представителството (легализирано + превод)
□ Нотариално заверено пълномощно за управителя
□ Документ за адреса на представителството
□ Документ за платена такса

Правно основание: чл. 24 от Закона за насърчаване на инвестициите

════════════════════════════════════════
Дата: ${f.date||"__.__.__"}

Подава: ${f.authorized_person||"________________"}
Подпис: _________________
`
  },
  {
    id: "b2", cat: "bcci",
    ru: "Заявление о промене данных представительства БТТП", en: "BCCI Trade Representative Office Change of Data Application", bg: "Заявление за промяна на обстоятелства на търговско представителство",
    basis: "Правилник на БТПП", source: "БТПП — Единен търговски регистър",
    info_ru: "Подаётся при любых изменениях: смена адреса, руководителя, наименования. Срок — в разумные сроки после изменения.",
    info_en: "Filed for any changes: address, manager, name. Should be filed promptly after any change occurs.",
    docs_ru: "1. Данная форма\n2. Документы подтверждающие изменение\n3. Уплата пошлины за промену",
    fields: [
      { key:"date", label:{ru:"Дата", en:"Date", bg:"Дата"}, placeholder:"01.01.2025" },
      { key:"rep_name", label:{ru:"Наименование представительства", en:"Representative office name", bg:"Наименование на представителството"}, placeholder:"Примерна Компания — Представителство България" },
      { key:"bcci_reg_no", label:{ru:"Рег. номер в БТТП", en:"BCCI registration number", bg:"Рег. номер в БТПП"}, placeholder:"123/2020" },
      { key:"change_type", label:{ru:"Вид промены", en:"Type of change", bg:"Вид на промяната"}, placeholder:"промяна на адрес / промяна на ръководител / промяна на наименование" },
      { key:"old_data", label:{ru:"Старые данные", en:"Old data", bg:"Стари данни"}, placeholder:"стар адрес: гр. София, ул. Раковски 1" },
      { key:"new_data", label:{ru:"Новые данные", en:"New data", bg:"Нови данни"}, placeholder:"нов адрес: гр. София, бул. Витоша 20, офис 3" },
      { key:"authorized_person", label:{ru:"Уполномоченное лицо", en:"Authorized person", bg:"Упълномощено лице"}, placeholder:"Ivan Petrov Ivanov" },
    ],
    generate: (f) => `ДО
ИЗПЪЛНИТЕЛНИЯ СЪВЕТ НА БТПП
гр. София

З А Я В Л Е Н И Е
за промяна на вписани обстоятелства на търговско представителство

════════════════════════════════════════

Търговско представителство: ${f.rep_name||"________________"}
Рег. номер в БТПП: ${f.bcci_reg_no||"________________"}

════════════════════════════════════════

Вид на промяната: ${f.change_type||"________________"}

Стари данни:
${f.old_data||"________________"}

Нови данни:
${f.new_data||"________________"}

════════════════════════════════════════

Моля да бъде вписана посочената промяна в Единния търговски регистър на БТПП.

Прилагам документи, удостоверяващи промяната.

════════════════════════════════════════
Дата: ${f.date||"__.__.__"}

Подава: ${f.authorized_person||"________________"}
Подпис: _________________
`
  },
  {
    id: "b3", cat: "bcci",
    ru: "Заявление на сертификат БТТП для ВНЖ", en: "BCCI Certificate Application for Residence Permit", bg: "Заявление за издаване на сертификат от БТПП за ВНЖ",
    basis: "ППЗЧРБ чл. 19", source: "БТПП",
    info_ru: "Сертификат БТТП необходим для получения ВНЖ руководителем торгового представительства. Оборот компании должен быть минимум 100 000 лв за прошлый год.",
    info_en: "BCCI certificate required for residence permit of the representative office manager. Company turnover must be minimum 100,000 BGN for the previous year.",
    docs_ru: "1. Данная форма\n2. Документ о годовом обороте (мин. 100 000 лв)\n3. Актуальное состояние регистрации в БТТП\n4. Уплата пошлины",
    fields: [
      { key:"date", label:{ru:"Дата", en:"Date", bg:"Дата"}, placeholder:"01.01.2025" },
      { key:"rep_name", label:{ru:"Наименование представительства", en:"Representative office name", bg:"Наименование на представителството"}, placeholder:"Примерна Компания — Представителство България" },
      { key:"bcci_reg_no", label:{ru:"Рег. номер в БТТП", en:"BCCI reg. number", bg:"Рег. номер в БТПП"}, placeholder:"123/2020" },
      { key:"manager_name", label:{ru:"ФИО руководителя (для ВНЖ)", en:"Manager name (for residence permit)", bg:"Ръководител (за ВНЖ)"}, placeholder:"Ivan Petrov Ivanov" },
      { key:"manager_citizenship", label:{ru:"Гражданство руководителя", en:"Manager citizenship", bg:"Гражданство"}, placeholder:"Руска федерация" },
      { key:"turnover", label:{ru:"Годовой оборот (лв)", en:"Annual turnover (BGN)", bg:"Годишен оборот (лв)"}, placeholder:"250 000" },
      { key:"turnover_year", label:{ru:"За какой год оборот", en:"Turnover year", bg:"За коя година е оборотът"}, placeholder:"2024" },
      { key:"purpose", label:{ru:"Цель сертификата", en:"Certificate purpose", bg:"Цел на сертификата"}, placeholder:"за кандидатстване за продължително пребиваване по чл. 24 от ЗЧРБ" },
    ],
    generate: (f) => `ДО
ИЗПЪЛНИТЕЛНИЯ СЪВЕТ НА БТПП

З А Я В Л Е Н И Е
за издаване на Сертификат с данни от Търговския регистър на БТПП
(за кандидатстване за разрешение за пребиваване по чл. 19, ал. 1 от ППЗЧРБ)

════════════════════════════════════════

Търговско представителство: ${f.rep_name||"________________"}
Рег. номер в БТПП: ${f.bcci_reg_no||"________________"}

Ръководител, за когото се иска сертификатът:
${f.manager_name||"________________"} (${f.manager_citizenship||"________________"})

════════════════════════════════════════

Годишен оборот на чуждестранното лице за ${f.turnover_year||"____"} г.:
${f.turnover||"________________"} лева

(минималното изискване е 100 000 лева)

════════════════════════════════════════

Цел на сертификата: ${f.purpose||"________________"}

════════════════════════════════════════

Моля да ни бъде издаден Сертификат с данни от Търговския регистър на БТПП
за актуалния статут на представителството, необходим за кандидатстване
за разрешение за пребиваване.

Прилагам документ за годишен оборот и квитанция за платена такса.

════════════════════════════════════════
Дата: ${f.date||"__.__.__"}

Подпис: _________________  (${f.manager_name||""})
`
  },
];

// ─── ОБЩИЕ ПРАВОВЫЕ ШАБЛОНЫ ──────────────────────────────────────────────────
const TEMPLATES_GENERAL = [
  {
    id: "g1", cat: "contract",
    ru: "Договор аренды жилья", en: "Residential Lease Agreement", bg: "Договор за наем на жилище",
    basis: "ЗЗД чл. 228-239", source: "",
    info_ru: "", info_en: "", docs_ru: "",
    fields: [
      { key:"date", label:{ru:"Дата договора", en:"Contract date", bg:"Дата"}, placeholder:"01.01.2025" },
      { key:"city", label:{ru:"Город", en:"City", bg:"Град"}, placeholder:"Бургас" },
      { key:"landlord_name", label:{ru:"ФИО арендодателя", en:"Landlord full name", bg:"Три имена на наемодателя"}, placeholder:"Иван Иванов Иванов" },
      { key:"landlord_egn", label:{ru:"ЕГН арендодателя", en:"Landlord EGN", bg:"ЕГН на наемодателя"}, placeholder:"7501011234" },
      { key:"tenant_name", label:{ru:"ФИО арендатора", en:"Tenant full name", bg:"Три имена на наемателя"}, placeholder:"Пётр Петров Петров" },
      { key:"tenant_egn", label:{ru:"ЕГН/ЛНЧ арендатора", en:"Tenant EGN/PNF", bg:"ЕГН/ЛНЧ на наемателя"}, placeholder:"8502021234" },
      { key:"address", label:{ru:"Адрес объекта", en:"Property address", bg:"Адрес на имота"}, placeholder:"гр. Бургас, ул. Александровска 1, ет. 3, ап. 7" },
      { key:"rent", label:{ru:"Арендная плата (лв/мес)", en:"Monthly rent (BGN)", bg:"Наемна цена (лв/мес)"}, placeholder:"600" },
      { key:"deposit", label:{ru:"Депозит (лв)", en:"Deposit (BGN)", bg:"Депозит (лв)"}, placeholder:"1200" },
      { key:"term", label:{ru:"Срок договора", en:"Contract term", bg:"Срок на договора"}, placeholder:"12 месеца" },
    ],
    generate: (f) => `ДОГОВОР ЗА НАЕМ / ДОГОВОР АРЕНДЫ

Днес, ${f.date||"__.__.__"} г., в гр. ${f.city||"______"},

НАЕМОДАТЕЛ: ${f.landlord_name||"________________"}, ЕГН: ${f.landlord_egn||"__________"}

НАЕМАТЕЛ: ${f.tenant_name||"________________"}, ЕГН/ЛНЧ: ${f.tenant_egn||"__________"}

Чл. 1. ПРЕДМЕТ
Наемодателят предоставя за временно ползване:
${f.address||"________________________________"}

Чл. 2. НАЕМНА ЦЕНА
${f.rent||"___"} лева / месец, платима до 5-то число.

Чл. 3. ДЕПОЗИТ
Гаранционен депозит: ${f.deposit||"___"} лева.

Чл. 4. СРОК
${f.term||"___"}.

Чл. 5. ЗАДЪЛЖЕНИЯ НА НАЕМАТЕЛЯ
5.1. Да ползва имота само за жилищни нужди.
5.2. Да заплаща наема в срок и консумативите.
5.3. Да не пренаема без писмено съгласие.

Чл. 6. ПРЕКРАТЯВАНЕ
С едномесечно предизвестие от всяка страна.

Правно основание: ЗЗД, чл. 228-239

НАЕМОДАТЕЛ: _________________  (${f.landlord_name||""})
НАЕМАТЕЛ:   _________________  (${f.tenant_name||""})
`
  },
  {
    id: "g2", cat: "contract",
    ru: "Трудовой договор", en: "Employment Contract", bg: "Трудов договор",
    basis: "КТ чл. 62-70", source: "",
    info_ru: "", info_en: "", docs_ru: "",
    fields: [
      { key:"date", label:{ru:"Дата", en:"Date", bg:"Дата"}, placeholder:"01.01.2025" },
      { key:"employer", label:{ru:"Название компании", en:"Company name", bg:"Наименование на фирмата"}, placeholder:"Примерна Фирма ЕООД" },
      { key:"eik", label:{ru:"ЕИК", en:"EIK", bg:"ЕИК"}, placeholder:"123456789" },
      { key:"manager", label:{ru:"Управляющий", en:"Manager", bg:"Управител"}, placeholder:"Иван Петров Иванов" },
      { key:"employee", label:{ru:"ФИО работника", en:"Employee name", bg:"Три имена на работника"}, placeholder:"Мария Иванова Петрова" },
      { key:"egn", label:{ru:"ЕГН работника", en:"Employee EGN", bg:"ЕГН на работника"}, placeholder:"9001011234" },
      { key:"position", label:{ru:"Должность", en:"Position", bg:"Длъжност"}, placeholder:"Счетоводител" },
      { key:"salary", label:{ru:"Оклад брутто (лв)", en:"Gross salary (BGN)", bg:"Брутна заплата (лв)"}, placeholder:"2500" },
      { key:"hours", label:{ru:"Рабочее время", en:"Working hours", bg:"Работно време"}, placeholder:"8 часа дневно, 40 часа седмично" },
      { key:"term", label:{ru:"Срок", en:"Term", bg:"Срок"}, placeholder:"безсрочен" },
    ],
    generate: (f) => `ТРУДОВ ДОГОВОР / ТРУДОВОЙ ДОГОВОР

Днес, ${f.date||"__.__.__"} г.

РАБОТОДАТЕЛ: ${f.employer||"________________"}, ЕИК: ${f.eik||"__________"},
представляван от ${f.manager||"________________"}

РАБОТНИК: ${f.employee||"________________"}, ЕГН: ${f.egn||"__________"}

Чл. 1. Работодателят назначава Работника на длъжност: ${f.position||"________________"}.

Чл. 2. Основното трудово възнаграждение е ${f.salary||"___"} лева брутно месечно.

Чл. 3. Работното време е: ${f.hours||"________________"}.

Чл. 4. Договорът е ${f.term||"________________"}.

Чл. 5. Платеният годишен отпуск е 20 работни дни.

Чл. 6. Страните се задължават да спазват КТ и вътрешните правила.

Правно основание: Кодекс на труда, чл. 62-70

РАБОТОДАТЕЛ: _________________  (${f.manager||""})
РАБОТНИК:    _________________  (${f.employee||""})
`
  },
  {
    id: "g3", cat: "lawsuit",
    ru: "Иск о взыскании долга", en: "Debt Collection Claim", bg: "Иск за парично вземане",
    basis: "ЗЗД чл. 79, ГПК чл. 127", source: "",
    info_ru: "", info_en: "", docs_ru: "",
    fields: [
      { key:"court", label:{ru:"Районный суд (город)", en:"District court (city)", bg:"Районен съд (град)"}, placeholder:"Бургас" },
      { key:"date", label:{ru:"Дата", en:"Date", bg:"Дата"}, placeholder:"01.01.2025" },
      { key:"plaintiff_name", label:{ru:"ФИО истца", en:"Plaintiff name", bg:"Три имена на ищеца"}, placeholder:"Иван Иванов Иванов" },
      { key:"plaintiff_egn", label:{ru:"ЕГН истца", en:"Plaintiff EGN", bg:"ЕГН на ищеца"}, placeholder:"7501011234" },
      { key:"plaintiff_address", label:{ru:"Адрес истца", en:"Plaintiff address", bg:"Адрес на ищеца"}, placeholder:"гр. Бургас, ул. Примерна 1" },
      { key:"defendant_name", label:{ru:"ФИО ответчика", en:"Defendant name", bg:"Три имена на ответника"}, placeholder:"Петър Петров Петров" },
      { key:"defendant_address", label:{ru:"Адрес ответчика", en:"Defendant address", bg:"Адрес на ответника"}, placeholder:"гр. София, ул. Примерна 2" },
      { key:"amount", label:{ru:"Сумма иска (лв)", en:"Claim amount (BGN)", bg:"Цена на иска (лв)"}, placeholder:"5000" },
      { key:"basis_doc", label:{ru:"Основание долга", en:"Debt basis", bg:"Основание на задължението"}, placeholder:"договор за заем от 01.06.2024" },
      { key:"debt_date", label:{ru:"Дата возникновения долга", en:"Debt date", bg:"Дата на задължението"}, placeholder:"01.06.2024" },
    ],
    generate: (f) => `ДО РАЙОНЕН СЪД — ${f.court||"______"}

ИСКОВА МОЛБА / ИСКОВОЕ ЗАЯВЛЕНИЕ

ИЩЕЦ: ${f.plaintiff_name||"________________"}, ЕГН: ${f.plaintiff_egn||"__________"}
Адрес: ${f.plaintiff_address||"________________"}

ОТВЕТНИК: ${f.defendant_name||"________________"}
Адрес: ${f.defendant_address||"________________"}

ЦЕНА НА ИСКА: ${f.amount||"___"} лева

════════════════════════════════════════

Моля да постановите решение, с което да осъдите Ответника да заплати
сумата от ${f.amount||"___"} лева, представляваща задължение по
${f.basis_doc||"________________"} от ${f.debt_date||"__"}.

ПРАВНО ОСНОВАНИЕ: чл. 79 ЗЗД вр. чл. 127 ГПК

МОЛЯ СЪДА:
1. Да осъди Ответника да заплати исковата сума.
2. Да осъди Ответника в разноски по делото.

Прилагам: 1. Документ за задължението; 2. Покана; 3. Държавна такса.

════════════════════════════════════════
Дата: ${f.date||"__.__.__"}
Ищец: _________________  (${f.plaintiff_name||""})
`
  },
  {
    id: "g4", cat: "complaint",
    ru: "Претензия потребителя", en: "Consumer Complaint", bg: "Рекламация на потребител",
    basis: "ЗЗП чл. 113-114", source: "",
    info_ru: "", info_en: "", docs_ru: "",
    fields: [
      { key:"date", label:{ru:"Дата", en:"Date", bg:"Дата"}, placeholder:"01.01.2025" },
      { key:"sender_name", label:{ru:"Ваше ФИО", en:"Your name", bg:"Вашите три имена"}, placeholder:"Иван Иванов Иванов" },
      { key:"sender_address", label:{ru:"Ваш адрес", en:"Your address", bg:"Вашият адрес"}, placeholder:"гр. Бургас, ул. Примерна 1" },
      { key:"company", label:{ru:"Компания-ответчик", en:"Defendant company", bg:"Фирма"}, placeholder:"Магазин Примерен ЕООД" },
      { key:"product", label:{ru:"Товар/услуга", en:"Product/service", bg:"Стока/услуга"}, placeholder:"телевизор Samsung" },
      { key:"buy_date", label:{ru:"Дата покупки", en:"Purchase date", bg:"Дата на покупката"}, placeholder:"15.12.2024" },
      { key:"amount", label:{ru:"Сумма (лв)", en:"Amount (BGN)", bg:"Сума (лв)"}, placeholder:"850" },
      { key:"problem", label:{ru:"Описание проблемы", en:"Problem", bg:"Проблем"}, placeholder:"не работи екранът" },
      { key:"request", label:{ru:"Требование", en:"Request", bg:"Искане"}, placeholder:"връщане на заплатената сума" },
    ],
    generate: (f) => `ДО: ${f.company||"________________"}

РЕКЛАМАЦИЯ / ПРЕТЕНЗИЯ

От: ${f.sender_name||"________________"}, адрес: ${f.sender_address||"________________"}

На ${f.buy_date||"__"} закупих ${f.product||"________________"} на стойност ${f.amount||"___"} лева.

Установих недостатък: ${f.problem||"________________"}.

На основание чл. 113-114 от ЗЗП, претендирам: ${f.request||"________________"}.

Моля в 14-дневен срок да предприемете необходимите действия.
При неудовлетворяване ще се обърна към КЗП и съда.

Правно основание: ЗЗП, чл. 113-114

Дата: ${f.date||"__.__.__"}
Подпис: _________________  (${f.sender_name||""})
`
  },
  {
    id: "g5", cat: "property",
    ru: "Предварительный договор купли-продажи недвижимости", en: "Preliminary Real Estate Purchase Agreement", bg: "Предварителен договор за покупко-продажба",
    basis: "ЗЗД чл. 19", source: "",
    info_ru: "Подписывается до нотариальной сделки. Не требует нотариального заверения. При нарушении продавцом — капаро возвращается в двойном размере. При нарушении покупателем — капаро теряется.",
    info_en: "Signed before notarial deed. No notarization required. Seller breach — double deposit returned. Buyer breach — deposit forfeited.",
    docs_ru: "Продавец предоставляет:\n1. Нотариальный акт о собственности\n2. Удостоверение за тежести\n3. Удостоверение за данъчна оценка\n4. Акт 16",
    fields: [
      { key:"date", label:{ru:"Дата", en:"Date", bg:"Дата"}, placeholder:"01.01.2025" },
      { key:"city", label:{ru:"Город", en:"City", bg:"Град"}, placeholder:"Бургас" },
      { key:"seller_name", label:{ru:"ФИО продавца", en:"Seller", bg:"Продавач"}, placeholder:"Иван Иванов Иванов" },
      { key:"seller_egn", label:{ru:"ЕГН продавца", en:"Seller EGN", bg:"ЕГН продавач"}, placeholder:"7501011234" },
      { key:"seller_address", label:{ru:"Адрес продавца", en:"Seller address", bg:"Адрес продавач"}, placeholder:"гр. Бургас, ул. Примерна 1" },
      { key:"buyer_name", label:{ru:"ФИО покупателя", en:"Buyer", bg:"Купувач"}, placeholder:"Пётр Петров Петров" },
      { key:"buyer_egn", label:{ru:"ЕГН/ЛНЧ покупателя", en:"Buyer EGN/PNF", bg:"ЕГН/ЛНЧ купувач"}, placeholder:"8502021234" },
      { key:"buyer_address", label:{ru:"Адрес покупателя", en:"Buyer address", bg:"Адрес купувач"}, placeholder:"гр. София, ул. Примерна 2" },
      { key:"property_desc", label:{ru:"Описание имущества", en:"Property", bg:"Имот"}, placeholder:"Апартамент №7, ет.3, гр. Бургас, 65 кв.м." },
      { key:"cadastral", label:{ru:"Кадастральный номер", en:"Cadastral №", bg:"Кадастрален №"}, placeholder:"67338.604.125.1.7" },
      { key:"notarial_act", label:{ru:"Нотариальный акт №", en:"Deed №", bg:"Нот. акт №"}, placeholder:"№ 123, том II, рег. 4567/2020" },
      { key:"price", label:{ru:"Цена (лв)", en:"Price (BGN)", bg:"Цена (лв)"}, placeholder:"120000" },
      { key:"deposit", label:{ru:"Капаро (лв)", en:"Deposit (BGN)", bg:"Капаро (лв)"}, placeholder:"12000" },
      { key:"deadline", label:{ru:"Срок до", en:"Deadline", bg:"Срок"}, placeholder:"01.06.2025" },
      { key:"notary_city", label:{ru:"Город нотариуса", en:"Notary city", bg:"Град нотариус"}, placeholder:"Бургас" },
    ],
    generate: (f) => `ПРЕДВАРИТЕЛЕН ДОГОВОР
ЗА ПОКУПКО-ПРОДАЖБА НА НЕДВИЖИМ ИМОТ
(чл. 19 ЗЗД)

Днес, ${f.date||"__.__.__"} г., гр. ${f.city||"______"}

ПРОДАВАЧ: ${f.seller_name||"________________"}, ЕГН: ${f.seller_egn||"__________"}
Адрес: ${f.seller_address||"________________"}

КУПУВАЧ: ${f.buyer_name||"________________"}, ЕГН/ЛНЧ: ${f.buyer_egn||"__________"}
Адрес: ${f.buyer_address||"________________"}

════════════════════════════════════════
чл. 1. ПРЕДМЕТ
Имот: ${f.property_desc||"________________________________"}
Кадастрален №: ${f.cadastral||"________________"}
Нот. акт: ${f.notarial_act||"________________"}
ПРОДАВАЧЪТ декларира липса на тежести, възбрани и ипотеки.

════════════════════════════════════════
чл. 2. ЦЕНА И КАПАРО
Продажна цена: ${f.price||"______"} лв
Капаро при подписване: ${f.deposit||"______"} лв
Остатък при нот. акт: ${f.price && f.deposit ? String(parseInt(f.price)-parseInt(f.deposit)) : "______"} лв

════════════════════════════════════════
чл. 3. СРОК
Нотариален акт пред нотариус в гр. ${f.notary_city||"______"}
в срок до: ${f.deadline||"__.__.__"} г.

════════════════════════════════════════
чл. 4. НЕУСТОЙКИ
Вина на КУПУВАЧА → ПРОДАВАЧЪТ задържа капарото.
Вина на ПРОДАВАЧА → връща капарото в двоен размер: ${f.deposit ? String(parseInt(f.deposit)*2) : "______"} лв.
(чл. 19, ал. 3 ЗЗД — право на обявяване за окончателен)

чл. 5. Нотариалните такси и данъкът се заплащат от КУПУВАЧА.

════════════════════════════════════════
Дата: ${f.date||"__.__.__"}    Гр. ${f.city||"______"}

ПРОДАВАЧ: _________________  (${f.seller_name||""})
КУПУВАЧ:  _________________  (${f.buyer_name||""})
`
  },
  {
    id: "g6", cat: "property",
    ru: "Декларация по чл. 25 ЗННД (гражданство и семейное положение)", en: "Declaration Art. 25 NNDA", bg: "Декларация по чл. 25 ЗННД",
    basis: "ЗННД чл. 25, ал. 8", source: "Нотариус",
    info_ru: "Обязательная декларация при нотариальных сделках. Подписывается лично перед нотариусом. Ложные сведения — ст. 313 НК.",
    info_en: "Mandatory for notarial transactions. Signed personally before notary.",
    docs_ru: "Подписывается лично перед нотариусом.",
    fields: [
      { key:"date", label:{ru:"Дата", en:"Date", bg:"Дата"}, placeholder:"01.01.2025" },
      { key:"name", label:{ru:"ФИО", en:"Full name", bg:"Три имена"}, placeholder:"Иван Иванов Иванов" },
      { key:"dob", label:{ru:"Дата рождения", en:"DOB", bg:"Дата на раждане"}, placeholder:"28.09.1981" },
      { key:"pob", label:{ru:"Место рождения", en:"Place of birth", bg:"Място на раждане"}, placeholder:"гор. Москва, СССР" },
      { key:"citizenship", label:{ru:"Гражданство", en:"Citizenship", bg:"Гражданство"}, placeholder:"Российская Федерация" },
      { key:"gender", label:{ru:"Пол", en:"Gender", bg:"Пол"}, placeholder:"мужской / женский" },
      { key:"passport_ru", label:{ru:"Внутренний паспорт РФ", en:"Russian passport", bg:"Вътрешен паспорт"}, placeholder:"серия/номер, кем выдан, дата выдачи" },
      { key:"passport_foreign", label:{ru:"Загранпаспорт", en:"Foreign passport", bg:"Задграничен паспорт"}, placeholder:"P RUS №..., МВД ..., от ..., до ..." },
      { key:"address_ru", label:{ru:"Адрес регистрации", en:"Registration address", bg:"Адрес"}, placeholder:"Россия, г. Москва, ул. ..." },
      { key:"eik_bg", label:{ru:"ЛНЧ/ЕИК в Болгарии", en:"PNF/EIK Bulgaria", bg:"ЛНЧ/ЕИК в България"}, placeholder:"1234567890" },
      { key:"marital_status", label:{ru:"Семейное положение", en:"Marital status", bg:"Семейно положение"}, placeholder:"женат / не женат / замужем / вдовец / разведён" },
      { key:"spouse_name", label:{ru:"ФИО и дата рожд. супруга/и", en:"Spouse name & DOB", bg:"Съпруг/а и дата"}, placeholder:"Мария Иванова, 08.01.1987" },
      { key:"marriage_date", label:{ru:"Дата и св-во о браке", en:"Marriage certificate", bg:"Акт за брак"}, placeholder:"01.09.2010, св-во серия № ..." },
      { key:"prev_marriages", label:{ru:"Предыдущие браки", en:"Previous marriages", bg:"Предишни бракове"}, placeholder:"есть / нет" },
    ],
    generate: (f) => `ДЕКЛАРАЦИЯ
по чл. 25, ал. 8 от Закона за нотариусите и нотариалната дейност

Аз, долуподписаният/ата, гр. ${f.name||"________________"},
${f.dob||"__.__.__"} г.р., место рождения: ${f.pob||"________________"},
гражданство: ${f.citizenship||"________________"}, пол: ${f.gender||"________________"},

паспорт: ${f.passport_ru||"________________"},
загранпаспорт: ${f.passport_foreign||"________________"},
адрес: ${f.address_ru||"________________"},
ЛНЧ/ЕИК в НАП България: ${f.eik_bg||"________________"},

ДЕКЛАРИРАМ:

1. Гражданство: ${f.citizenship||"________________"}

2. Постоянен адрес: ${f.address_ru||"________________"}

3. Семейно положение: ${f.marital_status||"________________"}
${f.spouse_name ? "   Съпруг/а: " + f.spouse_name : ""}
${f.marriage_date ? "   Брак сключен: " + f.marriage_date : ""}

4. Предишни бракове: ${f.prev_marriages||"________________"}

Известна ми е наказателната отговорност по чл. 313 от НК
за деклариране на неверни обстоятелства.

════════════════════════════════════════
Дата: ${f.date||"__.__.__"}

ДЕКЛАРАТОР: _________________  (${f.name||""})
`
  },
  {
    id: "g7", cat: "property",
    ru: "Декларация по чл. 42 ЗМИП (против отмывания денег)", en: "Declaration Art. 42 AMLA (anti-money laundering)", bg: "Декларация по чл. 42 ЗМИП",
    basis: "ЗМИП чл. 42, ал. 2, т. 2", source: "Нотариус",
    info_ru: "Обязательная декларация при нотариальных сделках с недвижимостью. Декларирует что лицо не является политически значимым (PEP).",
    info_en: "Mandatory for notarial real estate transactions. Declares person is not a politically exposed person (PEP).",
    docs_ru: "Подписывается лично перед нотариусом.",
    fields: [
      { key:"date", label:{ru:"Дата", en:"Date", bg:"Дата"}, placeholder:"01.01.2025" },
      { key:"name", label:{ru:"ФИО", en:"Full name", bg:"Три имена"}, placeholder:"Иван Иванов Иванов" },
      { key:"dob", label:{ru:"Дата рождения", en:"DOB", bg:"Дата на раждане"}, placeholder:"28.09.1981" },
      { key:"pob", label:{ru:"Место рождения", en:"Place of birth", bg:"Място на раждане"}, placeholder:"гор. Москва, СССР" },
      { key:"citizenship", label:{ru:"Гражданство", en:"Citizenship", bg:"Гражданство"}, placeholder:"Российская Федерация" },
      { key:"passport_foreign", label:{ru:"Загранпаспорт", en:"Passport", bg:"Паспорт"}, placeholder:"P RUS №..., МВД ..., до ..." },
      { key:"address_ru", label:{ru:"Адрес", en:"Address", bg:"Адрес"}, placeholder:"Россия, г. Москва, ул. ..." },
      { key:"eik_bg", label:{ru:"ЛНЧ/ЕИК в Болгарии", en:"PNF/EIK Bulgaria", bg:"ЛНЧ/ЕИК в България"}, placeholder:"1234567890" },
    ],
    generate: (f) => `ДЕКЛАРАЦИЯ
по чл. 42, ал. 2, т. 2 от ЗМИП
Приложение № 1 към чл. 26, ал. 1

Аз, долуподписаният/ата, гр. ${f.name||"________________"},
${f.dob||"__.__.__"} г.р., место рождения: ${f.pob||"________________"},
гражданство: ${f.citizenship||"________________"},
паспорт: ${f.passport_foreign||"________________"},
адрес: ${f.address_ru||"________________"},
ЛНЧ/ЕИК в НАП: ${f.eik_bg||"________________"},

ЗАЯВЯВАМ:

[X] НЕ подпадам под категориите по чл. 36, ал. 2 от ЗМИП
    (политически значими лица).

[X] За последните 12 месеца НЕ подпадах под категориите
    по чл. 36, ал. 2 от ЗМИП.

[X] НЕ подпадам под категориите по чл. 36, ал. 5 от ЗМИП
    (свързани с политически значими лица).

[X] За последните 12 месеца НЕ подпадах под категориите
    по чл. 36, ал. 5 от ЗМИП.

Известна ми е наказателната отговорност по чл. 313 от НК
за деклариране на неверни обстоятелства.

════════════════════════════════════════
Дата: ${f.date||"__.__.__"}

ДЕКЛАРАТОР: _________________  (${f.name||""})
`
  },
  {
    id: "g8", cat: "property",
    ru: "Пълномощно за продажба на недвижим имот", en: "Power of Attorney for Real Estate Sale", bg: "Пълномощно за продажба на недвижим имот",
    basis: "ЗЗД чл. 36-43, ЗННД", source: "Нотариус",
    info_ru: "Для россиян: заверяется у российского нотариуса с апостилем, затем перевод на болгарский язык. Без нотариального заверения — недействительна.",
    info_en: "For Russians: notarized in Russia with apostille, then Bulgarian translation required.",
    docs_ru: "Российский нотариус → апостиль → перевод на болгарский → принимается в Болгарии.",
    fields: [
      { key:"date", label:{ru:"Дата и город (Россия)", en:"Date and city (Russia)", bg:"Дата и град (Русия)"}, placeholder:"__ августа 2025 года, город Москва" },
      { key:"principal_name", label:{ru:"ФИО доверителя", en:"Principal name", bg:"Упълномощител"}, placeholder:"Иван Иванов Иванов" },
      { key:"principal_dob", label:{ru:"Дата рождения", en:"DOB", bg:"Дата на раждане"}, placeholder:"28.09.1981" },
      { key:"principal_passport_ru", label:{ru:"Внутренний паспорт РФ", en:"Russian passport", bg:"Вътрешен паспорт"}, placeholder:"серия №, кем выдан, дата" },
      { key:"principal_passport_foreign", label:{ru:"Загранпаспорт", en:"Foreign passport", bg:"Задграничен паспорт"}, placeholder:"P RUS №..., МВД ..., от ..., до ..." },
      { key:"principal_address", label:{ru:"Адрес доверителя", en:"Principal address", bg:"Адрес"}, placeholder:"Россия, г. Москва, ул. ..." },
      { key:"principal_eik", label:{ru:"ЛНЧ/ЕИК в Болгарии", en:"PNF/EIK Bulgaria", bg:"ЛНЧ/ЕИК в България"}, placeholder:"1234567890" },
      { key:"agent_name", label:{ru:"ФИО поверенного", en:"Agent name", bg:"Пълномощник"}, placeholder:"Мария Петрова Иванова" },
      { key:"agent_egn", label:{ru:"ЕГН/ЛНЧ поверенного", en:"Agent EGN/PNF", bg:"ЕГН/ЛНЧ пълномощник"}, placeholder:"8701087890" },
      { key:"property_desc", label:{ru:"Описание имущества", en:"Property", bg:"Имот"}, placeholder:"Апартамент № 15, ет.1, комплекс ..., гр. Свети Влас, общ. Несебър" },
      { key:"cadastral", label:{ru:"Кадастральный идентификатор", en:"Cadastral ID", bg:"Кадастрален идентификатор"}, placeholder:"51500.506.331.1.15" },
      { key:"notarial_act", label:{ru:"Нотариальный акт", en:"Notarial deed", bg:"Нотариален акт"}, placeholder:"№ ..., том ..., рег. №..., дело №.../год" },
      { key:"price_eur", label:{ru:"Цена не менее (EUR)", en:"Price not less than (EUR)", bg:"Цена не по-малко от (EUR)"}, placeholder:"85000" },
      { key:"bank_account", label:{ru:"Банковский счёт продавца", en:"Seller bank account", bg:"Банкова сметка"}, placeholder:"IBAN ..., AO Raiffeisenbank, SWIFT: RZBMRUMM" },
      { key:"validity", label:{ru:"Срок действия", en:"Validity", bg:"Срок"}, placeholder:"три года" },
    ],
    generate: (f) => `ДОВЕРЕННОСТЬ

${f.date||"________________"}.

Я, гр. ${f.principal_name||"________________"},
${f.principal_dob||"__.__.__"} г.р.,
паспорт: ${f.principal_passport_ru||"________________"},
загранпаспорт: ${f.principal_passport_foreign||"________________"},
адрес: ${f.principal_address||"________________"},
ЛНЧ/ЕИК в Болгарии: ${f.principal_eik||"________________"},

НАСТОЯЩЕЙ ДОВЕРЕННОСТЬЮ УПОЛНОМОЧИВАЮ

гр. ${f.agent_name||"________________"}, ЕГН/ЛНЧ: ${f.agent_egn||"________________"},

════════════════════════════════════════
ИМУЩЕСТВО:
${f.property_desc||"________________________________"}
Кадастральный идентификатор: ${f.cadastral||"________________"}
Нотариальный акт: ${f.notarial_act||"________________"}

════════════════════════════════════════
ПОЛНОМОЧИЯ:

1. Представлять меня при продаже указанного имущества
   по цене не менее ${f.price_eur||"______"} EUR.

2. Подписывать предварительный договор и нотариальный акт.

3. Получать продажную цену и перечислять на счёт:
   ${f.bank_account||"________________"}

4. Представлять меня в НАП, Агентстве по вписванията,
   общине и всех органах Болгарии.

5. Подписывать декларации по чл. 25 ЗННД и чл. 42 ЗМИП.

6. Заявить что я не числюсь в санкционных списках ЕС
   (Регламенты № 833/2014 и 2022/878).

Доверенность выдана сроком на ${f.validity||"три года"}, без права передоверия.

════════════════════════════════════════
Доверитель: _________________  (${f.principal_name||""})

НОТАРИАЛЬНОЕ УДОСТОВЕРЕНИЕ:
Нотариус: _________________
Рег. №: _______  Печат: [  ]

⚠️ Требуется: нотариальное заверение + апостиль + перевод на болгарский!
`
  },
];

const TEMPLATES_NOTARY = [
  {
    id: "n1", cat: "notary",
    ru: "Декларация по чл. 264 ДОПК (об отсутствии налоговых задолженностей)", en: "Declaration Art. 264 TIPA (no tax debts)", bg: "Декларация по чл. 264 ДОПК (липса на данъчни задължения)",
    basis: "ДОПК чл. 264", source: "Нотариус / НАП",
    info_ru: "Обязательная декларация при каждой нотариальной сделке с недвижимостью. Декларирует отсутствие публичных задолженностей у продавца. Нотариус обязан проверить через НАП.",
    info_en: "Mandatory for every notarial real estate transaction. Declares absence of public debts. Notary must verify with NRA.",
    docs_ru: "Подписывается лично перед нотариусом. Нотариус направляет запрос в НАП электронно.",
    fields: [
      { key:"date", label:{ru:"Дата", en:"Date", bg:"Дата"}, placeholder:"01.01.2025" },
      { key:"name", label:{ru:"ФИО декларатора", en:"Full name", bg:"Три имена"}, placeholder:"Иван Иванов Иванов" },
      { key:"dob", label:{ru:"Дата рождения", en:"DOB", bg:"Дата на раждане"}, placeholder:"28.09.1981" },
      { key:"citizenship", label:{ru:"Гражданство", en:"Citizenship", bg:"Гражданство"}, placeholder:"Российская Федерация" },
      { key:"passport", label:{ru:"Паспорт/загранпаспорт", en:"Passport", bg:"Паспорт"}, placeholder:"P RUS №..., МВД ..., до ..." },
      { key:"address", label:{ru:"Адрес", en:"Address", bg:"Адрес"}, placeholder:"Россия, г. Москва, ул. ..." },
      { key:"eik_bg", label:{ru:"ЛНЧ/ЕИК в НАП Болгарии", en:"PNF/EIK NRA Bulgaria", bg:"ЛНЧ/ЕИК в НАП"}, placeholder:"1234567890" },
      { key:"property_desc", label:{ru:"Описание имущества (предмет сделки)", en:"Property description", bg:"Описание на имота"}, placeholder:"Апартамент №7, ет.3, гр. Бургас, 65 кв.м." },
      { key:"notary_name", label:{ru:"Нотариус (ФИО/рег. №)", en:"Notary", bg:"Нотариус"}, placeholder:"Иван Петров, рег. № 123, Бургас" },
    ],
    generate: (f) => `ДЕКЛАРАЦИЯ
по чл. 264, ал. 1 и ал. 2 от Данъчно-осигурителния процесуален кодекс
(ДОПК)

Аз, долуподписаният/ата, гр. ${f.name||"________________"},
${f.dob||"__.__.__"} г.р., гражданство: ${f.citizenship||"________________"},
паспорт: ${f.passport||"________________"},
адрес: ${f.address||"________________"},
ЛНЧ/ЕИК в НАП: ${f.eik_bg||"________________"},

ДЕКЛАРИРАМ,

че към датата на настоящото нотариално производство:

1. НЯМАМ непогасени публични задължения, подлежащи на
   принудително изпълнение — данъци, осигуровки, глоби и
   други публични вземания към държавата и общините.

2. Запознат/а съм с разпоредбите на чл. 264, ал. 1 и ал. 2
   от ДОПК.

3. В случай на установяване на публични задължения,
   СЪГЛАСЯВАМ СЕ те да бъдат погасени от продажната цена
   на следния имот:

   ${f.property_desc||"________________________________"}

Нотариус: ${f.notary_name||"________________"}

Известна ми е наказателната отговорност по чл. 313 от НК
за деклариране на неверни обстоятелства.

Правно основание: чл. 264 от ДОПК

════════════════════════════════════════
Дата: ${f.date||"__.__.__"}

ДЕКЛАРАТОР: _________________  (${f.name||""})
`
  },
  {
    id: "n2", cat: "notary",
    ru: "Заявление за постоянен адрес (в Общину)", en: "Permanent Address Registration (Municipality)", bg: "Заявление за вписване на постоянен адрес",
    basis: "ЗГР чл. 93-96", source: "Община",
    info_ru: "Подаётся лично в Общину по месту нахождения имущества. Постоянный адрес (постоянен адрес) — основной адрес регистрации в Болгарии. Необходим для получения ЛНЧ, ВНЖ, банковских документов.",
    info_en: "Filed in person at the Municipality. Permanent address registration required for PNF, residence permits, banking.",
    docs_ru: "1. Нот. акт или съгласие на собственика\n2. Паспорт\n3. Декларация по чл. 92 ЗГР\n4. Без такса",
    fields: [
      { key:"date", label:{ru:"Дата", en:"Date", bg:"Дата"}, placeholder:"01.01.2025" },
      { key:"municipality", label:{ru:"Название Общины", en:"Municipality", bg:"Община"}, placeholder:"Несебър / Бургас / Варна" },
      { key:"name", label:{ru:"ФИО заявителя", en:"Applicant name", bg:"Три имена"}, placeholder:"Иван Иванов Иванов" },
      { key:"dob", label:{ru:"Дата рождения", en:"DOB", bg:"Дата на раждане"}, placeholder:"28.09.1981" },
      { key:"citizenship", label:{ru:"Гражданство", en:"Citizenship", bg:"Гражданство"}, placeholder:"Российская Федерация" },
      { key:"passport", label:{ru:"Паспорт", en:"Passport", bg:"Паспорт"}, placeholder:"P RUS №..., МВД ..., до ..." },
      { key:"lnch", label:{ru:"ЛНЧ в Болгарии", en:"PNF in Bulgaria", bg:"ЛНЧ в България"}, placeholder:"1234567890" },
      { key:"new_address", label:{ru:"Новый постоянный адрес", en:"New permanent address", bg:"Нов постоянен адрес"}, placeholder:"гр. Свети Влас, ул. ..., №..., ет..., ап..." },
      { key:"property_basis", label:{ru:"Основание (собственник/наниматель)", en:"Basis (owner/tenant)", bg:"Основание (собственик/наемател)"}, placeholder:"собственик — нот. акт № ... / наемател — договор от ..." },
      { key:"phone", label:{ru:"Телефон", en:"Phone", bg:"Телефон"}, placeholder:"+359 88 123 4567" },
    ],
    generate: (f) => `ДО
КМЕТА НА ОБЩИНА ${(f.municipality||"______").toUpperCase()}

З А Я В Л Е Н И Е
за вписване на постоянен адрес
(на основание чл. 93 от Закона за гражданската регистрация)

════════════════════════════════════════

От: ${f.name||"________________"}
Дата на раждане: ${f.dob||"________________"}
Гражданство: ${f.citizenship||"________________"}
Паспорт: ${f.passport||"________________"}
ЛНЧ: ${f.lnch||"________________"}
Телефон: ${f.phone||"________________"}

════════════════════════════════════════

МОЛБА:

Моля да бъде вписан следният ПОСТОЯНЕН АДРЕС:

${f.new_address||"________________________________"}

Основание за ползване на адреса:
${f.property_basis||"________________________________"}

════════════════════════════════════════

Прилагам:
□ Документ за самоличност (паспорт)
□ Документ удостоверяващ правото на ползване на адреса
□ Декларация по чл. 92 от ЗГР (при необходимост)

Правно основание: чл. 93-96 от Закона за гражданската регистрация

════════════════════════════════════════
Дата: ${f.date||"__.__.__"}
Гр./с. ${f.municipality||"______"}

ЗАЯВИТЕЛ: _________________  (${f.name||""})
`
  },
  {
    id: "n3", cat: "notary",
    ru: "Заявление за настоящ адрес (в Общину)", en: "Current Address Registration (Municipality)", bg: "Заявление за вписване на настоящ адрес",
    basis: "ЗГР чл. 96", source: "Община",
    info_ru: "Настоящий адрес (настоящ адрес) — адрес фактического проживания, отличный от постоянного. Необходим для корреспонденции от государственных органов.",
    info_en: "Current address (different from permanent) — actual place of residence. Required for state correspondence.",
    docs_ru: "1. Паспорт\n2. Документ на жилище\n3. Без госпошлины",
    fields: [
      { key:"date", label:{ru:"Дата", en:"Date", bg:"Дата"}, placeholder:"01.01.2025" },
      { key:"municipality", label:{ru:"Община", en:"Municipality", bg:"Община"}, placeholder:"Несебър / Бургас" },
      { key:"name", label:{ru:"ФИО", en:"Full name", bg:"Три имена"}, placeholder:"Иван Иванов Иванов" },
      { key:"dob", label:{ru:"Дата рождения", en:"DOB", bg:"Дата на раждане"}, placeholder:"28.09.1981" },
      { key:"lnch", label:{ru:"ЛНЧ", en:"PNF", bg:"ЛНЧ"}, placeholder:"1234567890" },
      { key:"passport", label:{ru:"Паспорт", en:"Passport", bg:"Паспорт"}, placeholder:"P RUS №..." },
      { key:"permanent_address", label:{ru:"Постоянный адрес", en:"Permanent address", bg:"Постоянен адрес"}, placeholder:"гр. Москва, ул. ..." },
      { key:"current_address", label:{ru:"Настоящий адрес (фактический)", en:"Current address", bg:"Настоящ адрес"}, placeholder:"гр. Свети Влас, ул. ..., №..., ет..., ап..." },
      { key:"phone", label:{ru:"Телефон", en:"Phone", bg:"Телефон"}, placeholder:"+359 88 123 4567" },
    ],
    generate: (f) => `ДО
КМЕТА НА ОБЩИНА ${(f.municipality||"______").toUpperCase()}

З А Я В Л Е Н И Е
за вписване на настоящ адрес
(на основание чл. 96 от Закона за гражданската регистрация)

════════════════════════════════════════

От: ${f.name||"________________"}
Дата на раждане: ${f.dob||"________________"}
ЛНЧ: ${f.lnch||"________________"}
Паспорт: ${f.passport||"________________"}
Телефон: ${f.phone||"________________"}

Постоянен адрес: ${f.permanent_address||"________________"}

════════════════════════════════════════

МОЛБА:

Моля да бъде вписан следният НАСТОЯЩ АДРЕС:

${f.current_address||"________________________________"}

════════════════════════════════════════

Прилагам:
□ Документ за самоличност
□ Документ за ползване на адреса

Правно основание: чл. 96 от ЗГР

════════════════════════════════════════
Дата: ${f.date||"__.__.__"}

ЗАЯВИТЕЛ: _________________  (${f.name||""})
`
  },
  {
    id: "n4", cat: "notary",
    ru: "Заявление за регистрация в БУЛСТАТ (физическо лице)", en: "BULSTAT Registration Application (individual)", bg: "Заявление за регистрация в регистър БУЛСТАТ",
    basis: "ЗРБУЛСТАТ чл. 3", source: "Агенция по вписванията",
    info_ru: "Регистрация в БУЛСТАТ обязательна для иностранных граждан, владеющих недвижимостью в Болгарии, а также для самозанятых и индивидуальных предпринимателей. Подаётся в Агенцию по вписванията или онлайн.",
    info_en: "BULSTAT registration mandatory for foreign nationals owning property in Bulgaria, self-employed, and sole traders. Filed at Agency of Registrations or online.",
    docs_ru: "1. Паспорт (копия + оригинал)\n2. Документ-основание (нот. акт / договор)\n3. Форма Б1 или Б7\n4. Без госпошлины",
    fields: [
      { key:"date", label:{ru:"Дата", en:"Date", bg:"Дата"}, placeholder:"01.01.2025" },
      { key:"name_latin", label:{ru:"ФИО (латиница, как в паспорте)", en:"Full name (Latin)", bg:"Три имена (латиница)"}, placeholder:"IVAN IVANOV IVANOV" },
      { key:"name_cyr", label:{ru:"ФИО (кириллица)", en:"Full name (Cyrillic)", bg:"Три имена (кирилица)"}, placeholder:"Иван Иванов Иванов" },
      { key:"dob", label:{ru:"Дата рождения", en:"DOB", bg:"Дата на раждане"}, placeholder:"28.09.1981" },
      { key:"pob", label:{ru:"Место рождения", en:"Place of birth", bg:"Място на раждане"}, placeholder:"Москва, Русия" },
      { key:"citizenship", label:{ru:"Гражданство", en:"Citizenship", bg:"Гражданство"}, placeholder:"Руска федерация" },
      { key:"passport", label:{ru:"Загранпаспорт", en:"Passport", bg:"Паспорт"}, placeholder:"P RUS №..., МВД ..., до ..." },
      { key:"address_ru", label:{ru:"Адрес в стране гражданства", en:"Home country address", bg:"Адрес в страната на гражданство"}, placeholder:"Россия, г. Москва, ул. ..." },
      { key:"address_bg", label:{ru:"Адрес в Болгарии", en:"Address in Bulgaria", bg:"Адрес в България"}, placeholder:"гр. Свети Влас, ул. ..., №..." },
      { key:"basis", label:{ru:"Основание регистрации", en:"Registration basis", bg:"Основание за регистрация"}, placeholder:"собственик на недвижим имот / самоосигуряващо се лице" },
      { key:"property_desc", label:{ru:"Описание имущества (если собственник)", en:"Property (if owner)", bg:"Имот (ако е собственик)"}, placeholder:"Апартамент №7, гр. Свети Влас" },
    ],
    generate: (f) => `ЗАЯВЛЕНИЕ
за регистрация в Регистър БУЛСТАТ
(на основание чл. 3 от Закона за регистър БУЛСТАТ)

════════════════════════════════════════

ДО АГЕНЦИЯ ПО ВПИСВАНИЯТА

Три имена (латиница): ${f.name_latin||"________________"}
Три имена (кирилица): ${f.name_cyr||"________________"}
Дата на раждане: ${f.dob||"________________"}
Място на раждане: ${f.pob||"________________"}
Гражданство: ${f.citizenship||"________________"}
Паспорт: ${f.passport||"________________"}

Адрес в страната на гражданство:
${f.address_ru||"________________"}

Адрес в България:
${f.address_bg||"________________"}

════════════════════════════════════════

ОСНОВАНИЕ ЗА РЕГИСТРАЦИЯ:
${f.basis||"________________"}

${f.property_desc ? `Имот: ${f.property_desc}` : ""}

════════════════════════════════════════

Моля да бъда регистриран/а в Регистър БУЛСТАТ като
физическо лице, което не е търговец.

Прилагам:
□ Копие на паспорт
□ Документ-основание (нотариален акт / договор)

Правно основание: чл. 3 от ЗРБУЛСТАТ

════════════════════════════════════════
Дата: ${f.date||"__.__.__"}

ЗАЯВИТЕЛ: _________________  (${f.name_latin||""})
`
  },
];

const ALL_TEMPLATES = [...TEMPLATES_MIGRATION, ...TEMPLATES_BCCI, ...TEMPLATES_GENERAL, ...TEMPLATES_NOTARY];

const COURT = [
  { id:1, court:"ВКС", num:"Решение № 112/2023", chamber:"І ТК", area:"business", ru:"По вопросу о недействительности коммерческих сделок.", en:"On invalidity of commercial transactions.", bg:"За недействителност на търговски сделки.", year:2023 },
  { id:2, court:"ВКС", num:"Решение № 89/2023", chamber:"ІІ ГК", area:"civil", ru:"О праве собственности при приобретательной давности.", en:"On property rights through adverse possession.", bg:"За правото на собственост при придобивна давност.", year:2023 },
  { id:3, court:"ВАС", num:"Решение № 4521/2023", chamber:"V отд.", area:"admin", ru:"Административный орган обязан излагать мотивы при отказе.", en:"Administrative body must state reasons for refusal.", bg:"Задължение за мотиви при отказ.", year:2023 },
  { id:4, court:"ВАС", num:"Решение № 6103/2023", chamber:"VII отд.", area:"tax", ru:"При налоговой проверке бремя доказывания лежит на налоговом органе.", en:"Burden of proof in tax audits lies with the tax authority.", bg:"Доказателствената тежест е на данъчния орган.", year:2023 },
  { id:5, court:"ВКС", num:"Решение № 201/2023", chamber:"І ТК", area:"migration", ru:"О праве проживания иностранцев с разрешением на длительное пребывание.", en:"On residence rights of foreigners with long-term permits.", bg:"За правото на пребиваване с разрешение за ВНЖ.", year:2023 },
  { id:6, court:"ВКС", num:"Решение № 156/2022", chamber:"ІV ГК", area:"labor", ru:"Работодатель несёт ответственность за производственную травму.", en:"Employer is liable for occupational accidents.", bg:"Отговорност на работодателя за трудова злополука.", year:2022 },
  { id:7, court:"ВАС", num:"Решение № 3301/2022", chamber:"II отд.", area:"migration", ru:"Отказ в выдаче ВНЖ должен быть мотивирован с конкретными основаниями.", en:"Refusal of residence permit must be specifically reasoned.", bg:"Отказът за ВНЖ трябва да е конкретно мотивиран.", year:2022 },
  { id:8, court:"ВКС", num:"Решение № 78/2022", chamber:"ІІІ ГК", area:"property", ru:"Нотариальный акт не является абсолютным доказательством права собственности.", en:"Notarial deed is not absolute proof of ownership.", bg:"Нотариалният акт не е абсолютно доказателство за собственост.", year:2022 },
];

const AREAS = {
  migration:{ ru:"Миграционное", en:"Migration", bg:"Миграционно", color:"#2563EB", icon:"✈️" },
  business:{ ru:"Предпринимательское", en:"Business", bg:"Търговско", color:"#059669", icon:"🏢" },
  tax:{ ru:"Налоговое", en:"Tax", bg:"Данъчно", color:"#D97706", icon:"💰" },
  admin:{ ru:"Административное", en:"Administrative", bg:"Административно", color:"#7C3AED", icon:"⚖️" },
  civil:{ ru:"Гражданское", en:"Civil", bg:"Гражданско", color:"#DC2626", icon:"📋" },
  criminal:{ ru:"Уголовное", en:"Criminal", bg:"Наказателно", color:"#374151", icon:"🔒" },
  labor:{ ru:"Трудовое", en:"Labour", bg:"Трудово", color:"#0891B2", icon:"👷" },
  property:{ ru:"Имущественное", en:"Property", bg:"Вещно", color:"#9D4EDD", icon:"🏠" },
};

const CAT_LABELS = {
  ru:{ migration:"МВР Миграция", bcci:"БТТП", contract:"Договоры", application:"Заявления", complaint:"Претензии", lawsuit:"Иски", property:"Недвижимость", notary:"Нотариус/Община" },
  en:{ migration:"MVR Migration", bcci:"BCCI", contract:"Contracts", application:"Applications", complaint:"Complaints", lawsuit:"Lawsuits", property:"Property", notary:"Notary/Municipality" },
  bg:{ migration:"МВР Миграция", bcci:"БТПП", contract:"Договори", application:"Заявления", complaint:"Жалби", lawsuit:"Искове", property:"Недвижимост", notary:"Нотариус/Община" },
};
const CAT_COLORS = { migration:"#2563EB", bcci:"#B45309", contract:"#059669", application:"#7C3AED", complaint:"#DC2626", lawsuit:"#374151", property:"#9D4EDD", notary:"#0891B2" };
const CAT_ICONS = { migration:"🛂", bcci:"🏛", contract:"📄", application:"📝", complaint:"⚠️", lawsuit:"⚖️", property:"🏠", notary:"📋" };

const UI = {
  ru:{ home:"Главная", laws:"Законы", court:"Практика", templates:"Шаблоны", ai:"AI", search:"Поиск...", searchLex:"Поиск на lex.bg...", allAreas:"Все", all:"Все", codes:"Кодексы", acts:"Законы", regs:"Наредби", allCourts:"Все", aiHi:"Я — AI-помощник по болгарскому праву. Задайте вопрос.", aiPH:"Ваш вопрос...", loading:"Поиск...", openLex:"Найти на lex.bg", noRes:"Ничего не найдено", copy:"📋 Скопировать", copied:"✅ Скопировано!", generate:"📄 Сгенерировать документ", preview:"Документ готов:", required:"Необходимые документы:", info:"Информация:", quickQ:["Как получить ВНЖ?","Открыть ООД?","Ставка НДС?","Регистрация в БТТП?","Трудовой договор?"] },
  en:{ home:"Home", laws:"Laws", court:"Case Law", templates:"Templates", ai:"AI", search:"Search...", searchLex:"Search on lex.bg...", allAreas:"All", all:"All", codes:"Codes", acts:"Acts", regs:"Regulations", allCourts:"All", aiHi:"I am an AI assistant for Bulgarian law. Ask me anything.", aiPH:"Your question...", loading:"Searching...", openLex:"Find on lex.bg", noRes:"Nothing found", copy:"📋 Copy", copied:"✅ Copied!", generate:"📄 Generate document", preview:"Document ready:", required:"Required documents:", info:"Information:", quickQ:["How to get residence permit?","Register LLC?","VAT rate?","Register at BCCI?","Employment contract?"] },
  bg:{ home:"Начало", laws:"Закони", court:"Практика", templates:"Шаблони", ai:"AI", search:"Търсене...", searchLex:"Търсене в lex.bg...", allAreas:"Всички", all:"Всички", codes:"Кодекси", acts:"Закони", regs:"Наредби", allCourts:"Всички", aiHi:"Аз съм AI-асистент по българско право.", aiPH:"Вашият въпрос...", loading:"Търсене...", openLex:"Намери в lex.bg", noRes:"Нищо не е намерено", copy:"📋 Копирай", copied:"✅ Копирано!", generate:"📄 Генерирай документ", preview:"Документът е готов:", required:"Необходими документи:", info:"Информация:", quickQ:["Как да получа ВНЖ?","Регистрация на ООД?","Ставка ДДС?","Регистрация в БТПП?","Трудов договор?"] },
};

const C={ bg:"#0F0F1A", sf:"#16162A", bd:"#252540", gold:"#C9A84C", gl:"#E8D5A3", tx:"#E8E8F0", mt:"#888899" };
const s={
  app:{ fontFamily:"'Georgia',serif", background:C.bg, minHeight:"100vh", maxWidth:440, margin:"0 auto", color:C.tx, boxShadow:"0 0 60px rgba(0,0,0,0.5)" },
  sc:{ paddingBottom:72, minHeight:"100vh" },
  hd:{ background:C.sf, borderBottom:`1px solid ${C.bd}`, padding:"14px 16px", display:"flex", alignItems:"center", gap:10 },
  back:{ background:"none", border:"none", color:C.gold, fontSize:24, cursor:"pointer" },
  sb:{ background:C.sf, borderBottom:`1px solid ${C.bd}`, padding:"10px 14px" },
  inp:{ width:"100%", background:C.bg, border:`1px solid ${C.bd}`, borderRadius:8, padding:"9px 14px", fontSize:13, color:C.tx, fontFamily:"inherit", outline:"none", boxSizing:"border-box" },
  card:{ background:C.sf, border:`1px solid ${C.bd}`, borderRadius:10, padding:"13px 14px", marginBottom:8, cursor:"pointer" },
  ttl:{ fontSize:13, fontWeight:"bold", color:C.tx, lineHeight:1.4, marginBottom:4 },
  sub:{ fontSize:11, color:C.mt },
  badge:(c)=>({ display:"inline-block", background:c+"20", color:c, border:`1px solid ${c}40`, borderRadius:4, padding:"2px 7px", fontSize:10, fontWeight:"bold", marginRight:4 }),
  tag:(c)=>({ display:"inline-block", background:c+"15", color:c, borderRadius:3, padding:"1px 6px", fontSize:10, marginRight:3 }),
  pill:(a,c)=>({ padding:"6px 12px", borderRadius:20, border:`1px solid ${a?c:C.bd}`, background:a?c+"20":"transparent", color:a?c:C.mt, fontSize:11, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap" }),
  row:{ display:"flex", gap:8, overflowX:"auto", paddingBottom:4, scrollbarWidth:"none" },
  nav:{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:440, background:C.sf, borderTop:`1px solid ${C.bd}`, display:"flex", zIndex:100 },
  nb:(a)=>({ flex:1, background:"none", border:"none", cursor:"pointer", padding:"10px 4px 8px", display:"flex", flexDirection:"column", alignItems:"center", gap:3, color:a?C.gold:C.mt, fontSize:9, fontFamily:"inherit", borderTop:a?`2px solid ${C.gold}`:"2px solid transparent" }),
};

export default function App() {
  const [sc, setSc] = useState("home");
  const [prev, setPrev] = useState([]);
  const [det, setDet] = useState(null);
  const [lang, setLang] = useState("ru");
  const [bms, setBms] = useState([]);
  const [areaF, setAreaF] = useState("all");
  const [typeF, setTypeF] = useState("all");
  const [courtF, setCourtF] = useState("all");
  const [tmplCat, setTmplCat] = useState("all");
  const [q, setQ] = useState("");
  const [lexQ, setLexQ] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [aiInp, setAiInp] = useState("");
  const [aiLoad, setAiLoad] = useState(false);
  const [formData, setFormData] = useState({});
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);
  const chatEnd = useRef(null);
  const t = UI[lang];

  useEffect(()=>{ setMsgs([{role:"ai",text:t.aiHi}]); },[lang]);
  useEffect(()=>{ chatEnd.current?.scrollIntoView({behavior:"smooth"}); },[msgs]);

  const go=(s,d=null)=>{ setPrev(p=>[...p,sc]); setSc(s); setDet(d); setFormData({}); setGenerated(""); setCopied(false); };
  const back=()=>{ const p=[...prev]; const s=p.pop(); setSc(s||"home"); setPrev(p); };
  const tbm=(id)=>setBms(b=>b.includes(id)?b.filter(x=>x!==id):[...b,id]);
  const lt=(l)=>lang==="ru"?l.title_ru:lang==="en"?l.title_en:l.title_bg;
  const tlt=(x)=>lang==="ru"?x.ru:lang==="en"?x.en:x.bg;
  const al=(k)=>AREAS[k]?.[lang]||k;

  const filtLaws=LAWS.filter(l=>(areaF==="all"||l.area.includes(areaF))&&(typeF==="all"||l.type===typeF)&&(!q||lt(l).toLowerCase().includes(q.toLowerCase())||l.title_bg.toLowerCase().includes(q.toLowerCase())));
  const filtC=COURT.filter(d=>(courtF==="all"||d.court===courtF)&&(areaF==="all"||d.area===areaF));
  const filtT=tmplCat==="all"?ALL_TEMPLATES:ALL_TEMPLATES.filter(x=>x.cat===tmplCat);

  const sendAI=async()=>{
    if(!aiInp.trim()||aiLoad) return;
    const question=aiInp.trim(); setAiInp("");
    setMsgs(m=>[...m,{role:"user",text:question}]);
    setAiLoad(true);
    const sys={
      ru:"Ты AI-помощник по болгарскому законодательству. Отвечай на русском. Специализируешься на: миграционном праве (ВНЖ, ПМЖ, визы, БТТП), налоговом, корпоративном и административном праве Болгарии. Ссылайся на конкретные статьи законов. Добавляй краткий дисклеймер об информационном характере ответа.",
      en:"You are an AI assistant for Bulgarian law. Answer in English. Specialise in: migration law (residence permits, BCCI), tax, corporate and administrative law in Bulgaria. Reference specific legal articles. Add a brief informational disclaimer.",
      bg:"Ти си AI-асистент по българско законодателство. Отговаряй на български. Специализираш в: миграционно право (ВНЖ, ПМЖ, БТПП), данъчно, търговско и административно право. Посочвай конкретни членове."
    };
    try {
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:sys[lang],messages:[{role:"user",content:question}]})});
      const data=await res.json();
      setMsgs(m=>[...m,{role:"ai",text:data.content?.[0]?.text||"Error"}]);
    } catch { setMsgs(m=>[...m,{role:"ai",text:"Connection error."}]); }
    setAiLoad(false);
  };

  const copyText=(text)=>{
    navigator.clipboard.writeText(text).then(()=>{ setCopied(true); setTimeout(()=>setCopied(false),2500); });
  };

  const LangBar=()=>(
    <div style={{display:"flex",gap:6,padding:"8px 14px",borderBottom:`1px solid ${C.bd}`,background:C.sf}}>
      {["ru","en","bg"].map(l=><button key={l} onClick={()=>setLang(l)} style={s.pill(lang===l,C.gold)}>{l==="ru"?"🇷🇺 RU":l==="en"?"🇬🇧 EN":"🇧🇬 BG"}</button>)}
    </div>
  );

  const Nav=()=>(
    <div style={s.nav}>
      {[["home","🏛",t.home],["laws","📚",t.laws],["court","⚖️",t.court],["templates","📄",t.templates],["ai","🤖",t.ai]].map(([id,icon,lbl])=>(
        <button key={id} style={s.nb(sc===id)} onClick={()=>{setSc(id);setQ("");setAreaF("all");}}><span style={{fontSize:20}}>{icon}</span>{lbl}</button>
      ))}
    </div>
  );

  const LawCard=({law})=>(
    <div style={s.card} onClick={()=>go("law",law)}>
      <div style={{display:"flex",gap:8}}>
        <div style={{flex:1}}>
          <div style={{marginBottom:4}}>{law.area.slice(0,2).map(a=>AREAS[a]&&<span key={a} style={s.tag(AREAS[a].color)}>{AREAS[a].icon} {al(a)}</span>)}</div>
          <div style={s.ttl}>{lt(law)}</div>
          <div style={s.sub}>{law.title_bg} · {law.year}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
          <button onClick={e=>{e.stopPropagation();tbm(law.id);}} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:bms.includes(law.id)?C.gold:C.bd}}>{bms.includes(law.id)?"★":"☆"}</button>
          <span style={{color:C.mt,fontSize:18}}>›</span>
        </div>
      </div>
    </div>
  );

  // HOME
  if(sc==="home") return (
    <div style={s.app}>
      <div style={s.sc}>
        <div style={{background:"linear-gradient(135deg,#0F0F1A,#1a1a35)",padding:"20px 16px 16px",borderBottom:`1px solid ${C.bd}`}}>
          <div style={{fontSize:10,color:C.gold,letterSpacing:3,marginBottom:6}}>🇧🇬 {lang==="ru"?"ПРАВО БОЛГАРИИ":lang==="en"?"BULGARIA LAW":"ПРАВО НА БЪЛГАРИЯ"}</div>
          <div style={{fontSize:20,fontWeight:"bold",color:C.gl,lineHeight:1.2,marginBottom:10}}>{lang==="ru"?"Правовая база · Миграция · БТТП":lang==="en"?"Legal Base · Migration · BCCI":"Правна база · Миграция · БТПП"}</div>
          <div style={{display:"flex",gap:8}}>
            {[["📚",`${LAWS.length}+`,t.laws],["🛂",`${TEMPLATES_MIGRATION.length}`,lang==="ru"?"МВР":lang==="en"?"MVR":"МВР"],["🏛",`${TEMPLATES_BCCI.length}`,lang==="ru"?"БТТП":lang==="en"?"BCCI":"БТПП"],["📄",`${TEMPLATES_GENERAL.length}`,lang==="ru"?"Формы":lang==="en"?"Forms":"Форми"]].map(([icon,n,lbl])=>(
              <div key={lbl} style={{flex:1,background:C.sf,border:`1px solid ${C.bd}`,borderRadius:8,padding:"6px 4px",textAlign:"center"}}>
                <div style={{fontSize:14}}>{icon}</div>
                <div style={{fontSize:13,fontWeight:"bold",color:C.gold}}>{n}</div>
                <div style={{fontSize:9,color:C.mt}}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
        <LangBar/>
        <div style={s.sb}>
          <input style={s.inp} placeholder={`🔍 ${t.search}`} value={q} onChange={e=>setQ(e.target.value)}/>
          {q&&<div style={{marginTop:8}}>{filtLaws.slice(0,4).map(l=><LawCard key={l.id} law={l}/>)}{filtLaws.length===0&&<div style={{color:C.mt,fontSize:13,padding:"8px 0"}}>{t.noRes}</div>}</div>}
        </div>
        {!q&&(
          <div style={{padding:"14px 14px 0"}}>
            {/* Быстрый доступ к формам */}
            <div style={{fontSize:10,color:C.gold,letterSpacing:2,marginBottom:10}}>
              {lang==="ru"?"🛂 МВР МИГРАЦИЯ + 🏛 БТТП — ФОРМЫ":lang==="en"?"🛂 MVR MIGRATION + 🏛 BCCI — FORMS":"🛂 МВР МИГРАЦИЯ + 🏛 БТПП — ФОРМИ"}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
              {[
                {cat:"migration",icon:"🛂",title:lang==="ru"?"МВР Миграция":lang==="en"?"MVR Migration":"МВР Миграция",sub:lang==="ru"?"ВНЖ, ПМЖ, Визы":lang==="en"?"Residence permits":"ВНЖ, ПМЖ, Визи",color:"#2563EB",cnt:TEMPLATES_MIGRATION.length},
                {cat:"bcci",icon:"🏛",title:lang==="ru"?"БТТП":lang==="en"?"BCCI":"БТПП",sub:lang==="ru"?"Торг. представительства":lang==="en"?"Trade rep offices":"Търг. представителства",color:"#B45309",cnt:TEMPLATES_BCCI.length},
                {cat:"contract",icon:"📄",title:lang==="ru"?"Договоры":lang==="en"?"Contracts":"Договори",sub:lang==="ru"?"Аренда, труд, займ":lang==="en"?"Lease, employment":"Наем, труд, заем",color:"#059669",cnt:TEMPLATES_GENERAL.filter(x=>x.cat==="contract").length},
                {cat:"lawsuit",icon:"⚖️",title:lang==="ru"?"Иски":lang==="en"?"Lawsuits":"Искове",sub:lang==="ru"?"Долг, расторжение":lang==="en"?"Debt, termination":"Дълг, разваляне",color:"#374151",cnt:TEMPLATES_GENERAL.filter(x=>x.cat==="lawsuit"||x.cat==="complaint").length},
              ].map(item=>(
                <div key={item.cat} style={{background:C.sf,border:`1px solid ${item.color}40`,borderRadius:10,padding:"12px 10px",cursor:"pointer",borderLeft:`3px solid ${item.color}`}} onClick={()=>{setTmplCat(item.cat);setSc("templates");}}>
                  <div style={{fontSize:20,marginBottom:4}}>{item.icon}</div>
                  <div style={{fontSize:12,fontWeight:"bold",color:item.color,marginBottom:2}}>{item.title}</div>
                  <div style={{fontSize:10,color:C.mt,marginBottom:4}}>{item.sub}</div>
                  <div style={{fontSize:11,color:C.gold,fontWeight:"bold"}}>{item.cnt} {lang==="ru"?"форм":lang==="en"?"forms":"форми"}</div>
                </div>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              {[["laws","📚",t.laws,`${LAWS.length}+`],["court","⚖️",t.court,`${COURT.length}`],["ai","🤖","AI","∞"],["templates","📄",t.templates,`${ALL_TEMPLATES.length}`]].map(([id,icon,lbl,cnt])=>(
                <div key={id} style={{...s.card,padding:"12px 10px"}} onClick={()=>setSc(id)}>
                  <div style={{fontSize:20,marginBottom:4}}>{icon}</div>
                  <div style={{fontSize:12,fontWeight:"bold",color:C.gl,marginBottom:2}}>{lbl}</div>
                  <div style={{fontSize:11,color:C.gold,fontWeight:"bold"}}>{cnt}</div>
                </div>
              ))}
            </div>
            <div style={{fontSize:10,color:C.gold,letterSpacing:2,marginBottom:8}}>🔍 LEX.BG</div>
            <div style={{display:"flex",gap:8,marginBottom:14}}>
              <input style={{...s.inp,flex:1}} placeholder={t.searchLex} value={lexQ} onChange={e=>setLexQ(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&lexQ.trim())window.open(`https://lex.bg/bg/laws/ldoc/search?q=${encodeURIComponent(lexQ)}`,"_blank");}}/>
              <button onClick={()=>{if(lexQ.trim())window.open(`https://lex.bg/bg/laws/ldoc/search?q=${encodeURIComponent(lexQ)}`,"_blank");}} style={{background:C.gold,color:C.bg,border:"none",borderRadius:8,padding:"0 14px",cursor:"pointer",fontSize:14,fontWeight:"bold"}}>→</button>
            </div>
          </div>
        )}
      </div>
      <Nav/>
    </div>
  );

  // LAWS
  if(sc==="laws") return (
    <div style={s.app}>
      <div style={s.sc}>
        <div style={s.hd}>
          <button style={s.back} onClick={()=>{setSc("home");setAreaF("all");}}>‹</button>
          <div style={{flex:1}}><div style={{fontSize:10,color:C.gold}}>📚</div><div style={{fontSize:15,fontWeight:"bold",color:C.gl}}>{t.laws}</div></div>
          <div style={{fontSize:12,color:C.mt}}>{filtLaws.length}</div>
        </div>
        <LangBar/>
        <div style={s.sb}><input style={s.inp} placeholder={`🔍 ${t.search}`} value={q} onChange={e=>setQ(e.target.value)}/></div>
        <div style={{...s.row,padding:"10px 14px"}}>
          {[["all",t.all],["kodeks",t.codes],["zakon",t.acts],["naredba",t.regs]].map(([v,l])=><button key={v} style={s.pill(typeF===v,C.gold)} onClick={()=>setTypeF(v)}>{l}</button>)}
        </div>
        <div style={{...s.row,padding:"0 14px 10px"}}>
          <button style={s.pill(areaF==="all",C.mt)} onClick={()=>setAreaF("all")}>{t.allAreas}</button>
          {Object.entries(AREAS).map(([k,a])=><button key={k} style={s.pill(areaF===k,a.color)} onClick={()=>setAreaF(k)}>{a.icon} {a[lang]}</button>)}
        </div>
        <div style={{padding:"0 14px"}}>{filtLaws.length===0?<div style={{color:C.mt,textAlign:"center",padding:30}}>{t.noRes}</div>:filtLaws.map(l=><LawCard key={l.id} law={l}/>)}</div>
      </div>
      <Nav/>
    </div>
  );

  // LAW DETAIL
  if(sc==="law"&&det) return (
    <div style={s.app}>
      <div style={s.sc}>
        <div style={{...s.hd,flexWrap:"wrap"}}>
          <button style={s.back} onClick={back}>‹</button>
          <div style={{flex:1}}><div style={{fontSize:10,color:C.gold}}>{det.type.toUpperCase()}</div><div style={{fontSize:13,fontWeight:"bold",color:C.gl,lineHeight:1.4}}>{lt(det)}</div></div>
          <button onClick={()=>tbm(det.id)} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:bms.includes(det.id)?C.gold:C.bd}}>{bms.includes(det.id)?"★":"☆"}</button>
        </div>
        <div style={{padding:"14px 14px 80px"}}>
          <div style={{marginBottom:12}}>{det.area.map(a=>AREAS[a]&&<span key={a} style={s.badge(AREAS[a].color)}>{AREAS[a].icon} {al(a)}</span>)}<span style={s.badge(C.mt)}>📅 {det.year}</span></div>
          <a href={det.url||`https://lex.bg/bg/laws/ldoc/search?q=${encodeURIComponent(det.title_bg)}`} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:8,background:C.gold+"20",border:`1px solid ${C.gold}40`,borderRadius:10,padding:"12px 14px",marginBottom:14,textDecoration:"none"}}>
            <span style={{fontSize:20}}>📖</span>
            <div><div style={{color:C.gold,fontWeight:"bold",fontSize:13}}>{t.openLex}</div><div style={{color:C.mt,fontSize:11}}>lex.bg — {lang==="ru"?"официальный источник":lang==="en"?"official source":"официален източник"}</div></div>
            <span style={{marginLeft:"auto",color:C.gold}}>↗</span>
          </a>
          <div style={{background:C.sf,border:`1px solid ${C.gold}30`,borderRadius:8,padding:"14px",textAlign:"center",color:C.mt,fontSize:12}}>
            📡 {lang==="ru"?"Полный текст доступен на lex.bg":lang==="en"?"Full text available on lex.bg":"Пълният текст е достъпен на lex.bg"}
          </div>
        </div>
      </div>
    </div>
  );

  // COURT
  if(sc==="court") return (
    <div style={s.app}>
      <div style={s.sc}>
        <div style={s.hd}>
          <button style={s.back} onClick={()=>setSc("home")}>‹</button>
          <div style={{flex:1}}><div style={{fontSize:10,color:C.gold}}>⚖️</div><div style={{fontSize:15,fontWeight:"bold",color:C.gl}}>{t.court}</div></div>
          <div style={{fontSize:12,color:C.mt}}>{filtC.length}</div>
        </div>
        <LangBar/>
        <div style={{...s.row,padding:"10px 14px"}}>
          {[["all",t.allCourts],["ВКС","ВКС"],["ВАС","ВАС"]].map(([v,l])=><button key={v} style={s.pill(courtF===v,C.gold)} onClick={()=>setCourtF(v)}>{l}</button>)}
        </div>
        <div style={{padding:"0 14px"}}>
          {filtC.map(d=>{
            const sum=lang==="en"?d.en:lang==="ru"?d.ru:d.bg;
            return(
              <div key={d.id} style={s.card}>
                <div style={{display:"flex",gap:6,marginBottom:6}}>
                  <span style={s.badge(d.court==="ВКС"?"#DC2626":"#7C3AED")}>{d.court}</span>
                  <span style={s.badge(C.mt)}>{d.year}</span>
                  {AREAS[d.area]&&<span style={s.badge(AREAS[d.area].color)}>{AREAS[d.area].icon}</span>}
                </div>
                <div style={s.ttl}>{d.num}</div>
                <div style={{fontSize:12,color:C.tx,lineHeight:1.6}}>{sum}</div>
                {d.chamber&&<div style={{fontSize:11,color:C.mt,marginTop:6}}>🏛 {d.chamber}</div>}
              </div>
            );
          })}
        </div>
      </div>
      <Nav/>
    </div>
  );

  // TEMPLATES LIST
  if(sc==="templates") return (
    <div style={s.app}>
      <div style={s.sc}>
        <div style={s.hd}>
          <button style={s.back} onClick={()=>setSc("home")}>‹</button>
          <div style={{flex:1}}><div style={{fontSize:10,color:C.gold}}>📄</div><div style={{fontSize:15,fontWeight:"bold",color:C.gl}}>{t.templates}</div></div>
          <div style={{fontSize:12,color:C.mt}}>{filtT.length}</div>
        </div>
        <LangBar/>
        <div style={{...s.row,padding:"10px 14px"}}>
          {[["all",t.all],["migration","🛂 "+CAT_LABELS[lang].migration],["bcci","🏛 "+CAT_LABELS[lang].bcci],["property","🏠 "+CAT_LABELS[lang].property],["notary","📋 "+CAT_LABELS[lang].notary],["contract",CAT_LABELS[lang].contract],["application",CAT_LABELS[lang].application],["complaint",CAT_LABELS[lang].complaint],["lawsuit",CAT_LABELS[lang].lawsuit]].map(([v,l])=>(
            <button key={v} style={s.pill(tmplCat===v,CAT_COLORS[v]||C.gold)} onClick={()=>setTmplCat(v)}>{l}</button>
          ))}
        </div>
        <div style={{padding:"0 14px"}}>
          {filtT.map(x=>(
            <div key={x.id} style={{...s.card,borderLeft:`3px solid ${CAT_COLORS[x.cat]||C.gold}`}} onClick={()=>go("form",x)}>
              <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                <div style={{fontSize:22}}>{CAT_ICONS[x.cat]||"📄"}</div>
                <div style={{flex:1}}>
                  <span style={s.badge(CAT_COLORS[x.cat]||C.gold)}>{CAT_LABELS[lang][x.cat]||x.cat}</span>
                  {x.source&&<span style={{...s.badge(C.mt),marginLeft:2}}>{x.source}</span>}
                  <div style={s.ttl}>{tlt(x)}</div>
                  <div style={s.sub}>{x.basis} · {x.fields.length} {lang==="ru"?"полей":lang==="en"?"fields":"полета"}</div>
                </div>
                <div style={{color:C.gold,fontSize:12,marginTop:4}}>→</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Nav/>
    </div>
  );

  // FORM
  if(sc==="form"&&det) return (
    <div style={s.app}>
      <div style={s.sc}>
        <div style={s.hd}>
          <button style={s.back} onClick={back}>‹</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:CAT_COLORS[det.cat]||C.gold}}>{CAT_ICONS[det.cat]} {CAT_LABELS[lang][det.cat]||det.cat} {det.source?`· ${det.source}`:""}</div>
            <div style={{fontSize:12,fontWeight:"bold",color:C.gl,lineHeight:1.4}}>{tlt(det)}</div>
          </div>
        </div>
        <div style={{padding:"14px 14px 80px"}}>

          {/* Информация */}
          {det[`info_${lang}`]&&(
            <div style={{background:"#2563EB15",border:"1px solid #2563EB40",borderRadius:8,padding:"10px 12px",marginBottom:12}}>
              <div style={{fontSize:10,color:"#2563EB",fontWeight:"bold",marginBottom:4}}>ℹ️ {t.info}</div>
              <div style={{fontSize:12,color:C.tx,lineHeight:1.6}}>{det[`info_${lang}`]}</div>
            </div>
          )}

          {/* Необходимые документы */}
          {det.docs_ru&&lang==="ru"&&(
            <div style={{background:"#D9770615",border:"1px solid #D9770640",borderRadius:8,padding:"10px 12px",marginBottom:14}}>
              <div style={{fontSize:10,color:"#D97706",fontWeight:"bold",marginBottom:4}}>📋 {t.required}</div>
              <div style={{fontSize:11,color:C.tx,lineHeight:1.8,whiteSpace:"pre-line"}}>{det.docs_ru}</div>
            </div>
          )}

          {/* Поля формы */}
          <div style={{fontSize:10,color:C.gold,letterSpacing:2,marginBottom:12}}>
            {lang==="ru"?"ЗАПОЛНИТЕ ПОЛЯ:":lang==="en"?"FILL IN THE FIELDS:":"ПОПЪЛНЕТЕ ПОЛЕТАТА:"}
          </div>
          {det.fields.map(field=>(
            <div key={field.key} style={{marginBottom:12}}>
              <div style={{fontSize:11,color:C.mt,marginBottom:4}}>{field.label[lang]||field.label.ru}</div>
              <input
                style={{...s.inp,background:C.sf}}
                placeholder={field.placeholder}
                value={formData[field.key]||""}
                onChange={e=>setFormData(d=>({...d,[field.key]:e.target.value}))}
              />
            </div>
          ))}

          <button
            onClick={()=>setGenerated(det.generate(formData))}
            style={{width:"100%",background:CAT_COLORS[det.cat]||C.gold,color:"#fff",border:"none",borderRadius:10,padding:"14px",fontSize:14,fontWeight:"bold",cursor:"pointer",fontFamily:"inherit",marginBottom:14}}
          >
            {t.generate}
          </button>

          {generated&&(
            <div>
              <div style={{fontSize:10,color:C.gold,letterSpacing:2,marginBottom:8}}>{t.preview.toUpperCase()}</div>
              <div style={{background:C.sf,border:`1px solid ${C.bd}`,borderRadius:10,padding:"14px",fontSize:11,color:C.tx,lineHeight:1.9,whiteSpace:"pre-wrap",fontFamily:"'Courier New',monospace",marginBottom:10,maxHeight:400,overflowY:"auto"}}>
                {generated}
              </div>
              <button
                onClick={()=>copyText(generated)}
                style={{width:"100%",background:copied?"#059669":C.sf,color:copied?"#fff":C.gl,border:`1px solid ${copied?"#059669":C.bd}`,borderRadius:10,padding:"12px",fontSize:13,cursor:"pointer",fontFamily:"inherit",transition:"all 0.3s",marginBottom:8}}
              >
                {copied?t.copied:t.copy}
              </button>
              <div style={{fontSize:11,color:C.mt,textAlign:"center",lineHeight:1.5}}>
                ⚠️ {lang==="ru"?"Документ носит информационный характер. Уточняйте актуальные требования в МВР/БТТП и консультируйтесь с юристом.":lang==="en"?"This document is for informational purposes. Verify current requirements with MVR/BCCI and consult a lawyer.":"Документът е с информационен характер. Проверявайте изискванията в МВР/БТПП и се консултирайте с адвокат."}
              </div>
            </div>
          )}
        </div>
      </div>
      <Nav/>
    </div>
  );

  // AI
  if(sc==="ai") return (
    <div style={s.app}>
      <div style={{display:"flex",flexDirection:"column",height:"100vh"}}>
        <div style={s.hd}>
          <button style={s.back} onClick={()=>setSc("home")}>‹</button>
          <div><div style={{fontSize:10,color:C.gold}}>🤖 AI</div><div style={{fontSize:15,fontWeight:"bold",color:C.gl}}>{lang==="ru"?"Вопросы по праву Болгарии":lang==="en"?"Bulgarian Law AI":"AI Правен Асистент"}</div></div>
        </div>
        <LangBar/>
        <div style={{padding:"8px 14px",borderBottom:`1px solid ${C.bd}`,display:"flex",gap:6,flexWrap:"wrap"}}>
          {t.quickQ.map(qq=><button key={qq} onClick={()=>setAiInp(qq)} style={{background:C.sf,border:`1px solid ${C.bd}`,color:C.mt,borderRadius:14,padding:"4px 10px",fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>{qq}</button>)}
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"14px 14px 0",display:"flex",flexDirection:"column",gap:10}}>
          {msgs.map((m,i)=><div key={i} style={{maxWidth:"85%",alignSelf:m.role==="user"?"flex-end":"flex-start",background:m.role==="user"?C.gold:C.sf,color:m.role==="user"?C.bg:C.tx,borderRadius:m.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",padding:"10px 14px",fontSize:13,lineHeight:1.6,border:m.role==="ai"?`1px solid ${C.bd}`:"none"}}>{m.text}</div>)}
          {aiLoad&&<div style={{alignSelf:"flex-start",background:C.sf,border:`1px solid ${C.bd}`,borderRadius:"16px 16px 16px 4px",padding:"10px 14px",fontSize:13,color:C.mt}}>⏳ {t.loading}</div>}
          <div ref={chatEnd}/>
        </div>
        <div style={{padding:"12px 14px",borderTop:`1px solid ${C.bd}`,display:"flex",gap:8,background:C.sf}}>
          <input style={{...s.inp,borderRadius:20,flex:1}} placeholder={t.aiPH} value={aiInp} onChange={e=>setAiInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendAI()}/>
          <button onClick={sendAI} style={{background:C.gold,color:C.bg,border:"none",borderRadius:20,padding:"0 16px",fontSize:16,cursor:"pointer",fontWeight:"bold"}}>→</button>
        </div>
      </div>
    </div>
  );

  return <div style={s.app}><div style={{padding:40,textAlign:"center",color:C.mt}}>404</div></div>;
}
