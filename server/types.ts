import { UUIDTypes } from "uuid";

export interface User {
  userid: UUIDTypes;
  username: string;
  fullname: string;
  email: string;
  passwordHash: string;
  creationDate: Date | null;
  database: string;
}

export interface Friend {
  userid1: UUIDTypes;
  userid2: UUIDTypes;
  friendSinceDate: Date;
}

export interface Post {
  postid: UUIDTypes | null;
  userid: UUIDTypes;
  video: Buffer;
  isLate: boolean;
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
  reactionid: UUIDTypes;
  postid: UUIDTypes;
  userid: UUIDTypes;
  type: ReactionOption;
  timestamp: Date;
}

export interface Notification {
  notificationid: UUIDTypes;
  userid: UUIDTypes;
  sentTimestamp: Date;
  wasDismissed: boolean;
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
  posts = "posts",
  locations = "locations",
  comments = "comments",
  reactions = "reactions",
  notifications = "notifications",
}

export enum DatabaseOption {
  SouthAfrica = "za",
  Brazil = "br",
  UnitedStates = "us",
  Japan = "jp",
  UnitedKingdom = "uk",
  Germany = "de",
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
