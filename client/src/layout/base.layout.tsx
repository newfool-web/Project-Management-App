import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/header";

const BaseLayout = () => {
  const location = useLocation();
  const hideHeader = ["/", "/sign-in", "/sign-up"].includes(location.pathname);
  return (
    <div className="flex flex-col w-full h-auto">
      {!hideHeader && <Header />}
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full mx-auto h-auto ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
