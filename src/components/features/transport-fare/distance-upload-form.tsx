"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import CustomInput from '@/components/atoms/custom-input';

interface Props {
  onUpload: (rows:any[]) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const DistanceUploadForm: React.FC<Props> = ({ onUpload, onCancel, isLoading=false }) => {
  const [fileRows, setFileRows] = useState<any[]>([]);

  const handleFile = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = String(e.target?.result || '');
      // naive CSV parsing: split lines and commas
      const lines = text.split(/\r?\n/).map(l=>l.trim()).filter(Boolean);
      const headers = lines[0].split(/,|\t/).map(h=>h.trim());
      const rows = lines.slice(1).map(line => {
        const cols = line.split(/,|\t/).map(c=>c.trim());
        const obj:any = {};
        headers.forEach((h, idx) => { obj[h] = cols[idx]; });
        return obj;
      });
      setFileRows(rows);
    };
    reader.readAsText(file);
  };

  return (
    <div className='space-y-4'>
      <div>
        <label className='text-sm font-medium text-gray-700'>Upload CSV / TSV</label>
        <input type='file' accept='.csv,.tsv,text/csv' onChange={(e)=>handleFile(e.target.files?.[0]||null)} />
      </div>

      {fileRows.length > 0 && (
        <div className='max-h-40 overflow-auto bg-gray-50 p-2 rounded'>
          <table className='w-full text-sm'>
            <thead>
              <tr>{Object.keys(fileRows[0]).map(k=> <th className='text-left p-1' key={k}>{k}</th>)}</tr>
            </thead>
            <tbody>
              {fileRows.map((r, i) => (
                <tr key={i}>{Object.values(r).map((v, idx) => <td className='p-1' key={idx}>{String(v ?? '')}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className='flex gap-3 pt-4'>
        <Button type='button' variant='outline' onClick={onCancel} disabled={isLoading}>Cancel</Button>
        <Button type='button' onClick={() => onUpload(fileRows)} disabled={isLoading || fileRows.length===0}>{isLoading ? 'Uploading...' : 'Upload'}</Button>
      </div>
    </div>
  );
};

export default DistanceUploadForm;
