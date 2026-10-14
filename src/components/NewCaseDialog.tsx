import { useState, useCallback } from "react";
import { Upload, FileText, Image, FileType, X, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { CertificateType, certificateTypeOptions } from "@/types/certificate";
import { useCases } from "@/contexts/CasesContext";

interface NewCaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewCaseDialog = ({ open, onOpenChange }: NewCaseDialogProps) => {
  const [referenceNo, setReferenceNo] = useState("");
  const [certificateType, setCertificateType] = useState<CertificateType | "">("");
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();
  const { submitCase } = useCases();

  const reset = () => {
    setReferenceNo("");
    setCertificateType("");
    setFiles([]);
    setShowSuccess(false);
  };

  const handleFiles = (newFiles: File[]) => {
    const valid = newFiles.filter((f) => {
      const ok =
        f.type === "application/pdf" ||
        f.type.startsWith("image/") ||
        f.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        f.type === "application/msword";
      if (!ok) {
        toast({
          title: "Invalid file type",
          description: `${f.name} is not a supported format`,
          variant: "destructive",
        });
      }
      return ok;
    });
    setFiles((p) => [...p, ...valid]);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(Array.from(e.dataTransfer.files));
  }, []);

  const getIcon = (f: File) => {
    if (f.type === "application/pdf") return FileText;
    if (f.type.startsWith("image/")) return Image;
    return FileType;
  };

  const handleSubmit = () => {
    if (!referenceNo.trim()) {
      toast({ title: "Reference No. required", variant: "destructive" });
      return;
    }
    if (!certificateType) {
      toast({ title: "Select a certificate type", variant: "destructive" });
      return;
    }
    if (files.length === 0) {
      toast({ title: "Upload at least one document", variant: "destructive" });
      return;
    }
    submitCase({ referenceNo: referenceNo.trim(), certificateType, files });
    setShowSuccess(true);
  };

  const handleClose = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {showSuccess ? (
          <div className="py-8 flex flex-col items-center text-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-2xl">New Case Submitted</DialogTitle>
              <DialogDescription className="mt-2">
                Reference <span className="font-medium text-foreground">{referenceNo}</span> is
                now processing in the background. You'll find it under{" "}
                <span className="font-medium text-foreground">In Progress</span>, and it will move
                to <span className="font-medium text-foreground">Review</span> when ready.
              </DialogDescription>
            </div>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" onClick={() => handleClose(false)}>
                Close
              </Button>
              <Button onClick={reset}>Submit Another</Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>New Case</DialogTitle>
              <DialogDescription>
                Enter a reference number and upload supporting documents to start a new case.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-2">
              <div className="space-y-2">
                <Label htmlFor="reference-no">Reference No.</Label>
                <Input
                  id="reference-no"
                  placeholder="e.g. GC25-1012-B"
                  value={referenceNo}
                  onChange={(e) => setReferenceNo(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cert-type">Certificate Type</Label>
                <Select
                  value={certificateType}
                  onValueChange={(v) => setCertificateType(v as CertificateType)}
                >
                  <SelectTrigger id="cert-type">
                    <SelectValue placeholder="Select certificate type" />
                  </SelectTrigger>
                  <SelectContent>
                    {certificateTypeOptions.map((opt) => (
                      <SelectItem key={opt.id} value={opt.id}>
                        {opt.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Documents</Label>
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  className={cn(
                    "border-2 border-dashed rounded-lg p-6 transition-colors",
                    isDragging
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Drop files here or click to browse
                    </p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,image/*,.doc,.docx"
                      onChange={(e) => handleFiles(Array.from(e.target.files || []))}
                      className="hidden"
                      id="case-files"
                    />
                    <label htmlFor="case-files">
                      <Button asChild variant="outline" size="sm">
                        <span className="cursor-pointer">Select Files</span>
                      </Button>
                    </label>
                  </div>
                </div>

                {files.length > 0 && (
                  <div className="space-y-2 mt-3">
                    {files.map((f, i) => {
                      const Icon = getIcon(f);
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2 rounded-md border border-border bg-card/50"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <Icon className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-sm truncate">{f.name}</span>
                            <span className="text-xs text-muted-foreground flex-shrink-0">
                              {(f.size / 1024).toFixed(1)} KB
                            </span>
                          </div>
                          <button
                            onClick={() => setFiles((p) => p.filter((_, j) => j !== i))}
                            className="h-6 w-6 rounded hover:bg-destructive/10 flex items-center justify-center"
                          >
                            <X className="h-3 w-3 text-destructive" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => handleClose(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Submit Case</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
