import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth/useAuth";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RequireAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, signOut } = useAuth();
  const [ok, setOk] = useState<null | boolean>(null);
  const [kicked, setKicked] = useState(false);
  const location = useLocation();

  // 1) 권한 체크
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!user) {
        setOk(null);
        return;
      }

      const { data, error } = await supabase.rpc("is_admin_email");

      if (cancelled) return;

      if (error) setOk(false);
      else setOk(!!data);
    })();

    return () => {
      cancelled = true;
    };
  }, [user]);

  // 2) 권한 없으면 로그아웃(한 번만)
  useEffect(() => {
    (async () => {
      if (!user) return;
      if (ok !== false) return;
      if (kicked) return;

      setKicked(true);
      await signOut();
    })();
  }, [user, ok, kicked, signOut]);

  if (loading) {
    return (
      <div className="wrapper min-h-[60dvh] flex items-center justify-center">
        <p>로딩 중…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to={`/login?next=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  if (ok === null) {
    return (
      <div className="wrapper min-h-[60dvh] flex items-center justify-center">
        권한 확인 중…
      </div>
    );
  }

  if (ok === false) {
    return <Navigate to="/login?denied=1" replace />;
  }

  return <>{children}</>;
}
