import React from "react";
import CheckBoxGroup from "arui-feather/checkbox-group";
import CheckBox from "arui-feather/checkbox";
import styles from "./index.module.scss";

import { ContractsRoles } from "./consts";

interface ContractsRolesCheckboxGroup {
  roles: string[];
}

const handleRole = (e: any) => {
  console.log(e);
};

export const ContractsRolesCheckboxGroup: React.FC<
  ContractsRolesCheckboxGroup
> = ({ roles }) => (
  <div className={styles["elem"]}>
    <div className={styles["label"]}>Роли</div>
    <CheckBoxGroup className={styles["checkBoxGroupCont"]}>
      {Object.entries(ContractsRoles).map(([value, label], index) => (
        <CheckBox
          key={index}
          text={label}
          value={value}
          id={value}
          checked={roles.includes(value)}
          onChange={handleRole}
        />
      ))}
    </CheckBoxGroup>
  </div>
);
