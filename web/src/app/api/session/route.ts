import { type NextRequest, NextResponse } from 'next/server';
import { getSessionFromServer } from '@/lib/session/index';

/**GET: 세션 데이터 조회*/
export async function GET() {
  try {
    const session = await getSessionFromServer();
    const safe = {
      isLoggedIn: !!session.isLoggedIn,
      user: session.user
        ? (({ id, nickname, avatarUrl }) => ({ id, nickname, avatarUrl }))(
            session.user
          )
        : null,
      accessTokenExpiresAt: session.accessTokenExpiresAt ?? null,
    };
    return NextResponse.json(safe, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    console.error('세션 조회 실패:', error);
    return NextResponse.json(
      { error: '세션을 조회할 수 없습니다.' },
      { status: 500 }
    );
  }
}

/**POST: 세션 데이터 업데이트*/
export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromServer();
    const data = await request.json();
    const allowed = (({ user, isLoggedIn }) => ({ user, isLoggedIn }))(
      data ?? {}
    );
    if (typeof allowed.isLoggedIn !== 'undefined') {
      session.isLoggedIn = !!allowed.isLoggedIn;
    }
    if (allowed.user) {
      const minimal = (({ id, nickname, avatarUrl }) => ({
        id,
        nickname,
        avatarUrl,
      }))(allowed.user);
      session.user = minimal;
    }
    await session.save();
    return NextResponse.json(
      { success: true },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('세션 업데이트 실패:', error);
    return NextResponse.json(
      { error: '세션 업데이트에 실패했습니다.' },
      { status: 500 }
    );
  }
}

/**DELETE: 세션 삭제 (로그아웃)*/
export async function DELETE() {
  try {
    const session = await getSessionFromServer();
    session.destroy();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('세션 삭제 실패:', error);
    return NextResponse.json(
      { error: '세션 삭제에 실패했습니다.' },
      { status: 500 }
    );
  }
}
