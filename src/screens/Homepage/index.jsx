import { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Box, Button, ButtonGroup, Container, Stack, Tab, Tabs } from '@mui/material';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import ButtonWithIcon from './components/ButtonWithIcon';
import Chart from './components/Chart';
import PriceHeader from './components/PriceHeader';
import axiosInstance from '../../api/axiosInstance';

const TAB_OPTIONS = ['Summary', 'Chart', 'Statistics', 'Analysis', 'Settings'];

const timeRangeMap = {
    '4h': 1,
    '1d': 1,
    '7d': 7,
    '30d': 30,
    '90d': 90,
    '1y': 365,
    max: 'max',
};

const TIME_RANGES = Object.keys(timeRangeMap);

const reducer = (prevState, nextState) => ({ ...prevState, ...nextState });

const initialState = {
    currentTabIndex: 1,
    currentTimeRange: '7d',
    chartData: {},
};

function Homepage() {
    const [state, setState] = useReducer(reducer, initialState);
    const { currentTabIndex, currentTimeRange, chartData } = state;

    const { data: coinData, isLoading: isCoinDataLoading } = useQuery({ queryKey: ['coinData'], queryFn: () => axiosInstance.get('coins/bitcoin?localization=false') });
    const { isPending: isHistoricalDataPending, mutate: getHistoricalData } = useMutation({
        mutationFn: timeRange => {
            const params = { vs_currency: 'usd', days: timeRangeMap[timeRange], precision: 2 };

            if (['90d', '1y', 'max'].includes(timeRange)) {
                params['interval'] = 'daily';
            }

            return axiosInstance.get(`coins/bitcoin/market_chart?vs_currency=usd&precision=2&days=${timeRange}`);
        },
        onSuccess: response => {
            const prices = response.prices.slice(0, 20).map(entry => ({ date: entry[0], value: entry[1] }));
            const onlyPrices = prices.map(p => p.value);

            const maxPrice = Math.max(onlyPrices);
            const minPrice = Math.min(onlyPrices);

            setState({ chartData: { prices, minPrice, maxPrice } });
        },
    });

    const handleTabChange = (_, newValue) => {
        setState({ currentTabIndex: newValue });
    };

    useEffect(() => {
        getHistoricalData(currentTimeRange);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTimeRange]);

    return (
        <Container sx={{ m: 10 }}>
            <Stack spacing={3}>
                <PriceHeader isLoading={isCoinDataLoading} data={coinData?.market_data} />
                <Box>
                    <Tabs
                        value={currentTabIndex}
                        onChange={handleTabChange}
                        aria-label='basic tabs example'
                        textColor='text.primary'
                        sx={{ '& .MuiTabs-indicator': { height: '3px', backgroundColor: 'custom.primary' } }}>
                        {TAB_OPTIONS.map(tabOption => (
                            <Tab
                                label={tabOption}
                                key={tabOption}
                                sx={{ fontSize: '18px', textTransform: 'none', py: 3, '&.Mui-selected': { fontWeight: 'bold', color: 'text.secondary' } }}
                            />
                        ))}
                    </Tabs>
                    <Stack direction='row' justifyContent='space-between' sx={{ mt: 4 }}>
                        <Stack direction='row' spacing={1}>
                            <ButtonWithIcon startIcon={<OpenInFullOutlinedIcon />}>Fullscreen</ButtonWithIcon>
                            <ButtonWithIcon startIcon={<ControlPointOutlinedIcon />}>Compare</ButtonWithIcon>
                        </Stack>

                        <ButtonGroup variant='outlined' aria-label='Time Range' disableRipple color='text.primary'>
                            {TIME_RANGES.map(timeRange => (
                                <Button
                                    key={timeRange}
                                    sx={{
                                        textTransform: 'none',
                                        fontSize: 18,
                                        border: 'none',
                                        ...(currentTimeRange === timeRange && {
                                            backgroundColor: 'custom.primary',
                                            color: 'custom.white',
                                            px: 2,
                                            borderRadius: '6px !important',
                                        }),
                                    }}
                                    onClick={() => setState({ currentTimeRange: timeRange })}>
                                    {timeRange}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </Stack>

                    <Box sx={{ mt: 1, px: 2 }}>
                        <CustomTabPanel value={currentTabIndex} index={0}>
                            {/* Summary */}
                        </CustomTabPanel>
                        <CustomTabPanel value={currentTabIndex} index={1}>
                            <Chart loading={isHistoricalDataPending} data={chartData} timeRange={currentTimeRange} />
                        </CustomTabPanel>
                        <CustomTabPanel value={currentTabIndex} index={2}>
                            {/* Statistics */}
                        </CustomTabPanel>
                        <CustomTabPanel value={currentTabIndex} index={3}>
                            {/* Analysis */}
                        </CustomTabPanel>
                        <CustomTabPanel value={currentTabIndex} index={4}>
                            {/* Settings */}
                        </CustomTabPanel>
                    </Box>
                </Box>
            </Stack>
        </Container>
    );
}

export default Homepage;

function CustomTabPanel({ children, value, index, ...other }) {
    return (
        <Box role='tabpanel' hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
            {value === index && children}
        </Box>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
