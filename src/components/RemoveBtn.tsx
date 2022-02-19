import React, {useCallback} from 'react';
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type RemoveBtnPropsType = {
	name: string
	callBack:() => void
}

const RemoveBtn:React.FC<RemoveBtnPropsType> = React.memo(({callBack}) => {

	const onClickHandler = useCallback(() => {
		callBack()
	},[callBack])

	return (
		<IconButton aria-label="delete" onClick={onClickHandler}>
			<Delete />
		</IconButton>
	);
});

export default RemoveBtn;
