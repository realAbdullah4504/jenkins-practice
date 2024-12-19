import React from "react";

export default function Page3({
	setTextAreaPageData,
	textAreaPageData,
}: {
	setTextAreaPageData: React.Dispatch<React.SetStateAction<string>>;
	textAreaPageData: string;
}) {
	return (
		<div className="w-full  py-4  mb-5 mt-5 px-1">
			<div className="flex flex-col md:mx-10 lg:mx-20 mx-4 space-y-3">
				<label
					htmlFor="servicePOPup_page2__text_area"
					className="font-semibold">
					Descripción adicional del trabajo
				</label>
				<textarea
					id="servicePOPup_page2__text_area"
					className="resize-none border border-gray-500 p-1 outline-none rounded-lg"
					onChange={(e) => setTextAreaPageData(e.target.value)}
					value={textAreaPageData}
					placeholder="Enter text"
					rows={8}
					cols={50}></textarea>
			</div>
		</div>
	);
}
