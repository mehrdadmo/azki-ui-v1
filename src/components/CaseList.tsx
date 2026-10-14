import { Clock, FileSearch, CheckCircle2, FileText, ChevronRight, Inbox, Layers, Eye, Download, Loader2 } from "lucide-react";
import { Case, CaseStatus } from "@/types/case";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { certificateTypeOptions } from "@/types/certificate";
import { Button } from "@/components/ui/button";
import { CaseFilter } from "@/components/AppSidebar";

interface CaseListProps {
  cases: Case[];
  filter: CaseFilter;
  search: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onNewCase: () => void;
  onQuickApprove: (c: Case) => void;
  onQuickExport: (c: Case) => void;
}

const filterMeta: Record<CaseFilter, { title: string; description: string; icon: typeof Clock }> = {
  all: {
    title: "All Cases",
    description: "Every case across every stage",
    icon: Layers,
  },
  "in-progress": {
    title: "In Progress",
    description: "Cases currently being processed in the background",
    icon: Clock,
  },
  review: {
    title: "Review",
    description: "Cases ready for you to review and approve extracted data",
    icon: FileSearch,
  },
  approved: {
    title: "Approved",
    description: "Approved cases ready to export",
    icon: CheckCircle2,
  },
};

const statusBadgeClass: Record<CaseStatus, string> = {
  "in-progress": "bg-amber-500/15 text-amber-600 border-amber-500/30",
  review: "bg-blue-500/15 text-blue-600 border-blue-500/30",
  approved: "bg-green-500/15 text-green-600 border-green-500/30",
};
const statusLabel: Record<CaseStatus, string> = {
  "in-progress": "In Progress",
  review: "Review",
  approved: "Approved",
};

export const CaseList = ({
  cases,
  filter,
  search,
  selectedId,
  onSelect,
  onNewCase,
  onQuickApprove,
  onQuickExport,
}: CaseListProps) => {
  const meta = filterMeta[filter];
  const Icon = meta.icon;

  const getTypeLabel = (id: string) =>
    certificateTypeOptions.find((o) => o.id === id)?.title ?? id;

  const emptyText = search
    ? `No cases match "${search}".`
    : filter === "all"
    ? "No cases yet — submit your first case to get started."
    : "No cases in this stage.";

  return (
    <div className="p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
            <Icon className="h-6 w-6 text-primary" />
            {meta.title}
            <Badge variant="secondary" className="ml-2 text-xs">
              {cases.length}
            </Badge>
          </h2>
          <p className="text-muted-foreground">{meta.description}</p>
        </div>
        <Button onClick={onNewCase} size="sm">New Case</Button>
      </div>

      {cases.length === 0 ? (
        <div className="border border-dashed border-border rounded-xl p-12 flex flex-col items-center text-center gap-3">
          <div className="h-14 w-14 rounded-full bg-secondary/50 flex items-center justify-center">
            <Inbox className="h-7 w-7 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">{emptyText}</p>
          {!search && (
            <Button onClick={onNewCase} variant="outline" size="sm" className="mt-2">
              Submit a case
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {cases.map((c) => {
            const isSelected = c.id === selectedId;
            const interactive = c.status !== "in-progress";
            return (
              <div
                key={c.id}
                className={cn(
                  "p-4 rounded-xl border transition-all flex items-center gap-4",
                  isSelected
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:border-primary/50 hover:bg-secondary/20"
                )}
              >
                <button
                  onClick={() => interactive && onSelect(c.id)}
                  className="flex items-center gap-4 flex-1 min-w-0 text-left"
                  disabled={!interactive}
                >
                  <div
                    className={cn(
                      "h-12 w-12 rounded-lg flex items-center justify-center flex-shrink-0",
                      c.status === "in-progress" && "bg-amber-500/10",
                      c.status === "review" && "bg-blue-500/10",
                      c.status === "approved" && "bg-green-500/10"
                    )}
                  >
                    {c.status === "in-progress" ? (
                      <div className="h-5 w-5 rounded-full border-2 border-amber-500/30 border-t-amber-500 animate-spin" />
                    ) : (
                      <FileText
                        className={cn(
                          "h-5 w-5",
                          c.status === "review" && "text-blue-500",
                          c.status === "approved" && "text-green-500"
                        )}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="font-semibold text-foreground truncate">{c.referenceNo}</p>
                      <Badge
                        variant="outline"
                        className={cn("text-[10px]", statusBadgeClass[c.status])}
                      >
                        {statusLabel[c.status]}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {c.files.length} {c.files.length === 1 ? "file" : "files"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {getTypeLabel(c.certificateType)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {c.status === "in-progress"
                        ? "Processing…"
                        : `Updated ${new Date(c.updatedAt).toLocaleString()}`}
                    </p>
                  </div>
                </button>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {c.status === "in-progress" && (
                    <Button size="sm" variant="outline" disabled className="gap-1.5">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Processing
                    </Button>
                  )}
                  {c.status === "review" && (
                    <Button size="sm" onClick={() => onSelect(c.id)} className="gap-1.5">
                      <Eye className="h-3.5 w-3.5" />
                      Review
                    </Button>
                  )}
                  {c.status === "approved" && (
                    <Button size="sm" variant="outline" onClick={() => onQuickExport(c)} className="gap-1.5">
                      <Download className="h-3.5 w-3.5" />
                      Export Word
                    </Button>
                  )}
                  {interactive && (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
