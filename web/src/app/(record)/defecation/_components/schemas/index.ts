import { z } from 'zod';

export const defecationFormSchema = z.object({
  selectedWhen: z.date(),
  selectedTry: z.string().min(1, '배변 시도를 선택해주세요.'),
  selectedColor: z.string().optional(),
  selectedShape: z.string().optional(),
  selectedPain: z.number().min(0, '배변 통증을 선택해주세요.').optional(),
  selectedTimeTaken: z.string().min(1, '배변 소요 시간을 선택해주세요.'),
  selectedOptional: z.string().default('').optional(),
});

export type DefecationFormValues = z.infer<typeof defecationFormSchema>;
