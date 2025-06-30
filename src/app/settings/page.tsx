// "use client";

// import React, { useState, useContext } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import CustomInput from "@/components/atoms/custom-input";
// import { Text } from "@/components/atoms/text";
// import { AuthContext } from "@/contexts/AuthContext";
// import useUserHook from "@/hooks/useUser.hook";
// import { UpdatePasswordDto } from "@/types/user.types";
// import { useForm } from "react-hook-form";
// import {
//   Settings as SettingsIcon,
//   User,
//   Lock,
//   Mail,
//   Phone,
//   MapPin,
// } from "lucide-react";

// const Settings = () => {
//   const { user } = useContext(AuthContext);
//   const { useUpdateUserProfile, useUpdateUserPassword } = useUserHook();
//   const updateProfileMutation = useUpdateUserProfile();
//   const updatePasswordMutation = useUpdateUserPassword();

//   const [activeTab, setActiveTab] = useState("profile");

//   // Profile form
//   const {
//     register: registerProfile,
//     handleSubmit: handleSubmitProfile,
//     formState: { errors: profileErrors },
//   } = useForm({
//     defaultValues: {
//       firstName: user?.data?.firstName || "",
//       lastName: user?.data?.lastName || "",
//       email: user?.data?.email || "",
//       phone: "",
//       address: "",
//     },
//   });

//   // Password form
//   const {
//     register: registerPassword,
//     handleSubmit: handleSubmitPassword,
//     formState: { errors: passwordErrors },
//     reset: resetPasswordForm,
//   } = useForm<UpdatePasswordDto>();

//   const onSubmitProfile = async (data: any) => {
//     try {
//       await updateProfileMutation.mutateAsync(data);
//     } catch (error) {
//       console.error("Failed to update profile:", error);
//     }
//   };

//   const onSubmitPassword = async (data: UpdatePasswordDto) => {
//     try {
//       await updatePasswordMutation.mutateAsync(data);
//       resetPasswordForm();
//     } catch (error) {
//       console.error("Failed to update password:", error);
//     }
//   };

//   const getInitials = (firstName: string, lastName: string) => {
//     return `${firstName?.charAt(0) || ""}${
//       lastName?.charAt(0) || ""
//     }`.toUpperCase();
//   };

//   return (
//     <div className='p-6 max-w-4xl mx-auto'>
//       <div className='flex items-center gap-3 mb-6'>
//         <SettingsIcon className='w-8 h-8 text-gray-700' />
//         <div>
//           <h1 className='text-2xl font-bold'>Settings</h1>
//           <Text variant='pm' classNames='text-gray-500'>
//             Manage your account settings and preferences
//           </Text>
//         </div>
//       </div>

//       <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
//         <TabsList className='grid w-full max-w-md grid-cols-2 mb-6'>
//           <TabsTrigger value='profile' className='flex items-center gap-2'>
//             <User className='w-4 h-4' />
//             Profile
//           </TabsTrigger>
//           <TabsTrigger value='security' className='flex items-center gap-2'>
//             <Lock className='w-4 h-4' />
//             Security
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value='profile' className='space-y-6'>
//           <Card>
//             <CardHeader>
//               <CardTitle>Profile Information</CardTitle>
//               <CardDescription>
//                 Update your account profile information and email address.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className='space-y-6'>
//               {/* Profile Header */}
//               <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg'>
//                 <Avatar className='w-16 h-16 bg-blue-600 text-white'>
//                   <AvatarFallback className='bg-blue-600 text-white text-lg font-semibold'>
//                     {getInitials(
//                       user?.data?.firstName || "",
//                       user?.data?.lastName || ""
//                     )}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <Text
//                     variant='pm'
//                     classNames='text-black font-semibold text-lg'
//                   >
//                     {user?.data?.firstName} {user?.data?.lastName}
//                   </Text>
//                   <Text variant='pm' classNames='text-gray-500'>
//                     {user?.data?.email}
//                   </Text>
//                   <Text variant='ps' classNames='text-blue-600 capitalize'>
//                     {user?.data?.role}
//                   </Text>
//                 </div>
//               </div>

//               {/* Profile Form */}
//               <form
//                 onSubmit={handleSubmitProfile(onSubmitProfile)}
//                 className='space-y-4'
//               >
//                 <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//                   <div>
//                     <label className='block text-sm font-medium text-gray-700 mb-1'>
//                       First Name
//                     </label>
//                     <CustomInput
//                       {...registerProfile("firstName", {
//                         required: "First name is required",
//                       })}
//                       placeholder='Enter your first name'
//                       className='w-full'
//                     />
//                     {profileErrors.firstName && (
//                       <Text variant='ps' classNames='text-red-500 mt-1'>
//                         {profileErrors.firstName.message as string}
//                       </Text>
//                     )}
//                   </div>

//                   <div>
//                     <label className='block text-sm font-medium text-gray-700 mb-1'>
//                       Last Name
//                     </label>
//                     <CustomInput
//                       {...registerProfile("lastName", {
//                         required: "Last name is required",
//                       })}
//                       placeholder='Enter your last name'
//                       className='w-full'
//                     />
//                     {profileErrors.lastName && (
//                       <Text variant='ps' classNames='text-red-500 mt-1'>
//                         {profileErrors.lastName.message as string}
//                       </Text>
//                     )}
//                   </div>
//                 </div>

