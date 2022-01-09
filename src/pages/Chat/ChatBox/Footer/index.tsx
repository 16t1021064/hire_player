import IonIcon from "@reacticons/ionicons";
import {
  createMessageRequest,
  readMessagesRequest,
} from "api/messages/request";
import { useAppSelector } from "hooks/useRedux";
import { TConvertedConversation } from "pages/Chat";
import {
  forwardRef,
  SyntheticEvent,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useMutation } from "react-query";

export interface FooterMethods {
  focus: () => void;
}

interface FooterProps {
  conv: TConvertedConversation;
}

const Footer = forwardRef<FooterMethods, FooterProps>(({ conv }, ref) => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [focusText, setFocusText] = useState<boolean>(false);

  const { mutate: createMessage, status: createMessageStatus } = useMutation(
    createMessageRequest,
    {}
  );

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (
      createMessageStatus !== "loading" &&
      inputRef.current?.value &&
      userInfo
    ) {
      createMessage({
        id: conv.id,
        body: {
          content: inputRef.current.value,
        },
        senderId: userInfo.id,
      });
      inputRef.current.value = "";
    }
  };

  const { mutate: readMessages } = useMutation(readMessagesRequest);

  useEffect(() => {
    readMessages({ id: conv.id });
  }, [focusText]);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
  }));

  return (
    <form className="chat_messenger__foot" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Send a message…"
        className="chat_messenger__input"
        onFocus={() => {
          setFocusText(true);
        }}
        onBlur={() => {
          setFocusText(false);
        }}
        ref={inputRef}
      />
      <button type="submit" className="chat_messenger__btn btn btn_primary">
        Send
      </button>
      <button type="button" className="chat_messenger__smile">
        <IonIcon className="icon icon-happy-outline" name="happy-outline" />
      </button>
    </form>
  );
});

export default Footer;
