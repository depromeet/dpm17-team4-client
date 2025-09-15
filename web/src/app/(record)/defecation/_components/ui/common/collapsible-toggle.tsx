"use client";

import type { ReactNode } from "react";
import { ChevronThinIcon } from "@/components";
import { cn } from "@/utils/utils-cn";

interface CollapsibleToggleProps {
	id: string;
	trigger: ReactNode;
	children: ReactNode;
	className?: string;
	isOpen: boolean;
	onToggle: () => void;
}

export function CollapsibleToggle({
	id,
	trigger,
	children,
	className,
	isOpen,
	onToggle,
}: CollapsibleToggleProps) {
	return (
		<div
			className={cn(
				"w-full rounded-[15px] bg-gray-800 px-5 text-left",
				className,
			)}
		>
			<button
				id={id}
				type="button"
				onClick={onToggle}
				className={`flex w-full cursor-pointer items-center justify-between transition-all duration-400 ease-in-out ${isOpen ? "pt-[25px]" : "py-[25px]"}`}
				aria-expanded={isOpen}
				aria-controls={`collapsible-content-${id}`}
			>
				{trigger}
				<ChevronThinIcon
					type={isOpen ? "up" : "down"}
					className={cn(
						"will-change-transform transition-transform duration-300 text-white",
					)}
				/>
			</button>
			<div
				id={`collapsible-content-${id}`}
				className={cn(
					"grid will-change-transform transition-all duration-500 ease-in-out",
					isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
				)}
			>
				<div className="overflow-hidden">
					<div className={`pb-6 ${id === "COLOR" ? "pt-5" : "pt-1"}`}>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}
