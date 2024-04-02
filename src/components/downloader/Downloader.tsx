"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

const DownloaderButton = ({ locale }: { locale: any }) => {
	const [link, setLink] = useState("");

	const donwloadMusic = () => {
		console.log("link=" + link);

		const d = parseDownloadLink({link});

		fetch(d.downloadLink)
    .then(response => response.blob())
    .then(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = d.uuid;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    })
    .catch(error => {
        console.error('Network Error:', error);
				throw new Error("Network Error.");
    });
	}

	const parseDownloadLink = ({link} : {link: string}) => {
    const regex = /^https:\/\/app\.suno\.ai\/song\/([0-9a-fA-F-]+)\/?$/;
    const match = link.match(regex);

    if (match) {
        const uuid = match[1];
        return {uuid, downloadLink: `https://cdn1.suno.ai/${uuid}.mp3` } ;
    } else if (link.endsWith('.mp3')) {
        return {uuid: 'music', downloadLink: link};
    } else {
        throw new Error('Invalid link format.');
    }
	}

	return (
		<div className = "mt-12 flex flex-row gap-10 justify-center">
			<input type="url" id="name" className="basis block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:text-slate-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
			placeholder="输入Suno音乐URL" name="name" value={link} onChange={(e) => setLink(e.target.value)}></input>
			{/* <Button
				variant="default"
				className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
				aria-label="Get Boilerplate"
			>
				{locale.title}
			</Button> */}
			<button className="inline-flex justify-center rounded-2xl bg-blue-600 p-4 text-base font-semibold text-white hover:bg-blue-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:text-white/70 w-40"
			type="button" onClick={donwloadMusic}>下载</button>
		</div>
	);
};

export default DownloaderButton;
