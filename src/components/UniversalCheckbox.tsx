import React, {ChangeEvent, useCallback} from 'react';
import Checkbox from "@mui/material/Checkbox";

type CheckboxesType = {
	checked:boolean,
	changeBox: (event: boolean) => void
}

const UniversalCheckbox:React.FC<CheckboxesType> = React.memo(({checked, changeBox}) => {

	const onChangeCallback = useCallback((e:ChangeEvent<HTMLInputElement>) => {
		changeBox(e.currentTarget.checked)
	},[changeBox])

	return (
			<Checkbox color="primary" onChange={onChangeCallback} checked={checked}/>
	);
});

export default UniversalCheckbox;
