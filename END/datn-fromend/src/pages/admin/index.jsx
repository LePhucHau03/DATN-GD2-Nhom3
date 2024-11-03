import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Typography } from 'antd'; // Import Typography
import { Bar, Pie, Line } from '@ant-design/plots';
import {
    callCategoryProductCount,
    callCountUserOrder,
    callFindRevenueStatisticsByMonthAndYear
} from "../../services/api.js";

const AdminPage = () => {
    const [barData, setBarData] = useState([]);
    const [pieData, setPieData] = useState([]);
    const [lineData, setLineData] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0); // State for total revenue

    useEffect(() => {
        const fetchData = async () => {
            try {
                const revenueResponse = await callFindRevenueStatisticsByMonthAndYear();
                if (revenueResponse.statusCode === 200) {
                    const revenueData = revenueResponse.data.map(item => ({
                        month: item.monthYear,
                        value: item.totalRevenue
                    }));
                    setLineData(revenueData);
                    // Set total revenue from the API response
                    setTotalRevenue(revenueResponse.data.reduce((total, item) => total + item.totalRevenue, 0));
                }

                const categoryResponse = await callCategoryProductCount();
                if (categoryResponse.statusCode === 200) {
                    const categoryData = categoryResponse.data.map(item => ({
                        type: item.categoryName,
                        value: item.bookCount
                    }));
                    setBarData(categoryData);
                }

                const userOrderResponse = await callCountUserOrder();
                if (userOrderResponse.statusCode === 200) {
                    const userOrderData = userOrderResponse.data.map(item => ({
                        type: item.email,
                        value: item.value
                    }));
                    setPieData(userOrderData);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Bar chart configuration
    const barConfig = {
        data: barData,
        xField: 'value',
        yField: 'type',
        seriesField: 'type',
        colorField: 'type',
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
    };

    // Pie chart configuration
    const pieConfig = {
        appendPadding: 10,
        data: pieData,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        label: {
            type: 'inner',
            offset: '-30%',
            content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
    };

    // Line chart configuration
    const lineConfig = {
        data: lineData,
        xField: 'month',
        yField: 'value',
        label: {},
        point: {
            size: 5,
            shape: 'diamond',
        },
        smooth: true,
    };

    return (
        <div style={{ padding: '20px' }}>


            <Row gutter={16}>
                <Col span={12}>
                    <Card title="Số sản phẩm thuộc doanh mục (Bar Chart)" bordered={false}>
                        <Bar {...barConfig} />
                    </Card>
                </Col>

                <Col span={12}>
                    <Card title="Số đơn hàng của từng user (Pie Chart)" bordered={false}>
                        <Pie {...pieConfig} />
                    </Card>
                </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: '20px' }}>
                <Col span={24}>
                    <Card title="Doanh thu theo tháng (Line Chart)" bordered={false}>
                        <Line {...lineConfig} />
                    </Card>
                </Col>
            </Row>

            {/* Total Revenue Display */}
            <Card title="Total Revenue" bordered={false} style={{ marginBottom: '20px' }}>
                <Typography.Text style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    Tổng doanh thu: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenue)}
                </Typography.Text>
            </Card>
        </div>
    );
};

export default AdminPage;
