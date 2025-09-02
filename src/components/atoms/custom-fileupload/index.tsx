import {
  getDownloadURL,
  ref as firebaseRef,
  uploadBytes,
} from "firebase/storage";
import { v4 } from "uuid";
import { Text } from "../text";
import { Label } from "../label";
import { cn } from "@/lib/utils";
import { CloudUpload, File, LoaderCircle } from "lucide-react";
import { storageDB } from "@/lib/firebaseConfig";
import React, { forwardRef, memo, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

type FileType = "image" | "pdf";

type CustomFileUploadProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  label?: string;
  name: string;
  optional?: boolean;
  onChange?: (newValue: string) => void;
  register?: any;
  error?: string;
  className?: string;
  fileType: FileType;
  customLabel?: string;
};

const CustomFileUpload = forwardRef<HTMLInputElement, CustomFileUploadProps>(
  (
    {
      fileType,
      label,
      name,
      className,
      defaultValue,
      onChange,
      optional,
      register,
      error,
      customLabel,
      ...props
    },
    ref
  ) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<string>("");

    const handleFileChange = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setLoading(true);
      const val = event.target.files?.[0];

      if (val) await firebaseUpload(val);
    };

    useEffect(() => {
      setSelectedFile(defaultValue as string);
    }, [defaultValue]);

    const accept =
      fileType === "image"
        ? "image/jpeg, image/png"
        : fileType === "pdf"
        ? "application/pdf"
        : "";

    const firebaseUpload = async (val: File) => {
      const path = `fuelsgate-resources/${v4()}`;
      const imageRef = firebaseRef(storageDB, path);
      await uploadBytes(imageRef, val).then((snapshot) => {
        const reference = firebaseRef(storageDB, snapshot.metadata.fullPath);
        getDownloadURL(reference).then((url) => {
          setSelectedFile(url);
          onChange && onChange(url);
        });
      });
      setLoading(false);
    };

    return (
      <div className={cn(className)}>
        {label && <Label {...{ name, label, optional }} classNames='mb-1' />}
        <div className='relative border-[1.8px] h-fit border-mid-gray-500 flex flex-col items-center justify-center gap-1 border-dashed px-8 py-3 rounded-xl bg-white mb-2 overflow-hidden'>
          {(loading || selectedFile) && (
            <div className='absolute top-0 left-0 h-full w-full bg-white flex items-center justify-center z-10'>
              {selectedFile && !loading && (
                <div className='text-center'>
                  {fileType === "image" ? (
                    <div className='relative mb-2 w-full h-24'>
                      <Avatar className='w-full h-full rounded-none'>
                        <AvatarImage
                          src={selectedFile}
                          className='w-full h-full rounded-none object-contain'
                        />
                      </Avatar>
                    </div>
                  ) : (
                    <Link
                      href={selectedFile}
                      target='_blank'
                      className='text-sm text-blue-400 flex items-center gap-1 mb-2 font-medium'
                    >
                      <File height={15} width={15} />
                      Uploaded {customLabel ?? "product quality"}
                    </Link>
                  )}
                  <button
                    type='button'
                    onClick={() => setSelectedFile("")}
                    className='text-red-500 text-xs'
                  >
                    Upload a different file
                  </button>
                </div>
              )}
              {loading && (
                <LoaderCircle
                  className='animate-spin text-gray-500'
                  height={60}
                  width={60}
                />
              )}
            </div>
          )}
          <input
            type='file'
            className='h-full w-full absolute opacity-0 top-0 left-0 cursor-pointer'
            ref={ref}
            accept={accept}
            onChange={handleFileChange}
            {...props}
          />
          <CloudUpload className='mb-3' height={24} width={24} />
          <Text variant='ps' color='text-[#0A0D14]'>
            Upload {customLabel ?? "product quality details"}
          </Text>
          <Text variant='pxs' color='text-dark-gray-200' classNames='mb-4'>
            JPEG, PNG, PDF, and MP4 formats, up to 20 MB.
          </Text>
          <span className='border border-mid-gray-400 py-[6px] px-4 rounded-lg text-dark-gray-350 text-sm'>
            Browse File
          </span>
        </div>

        {error && (
          <Text
            variant='ps'
            color='text-red-500'
            fontWeight='regular'
            classNames='mt-1'
          >
            {error}
          </Text>
        )}
      </div>
    );
  }
);

CustomFileUpload.displayName = "CustomFileUpload";
const MemoizedCustomFileUpload = memo(CustomFileUpload);
export { MemoizedCustomFileUpload as CustomFileUpload };
