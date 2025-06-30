"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import {
  UserIcon,
  LogOut,
  Settings,
  ChevronDown,
  Menu as MenuIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { menuItems } from "./menu";
import { AuthContext } from "@/contexts/AuthContext";
import SettingsSheet from "../settings/SettingsSheet";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const userName = user?.data?.firstName + " " + user?.data?.lastName;
  const userEmail = user?.data?.email;

  return (
    mounted && (
      <nav className='fixed top-0 w-full z-50 bg-white border-b shadow-sm'>
        <div className='container mx-auto px-4'>
          <div className='flex h-16 items-center justify-between'>
            <div className='flex items-center'>
              {/* Mobile Menu Button */}
              <Sheet>
                <SheetTrigger className='lg:hidden mr-4'>
                  <MenuIcon className='h-6 w-6' />
                </SheetTrigger>
                <SheetContent side='left' className='w-[300px] sm:w-[400px]'>
                  <SheetHeader>
                    <SheetTitle className='text-left'>Menu</SheetTitle>
                  </SheetHeader>
                  <div className='flex flex-col space-y-3 mt-4'>
                    {menuItems
                      .filter((item) => !item.comingSoon)
                      .map((item) =>
                        item.SubMenu ? (
                          <div key={item.label} className='space-y-3'>
                            <div className='font-medium px-1'>{item.label}</div>
                            <div className='pl-4 flex flex-col space-y-3'>
                              {item.SubMenu.filter(
                                (subItem) => !subItem.comingSoon
                              ).map((subItem) => (
                                <Link
                                  key={subItem.label}
                                  href={"/dashboard" + subItem.href}
                                  className='text-sm text-gray-600 hover:text-gray-900'
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
                            key={item.label}
                            href={"/dashboard" + item.href}
                            className='text-sm font-medium text-gray-600 hover:text-gray-900'
                          >
                            {item.label}
                          </Link>
                        )
                      )}
                  </div>
                </SheetContent>
              </Sheet>

              <Link href='/dashboard' className='text-xl font-bold'>
                Fuelsgate
              </Link>

              {/* Desktop Menu */}
              <div className='hidden lg:flex items-center space-x-4 ml-8'>
                {menuItems
                  .filter((item) => !item.comingSoon)
                  .map((item) =>
                    item.SubMenu ? (
                      <DropdownMenu key={item.label}>
                        <DropdownMenuTrigger className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900'>
                          {item.label}
                          <ChevronDown className='w-4 h-4' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {item.SubMenu.filter(
                            (subItem) => !subItem.comingSoon
                          ).map((subItem) => (
                            <DropdownMenuItem key={subItem.label}>
                              <Link
                                href={"/dashboard" + subItem.href}
                                className='flex items-center gap-2 w-full'
                              >
                                {subItem.label}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Link
                        key={item.label}
                        href={"/dashboard" + item.href}
                        className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900'
                      >
                        {item.label}
                      </Link>
                    )
                  )}
              </div>
            </div>

            <div className='flex items-center'>
              <DropdownMenu>
                <DropdownMenuTrigger className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900'>
                  <UserIcon className='w-5 h-5' />
                  <span className='hidden md:inline'>{userName}</span>
                  <ChevronDown className='w-4 h-4' />
                </DropdownMenuTrigger>

                <DropdownMenuContent align='end' className='w-56'>
                  <DropdownMenuLabel>
                    <div className='flex flex-col space-y-1'>
                      <p className='text-sm font-medium leading-none'>
                        {userName}
                      </p>
                      <p className='text-xs leading-none text-gray-500'>
                        {userEmail}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />{" "}
                  {/* <DropdownMenuItem>
                    <Link
                      href='/settings'
                      className='flex items-center gap-2 w-full'
                    >
                      <Settings className='w-4 h-4' />
                      Settings
                    </Link>
                  </DropdownMenuItem> */}
                  <SettingsSheet />
                  <DropdownMenuItem className='text-red-600'>
                    <button className='flex items-center gap-2 w-full'>
                      <LogOut className='w-4 h-4' />
                      Sign out
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>
    )
  );
};

export default Navbar;
