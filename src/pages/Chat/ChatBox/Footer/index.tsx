import IonIcon from "@reacticons/ionicons";
import {
  createMessageRequest,
  readMessagesRequest,
  uploadImagesRequest,
} from "api/messages/request";
import { useAppSelector } from "hooks/useRedux";
import { TConvertedConversation, TImage } from "types";
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
  const [currentImages, setCurrentImages] = useState<TImage[]>([]);

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
          attachments: currentImages,
        },
        senderId: userInfo.id,
      });
      inputRef.current.value = "";
      setCurrentImages([]);
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

  const countSentFilesRef = useRef<number>(0);
  const countReturnedFilesRef = useRef<number>(0);

  const { mutate: uploadImages, status: uploadImagesStatus } = useMutation(
    uploadImagesRequest,
    {
      onSettled: (data) => {
        countReturnedFilesRef.current++;
        if (countReturnedFilesRef.current === countSentFilesRef.current) {
          setCurrentImages(data?.data.files || []);
          countSentFilesRef.current = 0;
          countReturnedFilesRef.current = 0;
        }
      },
    }
  );

  const beforeUpload = (file: File, files: File[]) => {
    countSentFilesRef.current = files.length;
    uploadImages({
      id: userInfo?.id || "",
      images: files,
    });
    return false;
  };

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
      <Upload
        beforeUpload={beforeUpload}
        accept="image/*"
        showUploadList={false}
        maxCount={10}
        multiple
        disabled={
          uploadImagesStatus === "loading" || createMessageStatus === "loading"
        }
      >
        <button type="button" className="chat_messenger__smile">
          <IonIcon
            className="icon icon-cloud-upload-outline"
            name="cloud-upload-outline"
          />
        </button>
      </Upload>
    </form>
  );
});

export default Footer;
