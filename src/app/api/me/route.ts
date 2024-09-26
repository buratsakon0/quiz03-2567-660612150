import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Buratsakon Srikhaw",
    studentId: "660612150",
  });
};
