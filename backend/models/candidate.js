"use strict";
module.exports = (sequelize, DataTypes) => {
    const Candidate = sequelize.define(
        "candidate",
        {
            sbd: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
            toan: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            ngu_van: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            ngoai_ngu: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            vat_li: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            hoa_hoc: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            sinh_hoc: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            lich_su: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            dia_li: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            gdcd: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            ma_ngoai_ngu: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            timestamps: false,
        }
    );

    return Candidate;
};
