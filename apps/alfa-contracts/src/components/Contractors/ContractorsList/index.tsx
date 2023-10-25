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

  useEffect(() => {
    contractors && dispatch(setCurrentContractor(Object.values(contractors)[0]));
  }, [contractors])

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
          <th className={styles["col"]}>Название компании</th>
          <th className={styles["col"]}>ОГРН</th>
          <th className={styles["col"]}>ИНН</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(contractors).map((company_name: string, index: number) => 
          <tr
            key={index}
            className={`${styles["row"]} ${
              current_contractor && company_name === current_contractor[0].company_name
                ? styles["selected"]
                : ""
            }`}
            onClick={() => dispatch(setCurrentContractor(contractors[company_name]))}
          >
            <td className={styles["col"]}>{company_name}</td>
            <td className={styles["col"]}>{contractors[company_name][0].ogrn}</td>
            <td className={styles["col"]}>{contractors[company_name][0].inn}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ContractorsList;
