// hooks/useEmailVerification.js
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useLogin from "./useLogin";

const useEmailVerification = () => {
	const [succesModalIsOpen, setSuccesModalIsOpen] = useState<string>("");

	const router = useRouter();
	const { setUserData, isAuthUserLoading } = useAuth();
	const { pathname, query } = router;
	const verifyStatus = query.email_verification;
	const email = query.eid;
	const isReset = query.reset;
	const password = query.id;
	const role = query.role;
	const { login } = useLogin();
	useEffect(() => {
		const deleteQuery = (pathname: string) => {
			delete query.email_verification;
			delete query.eid;
			delete query.id;
			delete query.reset;
			router.replace(pathname, query);
		};

		if (role) {
			setUserData((p) => p.map((i) => ({ ...i, role: role as string })));
		}

		if (verifyStatus === "success" && email && password) {
			// if (isReset) {
			// 	!isAuthUserLoading &&
			// 		toast.success("Password Reset Successful");
			// } else
			// 	!isAuthUserLoading &&
			// 		toast.success("Email Successfully verified");

			login(
				email as string,
				password as string,
				pathname,
				undefined
			).then((res) => {
				setSuccesModalIsOpen(password as string);
				res === 200 && deleteQuery(pathname);
			});
		} else if (verifyStatus === "failed") {
			toast.error("Verification failed");
			deleteQuery("/");
		} else if (verifyStatus === "already_verified") {
			deleteQuery("/");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [verifyStatus]);

	return { verifyStatus, succesModalIsOpen, setSuccesModalIsOpen };
};

export default useEmailVerification;
