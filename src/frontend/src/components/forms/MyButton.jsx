import * as React from 'react';
import Button from '@mui/material/Button';

export default function MyButton(props) {
    const {label,type} = props
  return (
      <Button className={'myButton'} type={type} variant="contained">
        {label}
      </Button>
  );
}
