import { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import ascoLogo from "@/assets/asco-logo.png";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AppSidebar, CaseFilter } from "@/components/AppSidebar";
import { NewCaseDialog } from "@/components/NewCaseDialog";
import { CaseList } from "@/components/CaseList";
import { ProcessStage } from "@/components/stages/ProcessStage";
import { ExportStage } from "@/components/stages/ExportStage";
import { useCases } from "@/contexts/CasesContext";
import { Case } from "@/types/case";

const Index = () => {
  const [filter, setFilter] = useState<CaseFilter>("all");
  const [search, setSearch] = useState("");
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { cases, approveCase, updateCaseData } = useCases();
  const { toast } = useToast();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return cases.filter((c) => {
      if (filter !== "all" && c.status !== filter) return false;
      if (q && !c.referenceNo.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [cases, filter, search]);

  const selectedCase = useMemo(
    () => (selectedCaseId ? cases.find((c) => c.id === selectedCaseId) ?? null : null),
    [cases, selectedCaseId]
  );

  useEffect(() => {
    if (selectedCase && selectedCase.status === "in-progress") {
      setSelectedCaseId(null);
    }
  }, [selectedCase]);

  const handleApprove = (data: Record<string, string>) => {
    if (!selectedCase) return;
    approveCase(selectedCase.id, data);
    toast({
      title: "Case approved",
      description: `${selectedCase.referenceNo} moved to Approved`,
    });
    setSelectedCaseId(null);
  };

  const handleQuickApprove = (c: Case) => {
    approveCase(c.id, c.extractedData ?? {});
    toast({
      title: "Case approved",
      description: `${c.referenceNo} moved to Approved`,
    });
    if (selectedCaseId === c.id) setSelectedCaseId(null);
  };

  const handleQuickExport = (c: Case) => {
    toast({
      title: "Exporting to Word",
      description: `${c.referenceNo} is being prepared for download`,
    });
    setTimeout(() => {
      toast({
        title: "Export complete",
        description: `${c.referenceNo} downloaded as DOCX`,
      });
    }, 1200);
  };

  return (
    <SidebarProvider style={{ "--sidebar-width": "20rem" } as React.CSSProperties}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-background to-secondary/20">
        <AppSidebar
          filter={filter}
          onFilterChange={setFilter}
          search={search}
          onSearchChange={setSearch}
          cases={filtered}
          selectedId={selectedCaseId}
          onSelect={(id) => setSelectedCaseId(id)}
          onNewCase={() => setDialogOpen(true)}
          onQuickApprove={handleQuickApprove}
          onQuickExport={handleQuickExport}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <header className="border-b border-border bg-card/50 backdrop-blur-sm">
            <div className="px-6 py-4 flex items-center gap-4">
              <SidebarTrigger />
              <img src={ascoLogo} alt="ASCO International" className="h-10 w-auto" />
              <div className="flex-1">
                <h1 className="text-xl font-bold text-foreground">ASCO IDP Platform</h1>
                <p className="text-xs text-muted-foreground">Powered By Synapse IDP</p>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">
            <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
              {selectedCase ? (
                <div>
                  <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedCaseId(null)}
                        className="gap-2"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back to list
                      </Button>
                      <div>
                        <p className="font-semibold text-foreground">
                          {selectedCase.referenceNo}
                        </p>
                      </div>
                    </div>
                  </div>

                  {selectedCase.status === "review" && selectedCase.extractedData && (
                    <ProcessStage
                      files={selectedCase.files}
                      certificateType={selectedCase.certificateType}
                      initialData={selectedCase.extractedData}
                      approveLabel="Approve & Move to Approved"
                      onChange={(data) => updateCaseData(selectedCase.id, data)}
                      onApprove={handleApprove}
                    />
                  )}

                  {selectedCase.status === "approved" && selectedCase.extractedData && (
                    <ExportStage
                      certificateType={selectedCase.certificateType}
                      certificateData={selectedCase.extractedData}
                    />
                  )}
                </div>
              ) : (
                <CaseList
                  cases={filtered}
                  filter={filter}
                  search={search}
                  selectedId={selectedCaseId}
                  onSelect={(id) => setSelectedCaseId(id)}
                  onNewCase={() => setDialogOpen(true)}
                  onQuickApprove={handleQuickApprove}
                  onQuickExport={handleQuickExport}
                />
              )}
            </div>
          </main>
        </div>

        <NewCaseDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      </div>
    </SidebarProvider>
  );
};

export default Index;
