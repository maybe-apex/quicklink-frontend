"use client";
import { SignOutFromApp } from "@/controllers/Firebase";
import { GetAllTags } from "@/controllers/requests";
import { Database } from "@/Database/AppData";
import { ErrorMessage, kFontBold } from "@/global/constants";
import { searchLogo, tagLogo } from "@/global/helpers";
import { TagType } from "@/models/user";
import Image from "next/image";
import {
	Button,
	FormControl,
	Tag,
	TagCloseButton,
	TagLabel,
	Tooltip,
	useToast,
	WrapItem,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { CustomInput } from "../addFriends/(components)/Input";
import { GroupBase, OptionBase, Select } from "chakra-react-select";
import { buildOptions } from "../addFriends/helpers";
interface ColorOption extends OptionBase {
	value: string;
	label: string;
}

export default function Index() {
	const router = useRouter();
	const [signOutLoading, setSingOutLoading] = useState(false);
	const [isDomLoaded, setDomLoaded] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const toast = useToast();
	const [query, setQuery] = useState("");

	useEffect(() => {
		(async () => {
			try {
				await GetAllTags();
				setDomLoaded(true);
			} catch (e) {
				toast({
					title: `${ErrorMessage.SomethingWentWrong}`,
					status: "error",
					isClosable: true,
				});
			}
		})();
	}, []);

	async function handleSignOut() {
		setSingOutLoading(true);
		try {
			await SignOutFromApp();
			router.push("./landing");
		} catch (e) {
			toast({
				title: `${ErrorMessage.SomethingWentWrong}`,
				status: "error",
				isClosable: true,
			});
		}
		setSingOutLoading(true);
	}
	const handleSearch = (q: any) => {
		const { value } = q.target;
		const re = /^[a-zA-Z][a-zA-Z ]*$/;
		if (value != "" && !re.test(value)) {
			return;
		}
		setLoading(true);
		setQuery(value);
		const searchQuery = q.target.value.toLowerCase();
		// setNameFilteredUsers(getNameFilterdList(searchQuery));
		setLoading(false);
	};
	let temp = Array.from(Database.allTags.values());
	return (
		<div className={"bg-gray-800 w-screen h-screen flex-col"}>
			<div className="flex justify-end flex-row pt-5 pr-16 mb-10">
				{signOutLoading && (
					<Button
						isLoading
						loadingText="Signing Out"
						leftIcon={<FaSignOutAlt />}
						colorScheme="red"
						variant="solid"
						onClick={handleSignOut}
					>
						Sign Out
					</Button>
				)}
				{!signOutLoading && (
					<Button
						leftIcon={<FaSignOutAlt />}
						colorScheme="red"
						variant="solid"
						onClick={handleSignOut}
					>
						Sign Out
					</Button>
				)}
			</div>
			<div className="flex flex-col lg:flex-row justify-center items-center">
				<div className="flex flex-col justify-center items-center">
					<div className="bg-gray-700 p-6 min-h-[350px] rounded-md">
						<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 grid-flow-row-dense place-items-center gap-y-5">
							{isDomLoaded &&
								[
									...temp,
									...temp,
									...temp,
									...temp,
									...temp,
									...temp,
								].map((e, i) => {
									return (
										<WrapItem key={`${i} ${e.title}`}>
											<Tooltip
												placement="top"
												label={
													e.type == TagType.Formal
														? "formal"
														: "informal"
												}
											>
												<Tag
													size={"lg"}
													key={"lg"}
													colorScheme={
														e.type == TagType.Formal
															? "green"
															: "red"
													}
												>
													<TagLabel>
														{e.title}
													</TagLabel>
												</Tag>
											</Tooltip>
										</WrapItem>
									);
								})}
						</div>
					</div>
					<div
						className={
							"mt-10 flex flex-col w-[500px] md:w-[775px] lg:max-w-3xl"
						}
					>
						<div className="flex flex-row">
							<div className="bg-gray-800 my-5 px-4 py-2">
								<Image
									src={tagLogo}
									alt="quicklink"
									className={"h-fit w-5 bg-gray-800"}
								/>
							</div>
							{isDomLoaded && (
								<FormControl my={4}>
									<Select<
										ColorOption,
										true,
										GroupBase<ColorOption>
									>
										isMulti
										hasStickyGroupHeaders
										name="tags"
										options={buildOptions()}
										// onChange={handleTagSelection}
										placeholder="Select some tags..."
										closeMenuOnSelect={false}
										variant="filled"
									/>
								</FormControl>
							)}
						</div>
					</div>
				</div>
				<div>
					<div className="bg-gray-700 p-6 min-h-[150px] max-w-xl mt-6 lg:ml-6 lg:mt-0 rounded-md grid grid-cols-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-flow-row-dense place-items-center gap-y-5">
						{isDomLoaded &&
							[...temp].map((e, i) => {
								return (
									<WrapItem key={`${i} ${e.title}`}>
										<Tooltip
											placement="top"
											label={
												e.type == TagType.Formal
													? "formal"
													: "informal"
											}
										>
											<Tag
												size={"lg"}
												key={"lg"}
												colorScheme={
													e.type == TagType.Formal
														? "green"
														: "red"
												}
											>
												<TagLabel>{e.title}</TagLabel>
												<TagCloseButton />
											</Tag>
										</Tooltip>
									</WrapItem>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
}
