
# Mr. Gamer Video Uploading Interface

This is a video uploading interface for clients of Mr. Gamer, allowing them to upload video files directly to an AWS S3 bucket. The interface is built using Next.js and the [next-s3-upload](https://next-s3-upload.codingvalue.com/setup) package for seamless integration with AWS S3.

## Features

- Upload video files directly to an S3 bucket.
- Real-time upload progress tracking.
- Simple and intuitive user interface.
- Supports multiple file uploads.
- Only accepts video files for upload.

## Getting Started

### Prerequisites

- Node.js (>= 12.x)
- npm or yarn

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/mrgamer-video-upload.git
    cd mrgamer-video-upload
    ```

2. Install the dependencies:

    ```sh
    npm install
    # or
    yarn install
    ```

3. Set up your environment variables:

    Create a `.env.local` file in the root directory of your project and add your AWS S3 configuration:

    ```env
    S3_UPLOAD_BUCKET=your-s3-bucket-name
    S3_UPLOAD_REGION=your-s3-region
    S3_UPLOAD_KEY=your-aws-access-key-id
    S3_UPLOAD_SECRET=your-aws-secret-access-key
    ```

### Running the Project

To run the project locally, use:

```sh
npm run dev
# or
yarn dev
```

Open your browser and navigate to `http://localhost:3000` to see the interface.

### Building for Production

To build the project for production, use:

```sh
npm run build
# or
yarn build
```

To start the production server, use:

```sh
npm start
# or
yarn start
```

## Project Structure

```
.
├── public
│   ├── next.svg
│   └── vercel.svg
├── src
│   ├── app
│   │   ├── api
│   │   │   └── s3-upload
│   │   │       └── route.ts
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   └── shadcn files
│   └── lib
│   │   └── utils.ts
├── .env.local
├── .eslintrc.json
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

## Usage

1. Navigate to the home page.
2. Click on the "Choose files" button to select video files from your device.
3. The upload progress will be displayed for each file.
4. Once the upload is complete, the file URL will be displayed.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or support, please contact Mr.Gamer at [me@nicklausvega.tech](mailto:me@nicklausvega.tech).
