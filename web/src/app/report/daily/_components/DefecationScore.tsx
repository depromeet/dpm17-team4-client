const labels = ['매우 나쁨', '나쁨', '보통', '좋음', '매우 좋음'];

type ScoreProgressBarProps = {
  score: number;
};

export const DefecationScore = ({ score }: ScoreProgressBarProps) => {
  return (
    <div className="bg-[#272B31] rounded-[14px] py-5 px-6 w-full">
      <div className="flex justify-between items-center mb-3 text-body2-sb">
        <p>배변 점수</p>
        <p>{score}점</p>
      </div>
      {score < 0 || score > 100 ? (
        <div>확인되지 않은 점수입니다.</div>
      ) : (
        <>
          <div className="w-full bg-white/10 rounded-[10px] h-2.5 relative overflow-hidden">
            <div
              className="h-2.5 rounded-full transition-all duration-300 ease-in-out relative"
              style={{
                width: `${score}%`,
                background: 'linear-gradient(90deg, #FF5555 0%, #78E884 100%)',
                backgroundSize: `${(100 * 100) / Math.max(score, 1)}% 100%`,
                backgroundRepeat: 'no-repeat',
              }}
            />
          </div>
          <div className="flex justify-between mt-">
            {labels.map((label) => (
              <span key={label} className="text-[#707885] text-body4-m">
                {label}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
