import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

let driveClient: ReturnType<typeof google.drive> | null = null;

export function getDriveClient() {
  if (driveClient) return driveClient;

  const email = process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_DRIVE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !privateKey) {
    throw new Error("Google Drive credentials not configured");
  }

  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: SCOPES,
  });

  driveClient = google.drive({ version: "v3", auth });
  return driveClient;
}

export async function getFileMetadata(fileId: string) {
  const drive = getDriveClient();
  const res = await drive.files.get({
    fileId,
    fields: "id,name,mimeType,thumbnailLink,webViewLink",
  });
  return res.data;
}

export async function getFilePreviewUrl(fileId: string): Promise<string> {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export function extractFileId(url: string): string | null {
  const patterns = [
    /[?&]id=([a-zA-Z0-9_-]+)/,
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /\/open\?id=([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}