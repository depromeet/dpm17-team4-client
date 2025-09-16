"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { type DefecationFormValues, defecationFormSchema } from "../schemas";

export const DefecationProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const methods = useForm<DefecationFormValues>({
		resolver: zodResolver(defecationFormSchema),
		defaultValues: {
			selectedWhen: new Date(),
			selectedTry: "",
			selectedColor: "",
			selectedShape: "",
			selectedPain: -1,
			selectedTimeTaken: "",
			selectedOptional: "initial",
		},
		mode: "onChange",
	});

	return <FormProvider {...methods}>{children}</FormProvider>;
};
