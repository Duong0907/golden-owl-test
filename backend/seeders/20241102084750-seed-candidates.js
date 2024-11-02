"use strict";
const fs = require("fs");
const csv = require("csv-parser");
const Candidate = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const results = [];
        const chunkSize = 1000; 
        
        return new Promise((resolve, reject) => {
            const readStream = fs.createReadStream("./dataset/diem_thi_thpt_2024.csv")
                .pipe(csv())
                .on("data", async (data, index) => {
                    if (index == 0) {
                        results.push(data);
                    } else {
                        results.push({
                            sbd: data.sbd,
                            toan: Number(data.toan),
                            ngu_van: Number(data.ngu_van),
                            ngoai_ngu: Number(data.ngoai_ngu),
                            vat_li: Number(data.vat_li),
                            hoa_hoc: Number(data.hoa_hoc),
                            sinh_hoc: Number(data.sinh_hoc),
                            lich_su: Number(data.lich_su),
                            dia_li: Number(data.dia_li),
                            gdcd: Number(data.gdcd),
                            ma_ngoai_ngu: data.ma_ngoai_ngu,
                        });
    
                        // If the chunk reaches the chunkSize, insert and reset tempResults
                        if (results.length === chunkSize) {
                            readStream.pause(); // Pause reading while inserting
    
                            try {
                                await queryInterface.bulkInsert("candidates", results, {});
                                results.length = 0; // Clear the results array
                                readStream.resume(); // Resume reading
                            } catch (error) {
                                console.error("Error inserting chunk:", error);
                                reject(error);
                            }
                        }
                    }
                })
                .on("end", async () => {
                    if (results.length > 0) {
                        try {
                            for (let i = 0; i < results.length; i += chunkSize) {
                                const chunk = results.slice(i, i + chunkSize);
                                await queryInterface.bulkInsert(
                                    "candidates",
                                    chunk,
                                    {}
                                );
                            }
                            resolve();
                        } catch (error) {
                            console.error(error);
                            reject(error);
                        }
                    }
                });
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("candidates", null, {});
    },
};
