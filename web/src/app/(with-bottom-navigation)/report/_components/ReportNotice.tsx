'use client';

const ReportNotice = () => {
  // NOTE(taehyeon): 생활 습관 및 일반 건강 관련 정보 참고 URL (현재는 앱 컨텍스트 내에서 열림 -> 외부 브라우저로 열려야 하는지 여부는 논의 필요)
  const linkedURL = 'https://www.snuh.org/health/nMedInfo/nList.do';
  const handleLinkClick = () => {
    window.open(linkedURL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="pt-[36px] pb-[60px] flex flex-col space-y-5 w-[calc(100%-32px)] mx-auto z-10">
      <p className="text-body2-sb text-[#707885]">유의사항</p>
      <ul className="text-body4-r text-start leading-normal text-[#4E5560] space-y-1">
        <li className="flex items-start gap-2">
          <span className="text-[#4E5560] flex-shrink-0">•</span>
          <span>
            본 리포트는 의학적 진단이 아닌 일반 건강 정보를 기반으로 하며,
            의학적 진단, 진료 혹은 치료를 대신하지 않습니다.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#4E5560] flex-shrink-0">•</span>
          <span>
            모든 정보는 일반적인 건강 관리 참고 용도로만 활용 가능하며, 의료
            지원 및 의학에 근거한 전문적인 판단이 필요한 경우 의료기관에 방문해
            전문가와 상담하십시오.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#4E5560] flex-shrink-0">•</span>
          <span>
            리포트에 포함된 제안이나 권장 사항은 사용자의 개별 상황, 생활 습관,
            건강 목표를 완전히 반영하지 않을 수 있습니다.
          </span>
        </li>
        <br />
        <li className="flex items-start gap-2">
          <span className="text-[#4E5560] flex-shrink-0">•</span>
          <span>
            대변 건강 정보는 당일 입력된 배변 내용(색상, 모양, 복통 정도, 소요
            시간)에 대하여 브리스톨 대변 척도를 기반으로 산정되었습니다.
          </span>
        </li>
        <br />
        <li className="flex items-center gap-2 h-6">
          <span className="text-[#4E5560] flex-shrink-0">•</span>
          <span>생활 습관 및 일반 건강 관련 정보 참고</span>
          <button type="button" onClick={handleLinkClick}>
            <svg
              role="img"
              aria-label="info"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="5.32422"
                y="5.32422"
                width="13.3535"
                height="13.3535"
                rx="2"
                fill="#4E5560"
              />
              <path
                d="M15.1611 13.9622C15.1611 14.1921 14.9748 14.3783 14.745 14.3783C14.5152 14.3783 14.3289 14.192 14.3289 13.9622V10.2586L9.54634 15.0412C9.38383 15.2037 9.12033 15.2037 8.95781 15.0412C8.79532 14.8787 8.7953 14.6152 8.95781 14.4527L13.7404 9.67011H10.0368C9.80696 9.67009 9.62067 9.48383 9.62067 9.254C9.62069 9.02418 9.80697 8.8379 10.0368 8.83789H14.745C14.7701 8.83789 14.7947 8.84052 14.8186 8.84479C14.8479 8.85004 14.8769 8.85811 14.9048 8.86969C14.9326 8.88129 14.9589 8.8959 14.9833 8.91299C15.0029 8.92673 15.0217 8.94221 15.0393 8.95973C15.057 8.97751 15.0729 8.99652 15.0868 9.01644C15.1032 9.03995 15.1172 9.06522 15.1285 9.09192L15.1308 9.09729C15.137 9.11258 15.1407 9.12862 15.145 9.14442C15.1546 9.17945 15.1611 9.21593 15.1611 9.254V13.9622Z"
                fill="#99A1B1"
              />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ReportNotice;
