import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { Case, CaseStatus } from "@/types/case";
import { CertificateType } from "@/types/certificate";
import { generateMockData } from "@/config/certificateTemplates";

interface NewCaseInput {
  referenceNo: string;
  certificateType: CertificateType;
  files: File[];
}

interface CasesContextValue {
  cases: Case[];
  submitCase: (input: NewCaseInput) => Case;
  updateCaseData: (id: string, data: Record<string, string>) => void;
  approveCase: (id: string, data: Record<string, string>) => void;
  getCase: (id: string) => Case | undefined;
  countByStatus: (status: CaseStatus) => number;
}

const CasesContext = createContext<CasesContextValue | null>(null);

// Simulated processing duration (ms) before a case is ready for review
const PROCESSING_DURATION_MS = 8000;

export const CasesProvider = ({ children }: { children: ReactNode }) => {
  const [cases, setCases] = useState<Case[]>([]);
  const timers = useRef<Map<string, number>>(new Map());

  const submitCase = useCallback((input: NewCaseInput): Case => {
    const id = `CASE-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const now = Date.now();
    const newCase: Case = {
      id,
      referenceNo: input.referenceNo,
      certificateType: input.certificateType,
      files: input.files.map((f) => ({ name: f.name, size: f.size, type: f.type })),
      status: "in-progress",
      createdAt: now,
      updatedAt: now,
    };
    setCases((prev) => [newCase, ...prev]);

    // Simulate background processing — move to review when done
    const timer = window.setTimeout(() => {
      const extracted = {
        ...generateMockData(input.certificateType),
        referenceNo: input.referenceNo,
      };
      setCases((prev) =>
        prev.map((c) =>
          c.id === id
            ? { ...c, status: "review", extractedData: extracted, updatedAt: Date.now() }
            : c
        )
      );
      timers.current.delete(id);
    }, PROCESSING_DURATION_MS);
    timers.current.set(id, timer);

    return newCase;
  }, []);

  const updateCaseData = useCallback((id: string, data: Record<string, string>) => {
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, extractedData: data, updatedAt: Date.now() } : c))
    );
  }, []);

  const approveCase = useCallback((id: string, data: Record<string, string>) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: "approved", extractedData: data, updatedAt: Date.now() }
          : c
      )
    );
  }, []);

  const getCase = useCallback((id: string) => cases.find((c) => c.id === id), [cases]);
  const countByStatus = useCallback(
    (status: CaseStatus) => cases.filter((c) => c.status === status).length,
    [cases]
  );

  useEffect(() => {
    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current.clear();
    };
  }, []);

  return (
    <CasesContext.Provider
      value={{ cases, submitCase, updateCaseData, approveCase, getCase, countByStatus }}
    >
      {children}
    </CasesContext.Provider>
  );
};

export const useCases = () => {
  const ctx = useContext(CasesContext);
  if (!ctx) throw new Error("useCases must be used within CasesProvider");
  return ctx;
};
