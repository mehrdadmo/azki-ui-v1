import { Clock, FileSearch, CheckCircle2, Plus, Search, FileText, Loader2, Download, Eye, Layers } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Case, CaseStatus } from "@/types/case";
import { useCases } from "@/contexts/CasesContext";

export type CaseFilter = "all" | CaseStatus;

interface AppSidebarProps {
  filter: CaseFilter;
  onFilterChange: (f: CaseFilter) => void;
  search: string;
  onSearchChange: (v: string) => void;
  cases: Case[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onNewCase: () => void;
  onQuickApprove: (c: Case) => void;
  onQuickExport: (c: Case) => void;
}

const filters: { id: CaseFilter; label: string; icon: typeof Clock }[] = [
  { id: "all", label: "All", icon: Layers },
  { id: "in-progress", label: "In Progress", icon: Clock },
  { id: "review", label: "Review", icon: FileSearch },
  { id: "approved", label: "Approved", icon: CheckCircle2 },
];

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

export const AppSidebar = ({
  filter,
  onFilterChange,
  search,
  onSearchChange,
  cases,
  selectedId,
  onSelect,
  onNewCase,
  onQuickApprove,
  onQuickExport,
}: AppSidebarProps) => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { countByStatus, cases: allCases } = useCases();

  const countFor = (f: CaseFilter) =>
    f === "all" ? allCases.length : countByStatus(f);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-3 space-y-3 border-b border-border">
        <Button onClick={onNewCase} className="w-full gap-2" size={collapsed ? "icon" : "default"}>
          <Plus className="h-4 w-4" />
          {!collapsed && <span>New Case</span>}
        </Button>

        {!collapsed && (
          <>
            <div className="relative">
              <Search className="h-4 w-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search Reference No."
                className="pl-8 h-9"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {filters.map((f) => {
                const active = filter === f.id;
                const count = countFor(f.id);
                return (
                  <button
                    key={f.id}
                    onClick={() => onFilterChange(f.id)}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border transition-colors",
                      active
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-muted-foreground border-border hover:bg-secondary/50"
                    )}
                  >
                    <f.icon className="h-3 w-3" />
                    <span>{f.label}</span>
                    <span
                      className={cn(
                        "ml-0.5 text-[10px] px-1 rounded",
                        active ? "bg-primary-foreground/20" : "bg-secondary"
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </SidebarHeader>

      <SidebarContent className="p-2">
        {collapsed ? (
          <div className="flex flex-col items-center gap-2 py-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => onFilterChange(f.id)}
                title={f.label}
                className={cn(
                  "h-8 w-8 rounded-md flex items-center justify-center",
                  filter === f.id ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                )}
              >
                <f.icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        ) : cases.length === 0 ? (
          <div className="text-center text-xs text-muted-foreground py-8 px-3">
            No cases match the current filter.
          </div>
        ) : (
          <div className="space-y-1.5">
            {cases.map((c) => {
              const isSelected = c.id === selectedId;
              return (
                <div
                  key={c.id}
                  className={cn(
                    "rounded-lg border p-2.5 transition-colors",
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40 hover:bg-secondary/30"
                  )}
                >
                  <button
                    onClick={() => onSelect(c.id)}
                    className="w-full text-left"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <FileText className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {c.referenceNo}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {c.files.length} {c.files.length === 1 ? "file" : "files"} ·{" "}
                          {new Date(c.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn("text-[10px] h-5 px-1.5", statusBadgeClass[c.status])}
                    >
                      {statusLabel[c.status]}
                    </Badge>
                  </button>

                  <div className="mt-2">
                    {c.status === "in-progress" && (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled
                        className="w-full h-7 text-xs gap-1.5"
                      >
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Processing
                      </Button>
                    )}
                    {c.status === "review" && (
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelect(c.id);
                        }}
                        className="w-full h-7 text-xs gap-1.5"
                      >
                        <Eye className="h-3 w-3" />
                        Review
                      </Button>
                    )}
                    {c.status === "approved" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickExport(c);
                        }}
                        className="w-full h-7 text-xs gap-1.5"
                      >
                        <Download className="h-3 w-3" />
                        Export Word
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-border">
        {!collapsed && (
          <p className="text-xs text-muted-foreground text-center">
            Powered By Synapse IDP
          </p>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};
