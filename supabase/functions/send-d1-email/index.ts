import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );

  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  console.log("👀 서버가 계산한 내일 날짜:", tomorrow);

  const { data: tomorrowSubs, error } = await supabase
    .from("subscription")
    .select("*")
    .eq("next_billing_date", tomorrow);

  if (error) {
    console.log("🚨 DB 에러:", error);
    return new Response("DB 검색 실패", { status: 500 });
  }

  console.log("📦 찾은 데이터 개수:", tomorrowSubs?.length || 0, "개");

  if (!tomorrowSubs || tomorrowSubs.length === 0) {
    return new Response("보낼 대상이 없습니다!", { status: 200 });
  }

  for (const sub of tomorrowSubs) {
    if (!sub.user_id) continue;

    const { data: userData, error: userError } = await supabase.auth.admin
      .getUserById(sub.user_id);

    const userEmail = userData?.user?.email;

    if (userError || !userEmail) {
      console.log(` ${sub.user_id} 이메일 못 찾음`);
      continue;
    }

    console.log(` ${userEmail}에게 ${sub.service_name} 메일 발송중`);

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "구독핑 봇 <alarm@gudokping.com>",
        to: userEmail,
        subject:
          `[구독핑] 🔔 내일 ${sub.service_name} 서비스가 결제될 예정이에요.`,
        html: `
        <div style="font-family: sans-serif; color: #333;">
        <h3 style="color: #4A90E2;">구독핑 알림</h3>
        <p>안녕하세요! 잊기 쉬운 구독 일정을 챙겨드리는 구독핑입니다.</p>
        <p>내일 <b>${sub.service_name}</b> 서비스의 정기 결제(<b>${Number(sub.price).toLocaleString()}원</b>)가 예정되어 있어 미리 알려드려요.</p>
        <p>혹시 더 이상 이용하지 않는 서비스라면, 오늘 중으로 해당 서비스에서 해지하시기를 권장해 드립니다.</p>
      <br>
      <p style="font-size: 12px; color: #999;">오늘도 스마트한 하루 보내세요!<br>- 구독핑 팀 드림</p>
      </div>
      `,
      }),
    });
    console.log(`✅ 메일 발송 완료!`);
  }

  return new Response("모든 작업 완료!", { status: 200 });
});
