import { NextRequest, NextResponse } from 'next/server';
import AWS from 'aws-sdk';

export const config = {
  runtime: 'edge',
};

const S3_BUCKET = process.env.S3_BUCKET!;
const REGION = process.env.AWS_REGION!;

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  region: REGION,
});

export async function POST(req: NextRequest) {
  const { fileName, fileType } = await req.json();

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };

  try {
    const signedUrl = await s3.getSignedUrlPromise('putObject', s3Params);
    return NextResponse.json({ signedUrl, url: `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${fileName}` });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
