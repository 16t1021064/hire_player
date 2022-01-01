import { TBodyMessage, TConversation, TMessage, TUser } from "types";

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
