import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const runtime = 'edge';

const S3_BUCKET = process.env.S3_BUCKET!;
const REGION = process.env.AWS_REGION!;

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  const { fileName, fileType } = await req.json();

  const command = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: fileName,
    ContentType: fileType,
    ACL: 'public-read',
  });

  try {
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return NextResponse.json({ signedUrl, url: `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${fileName}` });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
