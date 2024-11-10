import env from "../../services/env.js";
import database from "../../services/database.js";
import AIOWizardContext from "./aIOWizardContext.js";
import { delay } from "../../extra/delay.js";
import { Sort } from "../../databases/interfaces/sort.js";
import getRandomId from "../../extra/getRandomId.js";
import { shortenUrl } from "../../utils/sortLink.js";

async function done(ctx: AIOWizardContext) {
  const sortList: { sort: Sort[] } = { sort: [] };
  for (let i = 0; i < 10000; i++) {
    const botUsername = env.botUserName;
    const shareId = getRandomId();
    const link = `https://t.me/${botUsername}?start=${shareId}-eng`;
    const aioShortUrl: string = (await shortenUrl(env.baseUrl, env.sortApiKey, link)) || "";
    sortList.sort.push({ shareId, aioShortUrl });
    await delay(50, 200);
  }
  await database.saveSort(sortList);
  // console.log(await database.removeFirstItem());
}
export { done };
