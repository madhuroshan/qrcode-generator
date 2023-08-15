const download = document.querySelector(".download");
const dark = document.querySelector(".dark");
const light = document.querySelector(".light");
const codeContainer = document.querySelector("#code");
const codeText = document.querySelector(".code-text");
const shareBtn = document.querySelector(".share-btn");
const sizes = document.querySelector(".sizes");

dark.addEventListener("input", handleDarkColor);
light.addEventListener("input", handleLightColor);
codeText.addEventListener("input", handleCodeText);
sizes.addEventListener("change", handleSize);
shareBtn.addEventListener("click", handleShare);

const defaultUrl = "https://github.com/madhuroshan";
let colorLight = "#fff",
  colorDark = "#000",
  text = defaultUrl,
  size = 250;

function handleDarkColor(e) {
  colorDark = e.target.value;
  generateCode();
}

function handleLightColor(e) {
  colorLight = e.target.value;
  generateCode();
}

function handleCodeText(e) {
  const url = e.target.value;
  text = url;
  if (!text) {
    text = defaultUrl;
  }
  generateCode();
}

async function generateCode() {
  codeContainer.innerHTML = "";
  new QRCode("code", {
    text,
    height: size,
    width: size,
    colorLight,
    colorDark,
  });
  download.href = await resolveDataUrl();
}

async function handleShare() {
  setTimeout(async () => {
    try {
      const base64url = await resolveDataUrl();
      const blob = await (await fetch(base64url)).blob();
      const file = new File([blob], "QRcode.png", {
        type: blob.type,
      });
    } catch (err) {
      alert("Your Browser didnt support sharing");
    }
  }, 200);
}

function handleSize(e) {
  size = e.target.value;
  generateCode();
}

function resolveDataUrl() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const img = document.querySelector("#code img");
      if (img.currentSrc) {
        resolve(img.currentSrc);
        return;
      }
      const canvas = document.querySelector("canvas");
      resolve(canvas.toDataURL());
    }, 100);
  });
}

generateCode();
