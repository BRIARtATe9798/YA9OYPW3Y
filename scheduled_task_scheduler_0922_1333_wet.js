// 代码生成时间: 2025-09-22 13:33:56
const nodeSchedule = require('node-schedule');

// 定时任务调度器类
class ScheduledTaskScheduler {
  // 构造函数
  constructor() {
    // 存储任务的映射表
    this.tasks = {};
  }

  // 添加定时任务
  addTask(taskId, scheduleConfig, taskFunction) {
    try {
      // 检查任务ID是否已存在
      if (this.tasks[taskId]) {
        throw new Error(`Task with ID ${taskId} already exists`);
      }

      // 使用node-schedule的scheduleJob方法来添加任务
      const task = nodeSchedule.scheduleJob(scheduleConfig, taskFunction);

      // 将任务存储到映射表中
      this.tasks[taskId] = task;

      console.log(`Task with ID ${taskId} added successfully`);
    } catch (error) {
      // 错误处理
      console.error(`Error adding task with ID ${taskId}: ${error.message}`);
    }
  }

  // 移除定时任务
  removeTask(taskId) {
    if (this.tasks[taskId]) {
      // 取消任务
      this.tasks[taskId].cancel();

      // 删除映射表中的任务
      delete this.tasks[taskId];

      console.log(`Task with ID ${taskId} removed successfully`);
    } else {
      console.error(`Task with ID ${taskId} does not exist`);
    }
  }

  // 获取所有定时任务
  getTasks() {
    return this.tasks;
  }
}

// 示例任务函数
const exampleTask = () => {
  console.log('Example task is running...');
};

// 创建任务调度器实例
const scheduler = new ScheduledTaskScheduler();

// 添加一个定时任务，每5秒执行一次
scheduler.addTask('exampleTask', '*/5 * * * *', exampleTask);

// 程序结束时，取消所有任务
process.on('exit', () => {
  Object.keys(scheduler.getTasks()).forEach(taskId => {
    scheduler.removeTask(taskId);
  });
});

// 错误处理中间件
process.on('uncaughtException', error => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', reason => {
  console.error('Unhandled Rejection:', reason);
});

module.exports = {
  ScheduledTaskScheduler
};