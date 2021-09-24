import imageCompression from 'browser-image-compression'

export const isMobile = () =>
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

export async function compressImage(image: File) {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    }
    try {
        const compressedImage = await imageCompression(image, options)
        return compressedImage
    } catch (error) {
        return false
    }
}
