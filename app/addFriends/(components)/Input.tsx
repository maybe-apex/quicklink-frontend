import { kFontBold } from "@/global/constants";
import { searchLogo } from "@/global/helpers";
import Image from "next/image";

export function CustomInput({
	query,
	handleSearch,
}: {
	query: string;
	handleSearch: (q: any) => void;
}) {
	return (
		<label className={"flex flex-row bg-gray-700 h-fit pl-4"}>
			<Image src={searchLogo} alt="quicklink" className={"h-fit mt-5"} />
			<input
				type={"text"}
				className={`${kFontBold.className} text-2xl  h-14 bg-gray-700 px-5 !outline-none uppercase w-full`}
				value={query}
				onChange={handleSearch}
			/>
		</label>
	);
}
