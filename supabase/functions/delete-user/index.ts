import { createClient } from 'npm:@supabase/supabase-js'

Deno.serve(async (req) => {
  try {
    // 🔐 유저 인증용 (JWT 기반)
    const supabaseUserClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      {
        global: {
          headers: {
            Authorization: req.headers.get('Authorization')!,
          },
        },
      }
    )

    // 현재 로그인 유저 가져오기
    const {
      data: { user },
      error: userError,
    } = await supabaseUserClient.auth.getUser()

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: '인증되지 않은 사용자' }),
        { status: 401 }
      )
    }

    const userId = user.id

    // 🔥 관리자 권한 클라이언트
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // 🔥 유저 삭제
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400 }
      )
    }

    return new Response(
      JSON.stringify({ message: '회원 탈퇴 완료' }),
      { status: 200 }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: '서버 에러' }),
      { status: 500 }
    )
  }
})