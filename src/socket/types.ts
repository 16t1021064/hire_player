import {
  TBodyMessage,
  TConversation,
  TMessage,
  TNotification,
  TUser,
} from "types";

export interface TEventData_StartOnline {
  userId: string;
}

export interface TListenerData_OnStartOnline {
  UsersOnline: any;
}

export interface TListenerData_OnMessages {
  conversation: TConversation;
  body: TBodyMessage;
  sender: TUser;
  latestMessage: TMessage;
}

export type TListenerData_OnConversations = TConversation;

export type TListenerData_OnNotifications = TNotification;
