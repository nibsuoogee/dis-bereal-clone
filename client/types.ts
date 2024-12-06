import { UUIDTypes } from "uuid";

export interface User {
  userid: UUIDTypes;
  username: string;
  fullname: string;
  email: string;
  passwordHash: string;
  creationDate: Date;
  database: string;
}

export interface Friend {
  userid1: UUIDTypes;
  userid2: UUIDTypes;
  friendSinceDate: Date;
}

export interface Post {
  postid: UUIDTypes;
  userid: UUIDTypes;
  video: Buffer;
  isLate: boolean;
  timestamp: Date;
  locationid: UUIDTypes;
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
  type: ReactionType;
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

export enum ReactionType {
  Like = "Like",
  Love = "Love",
  Haha = "Haha",
  Wow = "Wow",
  Sad = "Sad",
  Angry = "Angry",
}
