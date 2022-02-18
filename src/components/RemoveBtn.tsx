import React, {useCallback} from 'react';
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type PropsType = {
	name: string
	callBack:() => void
}

const RemoveBtn = React.memo((props:PropsType) => {

	const onClickHandler = useCallback(() => {
		props.callBack()
	},[props.callBack])

	return (
		<IconButton aria-label="delete" onClick={onClickHandler}>
			<Delete />
		</IconButton>
	);
});

export default RemoveBtn;
