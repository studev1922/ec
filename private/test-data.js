export default {
    users: [
        { name: 'Owner on System', username: 'owner', password: '123' },
        { name: 'Admin on System', username: 'amdin', password: '123' },
        { name: 'Staff on System', username: 'staff', password: '123' },
        { name: 'Customer on System', username: 'customer', password: '123' },
        { name: 'Guest on System', username: 'guest', password: '123' },
    ],
    roles: [
        { r_name: 'OWNER' },
        { r_name: 'ADMIN' },
        { r_name: 'STAFF' },
        { r_name: 'CUSTOMER' },
        { r_name: 'GUEST' },
    ],
    authorities: [
        { u_id: 1, r_id: 1 },
        { u_id: 1, r_id: 2 },
        { u_id: 1, r_id: 3 },
        { u_id: 1, r_id: 4 },
        { u_id: 1, r_id: 5 },

        { u_id: 2, r_id: 2 },
        { u_id: 2, r_id: 3 },
        { u_id: 2, r_id: 4 },
        { u_id: 2, r_id: 5 },

        { u_id: 3, r_id: 3 },
        { u_id: 3, r_id: 5 },

        { u_id: 4, r_id: 4 },
        { u_id: 4, r_id: 5 },
    ],
    categories: [
        { cg_name: 'Khác' },
        { cg_name: 'Táo' },
        { cg_name: 'Lê' },
        { cg_name: 'Nho' },
        { cg_name: 'Cam' },
        { cg_name: 'Quýt' },
    ], products: [
        { prd_name: 'Táo Am', prd_salary: 89, cg_pr_id: 2 },
        { prd_name: 'Táo Xanh', prd_salary: 99, cg_pr_id: 2 },
        { prd_name: 'Táo Mật', prd_salary: 99, cg_pr_id: 2 },
        { prd_name: 'Táo Rockit', prd_salary: 99, cg_pr_id: 2 },
        { prd_name: 'Táo Candine', prd_salary: 99, cg_pr_id: 2 },

        { prd_name: 'Lê Sữa Xanh', prd_salary: 79, cg_pr_id: 3 },
        { prd_name: 'Lê Nâu Hàn', prd_salary: 79, cg_pr_id: 3 },
        { prd_name: 'Lê Ông Park', prd_salary: 119, cg_pr_id: 3 },
        { prd_name: 'Lê Hoàng Gia', prd_salary: 79, cg_pr_id: 3 },
        { prd_name: 'Lê Chuẩn Hàn', prd_salary: 119, cg_pr_id: 3 },

        { prd_name: 'Nho Kẹo', prd_salary: 149, cg_pr_id: 4 },
        { prd_name: 'Nho Đen', prd_salary: 169, cg_pr_id: 4 },
        { prd_name: 'Nho Khô', prd_salary: 88, cg_pr_id: 4 },
        { prd_name: 'Nho Ngón Đỏ', prd_salary: 199, cg_pr_id: 4 },
        { prd_name: 'Nho Mẫu Đơn', prd_salary: 430, cg_pr_id: 4 },

        { prd_name: 'Cam Kiếng', prd_salary: 69, cg_pr_id: 5 },
        { prd_name: 'Cam Vitor', prd_salary: 79, cg_pr_id: 5 },
        { prd_name: 'Cam Túi Mật', prd_salary: 69, cg_pr_id: 5 },

        { prd_name: 'Quýt APH', prd_salary: 79, cg_pr_id: 6 },
        { prd_name: 'Quýt Túi Mật', prd_salary: 69, cg_pr_id: 6 },
        { prd_name: 'Quýt Honey', prd_salary: 99, cg_pr_id: 6 },
        { prd_name: 'Quýt Vip', prd_salary: 99, cg_pr_id: 6 },
        { prd_name: 'Quýt 2PH', prd_salary: 189, cg_pr_id: 6 },
    ]
}