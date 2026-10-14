import { useState, useEffect } from "react";
import { CheckCircle2, Edit2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { CertificateType } from "@/types/certificate";
import { templateConfigs, generateMockData } from "@/config/certificateTemplates";

interface FileMeta {
  name: string;
  size: number;
  type?: string;
}

interface ProcessStageProps {
  files: FileMeta[];
  certificateType: CertificateType;
  initialData?: Record<string, string> | null;
  readOnly?: boolean;
  approveLabel?: string;
  onApprove: (data: Record<string, string>) => void;
  onChange?: (data: Record<string, string>) => void;
}

export const ProcessStage = ({
  files,
  certificateType,
  initialData,
  readOnly,
  approveLabel,
  onApprove,
  onChange,
}: ProcessStageProps) => {
  const [certificateData, setCertificateData] = useState<Record<string, string> | null>(
    initialData ?? null
  );
  const [isProcessing, setIsProcessing] = useState(!initialData);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<number>(0);
  const { toast } = useToast();

  const templateConfig = templateConfigs[certificateType];

  useEffect(() => {
    if (initialData) {
      // Only set once on mount / when switching to a case that already has data.
      // Do NOT reset on every parent update — that would wipe in-progress edits.
      return;
    }
    setIsProcessing(true);
    setCertificateData(null);
    const t = setTimeout(() => {
      const data = generateMockData(certificateType);
      setCertificateData(data);
      setIsProcessing(false);
      toast({
        title: "Data extraction complete",
        description: "Review and edit certificate fields as needed",
      });
    }, 2000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certificateType]);

  const handleFieldChange = (key: string, value: string) => {
    if (certificateData) {
      const next = { ...certificateData, [key]: value };
      setCertificateData(next);
      onChange?.(next);
    }
  };

  const handleApprove = () => {
    if (certificateData) {
      toast({
        title: "Certificate approved",
        description: "Moving to export stage",
      });
      onApprove(certificateData);
    }
  };

  if (isProcessing) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-4" />
        <p className="text-lg font-semibold text-foreground">Processing documents...</p>
        <p className="text-sm text-muted-foreground">Extracting data with AI</p>
      </div>
    );
  }

  if (!certificateData) return null;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">{templateConfig.title}</h2>
        <p className="text-muted-foreground">Review and edit extracted data before issuing</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Document Preview Sidebar */}
        <div className="col-span-3 space-y-4">
          <h3 className="font-semibold text-foreground mb-3">Uploaded Documents</h3>
          {files.map((file, index) => (
            <div
              key={index}
              onClick={() => setSelectedDocument(index)}
              className={cn(
                "p-4 rounded-lg border cursor-pointer transition-all",
                selectedDocument === index
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-secondary/20"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded bg-secondary/50 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certificate Template */}
        <div className="col-span-9">
          <div className="border border-border rounded-xl overflow-hidden bg-card">
            {/* Certificate Header */}
            <div className="bg-secondary/30 px-6 py-4 border-b border-border text-center">
              <h3 className="text-xl font-bold text-foreground tracking-wide">
                {templateConfig.title}
              </h3>
            </div>

            {/* Certificate Fields */}
            <div className="p-6 space-y-3">
              {templateConfig.fields.map((field) => (
                <div
                  key={field.key}
                  className="grid grid-cols-12 gap-4 py-2 border-b border-border/50 last:border-0 items-start"
                >
                  <div className="col-span-4">
                    <p className="text-sm font-semibold text-foreground">
                      {field.label}
                    </p>
                  </div>
                  <div className="col-span-1 text-center text-muted-foreground">:</div>
                  <div className="col-span-7 flex items-start gap-2">
                    {editingField === field.key ? (
                      field.type === "textarea" ? (
                        <Textarea
                          value={certificateData[field.key] || ""}
                          onChange={(e) => handleFieldChange(field.key, e.target.value)}
                          onBlur={() => setEditingField(null)}
                          autoFocus
                          className="min-h-[60px]"
                        />
                      ) : (
                        <Input
                          value={certificateData[field.key] || ""}
                          onChange={(e) => handleFieldChange(field.key, e.target.value)}
                          onBlur={() => setEditingField(null)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") setEditingField(null);
                          }}
                          autoFocus
                        />
                      )
                    ) : (
                      <>
                        <p
                          className="text-sm text-foreground flex-1 cursor-pointer hover:text-primary transition-colors whitespace-pre-line"
                          onClick={() => setEditingField(field.key)}
                        >
                          {certificateData[field.key] || "-"}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingField(field.key)}
                          className="h-6 w-6 p-0 flex-shrink-0"
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}

              {/* Inspection Note */}
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-start gap-2 mb-2">
                  <p className="text-sm text-muted-foreground italic flex-1">
                    {editingField === "inspectionNote" ? (
                      <Textarea
                        value={certificateData.inspectionNote || ""}
                        onChange={(e) => handleFieldChange("inspectionNote", e.target.value)}
                        onBlur={() => setEditingField(null)}
                        autoFocus
                        className="min-h-[80px]"
                      />
                    ) : (
                      <span
                        className="cursor-pointer hover:text-primary transition-colors"
                        onClick={() => setEditingField("inspectionNote")}
                      >
                        {certificateData.inspectionNote}
                      </span>
                    )}
                  </p>
                  {editingField !== "inspectionNote" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingField("inspectionNote")}
                      className="h-6 w-6 p-0 flex-shrink-0"
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Conclusion */}
              <div className="mt-4">
                <h4 className="font-bold text-foreground mb-2">Conclusion:</h4>
                <div className="flex items-start gap-2">
                  {editingField === "conclusion" ? (
                    <Textarea
                      value={certificateData.conclusion || ""}
                      onChange={(e) => handleFieldChange("conclusion", e.target.value)}
                      onBlur={() => setEditingField(null)}
                      autoFocus
                      className="min-h-[100px]"
                    />
                  ) : (
                    <>
                      <p
                        className="text-sm text-foreground flex-1 cursor-pointer hover:text-primary transition-colors"
                        onClick={() => setEditingField("conclusion")}
                      >
                        {certificateData.conclusion}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingField("conclusion")}
                        className="h-6 w-6 p-0 flex-shrink-0"
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-sm font-bold text-foreground text-center">
                  ARIA SINA CONTROL INTERNATIONAL INSPECTION CO. (ASCO)
                </p>
                <p className="text-xs text-muted-foreground mt-2 text-justify">
                  {templateConfig.remarks}
                </p>
                <p className="text-xs text-muted-foreground mt-2 text-justify">
                  {templateConfig.footerNote}
                </p>
                <p className="text-sm font-bold text-foreground text-center mt-4">
                  THIS DOCUMENT IS VALID ONLY WITH ASCO HOLOGRAM NO.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!readOnly && (
        <div className="mt-8 flex justify-end">
          <Button onClick={handleApprove} size="lg" className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            {approveLabel ?? "Approve & Issue"}
          </Button>
        </div>
      )}
    </div>
  );
};
