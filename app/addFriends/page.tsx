"use client";
import React, { useEffect, useState } from "react";
import { ErrorMessage, userDB } from "@/global/constants";
import { User } from "../../models/user";
import Image from "next/image";
import { tagLogo } from "@/global/helpers";
import { Button, FormControl, useToast } from "@chakra-ui/react";
import { OptionBase, Select, GroupBase } from "chakra-react-select";
import { buildInput } from "./(components)/Input";
import { ResultWrapper } from "./(components)/resultWrapper";
import { buildOptions } from "./helpers";
import { FaSignOutAlt } from "react-icons/fa";
import { SignOutFromApp } from "@/controllers/Firebase";
import { useRouter } from "next/navigation";
interface ColorOption extends OptionBase {
	value: string;
	label: string;
}
function Index() {
	const router = useRouter();
	const [isDomLoaded, setDomLoaded] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [selectedTags, setSelectedTags] = useState([] as string[]);
	const [nameFilteredUsers, setNameFilteredUsers] = useState(
		userDB as User[]
	);
	const [tagFilteredUsers, setTagFilteredUsers] = useState(userDB as User[]);
	const [displayUsers, setDisplayUsers] = useState(userDB as User[]);
	const [singOutLoading, setSingOutLoading] = useState(false);
	const [query, setQuery] = useState("");

	useEffect(() => setDomLoaded(true), []);

	// useEffect(() => {
	// 	setLoading(false);
	// }, [displayUsers]);

	useEffect(() => {
		setLoading(true);
		let selectedTagCheckList: string[] = selectedTags.map(
			(outer: any) => outer.label
		);
		const getTagFilteredList = (): User[] =>
			userDB.filter((x: User) => {
				const userTagList = x.tags.map((e) => e.label);
				return selectedTagCheckList.every((elem) =>
					userTagList.includes(elem)
				);
			});
		setTimeout(() => {
			setTagFilteredUsers(getTagFilteredList());
		}, 1000);
	}, [selectedTags]);

	useEffect(() => {
		setDisplayUsers(
			nameFilteredUsers.filter((x) => tagFilteredUsers.includes(x))
		);
	}, [nameFilteredUsers, tagFilteredUsers]);

	const getNameFilterdList = (searchQuery: string): User[] => {
		return userDB.filter(
			(user) =>
				user.firstName.toLowerCase().includes(searchQuery) ||
				user.lastName.toLowerCase().includes(searchQuery) ||
				user.email.toLowerCase().includes(searchQuery)
		);
	};

	const handleSearch = (q: any) => {
		const { value } = q.target;
		const re = /^[a-zA-Z][a-zA-Z ]*$/;
		if (value != "" && !re.test(value)) {
			return;
		}
		setLoading(true);
		setQuery(value);
		const searchQuery = q.target.value.toLowerCase();
		setTimeout(() => {
			setNameFilteredUsers(getNameFilterdList(searchQuery));
			setLoading(false);
		}, 2000);
	};

	const handleTagSelection = (e: any) => {
		setSelectedTags(e);
	};

	const toast = useToast();

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

	return (
		<div className={"bg-gray-800 w-screen h-screen flex-col "}>
			<div className="flex justify-end flex-row pt-5 pr-16">
				{singOutLoading && (
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
				{!singOutLoading && (
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
			<div className="flex w-screen h-screen justify-center">
				<div className={"mt-28 flex flex-col w-[650px] md:w-[775px]"}>
					{buildInput(query, handleSearch)}
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
									onChange={handleTagSelection}
									placeholder="Select some tags..."
									closeMenuOnSelect={false}
									variant="filled"
								/>
							</FormControl>
						)}
					</div>
					{
						<ResultWrapper
							isLoading={isLoading}
							filteredUsers={displayUsers}
						/>
					}
				</div>
			</div>
		</div>
	);
}

export default Index;
