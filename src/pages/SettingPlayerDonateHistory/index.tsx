import { FC, useEffect, useState } from "react";
import IonIcon from "@reacticons/ionicons";
import SidebarSettings from "components/Layout/SidebarSettings";
import { useMutation } from "react-query";
import { getReceivedDonatesRequest } from "api/donates/requests";
import { TDonate, TPagination, TUser } from "types";
import moment from "moment";
import { DATE_FORMAT } from "utils/format";
import { Pagination } from "antd";

const SettingPlayerDonateHistory: FC = () => {
  const [donates, setDonates] = useState<TDonate[]>([]);
  const [pagination, setPagination] = useState<TPagination>({
    limit: 10,
    page: 0,
    totalPages: 0,
    totalResults: 0,
  });

  const { mutate: getReceivedDonates } = useMutation(
    getReceivedDonatesRequest,
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
    getReceivedDonates({
      page: 1,
      limit: pagination.limit,
      populate: "fromUser",
    });
  }, []);

  const onPaginate = (page: number) => {
    getReceivedDonates({
      page: page,
      limit: pagination.limit,
      populate: "fromUser",
    });
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
          <div className="setting__title h5">Received Donate</div>
          <div className="settings_row">
            <div className="table-reponsive">
              <table className="table-latitude">
                <thead>
                  <th>DONATED AT</th>
                  <th>FROM USER</th>
                  <th>AMOUNT</th>
                  <th>MESSAGE</th>
                </thead>
                <tbody>
                  {donates.map((donate, pos: number) => (
                    <tr key={pos}>
                      <td>{moment(donate.createdAt).format(DATE_FORMAT)}</td>
                      <td>{(donate.fromUser as TUser).userName}</td>
                      <td>${donate.amount?.toFixed(2)}</td>
                      <td>{donate.message}</td>
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
        </div>
      </div>
    </>
  );
};

export default SettingPlayerDonateHistory;
