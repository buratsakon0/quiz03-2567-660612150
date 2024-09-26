import { DB, readDB, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { nanoid } from "nanoid";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  readDB();
  return NextResponse.json({
    ok: true,
    rooms: (<any>DB).rooms,
    totalRooms: (<any>DB).rooms.length
  });
};

export const POST = async (request: NextRequest) => {
  const payload = checkToken();

  if(!payload) {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }

  const body = await request.json();
  const { roomName } = body;
  
  readDB();
  const room = (<any>DB).rooms.find((x: { roomName: any; }) => x.roomName === roomName)

  if(room){
    return NextResponse.json(
      {
        ok: false,
        message: `Room ${roomName} already exists`,
      },
      { status: 400 }
    );
  }


  const roomId = nanoid();
  (<any>DB).rooms.push({
    roomId,
    roomName,
  });

  //call writeDB after modifying Database
  writeDB();

  return NextResponse.json({
    ok: true,
    //roomId,
    message: `Room ${roomName} has been created`,
  });
};
