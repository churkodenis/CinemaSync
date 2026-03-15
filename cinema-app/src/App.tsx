import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import MaxWidthWrapper from "./layouts/MaxWidthWrapper";
import Header from "./layouts/Header";
import { Toaster } from "./components/ui/toaster";
import Footer from "./layouts/Footer";
import { useAppDispatch } from "./hooks/useRedux";
import { checkAuth } from "./store/features/userSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
    
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dispatch]);

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <MaxWidthWrapper className="w-full min-h-screen">
        <Outlet />
      </MaxWidthWrapper>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;