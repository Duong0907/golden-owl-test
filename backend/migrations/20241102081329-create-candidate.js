'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('candidates', {
      sbd: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      toan: {
        type: Sequelize.FLOAT
      },
      ngu_van: {
        type: Sequelize.FLOAT
      },
      ngoai_ngu: {
        type: Sequelize.FLOAT
      },
      vat_li: {
        type: Sequelize.FLOAT
      },
      hoa_hoc: {
        type: Sequelize.FLOAT
      },
      sinh_hoc: {
        type: Sequelize.FLOAT
      },
      lich_su: {
        type: Sequelize.FLOAT
      },
      dia_li: {
        type: Sequelize.FLOAT
      },
      gdcd: {
        type: Sequelize.FLOAT
      },
      ma_ngoai_ngu: {
        type: Sequelize.STRING
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('candidates');
  }
};