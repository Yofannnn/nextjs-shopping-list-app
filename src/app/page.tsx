import BlurFade from "@/components/ui/blur-fade";
import FadeText from "@/components/ui/fade-text";
import WordPullUp from "@/components/ui/word-pull-up";
import { Card, CardBody } from "@nextui-org/react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Multiple Shopping Lists",
    desc: "Allows users to create and manage multiple distinct shopping lists, or 'containers,' for different purposes. Each list is independent, making it easy to organize and track different shopping needs.",
  },
  {
    title: "Track Total Spending",
    desc: "Automatically calculates and tracks the total cost of all items in the shopping list, helping users manage their budget and keep track of their spending.",
  },
  {
    title: "Undo, Redo, and Trash",
    desc: "Gives users control over their actions by allowing them to undo or redo changes to their shopping list. Deleted items are moved to a 'Trash' before being permanently deleted, preventing accidental removal.",
  },
  {
    title: "AI Shopping Assistant",
    desc: "Powered by Gemini AI, this feature assists users by suggesting or adding items to their shopping list based on responses from the AI, making the list creation process smarter and faster.",
  },
  {
    title: "Customizable Themes and Colors",
    desc: "Offers both dark and light modes, along with customizable color preferences. Users can tailor the app’s appearance by choosing their preferred theme and color scheme.",
  },
  {
    title: "Flexible Currency Formatting",
    desc: "Allows users to select their preferred currency format, making the app flexible for use in different regions with varying currency standards.",
  },
  {
    title: "Offline Access with Local Memory",
    desc: "Enables offline functionality by storing data in IndexedDB, local storage, or session storage. Users can access and manage their shopping list even without an internet connection.",
  },
  // {
  //   title: "Real-time Sync Across Devices", // New suggested feature
  //   desc: "Synchronizes the shopping list in real-time across multiple devices, ensuring that users can access and update their list from anywhere with a consistent experience.",
  // },
];

export default function Home() {
  return (
    <>
      <div className="mb-[68vh] bg-background">
        <div className="w-full h-svh flex flex-col justify-center items-center gap-4 p-3 md:p-4">
          <FadeText
            text="NEXCART"
            once={true}
            className="syncopate text-5xl md:text-7xl lg:text-9xl font-bold"
          />
          <WordPullUp
            words="The best way to manage your shopping list"
            once={true}
            className="inter text-sm md:text-base lg:text-xl"
          />
          <div className="flex justify-center items-center gap-2 mt-10">
            <BlurFade delay={0.4} once={true}>
              <Link
                href="/create"
                className="inter px-5 py-2 lg:px-8 lg:py-4 text-xs md:text-sm lg:text-base bg-foreground text-background rounded-full inline-flex items-center justify-center group"
              >
                Get Started
                <ChevronRight className="size-3 md:size-4 lg:size-5 group-hover:translate-x-1 transition-all duration-500" />
              </Link>
            </BlurFade>
            <BlurFade delay={0.4} once={true}>
              <Link
                href="/ai"
                className="inter px-5 py-2 lg:px-8 lg:py-4 text-xs md:text-sm lg:text-base hover:bg-muted rounded-full inline-flex items-center justify-center group"
              >
                Try Gemini Ai
                <ChevronRight className="size-3 md:size-4 lg:size-5 group-hover:translate-x-1 transition-all duration-500" />
              </Link>
            </BlurFade>
          </div>
        </div>
        {/* second section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 lg:gap-8 px-6 lg:px-10 py-20">
          <div className="col-span-1 w-full h-fit overflow-hidden flex justify-center items-center order-2 md:order-[-1]">
            <BlurFade className="rounded-xl lg:rounded-3xl overflow-hidden w-full">
              <Image
                src="/dummy-img.jpg"
                width={400}
                height={400}
                alt="image"
                className="w-full h-fit"
              />
            </BlurFade>
          </div>
          <div className="col-span-1">
            <BlurFade delay={0.2} blur="0px">
              <h2 className="syne text-center md:text-start text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
                What is <span className="syncopate">NEXCART</span>
              </h2>
            </BlurFade>
            <BlurFade delay={0.4} blur="0px">
              <p className="inter text-sm lg:text-base text-muted-foreground">
                <span className="syncopate font-semibold">NEXCART</span> is web application
                built with Next.js and styled using NextUI and UI Shadcn,
                provides a comprehensive shopping list management tool.
                Developed in TypeScript, it allows users to add, delete, update,
                and view shopping items, with data stored in IndexedDB. The app
                supports dark and light themes, various sorting methods, and
                currency format settings for international users. It also
                includes undo-redo functionality and a trash bin for safely
                managing deleted items. A notable feature is the integration
                with Gemini AI, which enables users to add items to their
                shopping list directly from Gemini AI responses, enhancing the
                list management experience. The app&apos;s user-friendly
                interface and diverse customization options are further
                supported by Redux for efficient state management.
              </p>
            </BlurFade>
          </div>
        </div>
        {/* third section */}
        <div className="w-full px-6 lg:px-10 py-14">
          <div className="flex flex-col justify-center items-center gap-5">
            <BlurFade blur="0px">
              <h2 className="syne text-3xl md:text-4xl lg:text-5xl font-semibold">
                Product features
              </h2>
            </BlurFade>
            <BlurFade
              blur="0px"
              delay={0.25}
              className="w-full md:w-4/5 lg:w-3/5"
            >
              <p className="inter text-sm lg:text-base text-muted-foreground text-center">
                Discover an extensive suite of robust tools and functionalities
                thoughtfully designed to enhance your interactions on our
                platform.
              </p>
            </BlurFade>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
            {features.map((feature, index) => (
              <BlurFade
                key={index}
                delay={0.3 + index * 0.07}
                blur="0px"
                className="col-span-1"
              >
                <Card>
                  <CardBody className="p-5 min-h-[200px] lg:min-h-[230px]">
                    <h6 className="syne text-lg lg:text-xl font-semibold leading-5 mb-3">
                      {feature.title}
                    </h6>
                    <p className="inter text-sm lg:text-base text-muted-foreground">
                      {feature.desc}
                    </p>
                  </CardBody>
                </Card>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
      <footer className="-z-10 fixed bottom-0 w-full h-[70vh] overflow-hidden flex justify-center items-center">
        <h1 className="syncopate text-[11vmax] md:text-[17vmax] font-extrabold">
          NEXCART
        </h1>
        <Link href="https://yofann.vercel.app" className="fixed bottom-3 group">
          <pre className="text-sm md:text-base lg:text-lg group-hover:underline">
            Developed by Yofan
          </pre>
        </Link>
      </footer>
    </>
  );
}
