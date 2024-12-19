import { Context } from "@/components/Common/DashboardLayout";
import { useContext, useState } from "react";
import PostJOB from "./components/PostJob";
export interface TableTestDataType {
	id: string;
	job_title: string;
	listingID: string;
	date_of_post: string;
}
const TableTestData: TableTestDataType[] = [
	{
		id: "1",
		job_title: "Demolición completa de edificios y estructuras",
		listingID: "32918467",
		date_of_post: "23/05/2023",
	},
	{
		id: "2",
		job_title: "Demolición completa de edificios y estructuras",
		listingID: "32918468",
		date_of_post: "23/05/2023",
	},
	{
		id: "3",
		job_title: "Demolición completa de edificios y estructuras",
		listingID: "32918469",
		date_of_post: "23/05/2023",
	},
];
export default function Index() {
	const { toggleSideBar } = useContext(Context);
	const [tabelData, setTableData] =
		useState<TableTestDataType[]>(TableTestData);
	return (
		<div className={`w-full  my-12`}>
			<PostJOB tabelData={tabelData} setTableData={setTableData} />
		</div>
	);
}
