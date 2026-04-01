import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/hooks/useRedux";
import { logout, useUserDetailsSelector } from "@/store/features/userSlice";
import { LogOut, KeyRound, UserCircle, Sun, Moon } from "lucide-react";
import User from "@/assets/user.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserMenu() {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useUserDetailsSelector();
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  const username = (user as any)?.user?.username || (user as any)?.username || "Профіль";

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const handleSignOut = () => {
    dispatch(logout());
    toast({
      title: "Goodbye!",
      description: "You have successfully signed out",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img src={User} className="w-8 h-8 cursor-pointer" alt="user" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="px-2 py-2 text-sm font-medium text-foreground border-b mb-1">
          {username}
        </div>

        <DropdownMenuItem className="cursor-pointer" onSelect={() => navigate("/profile")}>
          <UserCircle className="h-5 w-5 text-slate-500" />
          Мій профіль
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer" onSelect={() => navigate("/change-password")}>
          <KeyRound className="h-5 w-5 text-blue-500" />
          Змінити пароль
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
            setIsDark((prev) => !prev);
          }}
        >
          {isDark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-slate-600" />}
          {isDark ? "Світла тема" : "Темна тема"}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" onSelect={handleSignOut}>
          <LogOut className="h-6 w-6 text-red-600" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}