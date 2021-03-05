import firebase from "firebase/app";
import "firebase/storage";

//firebase.js
export const getImages = (images) => {
  let Galleryimages = [];
  firebase
    .storage()
    .ref()
    .child("images/")
    .list()
    .then((result) => {
      // Loop over each item
      result.items.forEach((pics) => {
        firebase
          .storage()
          .ref()
          .child(pics.fullPath)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            Galleryimages = [...Galleryimages, url];
          });
      });
      return Galleryimages;
    });
};

export const getAllImages = () => {
  let allImages = [];

  allImages = [...allImages, getImages()];
  return allImages;
};

export default getImages;
