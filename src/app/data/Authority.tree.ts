export const AUTHORITYTREE = [
    {
        id: 'SC-000', name: '智慧城市', routeLink: 'application', open: true, children: [
            { id: 'SC-001', name: '灾害报警', routeLink: 'application/calamity' },
            { id: 'SC-002', name: '水质监测', routeLink: 'application/water' },
            { id: 'SC-003', name: '电气安全', routeLink: 'application/electrical'},
            { id: 'SC-004', name: '空气质量', routeLink: 'application/air' },
            { id: 'SC-005', name: '智慧照明', routeLink: 'application/light' },
            { id: 'SC-006', name: '窨井管理', routeLink: 'application/cover' },
            { id: 'SC-007', name: '智慧交通', routeLink: 'application/traffic' },
            { id: 'SC-008', name: 'LED控制', routeLink: 'led' }
        ]
    },
    { id: 'DA-000', name: '设备监控', routeLink: 'monitor', open: true },
    {
        id: 'DM-000', name: '设备管理', routeLink: 'device', open: true, children: [
            { id: 'DM-001', name: '设备', routeLink: 'device/devices' },
            { id: 'DM-002', name: '产品', routeLink: 'device/product' },
            { id: 'DM-003', name: '位置', routeLink: 'device/position' }
        ]
    },
    {
        id: 'SM-000', name: '系统管理', routeLink: 'user', open: true, children: [
            { id: 'SM-001', name: '用户管理', routeLink: 'user/admin' },
            { id: 'SM-002', name: '角色管理', routeLink: 'user/right' }
        ]
    }
];