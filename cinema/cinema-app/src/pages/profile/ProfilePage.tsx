import { useUserDetailsSelector } from "@/store/features/userSlice";
import { useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "@/store/api/userApi";
import { User, Mail, Shield, Ticket, KeyRound, ArrowLeft } from "lucide-react";

export default function ProfilePage() {
  const { user } = useUserDetailsSelector();
  const { data: profile, isLoading } = useGetProfileQuery();
  const navigate = useNavigate();

  const username = (user as any)?.user?.username || (user as any)?.username || "—";
  const email = (user as any)?.user?.email || (user as any)?.email || "—";
  const roles: string[] = (user as any)?.user?.roles || (user as any)?.roles || [];
  const ticketsCount = profile?.User?.tickets?.length ?? 0;

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div className="w-full max-w-md">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад
        </button>

        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
          {/* Шапка */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-8 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-3">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-white text-xl font-bold">{username}</h1>
            <p className="text-white/60 text-sm mt-1">{email}</p>
          </div>

          {/* Інфо */}
          <div className="px-6 py-5 flex flex-col gap-4">

            {isLoading ? (
              <p className="text-sm text-muted-foreground text-center">Завантаження...</p>
            ) : (
              <>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Mail className="w-5 h-5 text-slate-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">{email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Shield className="w-5 h-5 text-slate-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Ролі</p>
                    <div className="flex gap-2 mt-1">
                      {roles.map((role) => (
                        <span
                          key={role}
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            role === "ADMIN"
                              ? "bg-red-100 text-red-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Ticket className="w-5 h-5 text-slate-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Заброньовано квитків</p>
                    <p className="text-sm font-medium">{ticketsCount}</p>
                  </div>
                </div>
              </>
            )}

            <div className="border-t pt-4 flex flex-col gap-2">
              <button
                onClick={() => navigate("/change-password")}
                className="flex items-center gap-2 w-full px-4 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <KeyRound className="w-4 h-4" />
                Змінити пароль
              </button>
              <button
                onClick={() => navigate("/bookings")}
                className="flex items-center gap-2 w-full px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <Ticket className="w-4 h-4" />
                Мої квитки
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}