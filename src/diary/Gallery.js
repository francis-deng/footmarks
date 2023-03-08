import {useState,useRef,useEffect} from 'react';
import './Gallery.css';

function Gallery({changeImages}) {
    const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;
    const [imageFiles, setImageFiles] = useState([]);
    const [images, setImages] = useState([]);
    const img = useRef();

    const addImage = ()=>{
        let files = img.current.files;
        console.log(files);       

        const validImageFiles = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (file.type.match(imageTypeRegex)) {
            validImageFiles.push(file);
          }
        }

        if (validImageFiles.length) {
            setImageFiles(imageFiles.concat(validImageFiles));
            return;
        }
    };

    useEffect(() => {
        const images = [], fileReaders = [];
        let isCancel = false;
        if (imageFiles.length) {
          imageFiles.forEach((file) => {
            const fileReader = new FileReader();
            fileReaders.push(fileReader);
            fileReader.onload = (e) => {
              const { result } = e.target;
              if (result) {
                images.push(result)
              }
              if (images.length === imageFiles.length && !isCancel) {
                setImages(images);
              }
            }
            fileReader.readAsDataURL(file);
          })
        };
        return () => {
          isCancel = true;
          fileReaders.forEach(fileReader => {
            if (fileReader.readyState === 1) {
              fileReader.abort()
            }
          })
        }
      }, [imageFiles]);

      let previewImageTags=[];
      images.map((e,i)=>{
        previewImageTags.push(<img className="one-image" key={i} src={e} width="100" height="100"/>);
      });

      changeImages(imageFiles);

    return (
        <div className="images">
            {previewImageTags}             
            <input ref={img} id="img" type="file" hidden onChange={addImage}></input>
            <span className="add-image" onClick={()=>img.current.click()}>+</span>
        </div>
    );
}



export default Gallery;