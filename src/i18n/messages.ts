import type { LocaleId } from './locale'

export type MessageKey =
  | 'measure.width'
  | 'measure.height'
  | 'measure.qty'
  | 'row.add'
  | 'row.remove'
  | 'sample.load'
  | 'plan.calculate'
  | 'plan.title'
  | 'plan.rod'
  | 'plan.leftovers'
  | 'plan.total'
  | 'plan.pieces'
  | 'plan.leftoverPiece'
  | 'plan.cannotCalculate'
  | 'settings.title'
  | 'settings.open'
  | 'settings.language'
  | 'settings.dimensionOrder'
  | 'settings.dimension.wxh'
  | 'settings.dimension.hxw'
  | 'lang.english'
  | 'lang.kurdish'
  | 'lang.arabic'

export type MessageParams = Record<string, string | number>

const en: Record<MessageKey, string> = {
  'measure.width': 'Width (cm)',
  'measure.height': 'Height (cm)',
  'measure.qty': 'Qty',
  'row.add': 'Add row',
  'row.remove': 'Remove row {n}',
  'sample.load': 'Load random sample measurements',
  'plan.calculate': 'Calculate rod cuts',
  'plan.title': 'Rod cut plan',
  'plan.rod': 'Rod {n}',
  'plan.leftovers': 'Leftovers:',
  'plan.total': 'Total: {cm}cm',
  'plan.pieces': 'Pieces:',
  'plan.leftoverPiece': '{cm}cm x{count}',
  'plan.cannotCalculate': 'Cannot calculate',
  'settings.title': 'Settings',
  'settings.open': 'Open settings',
  'settings.language': 'Language',
  'settings.dimensionOrder': 'Measurement order',
  'settings.dimension.wxh': 'Width × height',
  'settings.dimension.hxw': 'Height × width',
  'lang.english': 'English',
  'lang.kurdish': 'Kurdish Sorani',
  'lang.arabic': 'Arabic',
}

const ckb: Record<MessageKey, string> = {
  'measure.width': 'پانی (سم)',
  'measure.height': 'درێژی (سم)',
  'measure.qty': 'ژمارە',
  'row.add': 'ڕیزێکی تر',
  'row.remove': 'سڕینەوەی ڕیز {n}',
  'sample.load': 'نموونەی هەڕەمەکی بار بکە',
  'plan.calculate': 'ژماردنی بڕینی بروفايل',
  'plan.title': 'پلانی بڕینی بروفايل',
  'plan.rod': 'بروفايل {n}',
  'plan.leftovers': 'ماوە:',
  'plan.total': 'کۆ: {cm}سم',
  'plan.pieces': 'پارچەکان:',
  'plan.leftoverPiece': '{cm}سم x{count}',
  'plan.cannotCalculate': 'ژماردن ناکرێت',
  'settings.title': 'ڕێکخستن',
  'settings.open': 'کردنەوەی ڕێکخستن',
  'settings.language': 'زمان',
  'settings.dimensionOrder': 'ڕیزبەندی پێوانە',
  'settings.dimension.wxh': 'پانی × درێژی',
  'settings.dimension.hxw': 'درێژی × پانی',
  'lang.english': 'English',
  'lang.kurdish': 'کوردی سۆرانی',
  'lang.arabic': 'العربية',
}

const ar: Record<MessageKey, string> = {
  'measure.width': 'العرض (سم)',
  'measure.height': 'الارتفاع (سم)',
  'measure.qty': 'العدد',
  'row.add': 'إضافة صف',
  'row.remove': 'حذف الصف {n}',
  'sample.load': 'تحميل قياسات عينة عشوائية',
  'plan.calculate': 'حساب قص البروفايل',
  'plan.title': 'خطة قص البروفايل',
  'plan.rod': 'بروفايل {n}',
  'plan.leftovers': 'الباقي:',
  'plan.total': 'المجموع: {cm}سم',
  'plan.pieces': 'القطع:',
  'plan.leftoverPiece': '{cm}سم x{count}',
  'plan.cannotCalculate': 'تعذّر الحساب',
  'settings.title': 'الإعدادات',
  'settings.open': 'فتح الإعدادات',
  'settings.language': 'اللغة',
  'settings.dimensionOrder': 'ترتيب القياس',
  'settings.dimension.wxh': 'العرض × الارتفاع',
  'settings.dimension.hxw': 'الارتفاع × العرض',
  'lang.english': 'English',
  'lang.kurdish': 'کوردی سۆرانی',
  'lang.arabic': 'العربية',
}

const TABLES: Record<LocaleId, Record<MessageKey, string>> = { en, ckb, ar }

export function translate(
  locale: LocaleId,
  key: MessageKey,
  params?: MessageParams,
): string {
  let text = TABLES[locale][key] ?? TABLES.en[key] ?? key
  if (params) {
    for (const [name, value] of Object.entries(params)) {
      text = text.replaceAll(`{${name}}`, String(value))
    }
  }
  return text
}
