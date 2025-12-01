import { preloadImages } from "./withImagePreload";

export async function preloadNewsResources(): Promise<void> {
  const { newsData } = await import("./newsData");

  const ITEMS_PER_PAGE = 4;
  const REVERSED_NEWS = [...newsData].slice().reverse();
  const preloadUrls = REVERSED_NEWS.slice(0, ITEMS_PER_PAGE).map(
    (item) => item.image
  );

  await preloadImages(preloadUrls);
}
