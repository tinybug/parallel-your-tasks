'use strict';

const PYT = require('../main');
const logger = require('../logger.js');

describe('test parallel tasks', () => {
  it('should run as expect', (done) => {
    let sumTime = 0;
    function createTask() {
      const randomTime = Math.floor(Math.random() * 10000 % 10000);
      sumTime += randomTime;
      return () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (randomTime > 5000) {
              resolve();
            } else {
              reject(`run error ${randomTime}`);
            }
          }, randomTime);
        });
      };
    }

    const tasks = [];
    for (let i = 0; i < 20; ++i) {
      tasks[i] = createTask();
    }

    logger.info(`sum time: ${sumTime}`);

    const pyt = PYT();

    pyt.on('done', (report) => {
      logger.info(report);
      done();
    });

    pyt.init(tasks, 1);
    pyt.start();
  });
});
