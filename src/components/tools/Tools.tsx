import Image from "next/image";
import { RoughNotation } from "react-rough-notation";
import styles from './Tools.module.css';

const tools = [
	{
		image: "/images/picture/clock.svg",
		name: "Fast Downloads",
		description: "SSYouTube uses advanced download technology to quickly download YouTube videos in just a few seconds.",
	},
	{
		image: "/images/picture/limit.svg",
		name: "Multiple Format Support",
		description: "supports a wide range of video formats, including MP4, AVI, MOV, FLV, WMV, and more, giving you the flexibility to choose the format that suits your needs.",
	},
	{
		image: "/images/picture/safe.svg",
		name: "High-Definition Video Downloads",
		description: "SSYouTube can download high-definition videos up to 1080p,2K,4K ensuring you get the best video quality possible.",
	},
	{
		image: "/images/picture/platform.svg",
		name: "User-Friendly Interface",
		description: "We have an intuitive user interface that makes it easy to use, even for those without technical expertise.",
	},
	{
		image: "/images/picture/support.svg",
		name: "Safe and Reliable",
		description: "Our Youtube Video Downloader is a safe and reliable tool that won't harm your computer or mobile device, and won't compromise your personal information.",
	},
	{
		image: "/images/picture/cloud.svg",
		name: "Free to Use",
		description: "it's completely free, so you don't have to pay anything to use it to download YouTube videos.",
	},
];

export const Tools = ({ locale }: { locale: any }) => {
	return (
		<section className="flex flex-col justify-center lg:max-w-7xl md:max-w-5xl w-[95%] mx-auto md:gap-14 py-6">
			<div className={styles['tool-section']}>
				<h2 className="text-center">
					<RoughNotation type="highlight" show={true} color="#2563EB">
						Download Youtube Videos Online
					</RoughNotation>
				</h2>
				<div className="txt-box">
					<p className={styles['tool-txt-box']}>Are you tired of buffering and slow internet speeds while trying to watch your favorite YouTube videos? Do you want a simple and effective solution to download YouTube videos and watch them at your convenience? Look no further than Youtube Video Downloader!</p>
					<p className={styles['tool-txt-box']}>SSYouTube is a powerful and reliable Youtube Video Downloader that lets you download YouTube videos quickly and easily. With its intuitive interface and user-friendly design, you can download videos in just a few clicks. Whether you want to watch videos offline or save them for future viewing, SSYouTube has got you covered.</p>
				</div>
				<ul className={styles['listitem']}>
					{tools.map((tool, index) => {
						return (
							<li key={index} className={styles['li']}>
								<div className={styles['post-image']}>
									<Image
										src={tool.image}
										alt={tool.name}
										height={220}
										width={220}
									/>
								</div>
								<div className={styles['post-content']}>
									<h3 className={styles['post-content-title']}>{tool.name}</h3>
									<p>{tool.description}</p>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
};