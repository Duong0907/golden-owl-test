const { fn } = require("sequelize");
const db = require("../../models");
const { OKResponse, BadRequestErrorResponse } = require("../global/response");

const literal = db.Sequelize.literal;
const Op = db.Sequelize.Op;
const candidateModel = db.candidate;

const getAllCandidates = async (pageString, perPageString) => {
    // Validate input
    let page, perPage;
    try {
        page = parseInt(pageString);
        perPage = parseInt(perPageString);

        if (!(page >= 0 && perPage > 0)) {
            return new BadRequestErrorResponse("Invalid page or perPage!");
        }
    } catch (error) {
        return new BadRequestErrorResponse("Invalid page or perPage!");
    }

    const candidates = await candidateModel.findAll({
        skip: page * perPage,
        limit: perPage,
    });

    if (!candidates) {
        return new BadRequestErrorResponse("No candidate found!");
    }

    return new OKResponse("Get all candidates successfully", candidates);
};

const getBySBD = async (sbd) => {
    const candidates = await candidateModel.findOne({
        where: {
            sbd: sbd,
        },
    });

    if (!candidates) {
        return new BadRequestErrorResponse("Candidate not found!");
    }

    return new OKResponse("Get candidate successfully", candidates);
};

const getCandidateNumberByRange = async (subject, minString, maxString) => {
    // Validate input
    if (!subject) {
        return new BadRequestErrorResponse("Invalid subject!");
    }

    let min, max;
    try {
        min = parseInt(minString);
        max = parseInt(maxString);

        if (!(min >= 0 && max > 0 && min <= max)) {
            return new BadRequestErrorResponse("Invalid range!");
        }
    } catch (error) {
        return new BadRequestErrorResponse("Invalid range!");
    }

    const candidates = await candidateModel.findOne({
        attributes: [[fn("COUNT", "sbd"), "number"]],
        where: {
            [subject]: {
                [Op.gte]: min,
                [Op.lt]: max,
            },
        },
    });

    return new OKResponse(
        "Get candidate number by range successfully",
        Number(candidates.dataValues.number)
    );
};

const getReport = async () => {
    const subjects = [
        "toan",
        "ngu_van",
        "ngoai_ngu",
        "vat_li",
        "hoa_hoc",
        "sinh_hoc",
        "lich_su",
        "dia_li",
        "gdcd",
    ];
    const ranges = [
        { range: [8, 10], status: ">=8" },
        { range: [6, 8], status: ">=6 and <8" },
        { range: [4, 6], status: ">=4 and <6" },
        { range: [0, 4], status: "<4" },
    ];
    const result = {};

    for (let subject of subjects) {
        result[subject] = {};
        for (let range of ranges) {
            const [min, max] = range.range;
            const candidates = await candidateModel.findOne({
                attributes: [[fn("COUNT", "sbd"), "number"]],
                where: {
                    [subject]: {
                        [Op.gte]: min,
                        [Op.lt]: max,
                    },
                },
            });
            console.log(candidates);
            result[subject][range.status] = Number(
                candidates.dataValues.number
            );
        }
    }

    return new OKResponse("Get report successfully", result);
};

const getTopCandidates = async (group, numberString) => {
    const subjectsByGroup = {
        A: ["toan", "vat_li", "hoa_hoc"],
        A1: ["toan", "vat_li", "ngoai_ngu"],
    };

    // Validate input
    if (!group || !subjectsByGroup[group]) {
        return new BadRequestErrorResponse("Invalid group!");
    }

    let number;
    try {
        number = parseInt(numberString);

        if (number <= 0) {
            throw new BadRequestErrorResponse("Invalid number!");
        }
    } catch (error) {
        return new BadRequestErrorResponse("Invalid number!");
    }

    // Default is 10
    if (!number) {
        number = 10;
    }

    // Find top candidates
    const topCandidates = await candidateModel.findAll({
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
    getCandidateNumberByRange,
    getReport,
    getTopCandidates,
};
