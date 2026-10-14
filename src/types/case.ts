import { InsuranceReport } from "./insurance";
export type CaseStatus = "in-progress" | "review" | "approved";
export interface Case {
  id: string; companyName: string;
  files: { name: string; size: number; type: string }[];
  status: CaseStatus; createdAt: number; updatedAt: number;
  report?: InsuranceReport;
}
