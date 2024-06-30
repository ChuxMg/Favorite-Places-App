class Place {
    constructor(title, imageUri, address, location) {
        this.title = title;
        this.imageUri = imageUri;
        this.address = address;
        this.location = location // {lat: 0.675656, lng: 135.6778665}
        this.id = new Date().toString() + Math.random().toString;
    }
}