import { FC, useEffect, useState } from "react";
import { TDonate, TPagination, TUser } from "types";
import { useMutation } from "react-query";
import { getSentDonatesRequest } from "api/donates/requests";
import moment from "moment";
import { DATE_FORMAT, formatMoney } from "utils/format";
import { Pagination } from "antd";
import SettingsLayout from "components/Layout/SettingsLayout";

const UserDonates: FC = () => {
  const [donates, setDonates] = useState<TDonate[]>([]);
  const [pagination, setPagination] = useState<TPagination>({
    limit: 10,
    page: 0,
    totalPages: 0,
    totalResults: 0,
  });

  const { mutate: getSentDonates, status: getSentDonatesStatus } = useMutation(
    getSentDonatesRequest,
    {
      onSuccess: (data) => {
        setDonates(data.data.results);
        setPagination({
          ...pagination,
          limit: data.data.limit,
          page: data.data.page,
          totalPages: data.data.totalPages,
          totalResults: data.data.totalResults,
        });
      },
    }
  );

  useEffect(() => {
    getSentDonates({
      page: 1,
      limit: pagination.limit,
      populate: "toUser",
      sortBy: "createdAt:desc",
    });
  }, []);

  const onPaginate = (page: number) => {
    if (getSentDonatesStatus !== "loading") {
      getSentDonates({
        page: page,
        limit: pagination.limit,
        populate: "toUser",
        sortBy: "createdAt:desc",
      });
    }
  };

  return (
    <SettingsLayout>
      <div className="setting__title h5">Donated List</div>
      <div className="settings_row">
        <div className="table-reponsive">
          <table className="table-latitude">
            <thead>
              <tr>
                <th>DONATED AT</th>
                <th>TO USER</th>
                <th>AMOUNT</th>
                <th>REPLIED MESSAGE</th>
              </tr>
            </thead>
            <tbody>
              {donates.map((donate, pos: number) => (
                <tr key={pos}>
                  <td>{moment(donate.createdAt).format(DATE_FORMAT)}</td>
                  <td>{(donate.toUser as TUser).playerInfo?.playerName}</td>
                  <td>{formatMoney(donate.amount || 0)}</td>
                  <td>{donate.replyMessage}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            current={pagination.page}
            pageSize={pagination.limit}
            total={pagination.totalResults}
            onChange={onPaginate}
          />
        </div>
      </div>
    </SettingsLayout>
  );
};

export default UserDonates;
