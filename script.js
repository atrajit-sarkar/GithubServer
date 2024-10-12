const username = 'gongobongofounder' //write your server github username 
const reponame = 'Stree2'             // Write your server github repo name
const repoURL = `https://api.github.com/repos/${username}/${reponame}/contents/`; // Replace with your GitHub repo details

// Store the initial HTML
const insta_sexy_html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gallery</title>
    <link rel="stylesheet" href="style.css">
    <link rel="apple-touch-icon" sizes="180x180" href="favicon_io">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon_io/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon_io/favicon-16x16.png">
    <link rel="manifest" href="favicon_io/site.webmanifest">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/raw.js/0.7.0/raw.js"></script>
</head>

<body>
    <div class="container">
        <h1>Stree 2 Movie At Krishnanagar Memories</h1>

        <!-- Videos Section -->
        <section class="video-gallery">
            <h2>Videos</h2>
            <div class="contents">
                <!-- Videos are going to be rendered over here -->
            </div>
        </section>

        <!-- Images Section -->
        <section class="image-gallery">
            <h2>Images</h2>
            <div class="contents">

            </div>
        </section>
    </div>
    <script src="script.js"></script>
</body>

</html>`

//Media Data Types
const mediaTypes = {
    "pictures": ['.jpg', '.png'], // Preview Data Types
    "videos": ['.mp4']
}

function togglePassword() {
    var passwordField = document.getElementById('password');
    var passwordIcon = document.querySelector('.toggle-password');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        passwordIcon.textContent = '🙈';
    } else {
        passwordField.type = 'password';
        passwordIcon.textContent = '👁️';
    }
}

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    const submit_btn = document.querySelector("#btn");

    submit_btn.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default form submission
        fetchMedia(); // Call fetchMedia when the button is clicked
    });
});

async function fetchMedia() {
    // Get the token from the password input
    const token = document.querySelector("#password").value;
    try {
        const response = await fetch(repoURL, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
            }
        });
        const data = await response.json();

        if (data.message === "Bad credentials") {
            alert("Wrong token! Try again!");
        } else {
            document.querySelector("html").innerHTML = insta_sexy_html;
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

        }

    } catch (error) {
        console.error('Error fetching media:', error);
    }
}

// Function to set ARW file links after rendering other media
function setARWLinks(data) {
    data.forEach(file => {
        if (file.name.endsWith(".ARW")|| file.name.endsWith(".dng")) {
            var target_a = document.getElementById(`${file.name}`);
            if (target_a) {
                target_a.href = file.download_url; // Set the href only if the element exists
                target_a.download=`${file.name}`
            }
        }
    });
}
