export const AUTHORITYTREE = [
    {
        id: 'SC-000', name: '智慧城市', routeLink: 'application', open: true, children: [
            { id: 'SC-001', name: '灾害报警', routeLink: 'application/calamity', children: [
                { id: 'SC-0011', name: '消息记录', routeLink: 'issuedata' },
            ] },
            { id: 'SC-002', name: '水质监测', routeLink: 'application/water' },
            { id: 'SC-003', name: '电气安全', routeLink: 'application/electrical'},
            { id: 'SC-004', name: '空气质量', routeLink: 'application/air', children: [
                { id: 'SC-0041', name: '监测大数据', routeLink: 'airreport' , children: [
                    { id: 'SC-00411', name: '可视化报表', routeLink: 'dashboard' },
                ]},
            ]},
            { id: 'SC-005', name: '智慧照明', routeLink: 'application/light', children: [
                { id: 'SC-0051', name: '策略管理', routeLink: 'strategy' },
            ]},
            { id: 'SC-006', name: '窨井管理', routeLink: 'application/cover', children: [
                { id: 'SC-0011', name: '消息记录', routeLink: 'issuedata' },
            ] },
            { id: 'SC-007', name: '智慧交通', routeLink: 'application/traffic' },
            { id: 'SC-008', name: 'LED控制', routeLink: 'led' },




        ]
    },
    { id: 'DA-000', name: '设备监控', routeLink: 'monitor', open: true },
    {
        id: 'DM-000', name: '设备管理', routeLink: 'device', open: true, children: [
            { id: 'DM-001', name: '设备', routeLink: 'device/devices' , children: [
                { id: 'DM-0010', name: '详情', routeLink: 'device/devices/real-time' },
                { id: 'DM-0011', name: '设备安装日志', routeLink: 'device/devices/install-log' },
                { id: 'DM-0012', name: '设备上下线日志', routeLink: 'device/devices/line-log' },
                { id: 'DM-0013', name: '历史数据', routeLink: 'device/devices/history' },
            ]},
            { id: 'DM-002', name: '产品', routeLink: 'device/product' },
            { id: 'DM-003', name: '位置', routeLink: 'device/position' },
            { id: 'DM-004', name: '行政区域', routeLink: 'device/administration' },
            { id: 'DM-005', name: '道路', routeLink: 'device/road' },
            { id: 'DM-006', name: '安装区域', routeLink: 'device/install' }
        ]
    },
    {
        id: 'SM-000', name: '系统管理', routeLink: 'user', open: true, children: [
            { id: 'SM-001', name: '用户管理', routeLink: 'user/admin' },
            { id: 'SM-002', name: '角色管理', routeLink: 'user/right' }
        ]
    }
];