//                 <div>
//                   <label className='block text-sm font-medium text-gray-700 mb-1'>
//                     <Mail className='w-4 h-4 inline mr-1' />
//                     Email Address
//                   </label>
//                   <CustomInput
//                     {...registerProfile("email", {
//                       required: "Email is required",
//                       pattern: {
//                         value: /^\S+@\S+$/i,
//                         message: "Invalid email address",
//                       },
//                     })}
//                     type='email'
//                     placeholder='Enter your email'
//                     className='w-full'
//                   />
//                   {profileErrors.email && (
//                     <Text variant='ps' classNames='text-red-500 mt-1'>
//                       {profileErrors.email.message as string}
//                     </Text>
//                   )}
//                 </div>

//                 <div>
//                   <label className='block text-sm font-medium text-gray-700 mb-1'>
//                     <Phone className='w-4 h-4 inline mr-1' />
//                     Phone Number
//                   </label>
//                   <CustomInput
//                     {...registerProfile("phone")}
//                     placeholder='Enter your phone number'
//                     className='w-full'
//                   />
//                 </div>

//                 <div>
//                   <label className='block text-sm font-medium text-gray-700 mb-1'>
//                     <MapPin className='w-4 h-4 inline mr-1' />
//                     Address
//                   </label>
//                   <CustomInput
//                     {...registerProfile("address")}
//                     placeholder='Enter your address'
//                     className='w-full'
//                   />
//                 </div>

//                 <Button
//                   type='submit'
//                   disabled={updateProfileMutation.isPending}
//                   className='w-full md:w-auto'
//                 >
//                   {updateProfileMutation.isPending
//                     ? "Updating..."
//                     : "Update Profile"}
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value='security' className='space-y-6'>
//           <Card>
//             <CardHeader>
//               <CardTitle>Change Password</CardTitle>
//               <CardDescription>
//                 Update your password to keep your account secure.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <form
//                 onSubmit={handleSubmitPassword(onSubmitPassword)}
//                 className='space-y-4'
//               >
//                 <div>
//                   <label className='block text-sm font-medium text-gray-700 mb-1'>
//                     Current Password
//                   </label>
//                   <CustomInput
//                     {...registerPassword("currentPassword", {
//                       required: "Current password is required",
//                     })}
//                     type='password'
//                     placeholder='Enter your current password'
//                     className='w-full'
//                   />
//                   {passwordErrors.currentPassword && (
//                     <Text variant='ps' classNames='text-red-500 mt-1'>
//                       {passwordErrors.currentPassword.message as string}
//                     </Text>
//                   )}
//                 </div>

//                 <div>
//                   <label className='block text-sm font-medium text-gray-700 mb-1'>
//                     New Password
//                   </label>
//                   <CustomInput
//                     {...registerPassword("password", {
//                       required: "New password is required",
//                       minLength: {
//                         value: 8,
//                         message: "Password must be at least 8 characters",
//                       },
//                     })}
//                     type='password'
//                     placeholder='Enter your new password'
//                     className='w-full'
//                   />
//                   {passwordErrors.password && (
//                     <Text variant='ps' classNames='text-red-500 mt-1'>
//                       {passwordErrors.password.message as string}
//                     </Text>
//                   )}
//                 </div>

//                 <Button
//                   type='submit'
//                   disabled={updatePasswordMutation.isPending}
//                   className='w-full md:w-auto'
//                 >
//                   {updatePasswordMutation.isPending
//                     ? "Updating..."
//                     : "Update Password"}
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Account Information</CardTitle>
//               <CardDescription>
//                 View your account details and status.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className='space-y-4'>
//               <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//                 <div>
//                   <Text variant='ps' classNames='text-gray-500'>
//                     Account Status
//                   </Text>
//                   <Text variant='pm' classNames='text-green-600 font-medium'>
//                     {user?.data?.status || "Active"}
//                   </Text>
//                 </div>
//                 <div>
//                   <Text variant='ps' classNames='text-gray-500'>
//                     Role
//                   </Text>
//                   <Text
//                     variant='pm'
//                     classNames='text-black font-medium capitalize'
//                   >
//                     {user?.data?.role}
//                   </Text>
//                 </div>
//                 <div>
//                   <Text variant='ps' classNames='text-gray-500'>
//                     Last Seen
//                   </Text>
//                   <Text variant='pm' classNames='text-black'>
//                     {user?.data?.lastSeen
//                       ? new Date(user.data.lastSeen).toLocaleDateString()
//                       : "N/A"}
//                   </Text>
//                 </div>
//                 <div>
//                   <Text variant='ps' classNames='text-gray-500'>
//                     Member Since
//                   </Text>
//                   <Text variant='pm' classNames='text-black'>
//                     {user?.data?.createdAt
//                       ? new Date(user.data.createdAt).toLocaleDateString()
//                       : "N/A"}
//                   </Text>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default Settings;

import SettingsComponent from "@/components/common/settings/SettingsComponent";
import React from "react";

export default function Settings() {
  return (
    <div>
      <SettingsComponent />
    </div>
  );
}
