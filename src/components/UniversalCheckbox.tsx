import React, {ChangeEvent, useCallback} from 'react';
import Checkbox from "@mui/material/Checkbox";

type CheckboxesType = {
	checked:boolean,
	changeBox: (event: boolean) => void
}

const UniversalCheckbox = React.memo((props:CheckboxesType) => {

	const onChangeCallback = useCallback((e:ChangeEvent<HTMLInputElement>) => {
		props.changeBox(e.currentTarget.checked)
	},[props.changeBox])

	return (
			<Checkbox color="primary" onChange={onChangeCallback} checked={props.checked}/>
	);
});

export default UniversalCheckbox;
