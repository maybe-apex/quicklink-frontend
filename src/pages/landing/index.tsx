import React, {useState} from 'react';
import {kFontMedium} from "@/global/constants";
import Image from "next/image";
import {searchLogo} from "@/global/helpers";

function Index() {
    const [query, setQuery] = useState('');
    1
    const handleSearch = (q: any) => {
        const {value} = q.target;
        console.log('Input value: ', value);

        const re = /^[a-zA-Z][a-zA-Z ]*$/;
        if (value === "" || re.test(value)) {
            setQuery(value);
        }
    }
    return (
        <div className={"bg-gray-800 w-screen h-screen flex justify-center"}>
            <div className={"mt-72 flex w-screen justify-center"}>
                <label className={"flex flex-row bg-gray-700 h-fit pl-4"}>
                    <Image src={searchLogo} alt="quicklink" className={"h-fit mt-4"}/>
                    <input type={"text"}
                           className={`${kFontMedium.className} w-[400px] md:w-[575px] h-12 bg-gray-700 px-5 !outline-none uppercase`}
                           value={query}
                           onChange={handleSearch}/>
                </label>
            </div>
        </div>
    );
}

export default Index;