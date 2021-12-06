import { useEffect } from "react";
import { useCookies } from "react-cookie";
export default function Store(
  boardSettings: Object | null,
  lobby: Object | null
) {
  const [sessionCookies, setSessionCookie] = useCookies(["session"]);

  useEffect(() => {
    if (boardSettings) {
      setSessionCookie("session", {boardSettings:boardSettings}, { path: "/" });
    }
    if (lobby) {
        setSessionCookie("session", {lobby:lobby}, { path: "/" })
    }
  }, [boardSettings, lobby]);
}
