'use strict';

const EventEmitter = require('events').EventEmitter;
const util = require('util');
const logger = require('./logger');
const _ = require('lodash');
const assert = require('assert-plus');

function PYT() {
  if (!(this instanceof PYT)) {
    return new PYT();
  }

  EventEmitter.call(this);

  this._handleWork();
}

util.inherits(PYT, EventEmitter);

module.exports = PYT;

PYT.prototype.init = function (tasks, parallelCount) {
  assert.arrayOfFunc(tasks, 'tasks');
  assert.number(parallelCount, 'parallelCount');

  this.tasks = _.clone(tasks);
  this.parallelCount = parallelCount > tasks.length ? tasks.length : parallelCount;
  this.tasksReport = new Array(this.tasks.length).fill(0);
  this.tasksReport = this.tasksReport.map((value, index) => {
    return { running: false, finish: false, success: false, err: '' };
  });
};

PYT.prototype._checkDone = function () {
  for (let i = 0; i < this.tasks.length; ++i) {
    if (!this.tasksReport[i].finish) {
      return false;
    }
  }

  return true;
};

PYT.prototype._handleWork = function () {
  this.on('next', (taskId) => {
    if (this._checkDone()) {
      logger.info('all tasks done');

      return this.emit('done', this.tasksReport);
    }

    if (taskId >= this.tasks.length) {
      return;
    }

    if (this.tasksReport[taskId].running
      || this.tasksReport[taskId].finish) {
      return this.emit('next', taskId + 1);
    }

    logger.info(`task ${taskId} start.`);

    this.tasks[taskId]()
      .then(() => {
        logger.info(`task ${taskId} finish and success.`);

        this.tasksReport[taskId].running = false;
        this.tasksReport[taskId].finish = true;
        this.tasksReport[taskId].success = true;

        this.emit('next', taskId + 1);
      })
      .catch((err) => {
        logger.info(`task ${taskId} finish and failure.`);

        this.tasksReport[taskId].running = false;
        this.tasksReport[taskId].finish = true;
        this.tasksReport[taskId].success = false;
        this.tasksReport[taskId].err = err;

        this.emit('next', taskId + 1);
      });

    this.tasksReport[taskId].running = true;
  });
};

PYT.prototype.start = function () {
  for (let i = 0; i < this.parallelCount; ++i) {
    this.emit('next', i);
  }
};
