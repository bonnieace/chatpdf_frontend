import AWS from 'aws-sdk';

export async function downloadFromS3(file_key: string): Promise<Buffer | null> {
  try {
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY
    });

    const s3 = new AWS.S3({
      params: {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      },
      region: 'eu-north-1'
    });

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: file_key,
    };

    const obj = await s3.getObject(params).promise();

    if (!obj.Body) {
      throw new Error('S3 object body is empty or undefined.');
    }

    return obj.Body as Buffer;
  } catch (error) {
    console.error(error);
    return null;
  }
}
