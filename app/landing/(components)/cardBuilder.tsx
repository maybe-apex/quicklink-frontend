"use client";
import {
  kFontBold,
  kFontMedium,
  kFontNormal
} from "@/global/constants";
import { avatar_female_1, avatar_male_1 } from "@/global/helpers";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import Image from "next/image";
import { useState } from "react";
import { Gender } from "@/models/user";
import { tiltHelper } from "../helpers";
import { BuildLoginButton } from "./LoginButtonBuidler";
import { BuildSignUpButton } from "./SignUpButtonBuilder";

export default function CardBuilder(): JSX.Element {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [gender, setGender] = useState(Gender.Male);
	const [date, setDate] = useState(new Date());
	const [isSubmitted, setSubmit] = useState(false);

	const handleFirstNameChange = (e: any) => setFirstName(e.target.value);
	const handleLastNameChange = (e: any) => setLastName(e.target.value);
	const handleGenderChange = (_newGender: Gender) => {
		setGender(_newGender);
	};

	const isFirstNameEmpty = firstName === "";
	const isLastNameEmpty = lastName === "";
	const isDateEmpty =
		date.setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0);

	return (
		<div className={"flex justify-center duration-1000"}>
			<div
				className={`bg-gray-700 p-8 w-[440px] text-justify rounded-md duration-500`}
				id={"tilt"}
				ref={(node) => tiltHelper(node)}
			>
				<p className={`${kFontBold.className} text-2xl pb-4`}>
					Create your new account
				</p>
				<FormLabel className={"text-slate-100"}>Name</FormLabel>
				<div
					className={`${kFontMedium.className} grid grid-cols-2 gap-4`}
				>
					<FormControl isInvalid={isSubmitted && isFirstNameEmpty}>
						<div className={`${kFontMedium.className}`}>
							<Input
								type="text"
								placeholder={"John"}
								value={firstName}
								onChange={handleFirstNameChange}
								// onClick={() => (t1 = true)}
							/>
							<FormErrorMessage>
								Firstname is required.
							</FormErrorMessage>
						</div>
					</FormControl>
					<FormControl isInvalid={isSubmitted && isLastNameEmpty}>
						<div>
							<Input
								type="text"
								placeholder={"Doe"}
								value={lastName}
								onChange={handleLastNameChange}
								// onClick={() => (t2 = true)}
							/>
							<FormErrorMessage>
								Lastname is required.
							</FormErrorMessage>
						</div>
					</FormControl>
				</div>
				<div className={"flex flex-row mt-8 justify-center"}>
					<div
						className={`flex justify-center border-2 border-slate-200 rounded-xl mx-4 p-4 duration-200 ${
							gender == Gender.Male ? "" : "border-slate-500"
						}`}
						onClick={() => handleGenderChange(Gender.Male)}
					>
						<Image src={avatar_male_1} alt="quicklink" />
					</div>
					<div
						className={`flex justify-center border-2 border-slate-200 rounded-xl mx-4 p-4 duration-200 ${
							gender == Gender.Female ? "" : "border-slate-500"
						}`}
						onClick={() => handleGenderChange(Gender.Female)}
					>
						<Image src={avatar_female_1} alt="quicklink" />
					</div>
				</div>
				<div
					className={`!${kFontMedium.className} flex pt-8 space-x-10`}
				>
					<FormLabel className={`text-slate-200 leading-10`}>
						Birthday
					</FormLabel>
					<FormControl isInvalid={isSubmitted && isDateEmpty}>
						<div className="flex justify-center">
							<div
								className={`${kFontNormal.className}text-slate-200  w-60`}
							>
								<SingleDatepicker
									name="date-input"
									date={date}
									onDateChange={setDate}
								/>
								<FormErrorMessage>
									Please enter your birthday.
								</FormErrorMessage>
							</div>
						</div>
					</FormControl>
				</div>
				<div className="mt-6 flex flex-col place-items-center">
					{BuildSignUpButton({
						firstName: firstName,
						lastName: lastName,
						dob: date,
						gender: gender,
						setSubmit: setSubmit,
						isInvalid:
							isFirstNameEmpty || isLastNameEmpty || isDateEmpty,
					})}
					<div className="py-[1px] bg-slate-400 mt-5 w-[330px]"></div>
				</div>
				<div className="pt-5 flex">
					<p
						className={`${kFontMedium.className} text-lg pl-6 leading-10`}
					>
						Already onboard ?
					</p>
					{BuildLoginButton()}
				</div>
			</div>
		</div>
	);
}