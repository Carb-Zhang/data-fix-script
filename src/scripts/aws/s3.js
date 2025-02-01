const AWS = require('aws-sdk');
const fs = require('fs');

// 配置 AWS S3
const s3 = new AWS.S3({
    region: '你的区域',
    accessKeyId: '你的访问密钥',
    secretAccessKey: '你的秘密密钥',
});

// 文件路径和 S3 上传参数
const filePath = '你的文件路径';
const bucketName = '你的桶名称';
const keyName = '上传到 S3 的文件名';

// 创建分块上传
async function multipartUpload() {
    const fileStat = fs.statSync(filePath);
    const fileStream = fs.createReadStream(filePath);

    const multipartUploadParams = {
        Bucket: bucketName,
        Key: keyName,
    };

    const createMultipartUploadResponse = await s3
        .createMultipartUpload(multipartUploadParams)
        .promise();
    const uploadId = createMultipartUploadResponse.UploadId;
    const parts = [];
    const chunkSize = 5 * 1024 * 1024; // 每个分块 5MB

    let partNumber = 1;

    for (let start = 0; start < fileStat.size; start += chunkSize) {
        const end = Math.min(start + chunkSize, fileStat.size);
        const partParams = {
            Bucket: bucketName,
            Key: keyName,
            PartNumber: partNumber,
            UploadId: uploadId,
            Body: fileStream.read(end - start),
        };

        const uploadPartResponse = await s3.uploadPart(partParams).promise();
        parts.push({
            ETag: uploadPartResponse.ETag,
            PartNumber: partNumber++,
        });
        console.log(`上传第 ${partNumber - 1} 个分块成功`);
    }

    // 完成上传
    const completeMultipartUploadParams = {
        Bucket: bucketName,
        Key: keyName,
        UploadId: uploadId,
        MultipartUpload: {
            Parts: parts,
        },
    };

    await s3.completeMultipartUpload(completeMultipartUploadParams).promise();
    console.log('分块上传完成');
}

// 执行上传
multipartUpload().catch(console.error);
