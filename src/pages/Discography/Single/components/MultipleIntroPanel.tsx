import type { MultipleIntroPanelProps } from "@/types/discography";

const MultipleIntroPanel = ({
  image,
  title,
  year,
}: MultipleIntroPanelProps) => {
  return (
    <ul className="w-full flex items-center gap-10 max-lg:flex-col">
      <li className="bg-gray-600 overflow-hidden w-full md:w-2/3 lg:w-auto">
        <img
          src={image}
          alt="앨범 아트워크"
          className="w-full h-full"
          loading="lazy"
        />
      </li>
      <li className="min-w-full lg:min-w-[45%] flex-grow h-auto flex flex-col gap-6 items-center justify-center [&_*]:!text-white">
        {year && <span className="text-sm">{String(year)} ~</span>}
        <span className="text-3xl md:text-5xl text-center">{title}</span>
      </li>
    </ul>
  );
};

export default MultipleIntroPanel;
