import { Button, styled } from '@mui/material';

const ButtonWithIcon = styled(Button)(({ theme }) => ({
    backgroundColor: 'custom.white',
    color: theme.palette.text.primary,
    boxShadow: 'none !important',
    textTransform: 'none',
    fontSize: '18px',
}));

export default ButtonWithIcon;
