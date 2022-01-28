import { Image } from "antd";
import { FC } from "react";
import { TBodyMessage } from "types";

interface MessageProps {
  body: TBodyMessage;
}

const Message: FC<MessageProps> = ({ body }) => {
  return (
    <div className="messenger__text">
      <div>
        {body.attachments?.map((attachment, pos: number) => (
          <Image
            key={pos}
            src={attachment.link}
            alt={attachment.filename}
            style={{ maxWidth: "100%", maxHeight: "300px" }}
          />
        ))}
      </div>
      <div>{body.content}</div>
    </div>
  );
};

export default Message;
