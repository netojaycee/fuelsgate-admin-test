"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/atoms/custom-input";
import Papa from "papaparse";

interface Props {
  onUpload: (rows: any[]) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const DistanceUploadForm: React.FC<Props> = ({
  onUpload,
  onCancel,
  isLoading = false,
}) => {
  const [fileRows, setFileRows] = useState<any[]>([]);

  const handleFile = (file: File | null) => {
    if (!file) {
      console.error("No file selected");
      return;
    }
    Papa.parse(file, {
      complete: (result) => {
        if (result.errors.length) {
          console.error("Parsing errors:", result.errors);
          return;
        }
        console.log("Raw PapaParse result:", result);
        console.log("Headers:", result.meta.fields);
        console.log("Raw data:", result.data);

        // Define expected headers
        const expectedHeaders = ["State", "LGA", "LoadPoint", "DistanceKM"];
        const validHeaders = result.meta.fields?.filter(
          (h) => expectedHeaders.includes(h)
        );

        if (!validHeaders || validHeaders.length !== expectedHeaders.length) {
          console.error(
            "Invalid headers. Expected:",
            expectedHeaders,
            "Got:",
            result.meta.fields
          );
          return;
        }

        const rows = result.data
          .filter((row: any) => Object.values(row).some((v) => v !== "")) // Skip empty rows
          .map((row: any) => {
            const obj: any = {};
            expectedHeaders.forEach((header) => {
              let value = row[header] ?? "";
              console.log(`Raw value for ${header}:`, value);
              // Convert DistanceKM to number
              if (header === "DistanceKM" && typeof value === "string") {
                if (value === "") {
                  console.warn(`Empty DistanceKM in row:`, row);
                  obj[header] = null; // Use null for empty values
                } else if (/^-?\d{1,3}(,\d{3})*(\.\d+)?$/.test(value)) {
                  // Handle numbers with commas (e.g., "1,200")
                  value = parseFloat(value.replace(/,/g, ""));
                  obj[header] = isNaN(value) ? null : value;
                } else if (/^-?\d+(\.\d+)?$/.test(value)) {
                  // Handle plain numbers (e.g., "621")
                  value = parseFloat(value);
                  obj[header] = isNaN(value) ? null : value;
                } else {
                  console.warn(`Invalid DistanceKM value: ${value}`);
                  obj[header] = null;
                }
              } else {
                obj[header] = value; // Keep non-numeric fields as strings
              }
            });
            return obj;
          })
          .filter((row) => row.DistanceKM !== null); // Remove rows with invalid DistanceKM

        console.log("Parsed rows:", rows);
        setFileRows(rows);
      },
      header: true,
      skipEmptyLines: true,
      delimiter: ",", // Explicitly set to comma
      error: (error) => {
        console.error("Parse error:", error);
      },
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700">
          Upload CSV / TSV
        </label>
        <input
          type="file"
          accept=".csv,.tsv,text/csv"
          onChange={(e) => handleFile(e.target.files?.[0] || null)}
        />
      </div>

      {fileRows.length > 0 && (
        <div className="max-h-40 overflow-auto bg-gray-50 p-2 rounded">
          {/* {console.log("Rendering fileRows:", fileRows)} */}
          <table className="w-full text-sm">
            <thead>
              <tr>
                {Object.keys(fileRows[0]).map((k) => (
                  <th className="text-left p-1" key={k}>
                    {k}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fileRows.map((r, i) => (
                <tr key={i}>
                  {Object.values(r).map((v, idx) => (
                    <td className="p-1" key={idx}>
                      {String(v ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={() => {
            console.log("Sending to backend:", fileRows);
            onUpload(fileRows);
          }}
          disabled={isLoading || fileRows.length === 0}
        >
          {isLoading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </div>
  );
};

export default DistanceUploadForm;