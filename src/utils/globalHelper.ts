export const renderDiskType = (v: string) => {
  let type;

  switch (v) {
    case "album":
      type = { kr: "앨범", en: "ALBUM" };
      break;
    case "remix":
      type = { kr: "리믹스", en: "REMIX" };
      break;
    case "single":
      type = { kr: "싱글", en: "SINGLE" };
      break;
    case "EP":
      type = { kr: "EP", en: "EP" };
      break;
    case "ost":
      type = { kr: "OST", en: "OST" };
      break;

    default:
      type = { kr: "", en: "" };
      break;
  }
  return type;
};
