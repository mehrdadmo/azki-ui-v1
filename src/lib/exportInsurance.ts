import type { Case } from "@/types/case";
import { uncoveredStatement } from "@/types/insurance";
export async function exportInsurance(c: Case) {
  if (!c.report) throw new Error("گزارش آماده نیست");
  const { default: ExcelJS } = await import("exceljs");
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Azki IDP Platform";
  const report = workbook.addWorksheet("گزارش", { views: [{ rightToLeft: true }] });
  report.columns = [{ width: 40 }, { width: 85 }];
  report.addRow(["Azki IDP Platform", c.companyName]);
  report.addRow(["وضعیت پرونده", c.status === "approved" ? "تأییدشده" : "در انتظار بررسی"]);
  const verdict = { unverified: "بررسی نشده", yes: "بله", no: "خیر" };
  report.addRow(["سند دارای فتوشاپ و دستکاری است", verdict[c.report.manipulation]]);
  report.addRow(["لیست دارای مهر و امضای معتبر است", verdict[c.report.validSignature]]);
  report.addRow(["گزارش تطبیق ریز اطلاعات لیست بیمه", "نتیجه"]);
  c.report.checks.forEach(check => report.addRow([check.label, { unverified: "بررسی نشده", matched: "انطباق", mismatched: "عدم انطباق" }[check.status]]));
  report.addRow(["درصد مشمول بیمه تکمیلی", c.report.eligiblePercent === null ? "اطلاعات کافی نیست" : c.report.eligiblePercent / 100]);
  if (c.report.eligiblePercent !== null) report.getCell(11, 2).numFmt = "0%";
  report.addRow(["گزارش عدم پوشش", uncoveredStatement(c.report.people)]);
  c.report.notes.forEach(note => report.addRow(["یادداشت", note]));
  const people = workbook.addWorksheet("افراد فاقد پوشش", { views: [{ rightToLeft: true }] });
  people.columns = [{ header: "نام", width: 24 }, { header: "نام خانوادگی", width: 28 }, { header: "کد ملی", width: 24 }, { header: "وضعیت پوشش", width: 36 }];
  c.report.people.filter(p => p.covered === false).forEach(p => people.addRow([p.firstName, p.lastName, p.nationalId, "تحت پوشش نمی‌باشد"]));
  people.getColumn(3).numFmt = "@";
  for (const sheet of [report, people]) {
    sheet.eachRow(row => { row.height = 30; row.eachCell(cell => { cell.font = { name: "Arial", size: 11 }; cell.alignment = { horizontal: "right", vertical: "middle", wrapText: true }; }); });
    sheet.getRow(1).font = { name: "Arial", size: 12, bold: true };
    sheet.views = [{ rightToLeft: true, state: "frozen", ySplit: 1 }];
  }
  report.getRow(12).height = 100;
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const file = new File([blob], `${c.companyName.replace(/[\/\\:*?"<>|]/g, "-")}-report.xlsx`, { type: blob.type });
  if (matchMedia("(pointer: coarse)").matches && navigator.canShare?.({ files: [file] })) {
    try { await navigator.share({ files: [file] }); return; } catch (e) { if ((e as DOMException).name === "AbortError") return; }
  }
  const url = URL.createObjectURL(blob); const a = document.createElement("a");
  a.href = url; a.download = file.name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 30000);
}
