'use client';
import { useToast } from '@/components/ui/use-toast';

type ToastTypes = 'default' | 'success' | 'error';

const useToastConfig = () => {
  const { toast } = useToast();

  const showToast = (description: string, type: ToastTypes): void => {
    toast({
      variant: type,
      description,
    });
  };

  return { showToast };
};

export default useToastConfig;
