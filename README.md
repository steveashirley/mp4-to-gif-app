# MP4 to GIF Converter

A simple, privacy-focused web application that converts MP4 video files to GIF format entirely in your browser. No server uploads required - all processing happens locally using FFmpeg.wasm.

## Features

- **Drag & Drop Upload**: Easily drag MP4 files into the browser or use the file picker
- **Quality Presets**: Choose from Low, Medium, or High quality settings
- **Client-Side Processing**: All conversions happen in your browser - files never leave your device
- **Automatic Download**: Converted GIFs download automatically when ready
- **Clean, Minimal UI**: Simple and intuitive interface inspired by Adobe Express
- **Privacy First**: No data collection, no server uploads, no tracking

## Browser Compatibility

The app works best in modern browsers with SharedArrayBuffer support:

- ✅ **Chrome** (recommended)
- ✅ **Firefox**
- ✅ **Edge**
- ⚠️ **Safari** (limited support - may have compatibility issues)

## Quality Settings

### Low Quality (Fast)
- Frame Rate: 10 FPS
- Resolution: 320px width
- File Size: < 2MB
- Best for: Quick conversions, small file sizes

### Medium Quality (Balanced)
- Frame Rate: 15 FPS
- Resolution: 480px width
- File Size: 2-5MB
- Best for: General use, balanced quality and size

### High Quality (Slow)
- Frame Rate: 20 FPS
- Resolution: 640px width
- File Size: 5-10MB
- Best for: Maximum quality, larger file sizes acceptable

## Limitations

- **Maximum file size**: 50MB
- **Supported format**: MP4 only
- **Browser requirements**: Must support SharedArrayBuffer
- **Performance**: Large files may take time to convert

## Local Development

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd mp4-to-gif-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## Technical Details

### Stack

- **Frontend**: React 18
- **Build Tool**: Vite 5
- **Video Processing**: FFmpeg.wasm 0.12
- **Styling**: Custom CSS with clean, minimal design

### How It Works

1. **Upload**: User uploads an MP4 file via drag-drop or file picker
2. **Validation**: File is validated for type (MP4) and size (< 50MB)
3. **Preview**: Video preview is displayed with metadata
4. **Conversion**: Two-pass FFmpeg conversion:
   - Pass 1: Generate optimized color palette for the video
   - Pass 2: Convert to GIF using the palette for better quality
5. **Download**: Converted GIF automatically downloads to user's device
6. **Cleanup**: All temporary files are cleaned up from memory

### Why Two-Pass Conversion?

The app uses a two-pass conversion process for optimal GIF quality:
- First pass generates a color palette optimized for the specific video
- Second pass uses that palette to create higher quality GIFs with better color accuracy
- This produces significantly better results than single-pass conversion

## Deployment

### Recommended Hosting

- **Vercel** (recommended) - Easy CORS header configuration
- **Netlify** - Simple deployment with custom headers
- **GitHub Pages** - Free hosting (may need header workarounds)

### Important: CORS Headers

The app requires these headers for SharedArrayBuffer support:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

These are configured in `vite.config.js` for development. For production, ensure your hosting platform supports these headers.

## Known Issues

- Safari has limited SharedArrayBuffer support and may not work properly
- Very large files (> 30MB) may cause performance issues on lower-end devices
- Progress bar may not be perfectly linear due to FFmpeg's progress reporting

## Privacy & Security

- **No data collection**: We don't collect any user data
- **No server uploads**: All processing happens in your browser
- **No tracking**: No analytics or tracking scripts
- **Open source**: Code is available for review

## License

MIT

## Acknowledgments

- Built with [FFmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm)
- Powered by [React](https://react.dev/) and [Vite](https://vitejs.dev/)
