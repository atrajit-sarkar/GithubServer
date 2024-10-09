const username = 'gongobongofounder' //write your server github username 
const reponame = 'Stree2'             // Write your server github repo name
const repoURL = `https://api.github.com/repos/${username}/${reponame}/contents/`; // Replace with your GitHub repo details

//Media Data Types
const mediaTypes = {
    "pictures": ['.jpg', '.png'], // Preview Data Types
    "videos": ['.mp4']
}

async function fetchMedia() {
    try {
        const response = await fetch(repoURL);
        const data = await response.json();
        const mediaGallery = document.getElementById('media-gallery');
        const videoGalleryContent = document.querySelector(".video-gallery .contents");
        const imageGalleryContent = document.querySelector(".image-gallery .contents");

        data.forEach(file => {
            mediaTypes.pictures.forEach(element => {

                if (file.name.endsWith(element)) {


                    const imagecard = document.createElement("div");
                    imagecard.setAttribute("class", "image-card");
                    imageGalleryContent.appendChild(imagecard);
                    const img = document.createElement('img');
                    const a = document.createElement('a');
                    const baseName = file.name.substring(0, file.name.lastIndexOf('.'));  // Extracts up to the last dot

                    a.href = `https://raw.githubusercontent.com/${username}/${reponame}/main/${baseName}`;
                    img.src = file.download_url;
                    img.alt = file.name;
                    imagecard.appendChild(a);
                    a.appendChild(img);
                    return;

                }
            });


            mediaTypes.videos.forEach(element => {

                if (file.name.endsWith(element)) {
                    const videocard = document.createElement("div");
                    videocard.setAttribute("class", "video-card");
                    videoGalleryContent.appendChild(videocard);
                    const video = document.createElement('video');
                    video.controls = true;
                    video.src = file.download_url;
                    videocard.appendChild(video);
                    return;
                }
            });


        });
    } catch (error) {
        console.error('Error fetching media:', error);
    }
}

fetchMedia();
