const candidateService = require("../services/candidate.service");

const getAllCandidates = async (req, res) => {
    try {
        const page = req.query.page;
        const perPage = req.query.perPage;

        // 100 candidates
        const response = await candidateService.getAllCandidates(page, perPage);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBySBD = async (req, res) => {
    try {
        const sbd = req.params.sbd;
        const response = await candidateService.getBySBD(sbd);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getReport = async (req, res) => {
    try {
        const response = await candidateService.getReport();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getTopCandidates = async (req, res) => {
    try {
        const groupName = req.query.group;
        const number = req.query.number;
        const response = await candidateService.getTopCandidates(groupName, number);

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllCandidates,
    getBySBD,
    getReport,
    getTopCandidates,
};
