"use client";
import { useState, ChangeEvent, use } from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";

const UploadForm = () => {
	const [file, setFile] = useState<File | null>(null);
	const [base64Image, setBase64Image] = useState("");
	const [description, setDescription] = useState('');

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const reader = new FileReader();

			reader.onloadend = () => {
				const base64String = reader.result;
				if (base64String && typeof base64String === 'string') {
					setBase64Image(base64String);
				}
			};

			reader.readAsDataURL(file);
		}
	};

	const handleUpload = async () => {
		try {
			if (!base64Image) {
				return;
			}

			const formData = new FormData();
			formData.append('image', base64Image);

			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formData
			});

			const data = await response.json();

			setDescription(data.description);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div className='mt-12 flex flex-row gap-10 justify-center'>
			<input type="file" accept="image/*" onChange={handleFileChange} className="basis block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:text-slate-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
			{base64Image && (
				<div>
					<Image
						src={base64Image}
						alt="Uploaded"
						width={200}
						height={200}
					/>
					<button className="inline-flex justify-center rounded-2xl bg-blue-600 p-4 text-base font-semibold text-white hover:bg-blue-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:text-white/70 w-40"
						type="button" onClick={handleUpload}>Try It!</button>
				</div>
			)}
			{description && <p>描述: {description}</p>}
		</div>
	);
};

export default UploadForm;
