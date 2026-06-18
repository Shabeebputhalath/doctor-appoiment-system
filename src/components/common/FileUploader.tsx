import React from 'react';
import { Upload, X, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { uploadFile } from '../../services/uploadService';
import { toast } from 'sonner';

interface FileUploaderProps {
  onUploadSuccess: (url: string) => void;
  label: string;
  accept?: string;
  maxSize?: number; // in MB
}

export const FileUploader: React.FC<FileUploaderProps> = ({ 
  onUploadSuccess, 
  label, 
  accept = "image/*,application/pdf", 
  maxSize = 5 
}) => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [file, setFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > maxSize * 1024 * 1024) {
      toast.error(`File too large. Maximum size is ${maxSize}MB`);
      return;
    }

    setFile(selectedFile);
    await performUpload(selectedFile);
  };

  const performUpload = async (fileToUpload: File) => {
    setIsUploading(true);
    setProgress(10);
    
    try {
      // Simulate progress since fetch doesn't natively support it easily for simple requests
      const progressInterval = setInterval(() => {
        setProgress(prev => (prev < 90 ? prev + 10 : prev));
      }, 500);

      const result = await uploadFile(fileToUpload);
      
      clearInterval(progressInterval);
      setProgress(100);
      onUploadSuccess(result.url);
      toast.success("Upload Successful", {
        description: `Your ${label.toLowerCase()} has been securely stored.`
      });
    } catch (error: any) {
      toast.error("Upload Failed", {
        description: error.message
      });
      setFile(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
      />
      
      {!file ? (
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="w-full border-2 border-dashed border-slate-200 rounded-[2rem] p-8 flex flex-col items-center justify-center gap-3 hover:border-primary/40 hover:bg-primary/5 transition-all group"
        >
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
            <Upload size={24} />
          </div>
          <div className="text-center">
            <p className="text-sm font-black text-slate-900 uppercase tracking-widest">{label}</p>
            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight">Click or drag to upload (Max {maxSize}MB)</p>
          </div>
        </button>
      ) : (
        <div className="w-full bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 text-primary rounded-2xl flex items-center justify-center">
                {isUploading ? <Loader2 size={24} className="animate-spin" /> : <FileText size={24} />}
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 truncate max-w-[200px]">{file.name}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            {!isUploading && (
              <button 
                onClick={() => setFile(null)}
                className="text-slate-300 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
          
          {isUploading && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 tracking-widest">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
          
          {!isUploading && progress === 100 && (
             <div className="mt-4 flex items-center gap-2 text-green-500 text-[10px] font-black uppercase tracking-widest">
                <CheckCircle2 size={12} /> Sync Complete
             </div>
          )}
        </div>
      )}
    </div>
  );
};
