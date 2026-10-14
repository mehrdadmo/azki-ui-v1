import { useMemo, useState } from "react";
import { ArrowLeft, Building2, Clock, FileSearch, CheckCircle2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AppSidebar, CaseFilter, filters } from "@/components/AppSidebar";
import { NewCaseDialog } from "@/components/NewCaseDialog";
import { CaseList } from "@/components/CaseList";
import { InsuranceReport } from "@/components/InsuranceReport";
import { useCases } from "@/contexts/CasesContext";
import { Case } from "@/types/case";
import { exportInsurance } from "@/lib/exportInsurance";
import { cn } from "@/lib/utils";
const Index = () => {
  const [filter, setFilter] = useState<CaseFilter>("all"); const [search, setSearch] = useState(""); const [selectedId, setSelectedId] = useState<string | null>(null); const [dialogOpen, setDialogOpen] = useState(false); const [mobileOpen, setMobileOpen] = useState(false);
  const { cases, approveCase, updateCaseReport, countByStatus } = useCases(); const { toast } = useToast();
  const filtered = useMemo(() => cases.filter(c => (filter === "all" || c.status === filter) && c.companyName.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())), [cases, filter, search]);
  const selected = cases.find(c => c.id === selectedId);
  const download = async (c: Case) => { try { await exportInsurance(c); } catch { toast({ title: "Excel export failed", description: "Please try again.", variant: "destructive" }); } };
  const changeFilter = (f: CaseFilter) => { setFilter(f); setSelectedId(null); setMobileOpen(false); };
  return <div className="min-h-screen flex bg-background"><div className={cn("sidebar-wrap", mobileOpen && "is-open")}><AppSidebar filter={filter} onFilterChange={changeFilter} search={search} onSearchChange={setSearch} cases={filtered} selectedId={selectedId} onSelect={id => { setSelectedId(id); setMobileOpen(false); }} onNewCase={() => { setDialogOpen(true); setMobileOpen(false); }} /></div>{mobileOpen && <Button className="mobile-close fixed top-3 right-3 z-50" size="icon" aria-label="Close navigation" onClick={() => setMobileOpen(false)}><X /></Button>}
    <div className="flex-1 min-w-0"><header className="bg-card border-b px-5 md:px-9 h-20 flex items-center justify-between gap-3"><div className="flex items-center gap-3"><Button className="mobile-menu" variant="ghost" size="icon" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu /></Button><div><h1 className="text-lg font-bold">Azki IDP Platform</h1><p className="text-xs text-muted-foreground mt-1">Powered By Synapse IDP</p></div></div><span className="text-xs text-muted-foreground border-l pl-4 hidden sm:block">Insurance operations</span></header>
    <main className="p-5 md:p-9 max-w-[1400px] mx-auto">{selected?.report ? <><Button variant="ghost" onClick={() => setSelectedId(null)} className="mb-5 -ml-3 text-muted-foreground"><ArrowLeft />Back to cases</Button><InsuranceReport key={selected.id} caseItem={selected} onChange={r => updateCaseReport(selected.id, r)} onApprove={() => { approveCase(selected.id); toast({ title: "گزارش تأیید شد" }); }} onExport={() => download(selected)} /></> : <>
      <div className="mb-8"><p className="text-xs text-muted-foreground mb-2">WORKSPACE / COMPANIES</p><h2 className="text-3xl font-semibold">Insurance case overview</h2></div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-9">{[{ label: "Total companies", number: cases.length, icon: Building2, color: "text-foreground bg-muted" }, { label: "In progress", number: countByStatus("in-progress"), icon: Clock, color: "text-warning bg-warning/10" }, { label: "Awaiting review", number: countByStatus("review"), icon: FileSearch, color: "text-primary bg-primary/10" }, { label: "Approved reports", number: countByStatus("approved"), icon: CheckCircle2, color: "text-success bg-success/10" }].map(item => <div key={item.label} className="bg-card border rounded-lg p-4 md:p-5"><div className="flex items-center justify-between gap-2"><span className="text-xs text-muted-foreground">{item.label}</span><span className={`h-8 w-8 rounded-md flex items-center justify-center ${item.color}`}><item.icon className="h-4 w-4" /></span></div><p className="text-3xl font-semibold mt-3">{item.number}</p></div>)}</div>
      <div className="flex flex-wrap gap-2 border-b pb-4 mb-6">{filters.map(f => <Button key={f.id} variant="outline" size="sm" className={cn("rounded-full text-xs", filter === f.id && "bg-primary/10 text-primary border-primary/30")} onClick={() => changeFilter(f.id)} aria-pressed={filter === f.id}><f.icon />{f.label}</Button>)}</div>
      <CaseList cases={filtered} filter={filter} search={search} onSelect={setSelectedId} onNewCase={() => setDialogOpen(true)} onQuickExport={c => void download(c)} />
    </>}</main></div><NewCaseDialog open={dialogOpen} onOpenChange={setDialogOpen} /></div>;
};
export default Index;
