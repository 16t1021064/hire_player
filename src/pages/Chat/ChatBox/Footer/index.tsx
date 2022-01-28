import IonIcon from "@reacticons/ionicons";
import {
  createMessageRequest,
  readMessagesRequest,
  uploadImagesRequest,
} from "api/messages/request";
import { useAppSelector } from "hooks/useRedux";
import { TConvertedConversation } from "types";
import {
  forwardRef,
  SyntheticEvent,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useMutation } from "react-query";
import { Upload } from "antd";
import styles from "./index.module.sass";
import clsx from "clsx";

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

  const { mutate: createMessage, status: createMessageStatus } =
    useMutation(createMessageRequest);

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

  const { mutate: uploadImages, status: uploadImagesStatus } = useMutation(
    uploadImagesRequest,
    {
      onSuccess: (data) => {
        if (!userInfo) {
          return;
        }
        createMessage({
          id: conv.id,
          senderId: userInfo.id,
          body: {
            attachments: data.data.files,
          },
        });
      },
    }
  );

  const beforeUpload = (file: File) => {
    uploadImages({
      id: userInfo?.id || "",
      images: [file],
    });
    return false;
  };

  return (
    <form
      className={clsx("chat_messenger__foot", styles.wrap)}
      onSubmit={onSubmit}
    >
      <button
        type="button"
        className={clsx("chat_messenger__smile", styles.btnIcon)}
      >
        <IonIcon className="icon icon-happy-outline" name="happy-outline" />
      </button>
      <Upload
        beforeUpload={beforeUpload}
        accept="image/*"
        showUploadList={false}
        maxCount={10}
        multiple
        disabled={
          uploadImagesStatus === "loading" || createMessageStatus === "loading"
        }
        className={styles.btnUploadWrap}
      >
        <button
          type="button"
          className={clsx("chat_messenger__smile", styles.btnUpload)}
        >
          <IonIcon
            className="icon icon-cloud-upload-outline"
            name="cloud-upload-outline"
          />
        </button>
      </Upload>
      <input
        type="text"
        placeholder="Send a message…"
        className={clsx("chat_messenger__input", styles.input)}
        onFocus={() => {
          setFocusText(true);
        }}
        onBlur={() => {
          setFocusText(false);
        }}
        ref={inputRef}
      />
      <button
        type="submit"
        className={clsx(
          "chat_messenger__btn",
          "btn",
          "btn_primary",
          styles.btnSend
        )}
      >
        Send
      </button>
    </form>
  );
});

export default Footer;
