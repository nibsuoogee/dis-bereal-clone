export interface User {
  userid: number;
  username: string;
  fullname: string;
  email: string;
  passwordHash: string;
  photo: Buffer;
  creationDate: Date;
  continent: string;
}

export interface Friend {
  userid1: number;
  userid2: number;
  friendSinceDate: Date;
}

export interface Post {
  postid: number;
  userid: number;
  video: Buffer;
  isLate: boolean;
  timestamp: Date;
  locationid: number;
}

export interface Location {
  locationid: number;
  latitude: number;
  longitude: number;
}

export interface Comment {
  commentid: number;
  postid: number;
  userid: number;
  text: string;
  timestamp: Date;
}

export interface Reaction {
  reactionid: number;
  postid: number;
  userid: number;
  photo: Buffer;
  timestamp: Date;
}

export interface Notification {
  notificationid: number;
  userid: number;
  sentTimestamp: Date;
  wasDismissed: boolean;
}
