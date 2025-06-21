import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HiChevronUpDown } from "react-icons/hi2";

const UserProfile = ({ name, email }: { name: string; email: string }) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="rounded-md">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="text-left text-xs">
        <p className="w-36 truncate">{name}</p>
        <p className="w-36 truncate">{email}</p>
      </div>
      <HiChevronUpDown />
    </div>
  );
};

export default UserProfile;
