"use client";

import { cn } from "@/utils/utils-cn";
import { DEFECATION_TRY_COLOR } from "../../constants/description";
import { useDefecation } from "../../providers/defecation-providers";

export default function Color() {
	const { defecationState, setDefecationState } = useDefecation();

	return (
		<div className="flex items-center justify-between gap-[12.6px] max-[398px]:gap-1">
			{Object.entries(DEFECATION_TRY_COLOR).map(([key, value]) => (
				<button
					type="button"
					onClick={() => {
						setDefecationState({ ...defecationState, selectedColor: key });
					}}
					key={key}
					className="flex flex-col items-center justify-center gap-2.5"
				>
					<div
						className={cn(
							"w-10 h-10 rounded-[10px]",
							defecationState.selectedColor === key &&
								"border-[1px] border-white",
						)}
						style={{ backgroundColor: value[1] }}
					/>
					<div className="text-sm font-normal">{value[0]}</div>
				</button>
			))}
		</div>
	);
}
