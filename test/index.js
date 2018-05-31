
const QiniuSdk = require('../index');

const conf = {
  ak: '6dq3o_p6-n0nh3-StBsjiS7b0SP6us7aJrTrtMZV',
  sk: 'F0xhJzVnCJSePA41IMDG7t8bmggSA6AlVdvosOfJ'
};

const qn = new QiniuSdk(conf);

const uploadConf = {
  bucket: 'neuqst',
  filePrefix: 'code/npm',
  version: '0.0.1',  
  key: 'roxBundle.js',
  localFile: './index.js'
};

// 调用
qn.putFile(uploadConf).then((resp) => {
  console.log(resp);
}).catch((err) => {
  console.log(err);
});

const conf2 = {
  bucket: 'neuqst',  
  key: 'page/152/index.bundle.js'
};
qn.getFileInfo(
  conf2
).then((ret) => {
  console.log('get', ret);
});

qn.removeFile(
  conf2
).then((ret) => {
  console.log('remove', ret);
});