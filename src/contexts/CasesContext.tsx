import { createContext, useCallback, useContext, useState, ReactNode } from "react";
import { Case, CaseStatus } from "@/types/case";
import { InsuranceReport } from "@/types/insurance";
import { processInsuranceFiles } from "@/lib/insuranceProcessing";
interface NewCaseInput { companyName: string; files: File[]; }
interface CasesContextValue {
  cases: Case[]; submitCase: (input: NewCaseInput) => Case;
  updateCaseReport: (id: string, report: InsuranceReport) => void;
  approveCase: (id: string) => void;
  countByStatus: (status: CaseStatus) => number;
}
const CasesContext = createContext<CasesContextValue | null>(null);
export const CasesProvider = ({ children }: { children: ReactNode }) => {
  const [cases, setCases] = useState<Case[]>([]);
  const submitCase = useCallback((input: NewCaseInput): Case => {
    const now = Date.now();
    const newCase: Case = { id: crypto.randomUUID(), companyName: input.companyName, files: input.files.map(f => ({ name: f.name, size: f.size, type: f.type })), status: "in-progress", createdAt: now, updatedAt: now };
    setCases(prev => [newCase, ...prev]);
    void processInsuranceFiles(input.files).then(report => {
      setCases(prev => prev.map(c => c.id === newCase.id ? { ...c, status: "review", report, updatedAt: Date.now() } : c));
    }).catch(() => {
      setCases(prev => prev.map(c => c.id === newCase.id ? { ...c, status: "review", report: { manipulation: "unverified", validSignature: "unverified", checks: [], people: [], eligiblePercent: null, notes: ["خواندن فایل ناموفق بود. فایل‌ها را بررسی و دوباره ارسال کنید."] }, updatedAt: Date.now() } : c));
    });
    return newCase;
  }, []);
  const updateCaseReport = useCallback((id: string, report: InsuranceReport) => setCases(prev => prev.map(c => c.id === id ? { ...c, report, updatedAt: Date.now() } : c)), []);
  const approveCase = useCallback((id: string) => setCases(prev => prev.map(c => c.id === id ? { ...c, status: "approved", updatedAt: Date.now() } : c)), []);
  const countByStatus = (status: CaseStatus) => cases.filter(c => c.status === status).length;
  return <CasesContext.Provider value={{ cases, submitCase, updateCaseReport, approveCase, countByStatus }}>{children}</CasesContext.Provider>;
};
export const useCases = () => { const ctx = useContext(CasesContext); if (!ctx) throw new Error("useCases must be used within CasesProvider"); return ctx; };
