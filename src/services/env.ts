import "dotenv/config";

const env = process.env;
const token = env.BOT_TOKEN;

const dbAIOChannelId = Number(env.DB_AIO_CHANNEL_ID);
const dbPosterLink = env.DB_POSTER_LINK;
const dbPosterID = Number(env.DB_POSTER_ID);
const channelSource = Number(env.CHANNEL_SOURCE_ID);
const channel = Number(env.LEECH_CHANNEL_ID);

const channelSourceLink = env.CHANNEL_SOURCE_LINK;

const development = env.DEVELOPMENT;
const webhookDomain = env.WEBHOOK_DOMAIN;
const otherDomain = env.OTHER_DOMIAN || "";
const apiId = env.API_ID || "";
const apiHash = env.API_HASH || "";
const session = env.SESSION_ID || "";

const botUserName = env.BOT_USERNAME;
const port = env.PORT || 8080;
const forceChannelIds = env.FORCE_CHANNEL_IDS?.split(" ").map(Number) || [];
const forceGroupIds = env.FORCE_GROUP_IDS?.split(" ").map(Number) || [];
const allowGroups = env.ALLOW_GROUPS?.split(" ").map(Number) || [];
const adminIds = env.ADMIN_IDS?.split(" ").map(Number);
const databaseUrl = env.DATABASE_URL;
const join = env.JOIN || "";
const backup = env.BACKUP || "";
const request = env.REQUEST || "";
const joinAnime = env.JOIN_ANIME || "";
const collectionAIO = Number(env.COLLECTION_AIO) || "";
const baseUrl = env.BASE_URL || "";
const sortApiKey = env.SORT_API_KEY || "";
const botTokens = process.env.BOTS_API?.split(" ").map((botApi) => botApi.trim());

const imgNxtFileSourceChannel = Number(env.IMAGE_NEXT_FILE_SOURCE_CHANNEL);
const imgNxtFileDestiChannel = Number(env.IMAGE_NEXT_FILE_DESTI_CHANNEL);
const imgNxtFileCollection = Number(env.IMAGE_NEXT_FILE_COLLECTION);
const userId = Number(env.USER_BOT_ID);
if (!token) {
  throw Error("Provide BOT_TOKEN");
}

if (!adminIds) {
  throw Error("Provide ADMIN_IDS");
}
export default {
  sortApiKey,
  baseUrl,
  token,
  channel,
  userId,
  botTokens,
  botUserName,
  dbPosterLink,
  dbPosterID,
  development,
  webhookDomain,
  port,
  channelSourceLink,
  join,
  backup,
  dbAIOChannelId,
  joinAnime,
  collectionAIO,
  channelSource,
  request,
  forceChannelIds,
  allowGroups,
  forceGroupIds,
  adminIds,
  databaseUrl,
  otherDomain,
  apiId,
  apiHash,
  session,
  imgNxtFileCollection,
  imgNxtFileSourceChannel,
  imgNxtFileDestiChannel,
};
