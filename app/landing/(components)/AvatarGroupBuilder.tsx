import { Avatar, AvatarGroup } from "@chakra-ui/react";
import React from "react";
import { kFontBold } from "@/global/constants";

export default function AvatarGroupBuilder(): JSX.Element {
	return (
		<div className={"pt-8 mb-72 flex"}>
			<AvatarGroup size="md" max={5}>
				<Avatar
					name="Ryan Florence"
					src="https://bit.ly/ryan-florence"
				/>
				<Avatar
					name="Segun Adebayo"
					src="https://bit.ly/sage-adebayo"
				/>
				<Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
				<Avatar
					name="Prosper Otemuyiwa"
					src="https://bit.ly/prosper-baba"
				/>
				<Avatar
					name="Christian Nwamba"
					src="https://bit.ly/code-beast"
				/>
			</AvatarGroup>
			<p className={`${kFontBold.className} text-lg pl-5 leading-10`}>
				join 5k+ users
			</p>
		</div>
	);
}
