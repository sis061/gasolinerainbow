import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      // URL의 code로 세션이 잡히도록 처리(detectSessionInUrl: true)
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (!session) {
        navigate("/login?error=nosession", { replace: true });
        return;
      }

      // allowlist 체크 (테이블 노출 없이, DB 함수로)
      const { data: isAdmin, error } = await supabase.rpc("is_admin_email");

      if (error) {
        // 서버 문제면 보수적으로 퇴출
        await supabase.auth.signOut();
        navigate("/login?error=admincheck", { replace: true });
        return;
      }

      if (!isAdmin) {
        await supabase.auth.signOut();
        navigate("/login?denied=1", { replace: true });
        return;
      }

      // 통과
      navigate("/admin", { replace: true });
    })();
  }, [navigate]);

  return (
    <div className="wrapper min-h-[60dvh] flex items-center justify-center">
      <p className="text-lg">로그인 처리 중…</p>
    </div>
  );
}
