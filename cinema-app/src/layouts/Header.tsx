import { Link, useLocation } from "react-router-dom";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Logo from "@/assets/logo.jpg";
import SearchDialog from "@/components/search-button";
import UserMenu from "@/components/user-menu";
import { useUserDetailsSelector } from "@/store/features/userSlice";

const authRoutes = ["/login", "/register"];

export default function Header() {
  const location = useLocation();
  const { user } = useUserDetailsSelector();
  const isAdmin = (user as any)?.user?.roles?.includes("ADMIN");

  if (authRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <MaxWidthWrapper className="flex h-20 items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-xl border-2 border-accent">
              <img
                className="h-full w-full object-cover"
                src={Logo}
                alt="Cinema-Sync Logo"
              />
            </div>
            <span className="hidden md:block font-bold text-xl tracking-tight text-primary">
              Cinema<span className="text-secondary">-Sync</span>
            </span>
          </Link>
        </div>

        <div className="flex-[2] flex justify-center max-w-md">
          <SearchDialog />
        </div>

        <div className="flex items-center justify-end gap-4 flex-1">
          <nav className="hidden lg:flex items-center gap-6 mr-4">
            <Link
              to="/films"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Афіша
            </Link>
            <Link
              to="/bookings"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Мої квитки
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
              >
                Адмін
              </Link>
            )}
          </nav>

          <div className="h-8 w-[1px] bg-border hidden sm:block" />

          <UserMenu />
        </div>
      </MaxWidthWrapper>
    </header>
  );
}