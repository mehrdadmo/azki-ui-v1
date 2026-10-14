export type Verdict = "unverified" | "yes" | "no";
export type MatchStatus = "unverified" | "matched" | "mismatched";
export interface InsuredPerson { firstName: string; lastName: string; nationalId: string; gender: string; covered: boolean | null; eligible: boolean | null; }
export interface Reconciliation { key: string; label: string; status: MatchStatus; }
export interface InsuranceReport { manipulation: Verdict; validSignature: Verdict; checks: Reconciliation[]; people: InsuredPerson[]; eligiblePercent: number | null; notes: string[]; }
export const checkLabels = [
  { key: "paymentDate", label: "تاریخ پرداخت" },
  { key: "premium", label: "مبلغ حق بیمه پرداخت‌شده" },
  { key: "headcount", label: "تعداد نفرات" },
  { key: "dailyWages", label: "جمع دستمزد روزانه" },
  { key: "monthlyBenefits", label: "جمع مزایای ماهانه" },
];
export const faNumber = (n: number | string) => String(n).replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
export const uncoveredStatement = (people: InsuredPerson[]) => {
  const uncovered = people.filter(p => p.covered === false);
  if (!uncovered.length) return "فرد فاقد پوشش در اطلاعات بررسی‌شده ثبت نشده است.";
  return uncovered.map(p => `${p.gender === "female" || p.gender === "زن" ? "خانم" : p.gender === "male" || p.gender === "مرد" ? "آقای" : ""} ${p.firstName} ${p.lastName} با کد ملی ${faNumber(p.nationalId)}`.trim()).join("، ") + " تحت پوشش بیمه تأمین اجتماعی نمی‌باشند.";
};
