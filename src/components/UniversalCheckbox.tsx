import React, {ChangeEvent} from 'react';
import Checkbox from "@mui/material/Checkbox";

type CheckboxesType = {
	checked:boolean,
	changeBox: (event: boolean) => void
}

const UniversalCheckbox = (props:CheckboxesType) => {

	const onChangeCallback = (e:ChangeEvent<HTMLInputElement>) => {
		props.changeBox(e.currentTarget.checked)
	}

	return (
			<Checkbox color="primary" onChange={onChangeCallback} checked={props.checked}/>
	);
};

export default UniversalCheckbox;
