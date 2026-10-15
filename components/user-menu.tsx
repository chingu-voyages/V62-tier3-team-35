import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { CompassIcon, PlusCircleIcon, LogOutIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Spinner } from "./ui/spinner";
import { Button } from "./ui/button";
import Link from "next/link";

interface UserMenuProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  const initialsName =
    user.name
      ?.split(/\s+/)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "";

  const signOut = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          setIsSigningOut(false);
        },
        onError: (ctx) => {
          toast.error(
            ctx.error.message || "We couldn’t sign you out. Try again.",
          );
          setIsSigningOut(false);
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full cursor-pointer"
        >
          <Avatar className="justify-center items-center size-11">
            <AvatarFallback className="text-xs font-semibold">
              {initialsName}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-foreground truncate">
              {user.name || "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/create-path" className="cursor-pointer">
              <PlusCircleIcon className="size-4 mr-2" />
              Create Roadmap
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="cursor-pointer">
              <CompassIcon className="size-4 mr-2" />
              My Roadmaps
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onClick={signOut}
          disabled={isSigningOut}
          className="cursor-pointer"
        >
          {isSigningOut ? (
            <Spinner className="size-4 mx-auto" />
          ) : (
            <>
              <LogOutIcon className="size-4 mr-2" />
              Logout
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
