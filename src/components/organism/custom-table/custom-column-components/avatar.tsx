import React from 'react';
import { Text } from '@/components/atoms/text';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type TableAvatarProps = {
  name: string;
  profilePicture: string | null;
};

const TableAvatar = ({ name, profilePicture }: TableAvatarProps) => {
  const initials = name
    ?.split(' ')
    .map((word: string) => word[0])
    .join('');
  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={profilePicture || ''} className="object-cover" />
        <AvatarFallback className="uppercase">
          {initials?.substring(0, 2)}
        </AvatarFallback>
      </Avatar>
      <Text variant="ps" color="text-dark-gray-350" classNames="w-40">
        {name}
      </Text>
    </div>
  );
};

export { TableAvatar };
