export default function Profile() {
  return (
    <section className="wrapper w-full min-h-[calc(100dvh-8rem)] overflow-x-hidden !mx-auto flex justify-center border-1">
      <div className="inner flex-grow-0 w-full flex items-center justify-center">
        <ul className="w-full flex bg-orange-50 gap-10">
          <li>
            <div className="w-96 h-96 bg-gray-600">
              <img src="" alt="프로필 이미지" className="w-full h-full" />
            </div>
          </li>
          <li className="flex flex-col gap-10 items-start justify-center">
            <h1 className="text-4xl">HIMINN</h1>
            <p>
              여기에 소개글..여기에 소개글..여기에 소개글..여기에 소개글..여기에
              소개글..여기에 소개글..여기에 소개글..여기에 소개글..여기에
              소개글..여기에 소개글..여기에 소개글..여기에 소개글..여기에
              소개글..여기에 소개글..여기에 소개글..
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
