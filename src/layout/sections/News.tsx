import mockImg from "@/assets/images/rainlight.jpg";
import _ from "lodash";

const newsMockData = [
  {
    idx: 0,
    img: mockImg,
    title: "Rainlight 언플러그드 라운지",
    content: `흐린 날, 조용히 번지는 빛과 소리.
비 오는 날의 창가처럼 고요하고 차분한 시간.
말을 아끼는 멜로디와 단순한 울림.
그리고 오래된 기억을 떠올리게 하는 순간들.
<br/>
With
HIMINN (@himinn___)
기쿠하시 (@0primetime)
<br/>
* 공연정보
- 일시: 2025년 4월 3일(목) 오후 8시
- 장소: 언플러그드 라운지 (구 언플러그드 서교점, 서울 마포구 와우산로29길 15 2층)
- 티켓: 사전예매 25,000원 / 현장예매 30,000원 (50석)
(음료 20% 할인 포함) 입장번호순 좌석제 공연
- 예매오픈: 3월 22일 토요일 오후 5시
- 예매마감: 4월 2일 수요일 오후 5시
<br/>
* 티켓 예매 방법
1. 언플러그드 라운지 프로필 링크트리 접속
(https://linktr.ee/unplugged_lounge)
2. 04-03(목) PM 8:00 / [Rainlight - HIMINN, 기쿠하시] 클릭
3. 구글폼 작성 및 제출
4. 입금
5. 예매 확정 안내 문자 수신
<br/>
* 자세한 사항은 구글폼을 참고해주세요
* 공연 관련 문의 : 인스타그램 @nnoots_ DM`,
  },
];

export default function News() {
  return (
    <section className="wrapper w-full min-h-[calc(100dvh-8rem)] overflow-x-hidden !mx-auto flex justify-center border-1">
      <div className="inner border-1 flex-grow-0 w-full overflow-hidden flex flex-col !pt-10 items-start justify-between ">
        <ul>
          {_.map(newsMockData, (news) => (
            <li>
              <div
                className="w-screen h-64 overflow-hidden flex items-end justify-start cursor-pointer hover:opacity-95 duration-150 hover:[&_>span]:opacity-100"
                style={{
                  backgroundImage: `url(${news.img})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                <span className="!text-white text-xl bg-[#000] opacity-80 border-l-2 border-[#666] !p-3 !m-3">
                  {news.title}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
