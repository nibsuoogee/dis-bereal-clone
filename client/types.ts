import { UUIDTypes } from "uuid";

export interface User {
  userid: UUIDTypes;
  username: string;
  fullname: string;
  email: string;
  passwordhash: string;
  creationdate: Date | null;
  database: DatabaseOption;
}

export interface Friend {
  userid1: UUIDTypes;
  userid2: UUIDTypes;
  friendsincedate: Date;
}

export interface Post {
  postid: UUIDTypes | null;
  userid: UUIDTypes;
  video: Buffer;
  islate: boolean | null;
  timestamp: Date | null;
  locationid: UUIDTypes | null;
}

export interface Location {
  locationid: UUIDTypes;
  latitude: number;
  longitude: number;
}

export interface Comment {
  commentid: UUIDTypes;
  postid: UUIDTypes;
  userid: UUIDTypes;
  text: string;
  timestamp: Date;
}

export interface Reaction {
  reactionid: UUIDTypes | null;
  postid: UUIDTypes | null;
  userid: UUIDTypes;
  type: ReactionOption;
  timestamp: Date | null;
}

export interface Notification {
  notificationid: UUIDTypes;
  userid: UUIDTypes;
  senttimestamp: Date;
  wasdismissed: boolean;
}

export enum Continents {
  Africa = "Africa",
  Antarctica = "Antarctica",
  Asia = "Asia",
  Europe = "Europe",
  NorthAmerica = "North America",
  Oceania = "Oceania",
  SouthAmerica = "South America",
}

export enum TableOption {
  users = "users",
  friends = "friends",
  notifications = "notifications",
  posts = "posts",
  locations = "locations",
  comments = "comments",
  reactions = "reactions",
}

export enum TableOptionReplicate {
  users = "users",
  posts = "posts",
  locations = "locations",
  comments = "comments",
  reactions = "reactions",
}

export enum TableOptionNoReplicate {
  friends = "friends",
  notifications = "notifications",
}

export enum DatabaseOption {
  "South Africa" = "za",
  "Brazil" = "br",
  "United States" = "us",
  "Japan" = "jp",
  "United Kingdom" = "uk",
  "Germany" = "de",
}

export enum ReactionOption {
  love = "love",
  like = "like",
  haha = "haha",
  wow = "wow",
  angry = "angry",
}

export type ReactionCounts = {
  [key in ReactionOption]: number;
};

export interface DBPayload {
  database: DatabaseOption;
  obj: unknown;
}

export interface FriendRequest {
  userid1: UUIDTypes; // The user who sent the friend request
  userid2: UUIDTypes;
}