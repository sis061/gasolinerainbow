// import { useEffect, useRef } from "react";
// import { useMediaQuery } from "react-responsive";

// export function useScrollLock(open: boolean) {
//   const scrollYRef = useRef(0);

//   const minLaptop = useMediaQuery({ minWidth: 1024 });

//   useEffect(() => {
//     const scrollBehavior = minLaptop ? "smooth" : "auto";

//     document.documentElement.style.scrollBehavior = scrollBehavior;
//     document.body.style.scrollBehavior = scrollBehavior;

//     if (!minLaptop) return;

//     const body = document.body;

//     if (open) {
//       scrollYRef.current = window.scrollY;
//       body.style.position = "fixed";
//       body.style.top = `-${scrollYRef.current}px`;
//       body.style.left = "0";
//       body.style.right = "0";
//     } else {
//       setTimeout(() => {
//         body.style.position = "";
//         body.style.top = "";
//         body.style.left = "";
//         body.style.right = "";
//         window.scrollTo(0, scrollYRef.current);
//       }, 500); // Drawer 애니메이션 시간에 맞게 조정
//     }
//   }, [open, minLaptop]);
// }
