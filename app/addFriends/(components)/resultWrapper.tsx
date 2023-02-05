import { kFontMedium, kFontNormal } from "@/global/constants";
import { avatar_male_2_halo } from "@/global/helpers";
import { TagType, User } from "@/models/user";
import {
	Wrap,
	WrapItem,
	Tooltip,
	Tag,
	TagLabel,
	Skeleton,
} from "@chakra-ui/react";
import Image from "next/image";

export function buildResultWrapper(
	isLoading: boolean,
	filteredUsers: User[]
): JSX.Element {
	enum FriendType {
		CloseFriend = "closeFriend",
		Friend = "friend",
		None = "none",
	}
	const results: JSX.Element[] = filteredUsers.map((x, i) => {
		// const [friendType, setFriendType] = useState(FriendType.None);
		// const handleFriendTypeChange = (_newFriendType: FriendType) =>
		// 	setFriendType(
		// 		friendType == _newFriendType ? FriendType.None : _newFriendType
		// 	);
		return (
			<tr
				className={"my-6 flex justify-left gap-5"}
				key={`${i}${x.email}${x.gender}`}
			>
				<td className="flex flex-row w-[250px]">
					<div>
						<Image
							src={avatar_male_2_halo}
							alt="quicklink"
							className={"h-fit mr-2 pointer-events-none"}
						/>
					</div>
					<div>
						<p
							className={`${kFontMedium.className} text-md`}
						>{`${x.firstName} ${x.lastName}`}</p>
						<p
							className={`${kFontNormal.className} text-sm text-gray-400`}
						>{`${x.email}`}</p>
					</div>
				</td>
				<td className="w-72">
					<Wrap>
						{x.tags.map((e, i) => {
							return (
								<WrapItem key={`${i} ${e.label}`}>
									<Tooltip
										placement="top"
										label={
											e.type == TagType.Formal
												? "formal"
												: "informal"
										}
									>
										<Tag
											size={"md"}
											key={"lg"}
											colorScheme={
												e.type == TagType.Formal
													? "green"
													: "red"
											}
										>
											<TagLabel>{e.label}</TagLabel>
										</Tag>
									</Tooltip>
								</WrapItem>
							);
						})}
					</Wrap>
				</td>
				<td className="flex flex-row gap-4">
					{/* <Tooltip placement="top" label={"Close Friend"}>
						<div
							className={`flex justify-center border-2 border-slate-200 rounded-xl p-2 duration-200 ${
								friendType == FriendType.CloseFriend
									? ""
									: "border-slate-500"
							}`}
							onClick={() =>
								handleFriendTypeChange(FriendType.CloseFriend)
							}
						>
							<Image
								src={handshake}
								alt="quicklink"
								className={"h-fit w-11 pointer-events-none"}
							/>
						</div>
					</Tooltip>
					<Tooltip placement="top" label={"Friend"}>
						<div
							className={`flex justify-center border-2 border-slate-200 rounded-xl p-2 duration-200 ${
								friendType == FriendType.Friend
									? ""
									: "border-slate-500"
							}`}
							onClick={() =>
								handleFriendTypeChange(FriendType.Friend)
							}
						>
							<Image
								src={high_five}
								alt="quicklink"
								className={"h-fit w-11  pointer-events-none"}
							/>
						</div>
					</Tooltip> */}
				</td>
			</tr>
		);
	});

	return (
		<div className="bg-gray-700 w-[650px] md:w-[775px] py-5 px-5 overflow-auto select-none h-[545px]">
			<table className="table-auto border-separate">
				<thead>
					<tr className="flex text-left gap-5">
						<th className="w-[250px] pl-2">Name</th>
						<th className="w-[250px]">Tags</th>
					</tr>
				</thead>
				{isLoading && (
					<div className="flex flex-col gap-5 my-6">
						<Skeleton height="50px" w={"730px"} />
						<Skeleton height="50px" w={"730px"} />
						<Skeleton height="50px" w={"730px"} />
						<Skeleton height="50px" w={"730px"} />
						<Skeleton height="50px" w={"730px"} />
						<Skeleton height="50px" w={"730px"} />
					</div>
				)}
				{!isLoading && <tbody>{results}</tbody>}
			</table>
		</div>
	);
}
