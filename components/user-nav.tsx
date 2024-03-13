import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Role } from "@prisma/client";
import { CircleUserRoundIcon } from "lucide-react";
import Link from "next/link";

/*The code below is for the user dropdown, it will show 3 dropdown,
the user profile, tasks, and logout.*/
export type NavigationButton = {
  label: string;
  href: string;
  className?: string;
};

type UserNavProps = {
  navBtns: NavigationButton[];
  user: {
    username: string;
    role: Role;
  };
};
export function UserNav({ navBtns, user }: UserNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage alt="User image" />
            <AvatarFallback>
              <CircleUserRoundIcon className="text-primary" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.username}</p>
            <p className="text-xs capitalize leading-none text-muted-foreground">
              {user.role.toLowerCase()}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {navBtns.map((navBtn, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link href={navBtn.href} className={navBtn.className}>
              {navBtn.label}
            </Link>
          </DropdownMenuItem>
        ))}
        {navBtns.length > 0 && <DropdownMenuSeparator />}
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
