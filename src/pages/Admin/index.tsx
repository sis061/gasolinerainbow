import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormNews from "./FormNews";
import FormNotes from "./FormNotes";
import { useAuth } from "@/lib/auth/useAuth";

export default function Admin() {
  const { user, signOut } = useAuth();

  return (
    <section className="wrapper w-full min-h-[calc(100dvh-8rem)] overflow-x-hidden !mx-auto flex justify-center max-md:!px-4 !mb-10 md:!mt-10">
      <div className="inner flex-grow-0 w-full h-full flex items-center justify-center bg-white/75 !p-6 shadow-2xl">
        <div className="flex flex-col items-center justify-center gap-8 w-full h-full">
          <Tabs
            defaultValue="news"
            className="w-full flex flex-col items-center justify-center h-full gap-12"
          >
            <TabsList className="flex gap-4 max-w-48 items-center justify-center">
              <TabsTrigger
                value="news"
                className="!py-1 !px-2 text-lg cursor-pointer"
              >
                소식
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="!py-1 !px-2 text-lg cursor-pointer"
              >
                작가의 말
              </TabsTrigger>
            </TabsList>
            <TabsContent value="news" className="w-full h-full">
              <FormNews />
            </TabsContent>
            <TabsContent value="notes" className="w-full h-full">
              <FormNotes />
            </TabsContent>
          </Tabs>
          <div className="w-full flex justify-end mb-4">
            <button
              className="text-sm underline"
              onClick={() => {
                if (confirm("로그아웃하시겠습니까?")) {
                  signOut();
                }
              }}
            >
              로그아웃 ({user?.email})
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
