import AuthBanner from "@/components/auth-banner";
import { Logo } from "@/components/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-dvh w-screen bg-background flex justify-center items-center">
      <div className="grid md:grid-cols-2 max-w-(--breakpoint-xl) w-full p-4 sm:px-10">
        <div className="bg-card rounded-2xl md:rounded-l-2xl py-5 px-4 sm:py-10  md:px-8 lg:px-10 xl:px-16 shadow-2xl flex flex-col w-full">
          <Logo size="lg" variant="text" className="mb-14 sm:mb-20" />
          {children}
        </div>

        <div className="bg-foreground w-full rounded-xl justify-center items-center flex-col -ml-4 py-10 md:flex hidden">
          <AuthBanner />
        </div>
      </div>
    </div>
  );
}
