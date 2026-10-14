import { CheckCircle2, FileCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CertificateType, certificateTypeOptions } from "@/types/certificate";

interface CertificateTypeSelectorProps {
  selectedType: CertificateType | null;
  onSelect: (type: CertificateType) => void;
  onContinue: () => void;
}

export const CertificateTypeSelector = ({
  selectedType,
  onSelect,
  onContinue,
}: CertificateTypeSelectorProps) => {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Select Certificate Type
        </h2>
        <p className="text-muted-foreground">
          Choose the type of inspection certificate to generate
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {certificateTypeOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={cn(
              "relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200",
              selectedType === option.id
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border hover:border-primary/50 hover:bg-secondary/20"
            )}
          >
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "h-12 w-12 rounded-lg flex items-center justify-center flex-shrink-0",
                  selectedType === option.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-muted-foreground"
                )}
              >
                <FileCheck className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">
                  {option.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {option.description}
                </p>
              </div>
              {selectedType === option.id && (
                <CheckCircle2 className="h-6 w-6 text-primary absolute top-4 right-4" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onContinue}
          size="lg"
          disabled={!selectedType}
          className="gap-2"
        >
          Continue to Processing
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
