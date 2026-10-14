import Papa from "papaparse";
import { InsuranceReport, InsuredPerson, checkLabels } from "@/types/insurance";
const normalize = (s: string) => s.replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/[\s_‌-]/g, "").toLowerCase();
const value = (row: Record<string, string>, names: string[]) => {
  const entry = Object.entries(row).find(([key]) => names.some(n => normalize(n) === normalize(key)));
  return entry?.[1]?.trim() ?? "";
};
const bool = (s: string): boolean | null => {
  if (["true", "yes", "1", "بله", "دارد", "تحتپوشش", "مشمول"].includes(normalize(s))) return true;
  if (["false", "no", "0", "خیر", "ندارد", "فاقدپوشش", "تحتپوششنمیباشد", "غیرمشمول"].includes(normalize(s))) return false;
  return null;
};
export async function processInsuranceFiles(files: File[]): Promise<InsuranceReport> {
  const report: InsuranceReport = { manipulation: "unverified", validSignature: "unverified", checks: checkLabels.map(c => ({ ...c, status: "unverified" })), people: [], eligiblePercent: null, notes: [] };
  for (const file of files.filter(f => /\.csv$/i.test(f.name))) {
    const parsed = Papa.parse<Record<string, string>>(await file.text(), { header: true, skipEmptyLines: "greedy", transformHeader: h => h.replace(/^\uFEFF/, "").trim() });
    if (parsed.errors.length) report.notes.push(`${file.name}: برخی ردیف‌های CSV قابل خواندن نیستند؛ داده‌ها نیاز به بررسی دارند.`);
    const people: InsuredPerson[] = parsed.data.map(row => ({
      firstName: value(row, ["firstName", "first name", "نام"]), lastName: value(row, ["lastName", "last name", "نام خانوادگی"]),
      nationalId: value(row, ["nationalId", "national id", "کد ملی"]), gender: value(row, ["gender", "جنسیت"]),
      covered: bool(value(row, ["covered", "socialInsurance", "پوشش", "پوشش تامین اجتماعی"])),
      eligible: bool(value(row, ["eligible", "supplementaryEligible", "مشمول بیمه تکمیلی"])),
    })).filter(p => p.firstName || p.lastName || p.nationalId);
    report.people.push(...people);
    if (!people.length) report.notes.push(`${file.name}: ستون‌های نام، نام خانوادگی و کد ملی شناسایی نشدند.`);
  }
  if (report.people.length && report.people.every(p => p.eligible !== null)) report.eligiblePercent = Math.round(100 * report.people.filter(p => p.eligible).length / report.people.length);
  report.notes.push("نتایج پوشش از CSV خوانده شده‌اند؛ استعلام تأمین اجتماعی و بررسی خودکار اصالت PDF و تصویر متصل نیست.");
  return report;
}
