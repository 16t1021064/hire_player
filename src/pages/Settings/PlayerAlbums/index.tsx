import { FC, useMemo, useState } from "react";
import IonIcon from "@reacticons/ionicons";
import SidebarSettings from "components/Layout/SidebarSettings";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { useMutation } from "react-query";
import { removeImagesRequest, uploadImagesRequest } from "api/players/request";
import { Button, Col, message, Row, Upload } from "antd";
import Gallery, { TPhoto, TPhotoData } from "components/Gallery";
import { setUserInfo } from "store/ducks/auth/slice";

const PlayerAlbums: FC = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [selectMode, setSelectMode] = useState<boolean>(false);
  const [dataItems, setDataItems] = useState<TPhotoData[]>([]);

  const { mutate: uploadImages, status: uploadImagesStatus } = useMutation(
    uploadImagesRequest,
    {
      onSuccess: (data) => {
        setSelectMode(false);
        dispatch(setUserInfo(data.data));
      },
    }
  );

  const beforeUpload = (file: File, files: File[]) => {
    uploadImages({
      id: userInfo?.id || "",
      images: files,
    });
    return false;
  };

  const photos: TPhoto[] = useMemo(() => {
    return (
      userInfo?.playerInfo?.images?.map(
        (image): TPhoto => ({
          src: image.link,
          name: image.filename || "",
        })
      ) || []
    );
  }, [userInfo]);

  const isMax = useMemo(() => {
    return (
      userInfo?.playerInfo?.images && userInfo?.playerInfo?.images?.length >= 15
    );
  }, [userInfo]);

  const turnonSelectMode = () => {
    setSelectMode(true);
  };

  const turnoffSelectMode = () => {
    setSelectMode(false);
  };

  const { mutate: removeImagesMutate, status: removeImagesStatus } =
    useMutation(removeImagesRequest, {
      onSuccess: (data) => {
        setSelectMode(false);
        dispatch(setUserInfo(data.data));
        message.success("Remove images success");
      },
    });

  const removeImages = () => {
    const filters = dataItems.filter((d) => d.selected === true);
    if (filters.length <= 0) {
      message.error("No images selected");
      return;
    }
    if (
      removeImagesStatus !== "loading" &&
      uploadImagesStatus !== "loading" &&
      userInfo?.id
    ) {
      removeImagesMutate({
        id: userInfo.id,
        images: filters.map((filter) => ({
          filename: filter.name,
        })),
      });
    }
  };

  return (
    <>
      <div className="setting__menu__mobile">
        <span className="setting__menu__outline">
          <IonIcon className="icon icon-menu-outline" name="menu-outline" />
        </span>
        <span className="setting__menu__close">
          <IonIcon className="icon icon-close-outline" name="close-outline" />
        </span>
      </div>
      <div className="setting__body">
        <div className="setting__sidebar">
          <SidebarSettings />
        </div>
        <div className="setting__content">
          <form className="setting__form">
            <div className="setting__title h5">Albums Player</div>
            <div className="setting__btns">
              <div className="setting__loading">
                <Upload
                  beforeUpload={beforeUpload}
                  accept="image/*"
                  showUploadList={false}
                  maxCount={15}
                  multiple
                  disabled={
                    uploadImagesStatus === "loading" ||
                    isMax ||
                    removeImagesStatus === "loading"
                  }
                >
                  <button type="button" className="btn btn_blue btn__small">
                    Upload images
                  </button>
                </Upload>
              </div>
              {isMax && (
                <span style={{ lineHeight: "46px" }}>
                  You have already reached max 15 images
                </span>
              )}
            </div>
            <Row justify="end" gutter={[0, 0]}>
              {!selectMode && (
                <Col>
                  <Button type="primary" onClick={turnonSelectMode}>
                    Select images
                  </Button>
                </Col>
              )}
              {selectMode && (
                <>
                  <Col>
                    <Button
                      type="primary"
                      onClick={removeImages}
                      loading={
                        removeImagesStatus === "loading" ||
                        uploadImagesStatus === "loading"
                      }
                      danger
                    >
                      Remove
                    </Button>
                  </Col>
                  <Col>
                    <Button type="default" onClick={turnoffSelectMode}>
                      Unselect images
                    </Button>
                  </Col>
                </>
              )}
            </Row>
            <Gallery
              photos={photos}
              enableSelect={selectMode}
              onChangeData={setDataItems}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default PlayerAlbums;
