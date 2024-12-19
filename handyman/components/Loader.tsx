import { FadeLoader } from "react-spinners";

export default function Loader() {
	return (
		<div className="flex justify-center items-center w-full h-[60dvh]">
			<FadeLoader color="#000" />
		</div>
	);
}
