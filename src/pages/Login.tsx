import { useAuth } from "@/lib/auth/useAuth";

export default function Login() {
  const { signInWithGoogle, loading, user, signOut } = useAuth();

  return (
    <section className="wrapper w-full min-h-[calc(100dvh-8rem)] overflow-x-hidden !mx-auto flex justify-center max-md:!px-4 !mb-10 md:!mt-10">
      <div className="inner flex-grow-0 w-full min-h-1/2 flex items-center justify-center !p-6 shadow-2xl">
        <div className="flex flex-col min-h-24 w-full max-w-72 bg-white/75 !p-8 gap-4">
          <h1 className="text-xl font-semibold text-center">관리자 로그인</h1>

          {user ? (
            <>
              <p className="text-sm break-all">현재 로그인: {user.email}</p>
              <button
                className="border rounded-md !py-2"
                onClick={() => signOut()}
                disabled={loading}
              >
                로그아웃
              </button>
            </>
          ) : (
            <button
              className="border bg-black !text-white rounded-md !py-2"
              onClick={() => signInWithGoogle()}
              disabled={loading}
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
