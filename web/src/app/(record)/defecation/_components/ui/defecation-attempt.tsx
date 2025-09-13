"use client";

import { Controller, type FieldValues, useFormContext } from "react-hook-form";
import { cn } from "@/utils/utils-cn";
import { DEFECATION_TRY } from "../constants";
import type { DefecationFormValues } from "../schemas";

export const DefecationAttempt = () => {
	const { control, setValue, watch } = useFormContext<DefecationFormValues>();
	const selectedTry = watch("selectedTry");

	const handleClick = (value: string, field: FieldValues) => {
		const newValue = selectedTry === value ? "" : value;
		setValue("selectedTry", newValue, { shouldValidate: true });
		field.onChange(newValue);
	};

	return (
		<div className="flex items-start justify-center w-full gap-3">
			<Controller
				name="selectedTry"
				control={control}
				render={({ field }: { field: FieldValues }) => (
					<>
						{Object.entries(DEFECATION_TRY).map(([_, value]) => (
							<button
								className={cn(
									"flex-1 h-12 rounded-[10px] bg-[#2C2C35] text-white/40 whitespace-nowrap flex items-center justify-center",
									"transition-all duration-200",
									selectedTry === value ? "bg-primary-600 text-white" : "",
								)}
								type="button"
								key={value}
								onClick={() => {
									handleClick(value, field);
								}}
							>
								<p className="text-button-3">{value}</p>
							</button>
						))}
					</>
				)}
			/>
		</div>
	);
};
