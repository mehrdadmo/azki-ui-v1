import { CertificateType } from "./certificate";

export type CaseStatus = "in-progress" | "review" | "approved";

export interface Case {
  id: string;
  referenceNo: string;
  certificateType: CertificateType;
  files: { name: string; size: number; type: string }[];
  status: CaseStatus;
  createdAt: number;
  updatedAt: number;
  extractedData?: Record<string, string>;
}
