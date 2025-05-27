export default function Home() {
  // const today: number = +new Date();
  //TODO : 발매 날짜 정해지면 발매 전에는 타이머, 발매 후에는 앨범 소개 페이지로 전환 기능 추가
  const isReleased: boolean = false;

  return (
    <section className="w-full h-screen mx-auto border-1 relative overflow-scroll flex flex-col justify-between items-center">
      <div className="wrapper relative w-full h-full flex flex-col items-center justify-center p-6 gap-12">
        <div className="inner flex-grow-0 max-w-2/3 w-2/3 h-full bg-orange-50 !mt-6">
          {isReleased ? (
            <>
              <div className="w-full h-full border-2 flex justify-between items-center gap-6">
                {/* TODO: 앨범 소개 컴포넌트 구분해서 만들기 */}
                <HMYoutubeEmbed />
                <div>
                  <h1>정규앨범 [평화로운 뇌와...]</h1>
                  {/* TODO: 소개글 elpsis 적용하기 // 전체보기로 할 건지 디스코그라피로 이동시킬건지 고민 */}
                  <p>여기에 대충 소개글</p>
                  <div>
                    <h2>아래에서 듣기</h2>
                    <ul className="flex gap-2">
                      <li>스포티파이</li>
                      <li>멜론</li>
                      <li>애플뮤직</li>
                      <li>벅스</li>
                      <li>유튜브뮤직</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-full h-full">여기에 타이머</div>
            </>
          )}
          <div className="w-full h-full border-2 flex justify-between items-center gap-6">
            {/* TODO: 앨범 소개 컴포넌트 구분해서 만들기 */}

            <div>
              <h1>정규 앨범 [HM]</h1>
              {/* TODO: 소개글 elpsis 적용하기 // 전체보기로 할 건지 디스코그라피로 이동시킬건지 고민 */}
              <p>여기에 대충 소개글</p>
              <div>
                <h2>아래에서 듣기</h2>
                <ul className="flex gap-2">
                  <li>스포티파이</li>
                  <li>멜론</li>
                  <li>애플뮤직</li>
                  <li>벅스</li>
                  <li>유튜브뮤직</li>
                </ul>
              </div>
            </div>
            <HMYoutubeEmbed />
          </div>
        </div>
      </div>
    </section>
  );
}

const HMYoutubeEmbed = () => {
  return (
    <div className="!aspect-w-32 !aspect-h-16">
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/q0RXd1Tj7tk?si=3K8fDpp9YaXj80g0"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};
