import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CertificateType } from "@/types/certificate";
import { templateConfigs } from "@/config/certificateTemplates";

interface ExportStageProps {
  certificateType: CertificateType;
  certificateData: Record<string, string> | null;
}

export const ExportStage = ({ certificateType, certificateData }: ExportStageProps) => {
  const { toast } = useToast();
  const templateConfig = templateConfigs[certificateType];

  const handleExport = (format: "PDF" | "DOCX") => {
    toast({
      title: `Exporting to ${format}`,
      description: `Your ${templateConfig.title.toLowerCase()} is being prepared for download`,
    });
    
    // In a real implementation, this would generate and download the file
    setTimeout(() => {
      toast({
        title: "Export complete",
        description: `Your certificate has been downloaded as ${format}`,
      });
    }, 1500);
  };

  if (!certificateData) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">No certificate data available</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Export Certificate</h2>
        <p className="text-muted-foreground">Download your approved {templateConfig.title.toLowerCase()}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Export Options */}
        <div className="border border-border rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            Export Format
          </h3>
          <div className="space-y-3">
            <Button
              onClick={() => handleExport("PDF")}
              variant="outline"
              className="w-full justify-start gap-3 h-14"
            >
              <FileText className="h-5 w-5 text-destructive" />
              <div className="text-left">
                <p className="font-medium">Export to PDF</p>
                <p className="text-xs text-muted-foreground">Best for printing and sharing</p>
              </div>
            </Button>
            <Button
              onClick={() => handleExport("DOCX")}
              variant="outline"
              className="w-full justify-start gap-3 h-14"
            >
              <FileText className="h-5 w-5 text-primary" />
              <div className="text-left">
                <p className="font-medium">Export to Word (DOCX)</p>
                <p className="text-xs text-muted-foreground">Editable document format</p>
              </div>
            </Button>
          </div>
        </div>

        {/* Certificate Preview */}
        <div className="border border-border rounded-xl p-6 bg-gradient-to-br from-secondary/20 to-transparent">
          <h3 className="font-semibold text-foreground mb-4">Certificate Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Certificate Type</span>
              <span className="font-medium text-foreground">{templateConfig.title}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Reference No.</span>
              <span className="font-medium text-foreground">{certificateData.referenceNo}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Date of Issue</span>
              <span className="font-medium text-foreground">{certificateData.dateOfIssue}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Consignee</span>
              <span className="font-medium text-foreground">{certificateData.consignee}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Shipper</span>
              <span className="font-medium text-foreground">{certificateData.shipper}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Origin</span>
              <span className="font-medium text-foreground">{certificateData.origin}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Certificate Preview */}
      <div className="border border-border rounded-xl overflow-hidden bg-card">
        <div className="bg-secondary/30 px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Final Certificate Preview</h3>
        </div>
        <div className="p-6">
          <div className="text-center mb-6">
            <h4 className="text-xl font-bold text-foreground tracking-wide">{templateConfig.title}</h4>
          </div>
          
          {/* Dynamic Fields */}
          <div className="space-y-2 text-sm mb-6">
            {templateConfig.fields.slice(0, 10).map((field) => (
              <div key={field.key} className="grid grid-cols-3 gap-4 py-1 border-b border-border/30">
                <span className="text-muted-foreground font-medium">{field.label}</span>
                <span className="col-span-2 text-foreground whitespace-pre-line">
                  {certificateData[field.key] || "-"}
                </span>
              </div>
            ))}
          </div>

          {/* Inspection Note */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground italic">
              {certificateData.inspectionNote}
            </p>
          </div>

          {/* Conclusion */}
          <div className="mb-6">
            <h5 className="font-bold text-foreground mb-2">Conclusion:</h5>
            <p className="text-sm text-foreground">
              {certificateData.conclusion}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-border text-center">
            <p className="text-sm font-bold text-foreground">
              ARIA SINA CONTROL INTERNATIONAL INSPECTION CO. (ASCO)
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {templateConfig.remarks}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              THIS DOCUMENT IS VALID ONLY WITH ASCO HOLOGRAM NO.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
