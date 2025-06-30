import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Settings, SettingsIcon } from "lucide-react";
import SettingsComponent from "./SettingsComponent";

export default function SettingsSheet() {
  return (
    <Sheet>
      <SheetTrigger>
        <div className='px-2 flex items-center gap-2 w-full'>
          <Settings className='w-4 h-4' />
          Settings
        </div>
      </SheetTrigger>
      <SheetContent className='h-full overflow-y-auto sm:max-w-full p-0'>
        <SheetHeader>
          <div className='flex items-center gap-3 p-2'>
            <SettingsIcon className='w-8 h-8 text-gray-700' />
            <div>
              <SheetTitle>Settings</SheetTitle>
              <SheetDescription>
                Manage your account settings and preferences
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>
        <div className=''>
          <SettingsComponent />
        </div>
        {/* <SheetFooter>
          <Button type='submit'>Save changes</Button>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
