import { z } from 'zod';

export const defecationFormSchema = z.object({
  selectedWhen: z.date(),
  selectedTry: z.string().min(1, '배변 시도를 선택해주세요.'),
  selectedColor: z.string().min(1, '배변 색상을 선택해주세요.'),
  selectedShape: z.string().min(1, '배변 모양을 선택해주세요.'),
  selectedPain: z.string().min(1, '배변 통증을 선택해주세요.'),
  selectedTimeTaken: z.string().min(1, '배변 소요 시간을 선택해주세요.'),
  selectedOptional: z.string().optional(),
});

export type DefecationFormValues = z.infer<typeof defecationFormSchema>;
