$(document).ready(function() {

    function generateQRCode(text) {
        $('.qqr-qrcode').empty(); // Clear previous QR code
        if (text) {
            $('.qqr-qrcode').qrcode({
                text: text,
                width: 200,
                height: 200
            });
        } else {
            alert("Escreva algo para gerar seu QRCode.");
        }
    }

    $('#qqrBtnGenQr').click(function(event) {
        event.preventDefault();
        var text = $('#textInput').val();
        generateQRCode(text);
    });

    $('#qqrBtnQrCurrentUrl').click(function(event) {
        event.preventDefault();
        // Retrieve the current tab's URL
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            var currentURL = tabs[0].url; // Get the URL of the active tab
            generateQRCode(currentURL);
        });
    });

    $('#qqrBtnDownloadQr').click(function(event) {
        event.preventDefault();
        // Create a canvas element to export the QR code
        html2canvas(document.querySelector(".qqr-qrcode")).then(canvas => {
            // Create a link to download the canvas as an image
            var link = document.createElement('a');
            link.download = 'qrcode.png';
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
    });

    // Generate QRCode of the current tab when the document is ready
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var currentURL = tabs[0].url; // Get the URL of the active tab
        generateQRCode(currentURL);
    });
});
