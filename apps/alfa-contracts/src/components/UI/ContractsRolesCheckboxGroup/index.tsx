import React from 'react'
import CheckBoxGroup from 'arui-feather/checkbox-group'
import CheckBox from 'arui-feather/checkbox'

import { ContractsRoles } from './consts'

interface ContractsRolesCheckboxGroup {
  roles: string[]
}

export const ContractsRolesCheckboxGroup: React.FC<
  ContractsRolesCheckboxGroup
> = ({ roles }) => (
  <CheckBoxGroup>
    {Object.entries(ContractsRoles).map(([value, label]) => {
      return (
        <CheckBox
          text={label}
          value={value}
          id={value}
          checked={roles.includes(value)}
        />
      )
    })}
  </CheckBoxGroup>
)
