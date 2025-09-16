"use client";

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/utils/utils-cn";
import { DEFECATION_SHAPE } from "../../constants";
import type { DefecationFormValues } from "../../schemas";
import type { DefecationTryShapeKey } from "../../types";
import { getEmojiShapeIcon, getRealShapeIcon } from "../../utils";
import { SelectButton, Switch } from "../common";

export default function Shape({
	onShapeSelect,
}: {
	onShapeSelect?: () => void;
}) {
	const { control, setValue } = useFormContext<DefecationFormValues>();
	const [showType, setShowType] = useState<"EMOJI" | "REAL">("EMOJI");

	return (
		<>
			<div className="flex items-center justify-start gap-3 mb-4">
				<p className="text-body3-r opacity-80">실제 모양 보기</p>
				<Switch
					checked={showType === "REAL"}
					onCheckedChange={(checked) => setShowType(checked ? "REAL" : "EMOJI")}
				/>
			</div>
			<div className="grid grid-cols-2 gap-[11px]">
				<Controller
					name="selectedShape"
					control={control}
					render={({ field }) => (
						<>
							{Object.entries(DEFECATION_SHAPE).map(([key, value]) => (
								<SelectButton
									key={key}
									isSelected={field.value === key}
									onClick={() => {
										setValue("selectedShape", key, { shouldValidate: true });
										field.onChange(key);
										onShapeSelect?.();
									}}
									className="h-22 min-w-36.5 px-4 py-[13px]"
								>
									<div className="flex flex-col items-center justify-around gap-2">
										{showType === "EMOJI"
											? getEmojiShapeIcon(key as DefecationTryShapeKey)
											: getRealShapeIcon(key as DefecationTryShapeKey)}

										<div
											className={cn(
												"text-button-2",
												field.value === key && "text-white",
											)}
										>
											{value}
										</div>
									</div>
								</SelectButton>
							))}
						</>
					)}
				/>
			</div>
		</>
	);
}
