const { literal, Op } = require("sequelize");
const db = require("../../models");
const { OKResponse, BadRequestErrorResponse } = require("../global/response");



const getAllCandidates = async (page, perPage) => {
    const candidates = await db.candidate.findAll({
        skip: page * perPage,
        limit: perPage,
    });
    console.log(candidates);
    return new OKResponse("Get all candidates successfully", candidates);
};


const getBySBD = async (sbd) => {
    const candidates = await db.candidate.findOne({
        where: {
            "sbd": sbd
        }
    });
    console.log(candidates);
    return new OKResponse("Get all candidates successfully", candidates);
}


// >=8 points, 8 points > && >=6 points, 6 points > && >= 4 points, < 4 points
const getReport = async () => {
    // Get report
    const report = await db.candidate.findAll({
        attributes: [
            "status",
            [db.Sequelize.fn("count", db.Sequelize.col("status")), "count"],
        ],
        group: ["status"],
    });
    return new OKResponse("Get report successfully", report);
};



const getTopCandidates = async (group, number) => {
    const subjectsByGroup = {
        A: ["toan", "vat_li", "hoa_hoc"],
        A1: ["toan", "vat_li", "ngoai_ngu"],
    };

    // Validate input
    if (!group || !subjectsByGroup[group]) {
        return new BadRequestErrorResponse("Invalid group!");
    }

    if (!Number.isInteger(number) && !number == undefined && !number == null) {
        return new BadRequestErrorResponse("Invalid number!");
    }

    // Default is 10
    if (!number) {
        number = 10;
    }

    // Find top candidates
    const topCandidates = await db.candidate.findAll({
        attributes: [
            "sbd",
            [literal(subjectsByGroup[group].join(" + ")), "total"],
        ],
        limit: number,
        order: [[literal("total"), "DESC"]],
    });

    return new OKResponse("Get top candidates successfully", {
        group: group,
        top: number,
        candidates: topCandidates,
    });
};



module.exports = {
    getAllCandidates,
    getBySBD,
    getReport,
    getTopCandidates,
};
