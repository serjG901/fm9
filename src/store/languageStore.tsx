import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LanguageStore } from "../interfaces";
import { name as appName } from "../../package.json";

const textes: { [key: string]: { [key: string]: string } } = {
  en: {
    buys: "buys",
    pays: "pays",
    add: "add",
    update: "update",
    updating: "updating",
    delete: "delete",
    deleting: "deleting",
    debets: "debets",
    credits: "credits",
    settings: "settings",
    from: "from",
    for: "for",
    name: "name",
    currency: "currency",
    datetime: "datetime",
    amount: "amount",
    tags: "tags",
    tag: "tag",
    color: "color",
    period: "period",
    start: "start",
    end: "end",
    filter: "filter",
    search: "search",
    stat: "stat",
    sum: "sum",
    all: "all",
    amounts: "amounts",
    close: "close",
    colors: "colors",
    main: "main",
    currencies: "currencies",
    default: "default",
    new: "new",
    base: "base",
    change: "change",
    current: "current",
    load: "load",
    db: "db",
    download: "download",
    upload: "upload",
    page: "page",
    items: "items",
    per: "per",
    payments: "payments",
    set: "set",
    pages: "pages",
    ui: "ui",
  },
  by: {
    buys: "пакупкі",
    pays: "выплаты",
    add: "дадаць",
    update: "аднавіць",
    updating: "аднаўляем",
    delete: "выдаліць",
    deleting: "выдаляем",
    debets: "дэбет",
    credits: "крэдзіт",
    settings: "налады",
    from: "ад",
    for: "для",
    name: "імя",
    currency: "валюта",
    datetime: "дата і час",
    amount: "колькасць",
    tags: "тэгі",
    tag: "тэг",
    color: "колер",
    period: "перыяд",
    start: "пачатак",
    end: "канец",
    filter: "фільтр",
    search: "пошук",
    stat: "статыстыка",
    sum: "сума",
    all: "усе",
    amounts: "колькасці",
    close: "закрыць",
    colors: "колеры",
    main: "галоўны",
    currencies: "валюты",
    default: "дэфолтны",
    new: "новая",
    base: "база",
    change: "змяніць",
    current: "актуальная",
    load: "загрузкі",
    db: "бд",
    download: "спампаваць",
    upload: "загрузіць",
    page: "страніца",
    items: "элементы",
    per: "на",
    payments: "плацяжы",
    set: "усталяваць",
    pages: "страніцы",
    ui: "інтэрфейс",
  },
};

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => {
      return {
        currentLanguage: "en",
        languages: ["en", "by"],
        setCurrentLanguage: (lang) => set({ currentLanguage: lang }),
        textes: () => textes[`${get().currentLanguage}`],
      };
    },
    {
      name: `${appName}-languages`,
    }
  )
);