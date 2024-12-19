import { Context } from "@/components/Common/DashboardLayout";
import { useContext } from "react";
import ChangeProfilePhoto from "../../components/ChangeProfilePhoto";
import ProfileManagementForm from "./components/form";

export interface EmailErroType {
	password_Error: string;
	password_doNotMatch: string;
}

export type EmailType = {
	password: string;
	cPassword: string;
};

export default function Index() {
	const { toggleSideBar } = useContext(Context);

	return (
		<div className={`w-full `}>
			<section className="  my-20">
				<h1 className="font-bold text-4xl text-Heading">
					Gestiona tu{" "} {/* Manage your */}
					<span className="text-orange font-bold">
						Perfil de Cliente {/* Client profile */}
					</span>
				</h1>
			</section>
			<div className=" rounded-md flex">
				<ChangeProfilePhoto />
				<ProfileManagementForm />
			</div>
		</div>
	);
}
