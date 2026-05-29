import { useState } from "react";
import { useChangePasswordMutation } from "@/store/api/userApi";
import { useNavigate } from "react-router-dom";

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage({ text: "Заповніть всі поля", ok: false });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage({ text: "Нові паролі не співпадають", ok: false });
      return;
    }
    if (newPassword.length < 6) {
      setMessage({ text: "Новий пароль мінімум 6 символів", ok: false });
      return;
    }
    try {
      await changePassword({ oldPassword, newPassword }).unwrap();
      setMessage({ text: "Пароль успішно змінено!", ok: true });
      setTimeout(() => navigate("/"), 2000);
    } catch (e: any) {
      setMessage({ text: e?.data || "Невірний старий пароль", ok: false });
    }
  };

  const inputClass = "w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-400";
  const labelClass = "block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-200";

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-8 shadow-sm w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">Змінити пароль</h1>

        {message && (
          <p className={`mb-4 text-sm font-medium ${message.ok ? "text-green-600" : "text-red-500"}`}>
            {message.text}
          </p>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <label className={labelClass}>Старий пароль</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className={inputClass}
              placeholder="Введіть старий пароль"
            />
          </div>
          <div>
            <label className={labelClass}>Новий пароль</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={inputClass}
              placeholder="Мінімум 6 символів"
            />
          </div>
          <div>
            <label className={labelClass}>Повторіть новий пароль</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClass}
              placeholder="Повторіть новий пароль"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="mt-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium px-6 py-2 rounded-lg transition"
          >
            {isLoading ? "Збереження..." : "Змінити пароль"}
          </button>

          <button
            onClick={() => navigate(-1)}
            className="text-sm text-muted-foreground hover:text-primary transition-colors text-center"
          >
            Скасувати
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;