import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import { sleep } from '../../utils/tools.js';

// 配置 AWS S3
const s3 = new AWS.S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// 文件路径和 S3 上传参数
const filePath = '4.txt';
const bucketName = 'storehub-development-userfiles';
const keyName = 'carb/' + filePath;
const chunkSize = 5 * 1024 * 1024;

// 创建分块上传
export async function multipartUpload() {
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

    let partNumber = 1;

    for (let start = 0; start < fileStat.size; start += chunkSize) {
        const end = Math.min(start + chunkSize, fileStat.size);
        const partStream = fs.createReadStream(filePath, { start, end: end - 1 });

        const partParams = {
            Bucket: bucketName,
            Key: keyName,
            PartNumber: partNumber,
            UploadId: uploadId,
            // Body: fileStream.read(end - start),
            Body: partStream,
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

export async function mockData(params) {
    // Define the file size in bytes (11MB)
    const fileSize = 3 * 1024 * 1024;

    // Create a buffer with repeated content
    const content = Buffer.alloc(1024, 'a'); // 1KB of 'a'
    const stream = fs.createWriteStream('3.txt');

    // Write content to the file until the desired size is reached
    let written = 0;
    while (written < fileSize) {
        stream.write(content);
        written += content.length;
    }

    stream.end(() => {
        console.log('File 1.txt has been created with size approximately 11MB.');
    });
    await sleep(10 * 1000);
}

async function createMultipartUpload() {
    const params = {
        Bucket: bucketName,
        Key: keyName,
    };
    const response = await s3.createMultipartUpload(params).promise();
    return response.UploadId;
}

async function uploadPart(uploadId, partNum, partStream) {
    const params = {
        Bucket: bucketName,
        Key: keyName,
        PartNumber: partNum,
        UploadId: uploadId,
        Body: partStream,
    };
    return await s3.uploadPart(params).promise();
}

async function upload(keyName, partStream) {
    const params = {
        Bucket: bucketName,
        Key: keyName,
        Body: partStream,
    };
    return await s3.putObject(params).promise();
}

async function managedUploads(keyName, partStream) {
    const params = {
        Bucket: bucketName,
        Key: keyName,
        Body: partStream,
    };
    const options = {partSize: 5 * 1024 * 1024, queueSize: 1};

    return await s3.upload(params, options).promise();
}

async function completeMultipartUpload(uploadId, partETags) {
    const params = {
        Bucket: bucketName,
        Key: keyName,
        UploadId: uploadId,
        MultipartUpload: {
            Parts: partETags,
        },
    };
    return await s3.completeMultipartUpload(params).promise();
}

export async function multipartUploadV2() {
    const fileStats = fs.statSync(filePath);
    const fileSize = fileStats.size;
    const numParts = Math.ceil(fileSize / chunkSize);
    const uploadId = await createMultipartUpload();

    const partETags = [];

    for (let partNum = 1; partNum <= numParts; partNum++) {
        const start = (partNum - 1) * chunkSize;
        const end = Math.min(start + chunkSize, fileSize);
        const partStream = fs.createReadStream(filePath, { start, end: end - 1 });
        const res = await uploadPart(uploadId, partNum, partStream);

        partETags[partNum - 1] = { ETag: res.ETag, PartNumber: partNum };
    }

    // await Promise.all(uploadPromises);

    const result = await completeMultipartUpload(uploadId, partETags);
    console.log('Upload completed successfully:', result);
}

export async function test(params) {
    // const partStream = fs.createReadStream('4.txt');

    // const res1 = await managedUploads('carb/4.txt',partStream);
    // console.log(res1);

    const arr = [1, 2]
    for (const item of arr) {
        await sleep(1000),
        console.log('sleep done')
    }
    // arr.forEach(async() => {
    //     await sleep(1000),
    //     console.log('sleep done')
    // })
    console.log('sleep end')
}
