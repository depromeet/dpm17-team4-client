import { NextRequest, NextResponse } from "next/server";
import { getSessionFromServer } from "@/lib/session/index";

/**GET: 세션 데이터 조회*/
export async function GET() {
  try {
    const session = await getSessionFromServer();
    return NextResponse.json(session);
  } catch (error) {
    console.error("세션 조회 실패:", error);
    return NextResponse.json(
      { error: "세션을 조회할 수 없습니다." },
      { status: 500 }
    );
  }
}

/**POST: 세션 데이터 업데이트*/
export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromServer();
    const data = await request.json();

    // 세션 데이터 업데이트
    Object.assign(session, data);
    await session.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("세션 업데이트 실패:", error);
    return NextResponse.json(
      { error: "세션 업데이트에 실패했습니다." },
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
    console.error("세션 삭제 실패:", error);
    return NextResponse.json(
      { error: "세션 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
}
