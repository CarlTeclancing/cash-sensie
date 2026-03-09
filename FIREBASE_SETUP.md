# Firebase Setup Instructions for Profile Image Upload

## Prerequisites
- Firebase project already created at `cash-sensie`
- Firebase Storage bucket enabled

## Setup Steps

### 1. Generate Firebase Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **cash-sensie**
3. Click on the **Settings gear icon** > **Project settings**
4. Go to the **Service accounts** tab
5. Click **Generate new private key**
6. Save the downloaded JSON file

### 2. Configure Backend

You have two options:

#### Option A: Using Service Account File (Recommended for Development)

1. Rename the downloaded JSON file to `firebase-service-account.json`
2. Place it in the `backend/` directory
3. Create a `.env` file in `backend/` directory:

```env
MONGODB_URI=mongodb://localhost:27017
JWT_SECRET=your_jwt_secret_key_here
PORT=4000
FIREBASE_STORAGE_BUCKET=cash-sensie.firebasestorage.app
```

#### Option B: Using Environment Variable (Recommended for Production)

1. Open the downloaded JSON file and copy its entire content
2. Create a `.env` file in `backend/` directory:

```env
MONGODB_URI=mongodb://localhost:27017
JWT_SECRET=your_jwt_secret_key_here
PORT=4000
FIREBASE_STORAGE_BUCKET=cash-sensie.firebasestorage.app
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"cash-sensie",...}
```

Paste the entire JSON content as a single line in the `FIREBASE_SERVICE_ACCOUNT` variable.

### 3. Enable Firebase Storage

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **cash-sensie**
3. Click on **Storage** in the left sidebar
4. Click **Get started**
5. Start in **production mode** or set up security rules as needed

### 4. Security Rules (Optional but Recommended)

Update your Firebase Storage security rules to allow authenticated uploads only through your backend:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /profile-images/{allPaths=**} {
      allow read: if true;  // Public read access for profile images
      allow write: if false; // Only backend can write
    }
  }
}
```

### 5. Install Dependencies

Already installed:
```bash
npm install firebase-admin uuid
```

### 6. Test the Setup

1. Start your backend server
2. Login to the application
3. Go to Settings > Edit Profile
4. Click the camera icon on the profile picture
5. Select an image file
6. The image should upload to Firebase Storage and display in the header

## Troubleshooting

### Error: "Firebase Admin initialization error"
- Make sure the service account file exists or the environment variable is set correctly
- Check that the JSON format is valid

### Error: "Permission denied" on Storage upload
- Ensure the service account has Storage Admin role in Firebase
- Check Firebase Storage security rules

### Error: "Image upload failed"
- Verify the Firebase Storage bucket name is correct
- Check that the image format is supported (png, jpeg, jpg, webp)

## API Endpoints

### Upload Profile Image
```
POST /api/user/upload-image
Headers:
  Authorization: Bearer <token>
  Content-Type: application/json
Body:
  { "image": "data:image/png;base64,..." }
```

### Update Profile (with avatar URL)
```
POST /api/user/update-profile
Headers:
  Authorization: Bearer <token>
  Content-Type: application/json
Body:
  {
    "name": "John Doe",
    "email": "john@example.com",
    "profile": {
      "avatar": "https://storage.googleapis.com/...",
      "address": "...",
      "occupation": "..."
    }
  }
```
