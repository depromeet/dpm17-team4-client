"use client";

import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/utils/utils-cn";
import { DEFECATION_TIME_TAKEN } from "../../constants";
import type { DefecationFormValues } from "../../schemas";
import { SelectButton } from "../common";

export default function TimeTaken({
	onTimeTakenSelect,
}: {
	onTimeTakenSelect?: () => void;
}) {
	const { control, setValue } = useFormContext<DefecationFormValues>();
	return (
		<div>
			<p className="text-body3-r opacity-80 mb-3.5">
				배변을 완료하는데 얼마나 걸렸나요?
			</p>
			<div className="grid grid-cols-3 gap-[10.5px]">
				<Controller
					name="selectedTimeTaken"
					control={control}
					render={({ field }) => (
						<>
							{Object.entries(DEFECATION_TIME_TAKEN).map(([key, value]) => (
								<SelectButton
									key={key}
									isSelected={field.value === key}
									onClick={() => {
										setValue("selectedTimeTaken", key, {
											shouldValidate: true,
										});
										field.onChange(key);
										onTimeTakenSelect?.();
									}}
									className="h-12 py-4 px-[22px] text-button-3"
								>
									<p
										className={cn(
											"flex items-center justify-center text-center whitespace-nowrap",
											field.value === key && "text-white",
										)}
									>
										{value}
									</p>
								</SelectButton>
							))}
						</>
					)}
				/>
			</div>
		</div>
	);
}
