import { useRef, useState } from "react";
import { Upload, FileText, X, Building2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useCases } from "@/contexts/CasesContext";
export const NewCaseDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const [companyName, setCompanyName] = useState(""); const [files, setFiles] = useState<File[]>([]); const [dragging, setDragging] = useState(false);
  const input = useRef<HTMLInputElement>(null); const { toast } = useToast(); const { submitCase } = useCases();
  const close = (next: boolean) => { if (!next) { setCompanyName(""); setFiles([]); } onOpenChange(next); };
  const addFiles = (newFiles: File[]) => {
    const valid = newFiles.filter(f => {
      const ok = /\.(csv|pdf|jpe?g|png)$/i.test(f.name) && f.size <= 20 * 1024 * 1024;
      if (!ok) toast({ title: "فایل پشتیبانی نمی‌شود", description: "CSV، PDF، JPG یا PNG، حداکثر ۲۰ مگابایت", variant: "destructive" });
      return ok;
    });
    setFiles(prev => [...prev, ...valid]);
  };
  const submit = (e: React.FormEvent) => {
    e.preventDefault(); if (!companyName.trim() || !files.length) return;
    submitCase({ companyName: companyName.trim(), files }); close(false);
    toast({ title: "پرونده ثبت شد", description: "گزارش پس از خواندن فایل‌ها آماده بررسی می‌شود." });
  };
  return <Dialog open={open} onOpenChange={close}><DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto" dir="rtl">
    <form onSubmit={submit} className="space-y-6"><DialogHeader className="sm:text-right"><DialogTitle className="flex items-center gap-2"><Building2 className="h-5 w-5 text-primary" />پرونده جدید</DialogTitle><DialogDescription>بررسی لیست بیمه شرکت</DialogDescription></DialogHeader>
      <div className="space-y-2"><Label htmlFor="company-name">نام شرکت</Label><Input id="company-name" required value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="مثلاً شرکت آتیه پرداز" /></div>
      <div className="space-y-2"><Label>مدارک شرکت</Label><div onDrop={e => { e.preventDefault(); setDragging(false); addFiles(Array.from(e.dataTransfer.files)); }} onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center gap-3 ${dragging ? "border-primary bg-primary/5" : "border-border bg-muted/40"}`}>
        <Upload className="h-8 w-8 text-primary" /><p className="text-sm">فایل‌ها را اینجا رها کنید</p><span className="text-xs text-muted-foreground" dir="ltr">CSV · PDF · JPG · PNG — Max 20 MB</span>
        <input ref={input} type="file" className="hidden" multiple accept=".csv,.pdf,.jpg,.jpeg,.png" onChange={e => { addFiles(Array.from(e.target.files ?? [])); e.target.value = ""; }} />
        <Button type="button" variant="outline" onClick={() => input.current?.click()}>انتخاب فایل‌ها</Button>
      </div></div>
      {files.length > 0 && <div className="space-y-2">{files.map((f, i) => <div key={`${f.name}-${i}`} className="flex items-center gap-2 border rounded-md p-2"><FileText className="h-4 w-4 text-primary shrink-0" /><span className="text-sm truncate flex-1" dir="auto">{f.name}</span><Button type="button" variant="ghost" size="icon" className="h-7 w-7" aria-label={`حذف ${f.name}`} onClick={() => setFiles(prev => prev.filter((_, j) => i !== j))}><X /></Button></div>)}</div>}
      <p className="text-xs text-muted-foreground">پرونده‌ها فقط در این نشست نگهداری می‌شوند. بررسی اصالت و استعلام بیمه نیازمند تأیید کارشناس است.</p>
      <DialogFooter className="gap-2"><Button type="button" variant="outline" onClick={() => close(false)}>انصراف</Button><Button type="submit" disabled={!companyName.trim() || !files.length}><Upload />ثبت و پردازش پرونده</Button></DialogFooter>
    </form></DialogContent></Dialog>;
};
