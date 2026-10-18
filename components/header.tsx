"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { X } from "lucide-react";
import { UserMenu } from "./user-menu";

{
  /* //TODO: Uncomment it once the menu design is ready. */
}
// interface HamburgerOpenProps {
//   handleHamburger: () => void;
// }

// function HamburgerOpen({ handleHamburger }: HamburgerOpenProps) {
//   return (
//     <div className="fixed inset-0 h-dvh w-screen bg-background z-50 flex flex-col p-4 sm:px-6">
//       <header className="flex justify-between items-center h-14">
//         <Logo variant="text" size="sm" className="font-bold text-xl gap-2" />

//         <button
//           type="button"
//           onClick={handleHamburger}
//           className="p-2 text-foreground cursor-pointer outline-none"
//           aria-label="Close menu"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="size-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M6 18 18 6M6 6l12 12"
//             />
//           </svg>
//         </button>
//       </header>

//       <div className="mt-8">
//         <ul className="flex flex-col gap-6">
//           {navigationLink.map((el, idx) => (
//             <li key={idx}>
//               <Link
//                 href={el.href}
//                 onClick={handleHamburger}
//                 className="text-2xl font-semibold text-foreground hover:text-muted-foreground transition-colors"
//               >
//                 {el.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

interface HeaderProps {
  variant?: "default" | "close";
  onClose?: () => void;
}

export default function Header({ variant = "default", onClose }: HeaderProps) {
  const { data: session } = authClient.useSession();
  // const [hamburger, setHamburger] = useState<boolean>(false);

  // function handleHamburger() {
  //   setHamburger(!hamburger);
  // }

  return (
    <header className="relative flex h-16 bg-transparent sm:h-(--navbar-height) items-center justify-between gap-3 px-4 sm:px-7">
      {variant === "close" ? (
        <div className="flex w-full justify-end">
          <Button
            variant="secondary"
            size="icon-lg"
            type="button"
            aria-label="Close form"
            onClick={onClose}
          >
            <X aria-hidden="true" />
          </Button>
        </div>
      ) : (
        <>
          <Logo variant="text" />

          {/* //TODO: Uncomment it once the menu design is ready. */}

          {/* <nav className="hidden md:flex items-center gap-4 md:gap-5 lg:gap-6">
          {navigationLink.map(({ href, name }, idx) => (
            <Link href={href} key={idx} className="text-sm/6 text-foreground">
              {name}
            </Link>
          ))}
        </nav>

        <Button variant="ghost" onClick={handleHamburger} className="md:hidden">
          <Menu className="size-5" />
        </Button> */}
          {/* Divider */}
          {/* <div className="h-6 w-px bg-foreground/5" /> */}

          {session ? (
            <UserMenu user={session.user} />
          ) : (
            <Button asChild variant="primary" size="lg">
              <Link href="/login">Log in</Link>
            </Button>
          )}

          {/* {hamburger && <HamburgerOpen handleHamburger={handleHamburger} />} */}
        </>
      )}
    </header>
  );
}
