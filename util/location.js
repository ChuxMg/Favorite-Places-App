const GOOGLE_API_KEY = "AIzaSyApuVGfGo_09ma_2rIu2TTgQqUiQRUmSS8";

export function getMapPreview(lat, lng) {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=size:mid%7Ccolor:red%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
    return imagePreviewUrl;
}