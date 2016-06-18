parallel running your tasks

Here is the simple example:
```js
    function createTask() {
      const randomTime = Math.floor(Math.random() * 10000 % 10000);
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

    const pyt = PYT();

    pyt.on('done', (report) => {
      console.log('all task done');
    });

    // parallel running 10 tasks
    pyt.init(tasks, 10);
    pyt.start();
```