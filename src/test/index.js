import sql from "../model/db/sql-helper.js";
import db from "../model/db/database.js";
import log, { style } from '../utils/log.js';

const { qSelect, qInsert, qUpdate, qDelete } = sql;
const data1 = { cgid: 1, cg_name: 'Khác', cg_create_at: 1709996608 }
const data2 = [
    { cgid: 2, cg_name: 'Táo', cg_create_at: 1709996608 },
    { cgid: 3, cg_name: 'Trái Lê', cg_create_at: 1709996608 },
    { cgid: 4, cg_name: 'Nho', cg_create_at: 1709996608 }
];

const generateUniquePairs = (characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') => {
    const allPairs = [];
    for (let i = 0; i < characters.length; i++) {
        for (let j = i + 1; j < characters.length; j++) {
            allPairs.push(`${characters[i]}${characters[j]}`);
            allPairs.push(`${characters[j]}${characters[i]}`); // Add both orders for uniqueness
        }
    }
    return [...new Set(allPairs)]; // Remove duplicates using Set
};


const generateData = (pairs) => {
    const data = pairs.map(pair => (
        {
            // "prdid": 1,
            "prd_name": pair,
            "prd_salary": Math.random() * (10000 - 0.9) + 0.9,
            "prd_create_at": 1710515526,
            "cg_pr_id": Math.floor(Math.random() * 5) + 1
        }
    ));
    return data;
};

// const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
// const uniquePairs = generateUniquePairs(characters);
// const data = generateData(uniquePairs);
// console.log(data);



