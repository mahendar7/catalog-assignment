import PropTypes from 'prop-types';
import { Box, Skeleton, Stack, Typography } from '@mui/material';

function PriceHeader({ isLoading = false, data = {} }) {
    return (
        <Stack spacing={2}>
            <Stack direction='row' alignItems='flex-start' spacing={1}>
                <Typography variant='h1' sx={{ fontSize: 70, color: '#1A243A' }}>
                    {isLoading ? <Skeleton width={200} /> : data.current_price.usd.toLocaleString()}
                </Typography>
                <Box component='span' sx={{ fontSize: 24, color: '#BDBEBF' }}>
                    USD
                </Box>
            </Stack>
            <Typography variant='h4' sx={{ fontSize: 18, color: '#67BF6B' }}>
                {isLoading ? (
                    <Skeleton width={150} />
                ) : (
                    <>
                        + {data.price_change_24h.toLocaleString()} ({data.price_change_percentage_24h.toFixed(2)}%)
                    </>
                )}
            </Typography>
        </Stack>
    );
}

PriceHeader.propTypes = {
    isLoading: PropTypes.bool,
    data: PropTypes.object,
};

export default PriceHeader;
