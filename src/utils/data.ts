export const componentsData = [
  {
    command: "hackerbutton",
    packages: null,
    shadcnPackages:null,
    files: [
      {
        step: 0,
        name: "HackerButton",
        link: "https://raw.githubusercontent.com/taqui-786/mixcnui/main/src/components/uiComponents/HackerButton.tsx",
        type: ".tsx",
      }
    ],
  },
  {
    command: "textrotator",
    packages: null,
    shadcnPackages:null,
    files: [
      {
        step: 0,
        name: "TextRotator",
        link: "https://raw.githubusercontent.com/taqui-786/mixcnui/main/src/components/mdx/TextRotator.tsx",
        type: ".tsx",
      },
      {
        step: 1,
        name: "globals.css",
        link: null,
        type: ".css",

        write: {
          fileName: "globals.css",
          data: `
            //          /* ---------------- Mixcnui components styles --------------------- */
//   /* TEXT ROTATOR STYLES  */
// .animate-text-slide {
//   animation: text-slide 12.5s cubic-bezier(0.83, 0, 0.17, 1) infinite;
// }

// @keyframes text-slide {
//   0%,
//   16% {
//     transform: translateY(0%);
//   }

//   20%,
//   36% {
//     transform: translateY(-16.65%);
//   }

//   40%,
//   56% {
//     transform: translateY(-33.32%);
//   }

//   60%,
//   76% {
//     transform: translateY(-50%);
//   }

//   80%,
//   96% {
//     transform: translateY(-66.65%);
//   }

//   100% {
//     transform: translateY(-83.33%);
//   }
// }
        `,
        },
      },
    ],
  },
  {
    command: "multicarousel",
    packages: ["embla-carousel","embla-carousel-react"],
    shadcnPackages:["button"],
    files: [
      {
        step: 0,
        name: "MultiCarousel",
        link: "https://raw.githubusercontent.com/taqui-786/mixcnui/main/src/components/uiComponents/MultiCarousel.tsx",
        type: ".tsx",
      }
    ],
  }
];
