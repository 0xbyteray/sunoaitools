"use client";
import { useState, ChangeEvent, use } from 'react';
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
		<div>
			<input type="file" accept="image/*" onChange={handleFileChange} />
			{base64Image && (
				<div>
					<img src={base64Image} alt="Uploaded" style={{ maxWidth: '200px', maxHeight: '200px' }} />
					<button onClick={handleUpload}>上传</button>
				</div>
			)}
			{description && <p>描述: {description}</p>}
		</div>
	);
};

export default UploadForm;
