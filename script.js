const username = 'Somu6969' //write your server github username 
const reponame = 'Dashami-Scooty'  // Write your server github repo name
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
        const videoGalleryContent = document.querySelector(".video-gallery .contents");
        const imageGalleryContent = document.querySelector(".image-gallery .contents");

        // Render Images and Videos
        data.forEach(file => {
            mediaTypes.pictures.forEach(element => {
                if (file.name.endsWith(element)) {
                    const imagecard = document.createElement("div");
                    imagecard.setAttribute("class", "image-card");
                    imageGalleryContent.appendChild(imagecard);
                    const img = document.createElement('img');
                    const a = document.createElement('a');
                    const baseName = file.name.substring(0, file.name.lastIndexOf('.'));  // Extracts up to the last dot
                    a.setAttribute("id", `${baseName}`);
                    // a.href=file.download_url
                    img.src = file.download_url;
                    img.alt = file.name;
                    imagecard.appendChild(a);
                    a.appendChild(img);
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
                }
            });
        });

        // Call function to set ARW links after media is rendered
        setARWLinks(data)



    } catch (error) {
        console.error('Error fetching media:', error);
    }
}

// Function to set ARW file links after rendering other media
function setARWLinks(data) {
    data.forEach(file => {
        if (file.name.endsWith(".ARW") || file.name.endsWith(".dng")) {
            var target_a = document.getElementById(`${file.name}`);
            if (target_a) {
                target_a.href = file.download_url; // Set the href only if the element exists
                target_a.download=`${file.name}`
            }
        }
    });
}

fetchMedia()
