const ReportNotice = () => {
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
        <li className="flex items-center gap-2">
          <span className="text-[#4E5560] flex-shrink-0">•</span>
          <span>생활 습관 및 일반 건강 관련 정보 참고</span>
        </li>
      </ul>
    </div>
  );
};

export default ReportNotice;
