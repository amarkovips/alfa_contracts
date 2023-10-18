import React, { useEffect, useState, Fragment } from "react";
import Spin from "arui-feather/spin";
import { ArrowUpDownHeavyMIcon } from "@alfalab/icons-glyph/ArrowUpDownHeavyMIcon";
import { IContractor } from "../../../models/contractors";
import { useLazyGetContractorsQuery } from "../../../services/api";
import { Typography } from "@alfalab/core-components/typography";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppSelector";

import styles from "./index.module.scss";
import { setCurrentContractor } from "apps/alfa-contracts/src/store/reducers/contractors";

const ContractorsList = () => {
  const current_contractor = useAppSelector(
    (state) => state.сontractors.current_contractor,
  );
  const filter = useAppSelector((state) => state.сontractors.contractorsFilter);
  const need_refetch = useAppSelector(
    (state) => state.сontractors.need_refetch,
  );

  const dispatch = useAppDispatch();
  const [getContractors, { data, isLoading, isFetching }] =
    useLazyGetContractorsQuery();
  const [contractors, setContractors] = useState<{
    [key: string]: IContractor[];
  }>();

  const [order, setOrder] = useState<boolean>(false);

  const formatContractors = (data?: IContractor[]) => {
    let formatted = {} as { [key: string]: IContractor[] };
    data?.forEach((contractor) => {
      if (formatted.hasOwnProperty(contractor.company_name)) {
        formatted[contractor.company_name].push(contractor);
      } else {
        formatted[contractor.company_name] = [contractor];
      }
    });
    return formatted;
  };

  useEffect(() => {
    getContractors(filter);
  }, []);
  useEffect(() => {
    if (need_refetch) getContractors(filter);
  }, [need_refetch]);

  useEffect(() => {
    setContractors(formatContractors(data) || {});
  }, [data]);

  // const sortNumbers = (data: string) => {
  //   setOrder(!order)
  //   const sorted = [...contractors].sort(
  //     (contractor: IContractor, next: IContractor) =>
  //       order ? contractor[data] - next[data] : next[data] - contractor[data]
  //   )
  //   setContractors(sorted)
  // }

  // const sortStrings = (data: string) => {
  //   setOrder(!order);
  //   const sorted = [...contractors].sort(
  //     (contractor: IContractor, next: IContractor) =>
  //       order
  //         ? ("" + contractor[data]).localeCompare(next[data])
  //         : ("" + next[data]).localeCompare(contractor[data]),
  //   );
  //   setContractors(sorted);
  // };

  if (isLoading || isFetching) return <Spin size="s" visible={true} />;

  if (!contractors)
    return (
      <Typography.TitleResponsive tag="div" view="xsmall">
        Нет доступных договоров
      </Typography.TitleResponsive>
    );
  return (
    <table className={styles["table"]}>
      <thead>
        <tr className={styles["header"]}>
          <th className={styles["col"]}>
            <div className={styles["cell"]}>
              Название компании{" "}
              {/*<ArrowUpDownHeavyMIcon
                className={styles["sort"]}
                onClick={() => sortStrings("company_name")}
              />*/}
            </div>
          </th>
          <th className={styles["col"]}>
            <div className={styles["cell"]}>
              Название банка{" "}
              {/*<ArrowUpDownHeavyMIcon
                className={styles["sort"]}
                onClick={() => sortStrings("bank")}
              />*/}
            </div>
          </th>
          <th className={styles["col"]}>Лицевой счет</th>
          <th className={styles["col"]}>БИК</th>
          <th className={styles["col"]}>КС</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(contractors).map((company_name: string, company_index: number) => 
          contractors[company_name].map((contractor: IContractor, index: number) => (
            <tr
              key={index}
              className={`${styles["row"]} ${
                contractor.bank_details === current_contractor?.bank_details
                  ? styles["selected"]
                  : ""
              }`}
            >
              {index ? null : (
                <td
                  rowSpan={contractors[company_name].length}
                  className={`${styles["col"]} ${styles["first-col"]}`}
                >
                  {company_name}
                </td>
              )}

              <td
                onClick={() => dispatch(setCurrentContractor(contractor))}
                className={styles["col"]}
              >
                {contractor.bank}
              </td>
              <td
                onClick={() => dispatch(setCurrentContractor(contractor))}
                className={styles["col"]}
              >
                {contractor.personal_account}
              </td>
              <td
                onClick={() => dispatch(setCurrentContractor(contractor))}
                className={styles["col"]}
              >
                {contractor.bik}
              </td>
              <td
                onClick={() => dispatch(setCurrentContractor(contractor))}
                className={styles["col"]}
              >
                {contractor.ks}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ContractorsList;
