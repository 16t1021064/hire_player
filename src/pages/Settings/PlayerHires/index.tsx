import { FC, useEffect, useState } from "react";
import SettingsLayout from "components/Layout/SettingsLayout";
import { useMutation } from "react-query";
import { getReceivedHiresRequest } from "api/hires/request";
import { THire, TPagination, TUser } from "types";
import moment from "moment";
import { DATE_FORMAT, formatMoney } from "utils/format";
import { Pagination } from "antd";
import { getStepData } from "utils/hires";

const PlayerHires: FC = () => {
  const [hires, setHires] = useState<THire[]>([]);
  const [pagination, setPagination] = useState<TPagination>({
    limit: 10,
    page: 0,
    totalPages: 0,
    totalResults: 0,
  });

  const { mutate: getReceivedHires, status: getReceivedHiresStatus } =
    useMutation(getReceivedHiresRequest, {
      onSuccess: (data) => {
        setHires(data.data.results);
        setPagination({
          ...pagination,
          limit: data.data.limit,
          page: data.data.page,
          totalPages: data.data.totalPages,
          totalResults: data.data.totalResults,
        });
      },
    });

  useEffect(() => {
    getReceivedHires({
      page: 1,
      limit: pagination.limit,
      populate: "customer",
      sortBy: "createdAt:desc",
    });
  }, []);

  const onPaginate = (page: number) => {
    if (getReceivedHiresStatus !== "loading") {
      getReceivedHires({
        page: page,
        limit: pagination.limit,
        populate: "customer",
        sortBy: "createdAt:desc",
      });
    }
  };

  return (
    <SettingsLayout>
      <div className="setting__title h5">Received Hire</div>
      <div className="settings_row">
        <div className="table-reponsive">
          <table className="table-latitude">
            <thead>
              <tr>
                <th>USER</th>
                <th>CREATED AT</th>
                <th>COST</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {hires.map((hire, pos: number) => {
                const stepData = getStepData(hire);
                return (
                  <tr key={pos}>
                    <td>{(hire.customer as TUser).userName}</td>
                    <td>{moment(hire.createdAt).format(DATE_FORMAT)}</td>
                    <td>{formatMoney(hire?.cost || 0)}</td>
                    <td>
                      <span className={`text__${stepData.color} text__bold`}>
                        {stepData.text}
                      </span>
                    </td>
                  </tr>
                );
              })}
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

export default PlayerHires;
