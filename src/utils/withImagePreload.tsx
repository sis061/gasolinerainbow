import React, { type JSX } from "react";

export function preloadImages(urls: string[]): Promise<void> {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve();
          img.onerror = () => resolve(); // 실패해도 resolve
        })
    )
  ).then(() => {});
}

export function withImagePreload<P extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<P>,
  imageUrls: string[]
): React.ComponentType<P> {
  let preloadPromise: Promise<void> | null = null;

  const ComponentWithPreload = (props: P) => {
    if (!preloadPromise) {
      preloadPromise = preloadImages(imageUrls);
      throw preloadPromise;
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithPreload.displayName = `WithImagePreload(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return ComponentWithPreload;
}
