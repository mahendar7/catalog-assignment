import PropTypes from 'prop-types';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Box, Button, Skeleton } from '@mui/material';

function Chart({ loading, data = {}, timeRange }) {
    return (
        <Box sx={{ width: '100%', height: 400 }}>
            {loading ? (
                <Skeleton variant='rectangular' width='100%' height='100%' />
            ) : (
                <ResponsiveContainer width='100%' height='100%'>
                    <AreaChart data={data.prices} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id='colorValue' x1='0' y1='0' x2='0' y2='1'>
                                <stop offset='5%' stopColor='#3b82f6' stopOpacity={0.3} />
                                <stop offset='95%' stopColor='#3b82f6' stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey='date' tickFormatter={tick => formatXAxis(tick, timeRange)} />
                        <YAxis domain={[data.minPrice * 0.995, data.maxPrice * 1.005]} tickFormatter={formatYAxis} />
                        <CartesianGrid strokeDasharray='3 3' />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type='monotone' dataKey='value' stroke='#4B40EE' fill='url(#colorValue)' strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </Box>
    );
}

Chart.propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.object,
    timeRange: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Chart;

const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
        return (
            <Button sx={{ px: 3, backgroundColor: 'custom.primary', color: 'custom.white', fontSize: 18 }}>
                {payload[0]?.value.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </Button>
        );
    }

    return null;
};

CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.array,
};

function formatXAxis(timestamp, timeRange) {
    const date = new Date(timestamp);

    switch (timeRange) {
        case '4h':
        case '1d':
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        case '7d':
        case '30d':
            return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
        case '90d':
        case '1y':
            return date.toLocaleDateString([], { month: 'short', year: 'numeric' });
        case 'max':
            return date.getFullYear();
        default:
            return timestamp;
    }
}

const formatYAxis = tick => {
    return tick.toLocaleString('en-US', { maximumFractionDigits: 0 });
};
