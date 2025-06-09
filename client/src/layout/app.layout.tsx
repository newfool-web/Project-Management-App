import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AuthProvider } from "@/context/auth-provider";
import Asidebar from "@/components/asidebar/asidebar";
import Header from "@/components/header";
import CreateWorkspaceDialog from "@/components/workspace/create-workspace-dialog";
import CreateProjectDialog from "@/components/workspace/project/create-project-dialog";

const AppLayout = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-tr from-cyan-50 via-blue-50 to-purple-50">
        <SidebarProvider>
          <Asidebar />
          <SidebarInset className="overflow-x-hidden flex flex-col h-full">
            <Header />
            <div className="flex-1 overflow-y-auto px-3 lg:px-20 py-3">
              <Outlet />
              <CreateWorkspaceDialog />
              <CreateProjectDialog />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </AuthProvider>
  );
};

export default AppLayout;
