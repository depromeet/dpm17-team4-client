export interface TermsItem {
  title: string;
  content: string;
}

export interface TermsResponseDto {
  status: number;
  message: string;
  data: TermsItem[];
  externalLink: string;
}
