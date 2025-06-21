"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HiChevronUpDown, HiUser } from "react-icons/hi2";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRef, useEffect, useState } from "react";

const UserProfile = ({
  name,
  email,
  profile,
}: {
  name: string;
  email: string;
  profile: string;
}) => {
  const nameRef = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLParagraphElement>(null);
  const [isNameTruncated, setIsNameTruncated] = useState(false);
  const [isEmailTruncated, setIsEmailTruncated] = useState(false);

  useEffect(() => {
    const checkTruncation = () => {
      if (nameRef.current) {
        setIsNameTruncated(
          nameRef.current.scrollWidth > nameRef.current.clientWidth
        );
      }
      if (emailRef.current) {
        setIsEmailTruncated(
          emailRef.current.scrollWidth > emailRef.current.clientWidth
        );
      }
    };

    checkTruncation();
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, [name, email]);

  const NameComponent = (
    <p ref={nameRef} className="w-36 truncate">
      {name}
    </p>
  );

  const EmailComponent = (
    <p ref={emailRef} className="w-36 truncate">
      {email}
    </p>
  );

  return (
    <div className="flex items-center gap-2">
      <Avatar className="rounded-md">
        <AvatarImage src={profile} alt="profile" />
        <AvatarFallback>
          <HiUser color="green" />
        </AvatarFallback>
      </Avatar>
      <div className="text-left text-xs">
        {isNameTruncated ? (
          <Tooltip>
            <TooltipTrigger asChild>{NameComponent}</TooltipTrigger>
            <TooltipContent
              side="top"
              align="start"
              sideOffset={8}
              className="max-w-xs break-words"
            >
              <span>{name}</span>
            </TooltipContent>
          </Tooltip>
        ) : (
          NameComponent
        )}
        {isEmailTruncated ? (
          <Tooltip>
            <TooltipTrigger asChild>{EmailComponent}</TooltipTrigger>
            <TooltipContent
              side="bottom"
              align="start"
              sideOffset={8}
              className="max-w-xs break-words"
            >
              <span>{email}</span>
            </TooltipContent>
          </Tooltip>
        ) : (
          EmailComponent
        )}
      </div>
      <HiChevronUpDown />
    </div>
  );
};

export default UserProfile;
