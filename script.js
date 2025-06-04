//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");


const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];


// unknown 

const errorDiv = document.getElementById("error");
const loading = document.getElementById("loading");


function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to download image: ${url}`);
  });
}

function downloadImages() {
  output.innerHTML = "";
  errorDiv.textContent = "";
  loading.style.display = "block";

  const downloadPromises = images.map(imgObj => downloadImage(imgObj.url));

  Promise.all(downloadPromises)
    .then(imgElements => {
      imgElements.forEach(img => output.appendChild(img));
    })
    .catch(err => {
      errorDiv.textContent = err;
    })
    .finally(() => {
      loading.style.display = "none";
    });
}

btn.addEventListener("click", downloadImages);
