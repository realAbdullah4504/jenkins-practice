import RegistrationSuccessModal from "@/components/Modals/SuccessRegistration";
import { ChatProvider } from "@/context/ChatContext";
import useEmailVerification from "@/hooks/useEmailVerification";
import useProtectDashboard from "@/hooks/useProtectDashboardRoutes";
import React, { createContext, useEffect, useState } from "react";

import { useRouter } from "next/router";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
interface LayoutProps {
  children: React.ReactNode;
  navigation: any;
}
interface ContexType {
  toggleSideBar: boolean;
  setToggleSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Context = createContext<ContexType>({
  toggleSideBar: true,
  setToggleSideBar: () => {},
});
export default function DashboardLayout({ children, navigation }: LayoutProps) {
  const [slideNav, setSlideNav] = useState<boolean>(true);
  const [toggleSideBar, setToggleSideBar] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (window.innerWidth >= 767) {
      setToggleSideBar(true);
    } else setToggleSideBar(false);
  }, [setToggleSideBar]);

  const isDashboard = useProtectDashboard();
  const { succesModalIsOpen, setSuccesModalIsOpen } = useEmailVerification();

  return (
    <ChatProvider>
      <div>
        {isDashboard && (
          <div className="">
            <div className="h-[80px] mb-4">
              <NavBar setSlideNav={setSlideNav} />
            </div>
            <div className="flex">
              <div>
                <Sidebar
                  slideNav={slideNav}
                  toggleSideBar={toggleSideBar}
                  setToggleSideBar={setToggleSideBar}
                  navigationLinks={navigation}
                />
              </div>
              {/* ${slideNav && (toggleSideBar ? 'ml-[300px] w-[calc(100%-300px)]' : 'ml-[80px] w-[calc(100%-80px)] */}
              <div
                className={`${
                  slideNav
                    ? toggleSideBar
                      ? "ml-[300px] w-[calc(100%-300px)]"
                      : "ml-[80px] w-[calc(100%-80px)]"
                    : "w-full"
                } transition-all duration-300 ease-in-out`}
              >
                <Context.Provider value={{ toggleSideBar, setToggleSideBar }}>
                  {children}
                </Context.Provider>
              </div>
            </div>

            {
              <RegistrationSuccessModal
                isOpen={succesModalIsOpen}
                setIsOpen={setSuccesModalIsOpen}
              />
            }
          </div>
        )}
      </div>
    </ChatProvider>
  );
}
