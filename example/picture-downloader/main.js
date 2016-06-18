'use strict';

const PYT = require('../../');
const request = require('request');
const fs = require('fs');
const path = require('path');

const IMGS = [
  'http://img1.imgtn.bdimg.com/it/u=1230236297,263748614&fm=21&gp=0.jpg',
  'http://img4.imgtn.bdimg.com/it/u=1342151702,1451891834&fm=21&gp=0.jpg',
  'http://img2.imgtn.bdimg.com/it/u=4207703728,2669506880&fm=21&gp=0.jpg',
  'http://img0.imgtn.bdimg.com/it/u=2603784783,544614201&fm=21&gp=0.jpg',
  'http://img0.imgtn.bdimg.com/it/u=2688180826,1541383634&fm=21&gp=0.jpg',
  'http://img4.imgtn.bdimg.com/it/u=198098317,3843373275&fm=21&gp=0.jpg',
  'http://img4.imgtn.bdimg.com/it/u=2524624842,3114330962&fm=21&gp=0.jpg',
  'http://img3.imgtn.bdimg.com/it/u=48391954,2454201695&fm=21&gp=0.jpg',
  'http://img1.imgtn.bdimg.com/it/u=1683872507,1523594666&fm=21&gp=0.jpg',
  'http://img1.imgtn.bdimg.com/it/u=7087978,3772371195&fm=21&gp=0.jpg',
  'http://img4.imgtn.bdimg.com/it/u=1896219142,2261703960&fm=21&gp=0.jpg',
  'http://img3.imgtn.bdimg.com/it/u=2487127877,1174022668&fm=21&gp=0.jpg',
  'http://img0.imgtn.bdimg.com/it/u=1705314462,2190107892&fm=21&gp=0.jpg',
  'http://img4.imgtn.bdimg.com/it/u=1987174505,1278559277&fm=21&gp=0.jpg',
  'http://img2.imgtn.bdimg.com/it/u=2690416194,2113958220&fm=21&gp=0.jpg',
  'http://img1.imgtn.bdimg.com/it/u=3956054758,1190232133&fm=21&gp=0.jpg',
  'http://img4.imgtn.bdimg.com/it/u=4159640828,1573268934&fm=21&gp=0.jpg',
  'http://img3.imgtn.bdimg.com/it/u=3119260570,2439349821&fm=21&gp=0.jpg',
  'http://img3.imgtn.bdimg.com/it/u=935971515,577849572&fm=21&gp=0.jpg',
  'http://img5.imgtn.bdimg.com/it/u=1606137071,3320572492&fm=21&gp=0.jpg',
  'http://img1.imgtn.bdimg.com/it/u=7087978,3772371195&fm=21&gp=0.jpg',
  'http://img4.imgtn.bdimg.com/it/u=1896219142,2261703960&fm=21&gp=0.jpg',
  'http://img3.imgtn.bdimg.com/it/u=2487127877,1174022668&fm=21&gp=0.jpg',
  'http://img0.imgtn.bdimg.com/it/u=1705314462,2190107892&fm=21&gp=0.jpg',
  'http://img4.imgtn.bdimg.com/it/u=1987174505,1278559277&fm=21&gp=0.jpg',
  'http://img2.imgtn.bdimg.com/it/u=2690416194,2113958220&fm=21&gp=0.jpg',
  'http://img1.imgtn.bdimg.com/it/u=3956054758,1190232133&fm=21&gp=0.jpg',
  'http://img4.imgtn.bdimg.com/it/u=4159640828,1573268934&fm=21&gp=0.jpg',
  'http://img3.imgtn.bdimg.com/it/u=3119260570,2439349821&fm=21&gp=0.jpg',
  'http://img1.imgtn.bdimg.com/it/u=7087978,3772371195&fm=21&gp=0.jpg',
  'http://img4.imgtn.bdimg.com/it/u=1896219142,2261703960&fm=21&gp=0.jpg',
  'http://img3.imgtn.bdimg.com/it/u=2487127877,1174022668&fm=21&gp=0.jpg',
  'http://img0.imgtn.bdimg.com/it/u=1705314462,2190107892&fm=21&gp=0.jpg',
  'http://img4.imgtn.bdimg.com/it/u=1987174505,1278559277&fm=21&gp=0.jpg',
  'http://img2.imgtn.bdimg.com/it/u=2690416194,2113958220&fm=21&gp=0.jpg',
  'http://img1.imgtn.bdimg.com/it/u=3956054758,1190232133&fm=21&gp=0.jpg',
  'http://img4.imgtn.bdimg.com/it/u=4159640828,1573268934&fm=21&gp=0.jpg',
  'http://img3.imgtn.bdimg.com/it/u=3119260570,2439349821&fm=21&gp=0.jpg',
  'http://img1.imgtn.bdimg.com/it/u=7087978,3772371195&fm=21&gp=0.jpg',
  'http://img4.imgtn.bdimg.com/it/u=1896219142,2261703960&fm=21&gp=0.jpg',
  'http://img3.imgtn.bdimg.com/it/u=2487127877,1174022668&fm=21&gp=0.jpg',
  'http://img0.imgtn.bdimg.com/it/u=1705314462,2190107892&fm=21&gp=0.jpg',
  'http://img4.imgtn.bdimg.com/it/u=1987174505,1278559277&fm=21&gp=0.jpg',
  'http://img2.imgtn.bdimg.com/it/u=2690416194,2113958220&fm=21&gp=0.jpg',
  'http://img1.imgtn.bdimg.com/it/u=3956054758,1190232133&fm=21&gp=0.jpg',
  'http://img4.imgtn.bdimg.com/it/u=4159640828,1573268934&fm=21&gp=0.jpg',
  'http://img3.imgtn.bdimg.com/it/u=3119260570,2439349821&fm=21&gp=0.jpg',
  'http://img1.imgtn.bdimg.com/it/u=7087978,3772371195&fm=21&gp=0.jpg',
  'http://img4.imgtn.bdimg.com/it/u=1896219142,2261703960&fm=21&gp=0.jpg',
  'http://img3.imgtn.bdimg.com/it/u=2487127877,1174022668&fm=21&gp=0.jpg',
  'http://img0.imgtn.bdimg.com/it/u=1705314462,2190107892&fm=21&gp=0.jpg',
  'http://img4.imgtn.bdimg.com/it/u=1987174505,1278559277&fm=21&gp=0.jpg',
  'http://img2.imgtn.bdimg.com/it/u=2690416194,2113958220&fm=21&gp=0.jpg',
  'http://img1.imgtn.bdimg.com/it/u=3956054758,1190232133&fm=21&gp=0.jpg',
  'http://img4.imgtn.bdimg.com/it/u=4159640828,1573268934&fm=21&gp=0.jpg',
  'http://img3.imgtn.bdimg.com/it/u=3119260570,2439349821&fm=21&gp=0.jpg',
];

(function () {
  const picpath = path.join(__dirname, 'pictures');
  if (!fs.existsSync(picpath)) {
    fs.mkdirSync(picpath);
  }

  let picid = 0;
  function createTask(url) {
    return () => {
      return new Promise((resolve, reject) => {
        const req = request({ url, headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5)' +
          ' AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
        }, })
          .on('response', (response) => {
            if (response.statusCode >= 400) {
              return reject(response.statusMessage);
            }

            req.pipe(fs.createWriteStream(path.join(picpath, `${++picid}.jpg`)))
              .on('error', (error) => {
                reject(error);
              })
              .on('close', () => {
                resolve();
              });
          })
          .on('error', (error) => {
            reject(error);
          });
      });
    };
  }

  const tasks = IMGS.map((url) => {
    return createTask(url);
  });

  const pyt = new PYT();
  pyt.init(tasks, 20);
  pyt.start();
  pyt.on('done', (report) => {
    console.log(report);
  });
})();
