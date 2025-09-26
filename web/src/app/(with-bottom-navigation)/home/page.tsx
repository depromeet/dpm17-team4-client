"use client";

import { Bell } from "lucide-react";
import Image from "next/image";
import MaskGroup from "@/assets/home/Mask group.svg";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { RecordSection } from "./_components/ui";

export default function Home() {
	const { navHeight } = useNavigationContext();

	return (
		<>
			<main className="min-w-[3.75rem] min-h-screen text-white relative px-4 pb-20 bg-gradient-to-br from-[#140927] via-[#403397] to-[#4665F3]">
				{/* Radial gradient 배경 */}
				<div className="absolute inset-0 opacity-70">
					<Image
						src={MaskGroup}
						alt="배경 그라디언트"
						className="w-full h-full object-cover"
						priority
					/>
				</div>
				{/* 콘텐츠 영역 */}
				<div className="relative z-10">
					<section className="flex justify-between font-bold text-h3 pt-[71px]">
						<span>Logo</span>
						{/* NOTE(yubin):아이콘 교체 */}
						<Bell />
					</section>
					<section className="text-h2 mt-[2.2rem]">
						<h1>
							유빈님, 반가워요!
							<br />
							오늘의 기록을 시작할까요?
						</h1>
						<p className="text-gray-500 text-sm mt-2">
							또잇이와 함께 배아픈 이유를 찾아보아요
						</p>
					</section>
					{/* 중앙 아이콘 영역 */}
					<section className="flex justify-center items-center mt-[2.94rem]">
						{/* NOTE(yubin):이미지 교체 */}
						<Image
							width={213}
							height={206}
							src={"https://placehold.co/600x400.png"}
							alt="홈 화면 중앙 아이콘"
						/>
					</section>
				</div>
			</main>
			{/* 기록하기 영역 */}
			<RecordSection navHeight={navHeight} />
		</>
	);
}
