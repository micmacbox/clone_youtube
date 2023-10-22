import koLocale from "timeago.js/lib/lang/ko";
import { format, register } from "timeago.js";

register("ko", koLocale);

export function formatAgo(date: string, lang = "en_US") {
  return format(date, lang);
}
