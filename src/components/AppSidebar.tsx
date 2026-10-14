import { Clock, FileSearch, CheckCircle2, Plus, Search, Layers, Building2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Case, CaseStatus } from "@/types/case";
import { useCases } from "@/contexts/CasesContext";
import logo from "@/assets/azki-logo.png.asset.json";
export type CaseFilter = "all" | CaseStatus;
export const filters: { id: CaseFilter; label: string; icon: typeof Clock }[] = [
  { id: "all", label: "All Cases", icon: Layers }, { id: "in-progress", label: "In Progress", icon: Clock }, { id: "review", label: "Review", icon: FileSearch }, { id: "approved", label: "Approved", icon: CheckCircle2 },
];
interface Props { filter: CaseFilter; onFilterChange: (f: CaseFilter) => void; search: string; onSearchChange: (v: string) => void; cases: Case[]; selectedId: string | null; onSelect: (id: string) => void; onNewCase: () => void; }
export const AppSidebar = ({ filter, onFilterChange, search, onSearchChange, cases, selectedId, onSelect, onNewCase }: Props) => {
  const { cases: allCases, countByStatus } = useCases();
  return <aside className="azki-sidebar bg-card border-r flex flex-col"><div className="px-6 pt-5 pb-6"><img src={logo.url} alt="Azki" className="w-36 h-16 object-cover" /><p className="text-xs text-muted-foreground mt-2">ENTERPRISE WORKSPACE</p></div><div className="px-5"><Button onClick={onNewCase} className="w-full justify-center"><Plus />New Case</Button><div className="relative mt-4"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input aria-label="Search by company name" placeholder="Search company name…" value={search} onChange={e => onSearchChange(e.target.value)} className="pl-9 bg-background" /></div></div>
    <nav className="p-5 space-y-1 mt-2" aria-label="Case status">{filters.map(f => <Button key={f.id} variant="ghost" aria-pressed={filter === f.id} className={cn("w-full justify-start h-11 font-normal", filter === f.id ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground")} onClick={() => onFilterChange(f.id)}><f.icon /><span className="flex-1 text-left">{f.label}</span><span className="text-xs bg-background rounded px-1.5 py-0.5 min-w-6">{f.id === "all" ? allCases.length : countByStatus(f.id)}</span></Button>)}</nav>
    <div className="px-5 pt-5 border-t flex-1"><p className="text-[10px] font-semibold text-muted-foreground mb-3">RECENT COMPANIES</p>{!cases.length && <p className="text-xs text-muted-foreground py-2">No companies yet</p>}{cases.slice(0, 8).map(c => <Button key={c.id} variant="ghost" disabled={c.status === "in-progress"} className={cn("w-full justify-start font-normal h-11 mb-1", selectedId === c.id && "bg-muted")} onClick={() => onSelect(c.id)}><Building2 className="text-muted-foreground" /><span className="truncate" dir="auto">{c.companyName}</span></Button>)}</div>
    <div className="p-5 border-t flex gap-3 items-center"><div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center"><ShieldCheck className="h-5 w-5 text-success" /></div><div><p className="text-xs font-semibold">Insurance Compliance</p><p className="text-[10px] text-muted-foreground mt-1">Powered By Synapse IDP</p></div></div></aside>;
};
