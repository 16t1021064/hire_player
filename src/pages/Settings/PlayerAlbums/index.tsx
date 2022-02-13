import { FC, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { useMutation } from "react-query";
import { removeImagesRequest, uploadImagesRequest } from "api/players/request";
import { Col, Row, Upload } from "antd";
import Gallery, { TPhoto, TPhotoData } from "components/Gallery";
import { setUserInfo } from "store/ducks/auth/slice";
import SettingsLayout from "components/Layout/SettingsLayout";
import Button from "components/Button";
import { notifyDanger, notifySuccess } from "utils/notify";

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
        notifySuccess("Remove images success");
      },
    });

  const removeImages = () => {
    const filters = dataItems.filter((d) => d.selected === true);
    if (filters.length <= 0) {
      notifyDanger("No images selected");
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

  const maxCount = useMemo(() => {
    return 15 - (userInfo?.playerInfo?.images || []).length;
  }, [userInfo]);

  return (
    <SettingsLayout>
      <form className="setting__form">
        <div className="setting__title h5">Albums Player</div>
        <div className="setting__btns">
          <div className="setting__loading">
            <Upload
              beforeUpload={beforeUpload}
              accept="image/*"
              showUploadList={false}
              maxCount={maxCount}
              multiple
              disabled={
                uploadImagesStatus === "loading" ||
                isMax ||
                removeImagesStatus === "loading"
              }
            >
              <Button type="blue" size="small">
                Upload images
              </Button>
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
                <Button type="gray" onClick={turnoffSelectMode}>
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
    </SettingsLayout>
  );
};

export default PlayerAlbums;
