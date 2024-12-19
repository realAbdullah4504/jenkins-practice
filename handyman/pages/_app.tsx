import { AuthContextProvider } from "@/context/AuthContext";
import { SocketProvider } from "@/context/SocketContext";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StaticPagesLayout } from "@/components/Cuanto-cuesta";
import { HeroSearchAndText } from "@/components";
import { changeServiceFormat } from "@/helper/changeServiceFormat";
import ErrorBoundary from "@/components/ErrorBoundary";
const queryClient = new QueryClient();

export default function App({ Component, pageProps, router }: AppProps) {
  const isDifferentLayout = router.pathname.startsWith("/cuanto-cuesta");
  console.log("process.env",process.env.NEXT_MONGO_URL)
  const endPath=router.pathname.split("/").pop();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <SocketProvider>
            <Toaster />
            {isDifferentLayout ? (
              <StaticPagesLayout>
                <h1 className="text-3xl font-bold text-center mt-8">¿Cuánto cuesta {changeServiceFormat(endPath || '')}?</h1>
                <HeroSearchAndText homePageOrNOt={false} title={false}/>
                <Component {...pageProps} />
              </StaticPagesLayout>
            ) : (
              <ErrorBoundary>
              <Component {...pageProps} />
              </ErrorBoundary>
            )}
            {process.env.NEXT_PUBLIC_ENV === "development" && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </SocketProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}
