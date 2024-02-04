import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      query: '',
      page: 1,
      selectedImage: null,
      isLoading: false,
      isSearching: false,
    };
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { query, page } = this.state;
    const apiKey = '40885612-70f55eeefc8db6341de76fae5';
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
      query
    )}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`;

    this.setState({ isLoading: true });

    try {
      const response = await axios.get(url);

      const newImages = response.data.hits.filter(
        newImage => !this.state.images.some(image => image.id === newImage.id)
      );

      this.setState(prevState => ({
        images: page === 1 ? newImages : [...prevState.images, ...newImages],
        page: prevState.page + 1,
        isSearching: false,
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearch = query => {
    const searchTerm = query.trim() === '' ? 'default' : query;
    this.setState(
      { query: searchTerm, page: 1, images: [], isSearching: true },
      this.fetchImages
    );
  };

  handleImageClick = image => {
    this.setState({ selectedImage: image });
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { images, selectedImage, isLoading } = this.state;

    return (
      <div>
        <Searchbar onSearch={this.handleSearch} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {!isLoading && images.length > 0 && (
          <Button onClick={() => this.fetchImages()} />
        )}
        {selectedImage && (
          <Modal image={selectedImage} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
