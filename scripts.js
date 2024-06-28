document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const loading = document.getElementById('loading');

    // URL của API
    const apiUrl = 'https://un-silent-backend-mobile.azurewebsites.net/api/v1/Gallery/GetAllArtworks';

    // Hàm tải hình ảnh từ URL và chuyển đổi thành Blob
    const loadImageAsBlob = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    };


    // Hiển thị phần tử loading
    const showLoading = () => {
        loading.classList.add('active');
    };

    // Ẩn phần tử loading
    const hideLoading = () => {
        loading.classList.remove('active');
    };

    // Gọi API để lấy dữ liệu
    // Gọi API để lấy dữ liệu
    const fetchArtworks = async () => {
        showLoading();
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            for (const artwork of data) {
                // Tạo phần tử HTML cho mỗi artwork
                const artworkElement = document.createElement('div');
                artworkElement.classList.add('artwork');

                const imageElement = document.createElement('img');
                
                // Chuyển đổi URL hình ảnh thành Blob và sử dụng URL.createObjectURL
                const imageUrl = await loadImageAsBlob(artwork.imageUrl);
                imageElement.src = imageUrl;
                imageElement.alt = artwork.title;

                const titleElement = document.createElement('h2');
                titleElement.textContent = artwork.title;

                const usernameElement = document.createElement('p');
                usernameElement.textContent = `By: ${artwork.username}`;

                // Thêm các phần tử vào artworkElement
                artworkElement.appendChild(imageElement);
                artworkElement.appendChild(titleElement);
                artworkElement.appendChild(usernameElement);

                // Thêm artworkElement vào gallery
                gallery.appendChild(artworkElement);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            hideLoading();
        }
    };

    fetchArtworks();
});
