import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {kFontMedium} from "@/globals/constants";

export default function App({Component, pageProps}: AppProps) {
    return (
        <main className={kFontMedium.className}>
            <Component {...pageProps} />
        </main>
    )
}
