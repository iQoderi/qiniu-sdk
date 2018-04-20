const qiniu = require('qiniu');

class QiniuSdk {
  constructor(conf) {
    qiniu.conf.ACCESS_KEY = conf.ak;
    qiniu.conf.SECRET_KEY = conf.sk;

    const config = new qiniu.conf.Config();    

    this.formUploader = new qiniu.form_up.FormUploader(config);
    this.putExtra = new qiniu.form_up.PutExtra();
  }

  // 生成上传 token
  uptoken(bucket) {
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: bucket
    });

    return putPolicy.uploadToken();
  }


  /**
   * 上传文件
   * @param {Object} conf
   * @param {String} conf.bucket // 上传文件命名空间，不填使用默认
   * @param {String} conf.key // 上传文件名
   * @param {String} conf.version // 上传文件版本号
   * @param {String} conf.localFile // 上传文件本地路径
   * 
   */
  putFile(conf) {
    const token = this.uptoken(conf.bucket);
    const key = `${conf.version}/${conf.key}`;

    return new Promise((resolve, reject) => {
      this.formUploader.putFile(token, key, conf.localFile, this.putExtra, (respErr, respBody, respInfo) => {
        if (respErr) {
          reject(respErr);
        }

        if (respInfo.statusCode == 200) {
          resolve(respBody);
        } else {
          console.log(respInfo);
          reject(respBody);
        }

      });
    });
  }
};

module.exports = QiniuSdk;
