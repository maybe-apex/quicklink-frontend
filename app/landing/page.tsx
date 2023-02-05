"use client";
import React from "react";
import Image from "next/image";
import {
	heroSubTitle,
	heroTitle,
	kFontBold,
	kFontSemiBold,
} from "@/global/constants";
import { logo } from "@/global/helpers";
import AvatarGroupBuilder from "./(components)/AvatarGroupBuilder";
import CardBuilder from "./(components)/cardBuilder";

function Onboarding() {
	return (
		<div className={"flex flex-col lg:flex-row"}>
			<div
				className={`bg-[#2B6CB0] lg:w-1/2 w-full min-h-screen order-2 lg:order-1`}
			>
				<div
					className={
						"max-w-3xl  mx-auto lg:ml-auto px-4 sm:px-6 md:px-8 flex-none h-max "
					}
				>
					<div
						className={
							"mx-w-lg h-fit space-x-2.5 pt-8 hidden lg:flex"
						}
					>
						<Image src={logo} alt="quicklink" />
						<p className={`${kFontSemiBold.className} text-2xl`}>
							quicklink
						</p>
					</div>
					<div className={"my-72"}>
						<div>
							<p
								className={`${kFontBold.className} text-5xl lg:text-6xl`}
							>
								{heroTitle}
							</p>
							<p
								className={`${kFontBold.className} text-xl md:text-2xl pt-5`}
							>
								{heroSubTitle}
							</p>
						</div>
						{AvatarGroupBuilder()}
					</div>
				</div>
			</div>
			<div
				className={
					"bg-gray-800 lg:w-1/2 w-full text-center justify-right xl:pr-20 order-1 lg:order-2 pb-52 lg:pb-0"
				}
			>
				<div
					className={
						"mx-w-lg  flex h-fit space-x-2.5 pt-8 lg:hidden px-6"
					}
				>
					<Image src={logo} alt="quicklink" />
					<p className={`${kFontSemiBold.className} text-2xl`}>
						quicklink
					</p>
				</div>
				<div className={"mt-40 mb-14 duration-500"} id={"tilt"}>
					<div className={`${kFontBold.className} text-4xl pb-2`}>
						Welcome to
					</div>
					<div className={`${kFontBold.className} text-6xl`}>
						Quicklink
					</div>
				</div>
				{CardBuilder()}
			</div>
		</div>
	);
}

export default Onboarding;
