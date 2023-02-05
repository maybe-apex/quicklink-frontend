"use client";
// import { Inter } from "@next/font/google";
import { useColorMode } from "@chakra-ui/react";
import { StorageKeys } from "@/global/constants";
import { useRouter } from "next/navigation";
import { loadFromLocalStorage } from "@/controllers/LocalStorage";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const isLoggedIn = loadFromLocalStorage(StorageKeys.IsLoggedIn);
	const router = useRouter();
	if (isLoggedIn == "true") router.push("./landing");
	else router.push("./addFriends");
	const { toggleColorMode } = useColorMode();

	return <main className="w-screen justify-contents-center h-screen"></main>;
}
