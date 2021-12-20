import { Col, Row, Spin } from "antd";
import { getReviewsRequest } from "api/reviews/request";
import Pagination, { PaginationProps } from "components/Pagination";
import Rating from "components/Rating";
import { FC, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { TReview } from "types";
import styles from "./index.module.scss";

interface ReviewsProps {
  receiverId: string;
}

const Reviews: FC<ReviewsProps> = ({ receiverId }) => {
  const [pagination, setPagination] = useState<PaginationProps>({
    total: 0,
    current: 1,
    pageSize: 4,
  });
  const [reviews, setReviews] = useState<TReview[]>([]);

  const { mutate: fetch, status: fetchStatus } = useMutation(
    getReviewsRequest,
    {
      onSuccess: (data) => {
        setPagination({
          ...pagination,
          total: data.data.totalResults,
          pageSize: data.data.limit,
          current: data.data.page,
        });
        setReviews([...data.data.results]);
      },
    }
  );

  useEffect(() => {
    fetch({
      limit: pagination.pageSize,
      page: 1,
      receiverId,
      populate: "reviewer:userName,avatar",
    });
  }, []);

  const onPaginate = (page: number) => {
    fetch({
      limit: pagination.pageSize,
      page: page,
      receiverId,
      populate: "reviewer:userName,avatar",
    });
  };

  return (
    <div className={styles.wrapper}>
      <Spin spinning={fetchStatus === "loading"}>
        <Row gutter={[24, 24]}>
          {pagination?.total ? (
            <>
              {reviews.map((review, pos: number) => (
                <Col key={pos} xs={24}>
                  <Rating review={review} />
                </Col>
              ))}
              <Col xs={24}>
                <Pagination
                  {...pagination}
                  align={"right"}
                  onChange={onPaginate}
                />
              </Col>
            </>
          ) : (
            <Col xs={24}>
              <p>No reviews</p>
            </Col>
          )}
        </Row>
      </Spin>
    </div>
  );
};

export default Reviews;
